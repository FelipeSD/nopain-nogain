import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interface/client';
import { WorkoutList } from '../interface/workoutList';


const urlBase: string = "https://nopain-nogain-server.glitch.me/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(urlBase);
  }

  getWorkoutList(id : string): Observable<WorkoutList[]> {
    return this.http.get<WorkoutList[]>(`${urlBase}/${id}/trainingSheets`);
  }

  get(id : string): Observable<Client> {
    return this.http.get<Client>(`${urlBase}/${id}`);
  }

  update(id : string, data : Client) : Observable<Client> {
    return this.http.put<Client>(`${urlBase}/${id}`, data);
  }

  create(data: Client): Observable<Client> {
    return this.http.post<Client>(urlBase, data);
  }

  delete(id: string){
    return this.http.delete(`${urlBase}/${id}`);
  }
}
