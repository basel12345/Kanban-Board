import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TasksService } from 'src/app/service/tasks.service';


@Injectable()

export class TaskResolver implements Resolve<any> {
    constructor(private taskService: TasksService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.taskService.getTask();
    }
}
