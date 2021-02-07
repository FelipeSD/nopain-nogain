import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interface/client';
import { WorkoutList } from '../interface/workoutList';


const urlBase: string = `${environment.apiUrl}/client`;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll(userId: string): Observable<Client[]> {
    return this.http.post<Client[]>(`${urlBase}/findAll`, {userId});
  }

  getWorkoutList(userId: string, clientId : string): Observable<WorkoutList[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        userId
      }
    }
    
    return this.http.get<WorkoutList[]>(`${urlBase}/${clientId}/trainingSheets`, options);
  }

  get(userId: string, clientId : string): Observable<Client> {
    return this.http.post<Client>(`${urlBase}/findOne`, {
      _id: clientId,
      userId: userId
    });
  }

  update(id : string, data : Client) : Observable<Client> {
    return this.http.put<Client>(`${urlBase}/${id}`, data);
  }

  create(data: Client): Observable<Client> {
    return this.http.post<Client>(urlBase, data);
  }

  delete(userId: string, clientId: string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        userId
      }
    }
    return this.http.delete(`${urlBase}/${clientId}`, options);
  }
}
