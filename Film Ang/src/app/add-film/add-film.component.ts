import { FilmService } from './../services/film.service';
import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  newFilm = new Film();
  Genre! : Genre[];
  newIdGenre! : number;
  uploadedImage!: File;
imagePath: any;
  newGenre! : Genre;
  constructor(private filmService :FilmService,private router : Router) { }
  /*addFilm(){
    this.filmService.ajouterFilm(this.newFilm).subscribe(prod => {
console.log(prod);
this.router.navigate(['Film']);
});

  }*/
  
  /*ngOnInit(): void {
    this.filmService.listeGenre().
    subscribe(gen => {this.Genre = gen;
    console.log(gen);
    });
    
  }*/
  ngOnInit(): void {
    this.filmService.listeGenre().
    subscribe(gen=> {console.log(gen);
   this.Genre = gen._embedded.genres;
    }
    );
    }
    
      addFilm(){
        /*this.newFilm.genre = this.Genre.find(gen => gen.idGenre == this.newIdGenre)!;//dont forget
        this.filmService.ajouterFilm(this.newFilm)
        .subscribe(prod => {
        console.log(prod);
        this.router.navigate(['Film']);
        });*/
        this.filmService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.newFilm.image=img;
    this.newFilm.genre = this.Genre.find(gen => gen.idGenre == this.newIdGenre)!;
    this.filmService
    .ajouterFilm(this.newFilm)
    .subscribe(() => {
    console.log(this.newFilm);
    console.log("image path "+this.imagePath);
    this.router.navigate(['Film']);
    });
    });
    
        }
        onImageUpload(event: any) {
          this.uploadedImage = event.target.files[0];
          var reader = new FileReader();
          reader.readAsDataURL(this.uploadedImage);
          reader.onload = (_event) => { this.imagePath = reader.result; }
          }
    
    

}
