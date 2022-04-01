import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from 'src/app/service/tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
	image = "https://thumbs.dreamstime.com/z/task-concept-people-letters-icons-flat-vector-illustration-isolated-white-background-task-concept-people-letters-139612201.jpg";
	items: any = [];
	todo: any = [];
	done: any = [];
	task: any;

	constructor(
		public dialog: MatDialog,
		private tasksService: TasksService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.route.data.subscribe(res => {
			this.items = res.Task;
			console.log(this.items);
			
		});
	}

	getTasks() {
		this.tasksService.getTask().subscribe(res => {
			this.items = res;
		});
	};

	compelete(id: number) {
		this.tasksService.getByIdTask(id).subscribe(res => {
			this.task = res;
			if (res) {
				this.task = {
					complete: "true",
					activities: this.task.activities,
					createdAt: this.task.createdAt,
					desc: this.task.desc,
					image: this.task.image,
					tag: this.task.tag,
					title: this.task.title
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
