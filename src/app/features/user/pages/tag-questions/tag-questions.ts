import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../core/services/user-service';
import { Question } from '../../../../shared/models/question.model';
@Component({
  selector: 'app-tag-questions',
  imports: [RouterModule, CommonModule],
  templateUrl: './tag-questions.html',
  styleUrl: './tag-questions.css',
})
export class TagQuestions implements OnInit {
  Questions = signal<Question[]>([]);

  constructor(
    private userservice: UserService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.loadQuestions(id!);
  }
  

  loadQuestions(id: string){
    this.userservice.getTagQuestions(id).subscribe({
      next: (res) => {
        this.Questions.set(res.qnlist);
        console.log('qn', this.Questions)
      },
      error:(err) =>{
        console.error('Error fetching questions:', err);
      }
    });
  }
}
