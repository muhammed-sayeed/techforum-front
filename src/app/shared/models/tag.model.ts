export interface Tag {
  _id: string;
  name: string;
  description: string;
  totalQuestions: number;
  lastWeekQuestions: number;  
  image: string | null;
  point: number;
  __v: number;
}

export interface TagListResponse {
  tags: Tag[];
  total: number;     
  page: number;
  pageSize: number;
}
