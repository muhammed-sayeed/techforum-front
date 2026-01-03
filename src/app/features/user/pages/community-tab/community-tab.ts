import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../core/services/user-service';
import { RouterModule } from '@angular/router';

import { CommunityUI } from '../../../../shared/models/communityResponse';

@Component({
  selector: 'app-community-tab',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './community-tab.html',
  styleUrl: './community-tab.css',
})
export class CommunityTab implements OnInit{

communities = signal<CommunityUI[]>([]);
loading = signal(true);

  constructor(
    private userservice: UserService
  ){}
  
  ngOnInit(): void {
    this.getList()
  }
  getList() {
  this.userservice.getcommunityList().subscribe({
    next: (res) => {
      this.communities.set(
        res.data.map(c => ({
          ...c,
          joinLoading: false
        }))
      );
      this.loading.set(false);
    },
    error: (err) => {
      console.error(err);
      this.loading.set(false);
    }
  });
}

private resetJoinLoading(id: string) {
  this.communities.update(list =>
    list.map(item =>
      item._id === id
        ? { ...item, joinLoading: false }
        : item
    )
  );
}


joinCommunity(c: CommunityUI) {
  if (c.isMember || c.joinLoading) return;

  // 1️⃣ set loading = true (signal-safe)
  this.communities.update(list =>
    list.map(item =>
      item._id === c._id
        ? { ...item, joinLoading: true }
        : item
    )
  );

  // 2️⃣ API call
  this.userservice.joinCommunity(c._id).subscribe({
    next: (res: { success: boolean }) => {
      if (res.success) {
        this.communities.update(list =>
          list.map(item =>
            item._id === c._id
              ? { ...item, isMember: true, joinLoading: false }
              : item
          )
        );
      } else {
        this.resetJoinLoading(c._id);
      }
    },
    error: () => {
      this.resetJoinLoading(c._id);
    }
  });
}

getRandomColor() {
  const colors = ['#8a7d3b', '#C9C47D', '#16a34a', '#4BCBE2'];
  return colors[Math.floor(Math.random() * colors.length)];
}

}
