// src/pages/CreateTaskPage.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createIssue } from "../api/issuesApi";
import { fetchUsers, User } from "../api/usersApi";

const CreateTaskPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState<number>(1);
  const [priority, setPriority] = useState("Medium");

  const { data: users, isLoading: loadingUsers, isError: usersError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { mutate: createTask, isPending, isError } = useMutation({
    mutationFn: (newTask: {
      title: string;
      description: string;
      priority: string;
      assigneeId: number;
      boardId: number;
    }) => createIssue(newTask.boardId, newTask),

    onSuccess: () => {
      alert("Задача создана успешно!");
      navigate(`/board/${boardId}`);
    },

    onError: () => {
      alert("Ошибка при создании задачи");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createTask({
      title,
      description,
      priority,
      assigneeId,
      boardId: Number(boardId),
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Создать новую задачу</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Название"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Описание"
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Исполнитель */}
        <div>
          <label className="font-medium block mb-1">Исполнитель:</label>
          {loadingUsers ? (
            <p>Загрузка пользователей...</p>
          ) : usersError || !Array.isArray(users) ? (
            <p className="text-red-500">Ошибка при загрузке пользователей</p>
          ) : (
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName} ({user.email})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Приоритет */}
        <div>
          <label className="font-medium block mb-1">Приоритет:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isPending ? "Создание..." : "Создать задачу"}
        </button>
      </form>

      {isError && <p className="text-red-500 mt-2">Ошибка при создании задачи</p>}
    </div>
  );
};

export default CreateTaskPage;
