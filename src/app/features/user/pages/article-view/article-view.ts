import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user-service';
import { Article } from '../../../../shared/models/article.model';

@Component({
  selector: 'app-article-view',
  imports: [RouterModule, CommonModule],
  templateUrl: './article-view.html',
  styleUrl: './article-view.css',
})
export class ArticleView implements OnInit{

  article = signal<Article | null>(null);
  liked = signal(false);
  likeCount = signal(0);

 constructor(
  private userservice: UserService,
  private router: ActivatedRoute
 ){}

 ngOnInit(): void {
   const Id = this.router.snapshot.paramMap.get('id')
   this.getArticle(Id!)
 }

 getArticle(id: string){
  this.userservice.getArticle(id).subscribe({
    next: res =>{
      this.article.set(res.Art);
      this.likeCount.set(res.Art.likes?.length || 0);
    },
    error: err => console.error(err)
  })
 }
 toggleLike() {
    this.liked.update(v => !v);
    this.likeCount.update(c => this.liked() ? c + 1 : c - 1);

    // 🔜 later: call backend API here
  }
}
