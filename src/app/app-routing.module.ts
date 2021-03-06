import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: "tasks",
		loadChildren: () => import("./components/tasks/tasks.module").then(m => m.TaskModule)
	},
	{
		path: '',
		redirectTo: 'tasks',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'tasks',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
