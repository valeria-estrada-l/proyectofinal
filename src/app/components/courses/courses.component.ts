import { Component, inject } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-courses',
  imports: [RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  private service=inject(CourseService);

  items=toSignal(this.service
    .getCourses()
    .pipe(catchError(err=> {
      console.log(err);
      return of([])
    })),
    {initialValue: [] as Course[]});

}
