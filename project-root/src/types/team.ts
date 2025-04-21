// src/types/team.ts

export interface TeamUser {
    id: number;
    fullName: string;
    email: string;
    description: string;
    avatarUrl: string;
  }
  
  export interface TeamBoard {
    id: number;
    name: string;
    description: string;
  }
  
  export interface TeamResponse {
    id: number;
    name: string;
    description: string;
    users: TeamUser[];
    boards: TeamBoard[];
  }
  