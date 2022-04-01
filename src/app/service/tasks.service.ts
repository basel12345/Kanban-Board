import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TasksService {

	constructor(private http: HttpClient) { }

	getTask() {
		return this.http.get('http://localhost:3000/backlog');
	};

	getByIdTask(id: number) {
		return this.http.get(`http://localhost:3000/backlog/${id}`);
	};

	addTask(Task) {
		return this.http.post('http://localhost:3000/backlog', Task);
	};

	updateTask(id, completed) {
		return this.http.put(`http://localhost:3000/backlog/${id}`, completed);
	};
}
