import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAllTasks } from "../api/issuesApi";
import { Issue } from "../types/issue";
import TaskDrawer from "../components/TaskDrawer";

const TasksPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Issue | null>(null);

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<Issue[]>({
    queryKey: ["allTasks"],
    queryFn: fetchAllTasks,
  });

  const handleOpenDrawer = (task?: Issue) => {
    setSelectedTask(task || null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTask(null);
  };

  if (isLoading) return <div className="p-4">Загрузка...</div>;
  if (isError || !tasks) return <div className="p-4">Ошибка при загрузке задач</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Все задачи</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => handleOpenDrawer()}
        >
          + Создать задачу
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => handleOpenDrawer(task)}
          >
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-gray-500">{task.description}</p>
            <p className="text-xs text-gray-400">Доска: {task.boardName}</p>
          </div>
        ))}
      </div>

      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        boardId={selectedTask?.boardId ?? 0}
        task={selectedTask}
      />
    </div>
  );
};

export default TasksPage;
