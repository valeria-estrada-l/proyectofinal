import { Component, inject, signal } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private service : CourseService = inject(CourseService);
  items= signal <Course[]>([]);

  ngOnInit(){
    this.service.getCourses().subscribe({
      next: values=>{this.items.set(values)},
      error: err=>{console.log(err)}
    });
  }

  deleteCourse(id:number){
    this.service.deleteCourse(id).subscribe({
     error: err=>{console.log(err)}
    });
 }
}
