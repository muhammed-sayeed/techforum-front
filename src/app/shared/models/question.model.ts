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

export interface topTags {
  _id: string;
  name: string;
  description: string;
  image: string | null;
}

export interface relatedTags{
  count: number;
  _id: string;
  name: string;
} 

export interface QuestionResponse {
  questions: Question[];
  topTags: topTags[];
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
