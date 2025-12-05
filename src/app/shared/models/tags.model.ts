export interface TagDetail {
  _id: string;
  name: string;
  description: string;
}

export interface TagResponse {
  success: boolean;
  tagdetails: TagDetail[];
}
