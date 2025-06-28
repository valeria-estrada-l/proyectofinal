import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  images:string[]=[
    "https://blog.coursify.me/wp-content/uploads/2021/05/mercado-de-cursos-en-linea-coursifyme.jpg",
    "https://vilmanunez.com/wp-content/uploads/2020/03/Los-6-mejores-cursos-gratuitos.jpg"
  ]

  currentIndex=signal<number>(0);
  interval!:any;

  ngOnInit(){
    this.interval=setInterval(()=>{
       this.currentIndex.update(value=> (value+1)%this.images.length);
    }, 2000);
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }
}
