// src/components/TaskModal.tsx
import { useState, useEffect } from "react";
import { Issue } from "../types/issue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/Textarea"; // Подключаем компонент Textarea

type Props = {
  onClose: () => void;
  onSubmit: (issue: Omit<Issue, "id">) => void;
  existingIssue?: Issue;
};

const TaskModal = ({ onClose, onSubmit, existingIssue }: Props) => {
    const storageKey = "task_draft";
  
    // Если existingIssue передано, используем его значения, если нет — пустые строки
    const [title, setTitle] = useState(existingIssue?.subject || "");
    const [description, setDescription] = useState(existingIssue?.description || "");
    const [status, setStatus] = useState(existingIssue?.status || "Open");
  
    useEffect(() => {
      const savedDraft = localStorage.getItem(storageKey);
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        setTitle(draft.title || "");
        setDescription(draft.description || "");
        setStatus(draft.status || "Open");
      }
    }, []);
  
    useEffect(() => {
      const draft = { title, description, status };
      localStorage.setItem(storageKey, JSON.stringify(draft));
    }, [title, description, status]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (existingIssue) {
        // Обновление существующей задачи
        onSubmit({
          subject: title,
          description,
          status,
          boardId: existingIssue.boardId,
        });
      } else {
        // Создание новой задачи
        onSubmit({
          subject: title,
          description,
          status,
          boardId: 0, // Доска будет задана извне
        });
      }
      localStorage.removeItem(storageKey);
      onClose();
    };
  
    return (
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4"
        >
          <h2 className="text-xl font-bold">
            {existingIssue ? "Редактировать задачу" : "Новая задача"}
          </h2>
          <Input
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="w-full border rounded-md p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Open</option>
            <option>Closed</option>
            <option>New</option>
            <option>In Progress</option>
            <option>Rejected</option>
          </select>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">{existingIssue ? "Сохранить" : "Создать"}</Button>
          </div>
        </form>
      </div>
    );
  };
  
  export default TaskModal;
  