import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TasksService } from 'src/app/service/tasks.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-add-task',
	templateUrl: './add-task.component.html',
	styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
	separatorKeysCodes: number[] = [ENTER, COMMA];
	allTags: string[] = ['task 1', 'task 2', 'task 3', 'task 4', 'task 5'];
	TaskForm!: FormGroup;
	fileToUpload!: File;
	tag: string[] = ["task"];
	@ViewChild('tags') tags: ElementRef<HTMLInputElement>;
	date: string = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDay();
	filteredTags: Observable<string[]>;

	constructor(
		private fb: FormBuilder,
		private tasksService: TasksService,
		public dialogRef: MatDialogRef<AddTaskComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,

	) { }

	ngOnInit(): void {
		this.creatTaskForm();
		this.filteredTags = this.TaskForm.controls.tag.valueChanges.pipe(
			startWith(null),
			map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
		);
	}

	creatTaskForm(): void {
		this.TaskForm = this.fb.group({
			title: ["", Validators.required],
			image: [this.fileToUpload, Validators.required],
			desc: ["", Validators.required],
			tag: "",
			createdAt: this.date,
			activities: "",
			complete: false
		})
	}

	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		
		// Add our fruit
		if (value) {
			this.tag.push(value);
		}
		if (event.input) {
			event.input.value = '';
		}
	}

	remove(tag: string): void {
		const index = this.tag.indexOf(tag);

		if (index >= 0) {
			this.tag.splice(index, 1);
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.tag.push(event.option.viewValue);
		this.tags.nativeElement.value = '';
		this.TaskForm.controls.tag.patchValue(null)
	}


	uploadFile(files) {
		this.fileToUpload = files.item(0);
		console.log(this.fileToUpload);

	}


	private _filter(value: string): string[] {
		const filterValue = value;

		return this.allTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
	}


	submit(): void {
		if(this.tag.length > 0) this.TaskForm.controls.tag.patchValue(this.tag);
		const formData: FormData = new FormData();
		formData.append("title", this.TaskForm.controls.title.value)
		formData.append("image", this.TaskForm.controls.image.value)
		formData.append("desc", this.TaskForm.controls.desc.value)
		formData.append("tag", this.TaskForm.controls.tag.value)
		formData.append("createdAt", this.TaskForm.controls.createdAt.value)
		formData.append("activities", this.TaskForm.controls.activities.value)
		this.tasksService.addTask(this.TaskForm.getRawValue()).subscribe(res => {
			if (res) this.dialogRef.close();
		});
	};

}
