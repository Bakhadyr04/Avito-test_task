import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "../api/teamsApi";
import { Link } from "react-router-dom";
import { TeamSummary } from "../types/team";

const TeamsPage = () => {
  const { data: teams, isLoading, isError } = useQuery<TeamSummary[]>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  if (isLoading) return <div className="p-4">Загрузка команд...</div>;
  if (isError || !teams) return <div className="p-4">Ошибка при загрузке команд</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Список команд</h2>
      <div className="grid grid-cols-2 gap-4">
        {teams.map((team) => (
          <Link
            key={team.id}
            to={`/team/${team.id}`}
            className="block p-4 border rounded bg-white hover:bg-muted transition"
          >
            <h3 className="text-lg font-semibold">{team.name}</h3>
            <p className="text-sm text-muted-foreground">{team.description}</p>
            <p className="text-sm text-muted-foreground">
              Пользователей: {team.usersCount} | Досок: {team.boardsCount}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
