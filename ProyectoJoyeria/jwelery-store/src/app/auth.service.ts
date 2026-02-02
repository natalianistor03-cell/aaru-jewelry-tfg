import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7283/api/Auth'; // backend

  constructor(private http: HttpClient) {}

  setUserProfile(profile: any) {
    if (profile){
    localStorage.setItem('userProfile', JSON.stringify(profile)); 
  } else {
    localStorage.removeItem('userProfile');
  }
}

  getUserProfile(): any {
  const profile = localStorage.getItem('userProfile');
  return profile ? JSON.parse(profile) : null;
}


    isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario); // registro
  }

  login(credentials: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/login`, credentials). subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.setUserProfile(res.user);
          observer.next(res);
          observer.complete;
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }
}
