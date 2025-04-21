import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchIssuesByBoardId } from "../api/issuesApi";
import { Issue } from "../types/issue";
import { useState } from "react";

const IssuesPage = () => {
  const { boardId } = useParams();
  const [assigneeFilter, setAssigneeFilter] = useState<number | "Все">("Все");
  const [sortField, setSortField] = useState<"priority" | "status" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    data: issues,
    isLoading,
    isError,
  } = useQuery<Issue[]>({
    queryKey: ["issues", boardId],
    queryFn: () => fetchIssuesByBoardId(boardId || ""),
    enabled: !!boardId,
  });

  if (isLoading) return <div>Загрузка задач...</div>;
  if (isError || !issues) return <div>Ошибка при загрузке задач</div>;

  const assignees = Array.from(
    new Map(issues.map((i) => [i.assignee.id, i.assignee.fullName])).entries()
  );

  const sortIssues = (list: Issue[]) => {
    if (!sortField) return list;
    const sorted = [...list].sort((a, b) => {
      const aVal = a[sortField].toLowerCase();
      const bVal = b[sortField].toLowerCase();
      return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
    return sorted;
  };

  const filtered = issues.filter((issue) =>
    assigneeFilter === "Все" ? true : issue.assignee.id === assigneeFilter
  );

  const sorted = sortIssues(filtered);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold">Задачи доски #{boardId}</h2>

        <div className="flex gap-2">
          <select
            className="p-2 border rounded"
            value={assigneeFilter}
            onChange={(e) =>
              setAssigneeFilter(e.target.value === "Все" ? "Все" : Number(e.target.value))
            }
          >
            <option value="Все">Все исполнители</option>
            {assignees.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded"
            value={sortField}
            onChange={(e) =>
              setSortField(e.target.value === "" ? "" : (e.target.value as "priority" | "status"))
            }
          >
            <option value="">Без сортировки</option>
            <option value="priority">По приоритету</option>
            <option value="status">По статусу</option>
          </select>

          <button
            className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sorted.map((issue) => (
          <Link
            key={issue.id}
            to={`/task/${issue.id}`}
            className="block p-4 border rounded hover:bg-muted bg-white"
          >
            <h3 className="text-lg font-semibold">{issue.title}</h3>
            <p className="text-sm text-muted-foreground">{issue.description}</p>
            <p className="text-xs mt-1">
              <strong>Приоритет:</strong> {issue.priority} • <strong>Статус:</strong> {issue.status}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IssuesPage;
