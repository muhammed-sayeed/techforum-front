import { Component, viewChild, ViewChild, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';

import { UserService } from '../../../../core/services/user-service';

@Component({
  selector: 'app-single-qn',
  imports: [CommonModule, QuillModule, RouterModule],
  templateUrl: './single-qn.html',
  styleUrl: './single-qn.css',
})
export class SingleQn {
  question = signal<any>(null);
  answers = signal<any[]>([]);
  voteLoading = signal<boolean>(false);
  answervoteLoading = signal<boolean>(false);

  @ViewChild(QuillEditorComponent) editor!: QuillEditorComponent;

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
       if (this.editor && this.editor.quillEditor) {
            this.editor.quillEditor.setText('');  // clears completely
          }
    }
  },
  error: () => alert("Error submitting answer")
});
}

vote(type: 'up' | 'down') {
  if (this.voteLoading()) return;

  const q = this.question();
  if (!q) return;

  this.voteLoading.set(true);

  this.userservice.voteQuestion(q._id, type).subscribe({
    next: (res) => {
      if (res.success) {
        // IMPORTANT: create NEW object for signal
        this.question.set({
          ...q,
          upvoted: res.voteStatus.upvoted,
          downvoted: res.voteStatus.downvoted,
          upvote: new Array(res.counts.upvotes),
          downvote: new Array(res.counts.downvotes)
        });
      }
      this.voteLoading.set(false);
    },
    error: () => {
      this.voteLoading.set(false);
    }
  });
}

voteAnswer(ans: any, vote: 'up' | 'down') {
  // block only if THIS answer is loading
  if (this.answervoteLoading() === ans._id) return;

  this.answervoteLoading.set(ans._id);

  this.userservice.voteAnswer(ans._id, vote).subscribe({
    next: (res) => {
      if (res.success) {
        this.answers.update(list =>
          list.map(a =>
            a._id === ans._id
              ? {
                  ...a,
                  upvoted: res.voteStatus.upvoted,
                  downvoted: res.voteStatus.downvoted,
                  upvote: new Array(res.counts.upvotes),
                  downvote: new Array(res.counts.downvotes)
                }
              : a
          )
        );
      }
      this.answervoteLoading.set(false);
    },
    error: () => {
      this.answervoteLoading.set(false);
    }
  });
};

  onAnswerChanged(event: any) {
    this.answerContent = event.html;
  }
}
