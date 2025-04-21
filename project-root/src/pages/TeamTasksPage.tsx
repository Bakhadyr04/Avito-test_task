import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamTasks, TeamTask } from "../api/teamTasksApi";

const TeamTasksPage = () => {
    const { teamId } = useParams<{ teamId: string }>();

    const {
        data: tasks,
        isLoading,
        isError,
    } = useQuery<TeamTask[]>({
        queryKey: ["teamTasks", teamId],
        queryFn: () => fetchTeamTasks(teamId!),
        enabled: !!teamId,
    });

    if (isLoading) return <div className="p-4">Загрузка задач команды...</div>;
    if (isError || !tasks) return <div className="p-4">Ошибка при загрузке задач</div>;

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Задачи команды #{teamId}</h2>
            <div className="grid grid-cols-2 gap-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="p-4 border rounded bg-white shadow hover:bg-muted transition"
                    >
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p className="text-sm mb-1">{task.description}</p>
                        <p className="text-xs text-muted-foreground">
                            Статус: {task.status} | Приоритет: {task.priority}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Доска: {task.boardName ?? "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Исполнитель: {task.assignee.fullName} ({task.assignee.email})
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamTasksPage;
