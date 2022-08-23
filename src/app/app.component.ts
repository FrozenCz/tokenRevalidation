import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {JwtLoginService} from './jwtLogin.service';
import {HttpClient} from '@angular/common/http';
import {url} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tokenRevalidation';
  token$!: Observable<any>
  resourceResult: undefined | string;

  constructor(private jwtLoginService: JwtLoginService, private httpClient: HttpClient) {

    this.token$ = this.jwtLoginService.fetchToken();

  }

  getResource(): void {

    this.httpClient.get<{ resource: string }>(url + '/resource').subscribe({
      next: (result) => {
        this.resourceResult = result.resource;
      },
      error: () => {
        alert('an error occurred!');
        this.resourceResult = undefined;
      }
    })

  }
}
