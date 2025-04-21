// src/api/teamTasksApi.ts

export interface TeamTask {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    boardName: string;
    assignee: {
      fullName: string;
      email: string;
    };
  }
  
  
  export const fetchTeamTasks = async (teamId: string): Promise<TeamTask[]> => {
    const response = await fetch(`http://localhost:8080/api/v1/teams/${teamId}/tasks`);
    if (!response.ok) {
      throw new Error("Ошибка при загрузке задач команды");
    }
    return await response.json();
  };
  