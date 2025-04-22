import { Issue } from "../types/issue";

// Получение всех задач доски
export const fetchIssuesByBoardId = async (boardId: string): Promise<Issue[]> => {
  const res = await fetch(`http://localhost:8080/api/v1/boards/${boardId}/tasks`);
  if (!res.ok) throw new Error("Ошибка при загрузке задач");

  const json = await res.json();
  return json;
};

// Получение одной задачи по ID
export const fetchTaskById = async (taskId: string): Promise<Issue> => {
  const response = await fetch(`http://localhost:8080/api/v1/tasks/${taskId}`);
  if (!response.ok) throw new Error("Ошибка при загрузке задачи");

  return await response.json();
};

// Создание новой задачи
export const createIssue = async (
  boardId: number,
  data: { title: string; description: string; priority: string; assigneeId: number }
) => {
  const response = await fetch(`http://localhost:8080/api/v1/tasks/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      boardId,
    }),
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании задачи");
  }

  return await response.json();
};

export const updateTask = async (
  taskId: number,
  data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    assigneeId: number; // ← добавлено
  }
) => {
  const response = await fetch(`http://localhost:8080/api/v1/tasks/update/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text(); // лог ошибки от сервера
    console.error("Ошибка при обновлении задачи:", errorText);
    throw new Error("Ошибка при обновлении задачи");
  }

  return await response.json();
};


export const fetchTasksByUserId = async (userId: string) => {
  const res = await fetch(`http://localhost:8080/api/v1/users/${userId}/tasks`);
  if (!res.ok) throw new Error("Ошибка при загрузке задач пользователя");
  return res.json();
};

export const fetchAllTasks = async (): Promise<Issue[]> => {
  const res = await fetch("http://localhost:8080/api/v1/tasks");
  if (!res.ok) throw new Error("Ошибка при загрузке всех задач");

  const json = await res.json();
  return json.data; // 👈 здесь берём именно массив из поля "data"
};

export const deleteTask = async (taskId: number) => {
  const res = await fetch(`http://localhost:8080/api/v1/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Ошибка при удалении задачи:", errorText);
    throw new Error("Ошибка при удалении задачи");
  }

  // не нужно вызывать res.json() после 204
  return true;
};

export const updateTaskStatus = async (taskId: number, data: { status: string }) => {
  const res = await fetch(`http://localhost:8080/api/v1/tasks/updateStatus/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Ошибка при обновлении статуса:", errorText);
    throw new Error("Не удалось обновить статус");
  }

  return await res.json();
};
