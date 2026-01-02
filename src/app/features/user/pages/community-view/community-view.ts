import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/user-service';
import { Article, Question } from '../../../../shared/models/community-details';

type CommunityTab = 'overview' | 'questions' | 'articles' | 'discussions';

@Component({
  selector: 'app-community-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './community-view.html',
  styleUrl: './community-view.css',
})
export class CommunityView implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private userservice: UserService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCommunitydetails(id!);
  }

  activeTab = signal<CommunityTab>('questions');
  loading = signal(true); 

  community = signal<any | null>(null);
  questions = signal<Question[]>([]);
  articles = signal<Article[]>([]);
  isMember = signal(false);

  setTab(tab: CommunityTab){
    this.activeTab.set(tab);
  }

  getCommunitydetails(id: string){
    this.userservice.getCommunityDetails(id).subscribe({
      next: res => {
        this.community.set(res.community);
        this.questions.set(res.questions || []);
        this.articles.set(res.visibleArt || []);
        this.loading.set(false);
        this.isMember.set(res.isMember);
      },
      error: err => console.error(err)
    })
  }
 
  stripHtml(html = ''): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  truncate(text: string, limit = 100): string {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }

}
