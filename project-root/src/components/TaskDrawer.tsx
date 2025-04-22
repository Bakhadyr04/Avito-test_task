// src/components/TaskDrawer.tsx
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { createIssue, updateTask } from "../api/issuesApi";
import { Issue } from "../types/issue";

interface TaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  boardId: number;
  task?: Issue | null;
}

export const TaskDrawer: React.FC<TaskDrawerProps> = ({ isOpen, onClose, boardId, task }) => {
  const isEdit = Boolean(task?.id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Backlog");
  const [assigneeId, setAssigneeId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
      setAssigneeId(task.assignee?.id ?? null);
    } else if (isOpen && !task) {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setStatus("Backlog");
      setAssigneeId(null);
    }
  }, [isOpen, task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && task) {
        await updateTask(task.id, {
          title,
          description,
          status,
          priority,
          assigneeId: assigneeId ?? 0,
        });
        alert("Задача обновлена");
      } else {
        await createIssue(boardId, {
          title,
          description,
          priority,
          assigneeId: assigneeId ?? 0,
        });
        alert("Задача создана");
      }

      onClose();
    } catch (err) {
      alert("Ошибка при сохранении задачи");
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEdit ? "Редактирование задачи" : "Создание задачи"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Название:</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Описание:</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Приоритет:</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {isEdit && (
            <div>
              <label className="block font-medium mb-1">Статус:</label>
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
          )}

          <div>
            <label className="block font-medium mb-1">ID исполнителя:</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={assigneeId ?? ""}
              onChange={(e) => setAssigneeId(Number(e.target.value))}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isEdit ? "Сохранить изменения" : "Создать задачу"}
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default TaskDrawer;
