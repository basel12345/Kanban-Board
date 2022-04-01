import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskResolver } from 'src/app/resolver/task.resolver';
import { TasksComponent } from './pages/tasks.component';

const routes: Routes = [
    {
        path: "",
        component: TasksComponent,
        resolve: {
            Task: TaskResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }
