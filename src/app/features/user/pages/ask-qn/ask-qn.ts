import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { UserService } from '../../../../core/services/user-service';
import { TagDetail } from '../../../../shared/models/tags.model';

@Component({
  selector: 'app-ask-qn',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './ask-qn.html',
  styleUrls: ['./ask-qn.css']
})
export class AskQn implements OnDestroy {
  title = signal('');
  body = signal('');
  tagInput = signal('');
  selectedTags = signal<TagDetail[]>([]);
  suggestedTags = signal<TagDetail[]>([]);
  isLoadingTags = signal(false);
  
  // Sidebar accordion states
  summarizeExpanded = signal(true);
  describeExpanded = signal(false);
  showCodeExpanded = signal(false);

  titleError = signal('');
  bodyError = signal('');
  tagsError = signal('');

  // Subject for debouncing tag search
  private tagSearchSubject = new Subject<string>();

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    // Set up debounced tag search
    this.tagSearchSubject.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only search if value changed
      switchMap(query => {
        if (query.trim().length < 2) {
          // Don't search for very short queries
          this.suggestedTags.set([]);
          return [];
        }
        
        this.isLoadingTags.set(true);
        return this.userService.searchTags(query);
      })
    ).subscribe({
      next: (response: any) => {
        this.isLoadingTags.set(false);
        // Filter out already selected tags
        const filtered = response.tagdetails.filter((tag: TagDetail) =>
          !this.selectedTags().some(selected => selected.name === tag.name)
        );
        this.suggestedTags.set(filtered);
        console.log('tag', this.suggestedTags)
      },
      error: (err) => {
        console.error('Error searching tags:', err);
        this.isLoadingTags.set(false);
        this.suggestedTags.set([]);
      }
    });
  }

  ngOnDestroy() {
    this.tagSearchSubject.complete();
  }

  onTitleChange(value: string) {
    this.title.set(value);
    if (value.length < 15) {
      this.titleError.set('Title must be at least 15 characters');
    } else {
      this.titleError.set('');
    }
  }

  onBodyChange(content: any) {
    const text = content.text?.trim() || '';
    this.body.set(content.html);
    
    if (text.length < 220) {
      this.bodyError.set(`Body must be at least 220 characters (currently ${text.length})`);
    } else {
      this.bodyError.set('');
    }
  }

  onTagInputChange(value: string) {
    this.tagInput.set(value);
    
    // Trigger debounced search
    this.tagSearchSubject.next(value);
  }

  addTag(tag: TagDetail) {
    if (this.selectedTags().length < 5 && !this.selectedTags().some(t => t.name === tag.name)) {
      this.selectedTags.set([...this.selectedTags(), tag]);
      this.tagInput.set('');
      this.suggestedTags.set([]);
      this.tagsError.set('');
    }
  }

  removeTag(tag: TagDetail) {
    this.selectedTags.set(this.selectedTags().filter(t => t.name !== tag.name));
  }

  onTagInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = this.tagInput().trim();
      
      if (value && this.selectedTags().length < 5) {
        // Add first suggestion or create new tag
        if (this.suggestedTags().length > 0) {
          this.addTag(this.suggestedTags()[0]);
        } else {
          this.addTag({
            name: value,
            _id: '',
            description: ''
          });
        }
      }
    }
  }

  toggleSummarize() {
    this.summarizeExpanded.set(!this.summarizeExpanded());
  }

  toggleDescribe() {
    this.describeExpanded.set(!this.describeExpanded());
  }

  toggleShowCode() {
    this.showCodeExpanded.set(!this.showCodeExpanded());
  }

  validateForm(): boolean {
    let isValid = true;

    if (this.title().length < 15) {
      this.titleError.set('Title must be at least 15 characters');
      isValid = false;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.body();
    const textLength = tempDiv.textContent?.trim().length || 0;
    
    if (textLength < 220) {
      this.bodyError.set('Body must be at least 220 characters');
      isValid = false;
    }

    if (this.selectedTags().length === 0) {
      this.tagsError.set('Please add at least one tag');
      isValid = false;
    }

    return isValid;
  }

 submitQuestion() {
  if (this.validateForm()) {

    const tagIds = this.selectedTags().map(tag => tag._id);

    const questionData = {
      CHtml: this.title(),          // title HTML
      editorContent: this.body(),   // body HTML
      tags: tagIds                  // only IDs
    };

    this.userService.createQuestion(questionData).subscribe({
      next: (res) => {
        console.log("Question posted:", res);
        alert("Your question has been posted!");
        this.router.navigate(['/user/home']);
      },
      error: (err) => {
        console.error("Error posting question:", err);
        alert("Failed to post question");
      }
    });
  }
}

  discardQuestion() {
    if (confirm('Are you sure you want to discard this question?')) {
      this.router.navigate(['/user/home']);
    }
  }
}