export interface User {
  id: number;
  fullName: string;
  email: string;
  description: string;
  avatarUrl: string;
  teamId: number;
  teamName: string;
  tasksCount: number;
}

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:8080/api/v1/users");
  if (!res.ok) throw new Error("Ошибка при загрузке пользователей");

  const json = await res.json();
  return json.data; // <-- это главное!
};
