import { useQuery } from "@tanstack/react-query";
import { fetchUsers, User } from "../api/usersApi";

const UsersPage = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Загрузка пользователей...</div>;
  if (isError || !users) return <div>Ошибка при загрузке пользователей</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Пользователи</h2>
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(users) && users.map((user) => (
          <div key={user.id} className="p-4 border rounded shadow bg-white">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <p className="text-sm mb-1">{user.description}</p>
            <p className="text-sm text-muted-foreground">
              Команда: {user.teamName} | Задач: {user.tasksCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default UsersPage;
