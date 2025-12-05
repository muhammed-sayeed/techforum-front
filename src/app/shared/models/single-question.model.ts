export interface TagDetail {
  _id: string;
  name: string;
  description: string;
  image: string;
  point: number;
  __v: number;
}

export interface UserDetail {
  _id: string;
  username: string;
  phone?: number;
  email: string;
  image: string;
  bio?: string;
  education?: string;
  place?: string;
  work?: string;
  qncount?: number;
}

export interface Question {
  _id: string;
  title: string;
  titlehtml: string;
  body: string;
  user: UserDetail;
  tags: TagDetail[];
  answer: any[];
  upvote: string[];
  downvote: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SingleQuestionResponse {
  qn: Question;
  activity: string;
}
