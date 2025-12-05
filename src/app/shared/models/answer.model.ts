export interface AnswerUser {
  _id: string;
  username: string;
  email: string;
  image?: string;
}

export interface Answer {
  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  user: AnswerUser;
  question: string;
}

export interface AddAnswerResponse {
  success: boolean;
  answer: Answer;
}
