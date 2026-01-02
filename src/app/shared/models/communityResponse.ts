export interface CommunityResponse {
  community: Community[];
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
}