// api/teamsApi.ts
import { TeamSummary } from "../types/team";

export const fetchTeams = async (): Promise<TeamSummary[]> => {
  const res = await fetch("http://localhost:8080/api/v1/teams");
  if (!res.ok) throw new Error("Ошибка при получении команд");
  return res.json();
};
