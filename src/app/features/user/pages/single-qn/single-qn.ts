import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { signal } from '@angular/core';

import { UserService } from '../../../../core/services/user-service';

@Component({
  selector: 'app-single-qn',
  imports: [CommonModule, QuillModule],
  templateUrl: './single-qn.html',
  styleUrl: './single-qn.css',
})
export class SingleQn {
  question = signal<any>(null);
  answers = signal<any[]>([]);

  answerContent: string = '';

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image']
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private userservice : UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadQuestion(id!);
  }

   loadQuestion(id: string) {
    this.userservice.singleQuestion(id).subscribe(res => {
     this.question.set(res.qn);
     this.answers.set(res.answer);
      console.log('Loaded Question: ', this.answers());
    });
  }

 submitAnswer() {
  if (this.answerContent.trim().length < 20) {
    alert("Answer must contain at least 20 characters");
    return;
  }

  const payload = {
    qnId: this.question()?._id,
    answer: this.answerContent
  };

  this.userservice.addAnswer(payload).subscribe({
  next: (res) => {
    if (res.success) {
      this.answers.update(list => [res.answer, ...list]);  // now works
      this.answerContent = '';
    }
  },
  error: () => alert("Error submitting answer")
});
}

  onAnswerChanged(event: any) {
    this.answerContent = event.html;
  }
}
