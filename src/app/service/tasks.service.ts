import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getTask() {
    return this.http.get('http://localhost:3000/products');
  }

  addTask(Task) {
    return this.http.post('http://localhost:3000/products', Task);
  }
}
