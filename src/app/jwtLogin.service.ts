import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {JwtPayload} from 'jwt-decode';
import {url} from './constants';



export interface JwtToken extends JwtPayload {
  user: string
}

@Injectable({
  providedIn: 'root'
})
export class JwtLoginService {
  constructor(private httpClient: HttpClient) {
  }


  fetchToken(): Observable<any> {
    return this.httpClient.get<{bearer: string}>(url + '/token').pipe(tap(bearer => this.storeInLocalStorage(bearer.bearer)))
  }

  private storeInLocalStorage(token: string) {
    // console.log(token);
    localStorage.setItem('testToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('testToken');
  }

  getRefreshToken(): Observable<any> {
    return this.fetchToken();
  }

  signOut(): void {
    alert('sign out');
  }
}
