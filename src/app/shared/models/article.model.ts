export interface ArticleResponse {
  Art: Article;
}

export interface Article {
  _id: string;
  title: string;
  titlehtml: string;
  body: string;
  createdAt: string;
  user: Author;
  likes?: string[]; // optional (future-ready)
}

export interface Author {
  _id: string;
  username: string;
  image: string;
}