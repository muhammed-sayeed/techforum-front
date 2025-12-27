import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserService } from '../../../../core/services/user-service';

type ProfileTab = 'questions' | 'answers' | 'articles';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  user = signal<any | null>(null);
  activeTab = signal<ProfileTab>('questions');

  constructor(
    private userservice: UserService
  ){}

  ngOnInit() {
    this.getProfileData()
  }

  getProfileData(){
    this.userservice.getProfile().subscribe(res =>{
      this.user.set(res.profile);
    })
  }

  stripHtml(html: string = ''): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

truncate(text: string, limit = 120): string {
  if (!text) return '';
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}

  setTab(tab: ProfileTab) {
    this.activeTab.set(tab);
  }
}
