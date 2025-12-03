import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../../core/services/user-service';
import { Question } from '../../../../shared/models/question.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
   styleUrls: ['./home.css']
})
export class Home implements OnInit{

    Questions = signal<Question[]>([]);

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
        console.log('qn', this.Questions)
      },
      error:(err) =>{
        console.error('Error fetching questions:', err);
      }
    });
  }
}
