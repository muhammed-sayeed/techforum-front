import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { QuestionResponse } from '../../shared/models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   
  private Api = environment.userApiUrl;

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(`${this.Api}/getqn`);
  }
  
}
