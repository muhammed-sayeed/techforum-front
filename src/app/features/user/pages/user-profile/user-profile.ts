import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type ProfileTab = 'answers' | 'questions' | 'articles';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  user = signal<any | null>(null);
  activeTab = signal<ProfileTab>('answers');

  ngOnInit() {
    // TEMP: replace later with API call
    this.user.set({
      name: 'Muhammed Sayeed',
      role: 'Developer',
      location: 'Edavannappara',
      memberSince: '3 years, 6 months',
      lastSeen: 'this week',
      visits: '101 days, 2 consecutive'
    });
  }

  setTab(tab: ProfileTab) {
    this.activeTab.set(tab);
  }
}
