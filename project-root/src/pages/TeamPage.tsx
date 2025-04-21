// src/pages/TeamPage.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamById, TeamResponse } from "../api/teamApi";

const TeamPage = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const {
    data: team,
    isLoading,
    isError,
  } = useQuery<TeamResponse>({
    queryKey: ["team", teamId],
    queryFn: () => fetchTeamById(teamId!),
    enabled: !!teamId,
  });

  if (isLoading) return <div className="p-4">Загрузка команды...</div>;
  if (isError || !team) return <div className="p-4">Ошибка при загрузке команды</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Команда: {team.name}</h2>
      <p>{team.description}</p>

      <div>
        <h3 className="text-xl font-semibold mb-2">Пользователи:</h3>
        <ul className="space-y-2">
          {team.users.map((user) => (
            <li key={user.id} className="border p-3 rounded bg-white shadow">
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Доски:</h3>
        <ul className="space-y-2">
          {team.boards.map((board) => (
            <li key={board.id} className="border p-3 rounded bg-white shadow">
              <p className="font-semibold">{board.name}</p>
              <p className="text-sm text-muted-foreground">{board.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamPage;
