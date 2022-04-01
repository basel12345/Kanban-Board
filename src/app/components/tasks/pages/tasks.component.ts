import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from 'src/app/service/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/interfaces/task';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
	image = "https://thumbs.dreamstime.com/z/task-concept-people-letters-icons-flat-vector-illustration-isolated-white-background-task-concept-people-letters-139612201.jpg";
	items: any;
	todo: Task[]= [];
	done: Task[]= [];
	taskUpdate: any;
	task: Task;

	constructor(
		public dialog: MatDialog,
		private tasksService: TasksService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.route.data.subscribe(res => {
			this.items = res.Task;
			console.log(res.Task);
			
		});
	}

	getTasks() {
		this.tasksService.getTask().subscribe(res => {
			this.items = res;
		});
	};

	compelete(id: number) {
		this.tasksService.getByIdTask(id).subscribe(res => {
			this.taskUpdate = res;
			if (res) {
				this.task = {
					complete: true,
					activities: this.taskUpdate.activities,
					createdAt: this.taskUpdate.createdAt,
					desc: this.taskUpdate.desc,
					image: this.taskUpdate.image,
					tag: this.taskUpdate.tag,
					title: this.taskUpdate.title,
					id: id
				};
			}

			this.tasksService.updateTask(id, this.task).subscribe(res => {
				console.log(res);

				if (res) this.getTasks();
			});
		})
	};

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
		};
		this.items = this.items.sort((a, b) => a.id - b.id);
		this.todo = this.todo.sort((a, b) => a.id - b.id);
		this.done = this.done.sort((a, b) => a.id - b.id);
	};

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
	};
}
