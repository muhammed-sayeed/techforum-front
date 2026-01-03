import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserService } from '../../../../core/services/user-service';
import { Question, topTags } from '../../../../shared/models/question.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
   styleUrls: ['./home.css']
})
export class Home implements OnInit{

    Questions = signal<Question[]>([]);
    topTags = signal<topTags[]>([]);

  constructor(
    private userservice: UserService
  ){}

  ngOnInit(): void {
    this.loadQuestions();
  }
  

  loadQuestions(){
    this.userservice.getAllQuestions().subscribe({
      next: (res) => {
        this.Questions.set(res.questions);
        this.topTags.set(res.topTags);
      },
      error:(err) =>{
        console.error('Error fetching questions:', err);
      }
    });
  }
}
