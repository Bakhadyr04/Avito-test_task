// src/pages/BoardPage.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchBoards, Board } from "../api/boardsApi";
import { Link } from "react-router-dom";

const BoardPage = () => {
  const {
    data: boards,
    isLoading,
    isError,
  } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (isError || !boards) return <div>Ошибка при получении досок</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Список досок</h2>
      <div className="grid grid-cols-2 gap-4">
        {boards.map((board) => (
          <div key={board.id} className="p-4 border rounded hover:bg-muted">
            <Link to={`/board/${board.id}`}>
              <h3 className="text-lg font-semibold">{board.name}</h3>
              <p>{board.description}</p>
            </Link>
            <Link
              to={`/board/${board.id}/create-task`}
              className="text-sm underline mt-1 block"
            >
              ➕ Добавить задачу
            </Link>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default BoardPage;
