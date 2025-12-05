import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';

import { UserService } from '../../../../core/services/user-service';
import { Tag, TagListResponse } from '../../../../shared/models/tag.model';

@Component({
  selector: 'app-tags',
  imports: [CommonModule, RouterModule],
  templateUrl: './tags.html',
  styleUrl: './tags.css',
})
export class Tags implements OnInit{

  // state
  tags      = signal<Tag[]>([]);
  total     = signal(0);
  page      = signal(1);
  pageSize  = signal(20);

  searchTerm = signal('');
  sortMode   = signal<'popular' | 'name' | 'new'>('popular');

  isLoading = signal(false);

  // for debounce search
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Debounced search
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(term => {
        this.searchTerm.set(term);
        this.page.set(1);        // always go back to page 1 on new search
        this.loadTags();
      });

    this.loadTags();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTags(): void {
    this.isLoading.set(true);

    this.userService.getTags({
      page: this.page(),
      pageSize: this.pageSize(),
      search: this.searchTerm()
    }).subscribe({
      next: (res: TagListResponse) => {
        this.tags.set(res.tags);
        this.total.set(res.total);
        this.page.set(res.page);
        this.pageSize.set(res.pageSize);
        this.isLoading.set(false);
      },
      error: err => {
        console.error('Error loading tags', err);
        this.isLoading.set(false);
      }
    });
  }

  // UI handlers
  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  changeSort(mode: 'popular' | 'name' | 'new') {
    if (this.sortMode() === mode) return;
    this.sortMode.set(mode);
    this.page.set(1);
    this.loadTags();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total() / this.pageSize()));
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.loadTags();
    }
  }

  nextPage() {
    if (this.page() < this.totalPages) {
      this.page.update(p => p + 1);
      this.loadTags();
    }
  }
}
