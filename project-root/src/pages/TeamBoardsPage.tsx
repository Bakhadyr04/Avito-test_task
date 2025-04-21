// src/pages/TeamBoardsPage.tsx
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamById } from "../api/teamApi";
import { TeamResponse } from "../api/teamApi";

const TeamBoardsPage = () => {
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

    if (isLoading) return <div className="p-4">Загрузка досок команды...</div>;
    if (isError || !team) return <div className="p-4">Ошибка при загрузке</div>;

    return (
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Доски команды <span className="text-blue-600">#{team.name}</span>
            </h2>
            <Link
              to="/teams"
              className="text-sm text-blue-600 hover:underline"
            >
              ← Назад к списку команд
            </Link>
          </div>
      
          <div className="grid grid-cols-2 gap-4">
            {Array.isArray(team.boards) && team.boards.length > 0 ? (
              team.boards.map((board) => (
                <Link
                  key={board.id}
                  to={`/board/${board.id}`}
                  className="block p-4 border rounded hover:bg-muted bg-white shadow"
                >
                  <h3 className="text-lg font-semibold">{board.name}</h3>
                  <p className="text-sm text-muted-foreground">{board.description}</p>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground">Нет доступных досок.</p>
            )}
          </div>
        </div>
      );
    };      

export default TeamBoardsPage;
