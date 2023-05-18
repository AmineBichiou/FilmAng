import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { Film } from '../model/film.model';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';
@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
  styleUrls: ['./update-film.component.css']
})
export class UpdateFilmComponent implements OnInit {
  currentFilm = new Film();
  Genre! : Genre[];
  updatedGenreId! : number;
  uploadedImage!: File;
isImageUpdated: Boolean=false;
apiurl:string='http://localhost:8080/Film/api/image';
myImage:string="";



  constructor( private activatedRoute: ActivatedRoute, private router : Router,private filmService: FilmService) { }

  /*ngOnInit(): void {
    this.Genre = this.filmService.listeGenre();
    this.currentFilm = this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id']);
    this.updatedGenreId=this.currentFilm.Genre.idGenre;
  }*/
  /*ngOnInit() {
    this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id']).
     subscribe( prod =>{ this.currentFilm = prod; } ) ;
    }*/
    /*ngOnInit(): void {
      this.filmService.listeGenre().subscribe(gens => {this.Genre = gens;
      console.log(gens);
      });
      ²this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id']).
      subscribe( prod =>{ this.currentFilm = prod;
      this.updatedGenreId =
      this.currentFilm.Genre.idGenre;
      } ) ;
      }*/
      ngOnInit(): void {
        /*this.filmService.listeGenre().
        subscribe(gen  => {console.log(gen);
        this.Genre = gen._embedded.genres;
        }
        );
        this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id']).
        subscribe( gen =>{ this.currentFilm = gen;
        this.updatedGenreId = this.currentFilm.genre.idGenre;
        this.myImage = this.getFilmImageUrl(gen);
        } ) ;*/
        this.filmService.listeGenre().subscribe(gen => {this.Genre = gen._embedded.genres;
          console.log(gen);
          });
          this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id']).
subscribe( f =>{ this.currentFilm = f;
this.updatedGenreId = f.genre.idGenre;
this.filmService
.loadImage(this.currentFilm.image.idImage)
.subscribe((img: Image) => {
this.myImage = 'data:' + img.type + ';base64,' + img.image;
});
} )
        
        }
    
 /* updateFilm()
{
  this.currentFilm.Genre=this.filmService.consulterGenre(this.updatedGenreId);
this.filmService.updateFilm(this.currentFilm);
this.router.navigate(['Film']);
}*/
/*updateFilm() {
  this.filmService.updateFilm(this.currentFilm).subscribe(prod => {
  this.router.navigate(['Film']); }
  );
  }*/
  getFilmImageUrl(Film: Film): string {
    // Construire l'URL complète de l'image en utilisant l'ID du téléphone
    return `${this.apiurl}/load/${Film.image.idImage}`;
  }
  updateFilm() {
    /*this.currentFilm.genre = this.Genre.
     find(gen => gen.idGenre == this.updatedGenreId)!;
    this.filmService.updateFilm(this.currentFilm).subscribe(gen => {
    this.router.navigate(['Film']); }
    );*/
    this.currentFilm.genre = this.Genre.
     find(gen => gen.idGenre == this.updatedGenreId)!;
     if (this.isImageUpdated)
{
this.filmService
.uploadImage(this.uploadedImage, this.uploadedImage.name)
.subscribe((img: Image) => {
this.currentFilm.image = img;
this.filmService
.updateFilm(this.currentFilm)
.subscribe((prod) => {
this.router.navigate(['Film']);
});
});
}
else{
this.filmService
.updateFilm(this.currentFilm)
.subscribe((f) => {
this.router.navigate(['Film']);
});
}

    }
    onImageUpload(event: any) {
      if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated =true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
      }
      }
}

