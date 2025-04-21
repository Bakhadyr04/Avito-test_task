// src/pages/UserTasksPage.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTasksByUserId } from "../api/issuesApi";
import { Issue } from "../types/issue";
import { useState } from "react";

const UserTasksPage = () => {
    const { id } = useParams();
    const [statusFilter, setStatusFilter] = useState("All");

    const {
        data: tasks,
        isLoading,
        isError,
    } = useQuery<Issue[]>({
        queryKey: ["userTasks", id],
        queryFn: () => fetchTasksByUserId(id!),
        enabled: !!id,
    });

    if (isLoading) return <div className="p-4">Загрузка задач...</div>;
    if (isError || !tasks) return <div className="p-4">Ошибка при загрузке задач</div>;

    const filteredTasks = tasks.filter((task) =>
        statusFilter === "All" ? true : task.status === statusFilter
    );

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Задачи пользователя #{id}</h2>

            <div className="mb-4">
                <label className="font-medium mr-2">Фильтр по статусу:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border px-2 py-1 rounded"
                >
                    <option value="All">Все</option>
                    <option value="Backlog">Backlog</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>


            <div className="grid grid-cols-2 gap-4">
                {filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        className="p-4 border rounded bg-white shadow hover:bg-muted transition"
                    >
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p className="text-xs text-muted-foreground">
                            Исполнитель: {task.assignee.fullName} ({task.assignee.email})
                        </p>
                        <p className="text-sm mb-1">{task.description}</p>
                        <p className="text-xs text-muted-foreground">
                            Статус: {task.status} | Приоритет: {task.priority}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Доска: {task.boardName ?? "—"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTasksPage;
