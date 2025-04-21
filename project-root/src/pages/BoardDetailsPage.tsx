// src/pages/BoardDetailsPage.tsx
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchIssuesByBoardId } from "../api/issuesApi";
import { Issue } from "../types/issue";

const BoardDetailsPage = () => {
  const { boardId } = useParams();

  const {
    data: issues,
    isLoading,
    isError,
  } = useQuery<Issue[]>({
    queryKey: ["issues", boardId],
    queryFn: () => fetchIssuesByBoardId(boardId || ""),
    enabled: !!boardId,
  });

  if (isLoading) return <div className="p-4">Загрузка задач...</div>;
  if (isError || !issues) return <div className="p-4">Ошибка при загрузке задач</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Задачи доски #{boardId}</h2>

      <Link
        to={`/board/${boardId}/create-task`}
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ➕ Добавить задачу
      </Link>

      <div className="grid grid-cols-2 gap-4">
        {issues.map((issue) => (
          <Link
            key={issue.id}
            to={`/task/${issue.id}`}
            className="block p-4 border rounded hover:bg-muted bg-white"
          >
            <h3 className="text-lg font-semibold">{issue.title}</h3>
            <p className="text-sm text-muted-foreground">{issue.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoardDetailsPage;
