import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Dragon from 'src/app/interfaces/dragon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragonsApiService {

  readonly BASE_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Dragon[]> {
    return this.http.get<Dragon[]>(`${this.BASE_URL}`);
  }

  findOneById(id: string): Observable<Dragon> {
    return this.http.get<Dragon>(`${this.BASE_URL}/${id}`);
  }

  create(name: string, type: string, histories: string): Observable<Dragon> {
    const body = { name, type, histories };
    return this.http.post<Dragon>(`${this.BASE_URL}`, body);
  }

  update(id: string, name: string, type: string, histories: string): Observable<Dragon> {
    const body = { name, type, histories };
    return this.http.put<Dragon>(`${this.BASE_URL}/${id}`, body);
  }

  delete(id: string): Observable<Dragon> {
    return this.http.delete<Dragon>(`${this.BASE_URL}/${id}`);
  }
}
