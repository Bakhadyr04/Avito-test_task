// src/api/teamApi.ts

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
  
  export const fetchTeamById = async (teamId: string): Promise<TeamResponse> => {
    const res = await fetch(`http://localhost:8080/api/v1/teams/${teamId}`);
    if (!res.ok) throw new Error("Ошибка при загрузке команды");
    return res.json();
  }

  export const fetchTeamTasks = async (teamId: string) => {
    const res = await fetch(`http://localhost:8080/api/v1/teams/${teamId}/tasks`);
    if (!res.ok) throw new Error("Ошибка при загрузке задач команды");
    return res.json();
  }
  
  