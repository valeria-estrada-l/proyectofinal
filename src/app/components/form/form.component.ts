import { Component, inject } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  private service: CourseService = inject(CourseService);
  private build = inject(FormBuilder)
  private router = inject(Router)

  form = this.build.group({
    name: ['', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(/^[a-z,A-Z,\s]/)]],

    description: ['', [
      Validators.required,
      Validators.maxLength(200),
      Validators.pattern(/^[a-z,A-Z,\s]/)]],

    duration: ['', [
      Validators.required,
      Validators.maxLength(200),
      Validators.pattern(/^[a-z,A-Z,\s]/)]],

    level: ['', [
      Validators.required,
      Validators.maxLength(200),
      Validators.pattern(/^[a-z,A-Z,\s]/)]],

    price: ['', [
      Validators.required,
      Validators.maxLength(200),
      ]],

  });

  submit() {
    let name = this.form.controls.name.value!;
    let description = this.form.controls.description.value!;
    let duration = this.form.controls.duration.value!;
    let level = this.form.controls.level.value!;
    let price = this.form.controls.price.value!;

    let c: Course = {
      id: 0,
      name: name,
      description: description,
      duration: duration,
      level: level,
      price: Number(price)
    }

    this.service.insertCourse(c).pipe(take(1)).subscribe({
      next: value => {
        this.router.navigate(['courses'])
      },
      error: err => { console.log(err) }
    });
  }
}