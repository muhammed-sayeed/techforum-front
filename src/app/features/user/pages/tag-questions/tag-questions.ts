import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../core/services/user-service';
import { Question, relatedTags } from '../../../../shared/models/question.model';
@Component({
  selector: 'app-tag-questions',
  imports: [RouterModule, CommonModule],
  templateUrl: './tag-questions.html',
  styleUrl: './tag-questions.css',
})
export class TagQuestions implements OnInit {
  Questions = signal<Question[]>([]);
  relatedTags = signal<relatedTags[]>([]);

  constructor(
    private userservice: UserService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.loadQuestions(id!);
    this.route.paramMap.subscribe(params => {
    const tagId = params.get('id');
    if (tagId) {
      this.loadQuestions(tagId);
    }
  });
  }
  

  loadQuestions(id: string){
    this.userservice.getTagQuestions(id).subscribe({
      next: (res) => {
        this.Questions.set(res.qnlist);
        this.relatedTags.set(res.relatedTags);
      },
      error:(err) =>{
        console.error('Error fetching questions:', err);
      }
    });
  }
}
