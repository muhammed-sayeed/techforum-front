import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { QuestionResponse, CreateQuestionRequest, CreateQuestionResponse } from '../../shared/models/question.model';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { TagResponse } from '../../shared/models/tags.model';
import { AuthResponse, LoginResponse } from '../../shared/models/user-auth.model';
import { SingleQuestionResponse } from '../../shared/models/single-question.model';
import { AddAnswerResponse } from '../../shared/models/answer.model';
import { TagListResponse } from '../../shared/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   
  private Api = environment.userApiUrl;

  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.checkAuth();
     window.addEventListener('storage', () => {
    this.checkAuth();
  }); 
  }

  checkAuth() {
    const token = localStorage.getItem('token');
    this.isAuthenticated.set(!!token);
  }

  getAllQuestions(): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(`${this.Api}/global/getqn`);
  }

  searchTags(query: string): Observable<TagResponse> {
    return this.http.get<TagResponse>(`${this.Api}/searchtags`,{
    params: { val: query }
    })
  }

  createQuestion(data: CreateQuestionRequest) {
  return this.http.post<CreateQuestionResponse>(`${this.Api}/addqn`, data);
 }

 login(data: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.Api}/global/login`, data);
  }

  register(data: {username: string, email: string, password: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.Api}/global/signup`, data);
  }
  
  singleQuestion(id: string): Observable<any> {
    return this.http.get<any>(`${this.Api}/singleqn`,{
      params: {Id: id}
    });
  }

  addAnswer(data: { qnId: string; answer: string }): Observable<AddAnswerResponse> {
  return this.http.post<AddAnswerResponse>(`${this.Api}/saveans`, data);
}

getTags(params: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  const { page = 1, pageSize = 20, search = '' } = params;

  return this.http.get<TagListResponse>(`${this.Api}/taglist`, {
    params: {
      page: page.toString(),
      pageSize: pageSize.toString(),
      search
    }
  });
}

getTagQuestions(id: string): Observable<any> {
  return this.http.get<any>(`${this.Api}/tagbasedqn`, {
    params: { Id: id }
  });
}

refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token');

    return this.http.post(`${this.Api}/global/updatetoken`, { token: refresh })
      .pipe(
        tap((res: any) => {
          if (res.success && res.token) {
            localStorage.setItem('token', res.token);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.isAuthenticated.set(false);  
    this.router.navigate(['/user/login']);
  }

}
