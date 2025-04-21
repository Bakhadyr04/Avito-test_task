// src/pages/TeamPage.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamById } from "../api/teamApi";
import { TeamResponse } from "../types/team";

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
      <h2 className="text-2xl font-bold mb-4">Команда: {team.name}</h2>
      <p className="text-muted-foreground">{team.description}</p>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2">Пользователи:</h3>
        {team.users && team.users.length > 0 ? (
          <ul className="space-y-2">
            {team.users.map((user) => (
              <li key={user.id} className="p-4 border rounded bg-white">
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm">{user.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Нет пользователей в команде</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2">Доски:</h3>
        {team.boards && team.boards.length > 0 ? (
          <ul className="space-y-2">
            {team.boards.map((board) => (
              <li key={board.id} className="p-4 border rounded bg-white">
                <p className="font-semibold">{board.name}</p>
                <p className="text-sm text-muted-foreground">{board.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Нет досок</p>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
