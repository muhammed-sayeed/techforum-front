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