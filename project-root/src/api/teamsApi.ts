// src/api/teamsApi.ts
export interface Team {
    id: number;
    name: string;
    description: string;
    usersCount: number;
    boardsCount: number;
  }
  
  export const fetchTeams = async (): Promise<Team[]> => {
    const res = await fetch("http://localhost:8080/api/v1/teams");
    if (!res.ok) throw new Error("Ошибка при загрузке команд");
  
    const json = await res.json();
    return json.data; // <-- именно data!
  };
  
  