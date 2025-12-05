export interface UserMini {
  _id: string;
  username: string;
}

export interface Question {
  _id: string;
  titlehtml: string;
  body: string;
  answer: any[]; 
  tags: any[];
  upvoteCount: number;
  downvoteCount: number;
  createdAt: string;
  user: UserMini;
}

export interface QuestionResponse {
  questions: Question[];
}

export interface CreateQuestionRequest {
  CHtml: string;
  editorContent: string;
  tags: string[]; 
}

export interface CreateQuestionResponse {
  success: boolean;
//   message: string;
}
