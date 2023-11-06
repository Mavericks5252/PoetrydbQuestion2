import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { formData } from './formData';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { PoetryData } from './poetryData';




/*
This file calls the api from the given request sent from form.component.ts
the response is then passed to the file to be evaluated

Purpose: handle url format for query

 */

@Injectable({
  providedIn: 'root'
})
export class RESTAPIService {



  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) { }
  private poetryBaseUrl = 'https://poetrydb.org/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getData(userInput: formData) {
    const url = `${this.poetryBaseUrl}/author,title/${userInput.author};${userInput.title}`;
    return this.httpClient.get(url, { observe: 'response' })
  }
  getAuthorData(userInput: formData) {
    const url = `${this.poetryBaseUrl}author/${userInput.author}`;
    return this.httpClient.get(url, { observe: 'response' })
  }

  getTitleData(userInput: formData) {
    const url = `${this.poetryBaseUrl}title/${userInput.title}`;
    return this.httpClient.get(url, { observe: 'response' })
  }


}