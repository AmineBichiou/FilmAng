import { Genre } from './../model/genre.model';
import { Injectable } from '@angular/core';
import { Film } from '../model/film.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/GenreWrapped.model';
import {AuthService} from "./auth.service";
import { Image } from '../model/image.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  apiURL: string = 'http://localhost:8080/Film/api';
  apiURLGen: string = 'http://localhost:8080/Film/gen';


  Film : Film[] = [];

  filmRecherche : Film[] = []; 
  film! : Film;
  Genre! : Genre[];
  constructor(private http : HttpClient, private authService: AuthService) {
    /*this.Genre = [ {idGenre : 1, nomGenre : "Comedy"},
    {idGenre : 2, nomGenre : "Drama"},
    {idGenre : 3, nomGenre : "Action"},
    {idGenre : 4, nomGenre : "fantasy"},
    {idGenre : 5, nomGenre : "science fiction"},
    {idGenre : 6, nomGenre : "Historical"},
    {idGenre : 7, nomGenre : "Horror"},
    {idGenre : 8, nomGenre : "Romance"},
    {idGenre : 9, nomGenre : "Thriller"},
  ];*/
   /* this.Film = [
      {idFilm : 1, nomFilm : "The Man from Toronto",Genre : {idGenre : 1, nomGenre : "Comedy"},rateFilm : 3.7, dateCreation : new Date("03/18/2022")},
      {idFilm : 2, nomFilm : "Deep Water",Genre : {idGenre : 2, nomGenre : "Drama"},rateFilm : 2.5, dateCreation : new Date("06/24/2022")},
      {idFilm : 3, nomFilm : "DayShift",Genre : {idGenre : 3, nomGenre : "Action"},rateFilm : 3.9, dateCreation : new Date("08/12/2022")},
    ];*/
  }
  /*listeFilm():Observable<Film[]> {
    return this.http.get<Film[]>(this.apiURL);
  }*/
  listeFilm(): Observable<Film[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Film[]>(this.apiURL,{headers:httpHeaders});
  }
  ajouterFilm( gen: Film):Observable<Film>{
    //return this.http.post<Film>(this.apiURL, gen, httpOptions);
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.apiURL}`;
    console.log("im here"+gen);
    return this.http.post<Film>(url, gen, {headers:httpHeaders});

    }
    /*supprimerFilm( prod: Film){
      const index = this.Film.indexOf(prod, 0);
      if (index > -1) {
      this.Film.splice(index, 1);
      }
      }*/
      /*supprimerFilm(id : number) {
        const url = `${this.apiURL}/${id}`;
        return this.http.delete(url, httpOptions);
        }*/
          supprimerFilm(id : number) {
            const url = `${this.apiURL}/${id}`;
            let jwt = this.authService.getToken();
            jwt = "Bearer "+jwt;
            let httpHeaders = new HttpHeaders({"Authorization":jwt})
            return this.http.delete(url, {headers:httpHeaders});

          }
        supprimerGenre(id : number) {
          const url = `${this.apiURL}/${id}`;
          return this.http.delete(url, httpOptions);
          }
        
      /*consulterFilm(id:number): Film{
        this.film = this.Film.find(p => p.idFilm == id)!;
        return this.film;
        }*/
        consulterFilm(id: number): Observable<Film> {
          /*const url = `${this.apiURL}/${id}`;
          return this.http.get<Film>(url);*/
          const url = `${this.apiURL}/${id}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.get<Film>(url,{headers:httpHeaders});
          }
          
trierFilm(){
  this.Film = this.Film.sort((n1,n2) => {
  if (n1.idFilm! > n2.idFilm!) {
  return 1;
  }
  if (n1.idFilm! < n2.idFilm!) {
  return -1;
  }
  return 0;
  });
  }
  /*updateFilm(f:Film)
  {
  // console.log(p);
  this.supprimerFilm(f);
  this.ajouterFilm(f);
  this.trierFilm();
  }*/
  updateFilm(gen :Film) : Observable<Film>
{
//return this.http.put<Film>(this.apiURL, gen, httpOptions);
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Film>(this.apiURL, gen, {headers:httpHeaders});
}
  /*listeGenre():Genre[] {
    return this.Genre;
    }*/
    /*listeGenre():Observable<Genre[]>{
      return this.http.get<Genre[]>(this.apiURL+"/cat");
      }*/
      listeGenre():Observable<GenreWrapper>{
        //return this.http.get<GenreWrapper>(this.apiURLGen);
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<GenreWrapper>(this.apiURLGen,{headers:httpHeaders});

      }
        
      
    /*consulterGenre(id:number): Genre{
      return this.Genre.find(gen => gen.idGenre == id)!;
      }*/
      /*rechercheGenre(idGenre: number): Film[]{
        this.filmRecherche = [];
       
        this.Film.forEach((cur, index) => {
         if(idGenre == cur.Genre.idGenre) {
             console.log("cur "+cur);
            this.filmRecherche.push(cur);
             }
       });
       return this.filmRecherche;
       }*/
       rechercherGenre(idGenre: number):Observable< Film[]> {
        const url = `${this.apiURL}/filmgenre/${idGenre}`;
        return this.http.get<Film[]>(url);
        }
        ajouterGenre( gen: Genre):Observable<Genre>{
          return this.http.post<Genre>(this.apiURLGen, gen, httpOptions);
         }
    
         /*supprimerGenre(id : number) {
          const url = `${this.apiURLGen}/${id}`;
          return this.http.delete(url, httpOptions);
          } */
          rechercherParNom(nom: string):Observable< Film[]> {
            const url = `${this.apiURL}/FilmByName/${nom}`;
            return this.http.get<Film[]>(url);
            }

            uploadImage(file: File, filename: string): Observable<Image>{
              const imageFormData = new FormData();
              imageFormData.append('image', file, filename);
              const url = `${this.apiURL + '/image/upload'}`;
              return this.http.post<Image>(url, imageFormData);
              }
              loadImage(id: number): Observable<Image> {
              const url = `${this.apiURL + '/image/get/info'}/${id}`;
              
              return this.http.get<Image>(url);
              }
              

            
            

}
