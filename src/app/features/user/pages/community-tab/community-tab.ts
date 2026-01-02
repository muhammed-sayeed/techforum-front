import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../core/services/user-service';
import { RouterModule } from '@angular/router';

import { Community } from '../../../../shared/models/communityResponse';

@Component({
  selector: 'app-community-tab',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './community-tab.html',
  styleUrl: './community-tab.css',
})
export class CommunityTab implements OnInit{

communities = signal<Community[]>([]);
loading = signal(true);

  constructor(
    private userservice: UserService
  ){}
  
  ngOnInit(): void {
    this.getList()
  }
  getList(){
    this.userservice.getcommunityList().subscribe({
      next: res => {
        this.communities.set(res.community);
        this.loading.set(false);
      },
      error: err => console.error(err)
    })
  }
}
