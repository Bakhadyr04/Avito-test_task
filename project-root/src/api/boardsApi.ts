// src/api/boardsApi.ts
export interface Board {
  id: number;
  name: string;
  description: string;
}

interface BoardResponse {
  data: Board[];
}

export const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch("http://localhost:8080/api/v1/boards");

  if (!response.ok) {
    throw new Error("Ошибка при получении досок");
  }

  const json: BoardResponse = await response.json();
  return json.data; // <-- правильно достаем массив
};
