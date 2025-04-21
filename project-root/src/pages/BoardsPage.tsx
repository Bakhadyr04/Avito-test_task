// src/pages/BoardsPage.tsx

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBoards, Board } from "../api/boardsApi";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const BoardsPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<Board[], Error>({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (isError || !data) return <div>Ошибка при загрузке</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Проекты</h2>
      {data.map((board) => (
        <Card key={board.id} className="flex items-center justify-between">
          <CardContent className="p-4 font-medium">{board.name}</CardContent>
          <Button variant="outline" className="m-4" onClick={() => navigate(`/board/${board.id}`)}>
            Перейти в доску
          </Button>
        </Card>
      ))}
      <div className="p-4 bg-white text-black dark:bg-zinc-900 dark:text-white rounded-md">
      Это компонент, который выглядит по-разному в светлой и тёмной темах.
      </div>
    </div>
  );
};

export default BoardsPage;
