export interface Tag {
  _id: string;
  name: string;
  description: string;
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
