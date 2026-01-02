export interface CommunityDetailsResponse {
  community: Community;
  questions: Question[];
  visibleArt: Article[];
  isMember: boolean;
}

export interface Community {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export interface Question {
  _id: string;
  titlehtml: string;
  body: string;
  createdAt: string;
  tags: string[];
}

export interface Article {
  _id: string;
  title: string;
  titlehtml: string;
  body: string;
  createdAt: string;
}