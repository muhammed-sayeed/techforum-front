export interface CommunityResponse {
  success: boolean;
  data: Community[];
}

export interface Community {
  _id: string;
  name: string;
  image: string;
  description: string;
  admins: string[];
  users: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isMember: boolean; 
}

export interface CommunityUI extends Community {
  joinLoading: boolean;
}
