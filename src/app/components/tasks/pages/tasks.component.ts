import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from 'src/app/service/tasks.service';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
	image = "https://thumbs.dreamstime.com/z/task-concept-people-letters-icons-flat-vector-illustration-isolated-white-background-task-concept-people-letters-139612201.jpg";
	items: any = [];
	basket: any = [];
	compelete: any = [];

	constructor(public dialog: MatDialog, private tasksService: TasksService) { }

	ngOnInit(): void {
		this.getTasks();
	}

	getTasks() {
		this.tasksService.getTask().subscribe(res => {
			this.items = res;
		})
	}

	drop(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
		}
	}

	addTask() {
		const dialogRef = this.dialog.open(AddTaskComponent, {
			width: "800px",
			data: {
				length: this.items.length
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			this.getTasks();
		});
	}
}
