// src/pages/TaskPage.tsx
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTaskById, updateTask } from "../api/issuesApi";
import { Issue } from "../types/issue";
import { useState, useEffect } from "react";

// Тип для обновления задачи
type UpdateTaskPayload = {
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: number;
};

const TaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const queryClient = useQueryClient();

  const {
    data: task,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useQuery<Issue>({
    queryKey: ["task", taskId],
    queryFn: () => fetchTaskById(taskId!),
    enabled: !!taskId,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Backlog");

  useEffect(() => {
    if (task) {
      setTitle(task.title ?? "");
      setDescription(task.description ?? "");
      setStatus(task.status ?? "Backlog");
    }
  }, [task]);

  const {
    mutate: saveTask,
    status: updateStatus,
    isError: isUpdateError,
  } = useMutation<void, Error, UpdateTaskPayload>({
    mutationFn: (updated) => updateTask(Number(taskId), updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      alert("Задача обновлена!");
    },
    onError: () => {
      alert("Ошибка при обновлении задачи");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task) return;

    saveTask({
      title,
      description,
      status,
      priority: "Medium", // можно расширить в будущем
      assigneeId: task.assignee.id, // важно! иначе 400 от сервера
    });
  };

  const isUpdating = updateStatus === "pending";

  if (isTaskLoading) return <div className="p-4">Загрузка задачи...</div>;
  if (isTaskError || !task) return <div className="p-4">Ошибка при загрузке задачи</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white border rounded shadow">
      <h2 className="text-2xl font-bold mb-1">Задача #{task.id}</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Доска: {task.boardName ?? "—"}
      </p>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Исполнитель: {task.assignee.fullName} ({task.assignee.email})
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium block mb-1">Название:</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Описание:</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Статус:</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Backlog">Backlog</option>
            <option value="InProgress">InProgress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={isUpdating}
        >
          {isUpdating ? "Сохраняем..." : "Сохранить"}
        </button>

        {isUpdateError && (
          <p className="text-red-600 text-sm">Ошибка при обновлении задачи</p>
        )}
      </form>
    </div>
  );
};

export default TaskPage;
