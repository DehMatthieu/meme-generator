import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Remplacez le port si nécessaire

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const body = { username, password };

    return this.http.post<boolean>(`${this.apiUrl}/login`, body);
  }
}
