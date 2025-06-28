import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError, timeout } from 'rxjs';

export interface Course{
  id:number,
  name:string,
  description:string,
  duration:string,
  level: string,
  price:number
}


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http:HttpClient=inject(HttpClient);
  private baseUri:string="http://localhost:8084/course";

  /*get courses from api */
  getCourses():Observable<Course[]>{
     return this.http.get<any[]>(this.baseUri)
     .pipe(
        timeout(3000), 
        map((anyDataList: any[]) => anyDataList.map((any: Course) => any as Course) ),
        catchError(err=>{
          console.log("error al obtener api data ", err);
          return throwError(()=>new Error("error get api data"));
        }) 
     );
  }
  
  /*get courses by id from api */
  getCoursesById(id:number):Observable<Course>{
    return this.http.get<any>(`${this.baseUri}/${id}`)
    .pipe(
       timeout(3000),
       catchError(err=>{
         console.log("error al obtener api data ", err);
         return throwError(()=>new Error("error get api data"));
       }) 
    );
 }

  /*insert course into api*/
  insertCourse(course:Course):Observable<void>{
     return this.http.post<void>(this.baseUri, course)
            .pipe(
              timeout(3000),
              catchError(err=>{
                console.log(" error insert ", err);
                return throwError(()=> new Error(" error al insertar "))
              })
            );
  }


  /*update course into api*/
  updateCourse(course:Course):Observable<void>{
    return this.http.put<void>(this.baseUri, course)
           .pipe(
             timeout(3000),
             catchError(err=>{
               console.log(" error insert ", err);
               return throwError(()=> new Error(" error al insertar "))
             })
           );
 }
  /*delete course from api */
  deleteCourse(id:number):Observable<void>{
     return this.http.delete<void>(`${this.baseUri}/${id}`)
     .pipe(
      timeout(3000),
      catchError(err=>{
        console.log(" error delete ", err);
        return throwError(()=> new Error(" error al eliminar "))
      })
     );
  }
}
