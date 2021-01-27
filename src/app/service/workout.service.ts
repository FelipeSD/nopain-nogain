import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interface/client';
import { WorkoutList } from '../interface/workoutList';


const urlBase: string = "http://localhost:3000/trainingSheet";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<WorkoutList[]> {
    return this.http.get<WorkoutList[]>(urlBase);
  }

  get(id : string): Observable<WorkoutList> {
    return this.http.get<WorkoutList>(`${urlBase}/${id}`);
  }

  getOwner(id : string): Observable<Client> {
    return this.http.get<Client>(`${urlBase}/${id}/ownerClient`);
  }

  update(id : string, data : WorkoutList) : Observable<WorkoutList> {
    return this.http.put<WorkoutList>(`${urlBase}/${id}`, data);
  }

  create(data: WorkoutList): Observable<WorkoutList> {
    return this.http.post<WorkoutList>(urlBase, data);
  }

  delete(id: string){
    return this.http.delete(`${urlBase}/${id}`);
  }
}
