// src/pages/BoardDetailsPage.tsx
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchIssuesByBoardId, updateTaskStatus } from "../api/issuesApi";
import { Issue } from "../types/issue";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import TaskDrawer from "../components/TaskDrawer";

const statusList = ["Backlog", "InProgress", "Done"];

const BoardDetailsPage = () => {
  const { boardId } = useParams();
  const queryClient = useQueryClient();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Issue | null>(null);

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<Issue[]>({
    queryKey: ["boardTasks", boardId],
    queryFn: () => fetchIssuesByBoardId(boardId!),
    enabled: !!boardId,
  });

  const { mutate: moveTask } = useMutation({
    mutationFn: ({ taskId, status }: { taskId: number; status: string }) =>
      updateTaskStatus(taskId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boardTasks", boardId] });
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const taskId = Number(draggableId);
    const newStatus = destination.droppableId;
    moveTask({ taskId, status: newStatus });
  };

  const openEdit = (task: Issue) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  if (isLoading) return <div className="p-4">Загрузка задач...</div>;
  if (isError || !tasks) return <div className="p-4 text-red-600">Ошибка загрузки задач</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Задачи на доске #{boardId}</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {statusList.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded p-4 min-h-[300px]"
                >
                  <h3 className="text-lg font-semibold mb-2">{status}</h3>

                  {tasks
                    .filter((t) => t.status === status)
                    .map((task, index) => (
                      <Draggable draggableId={String(task.id)} index={index} key={task.id}>
                        {(provided) => (
                          <div
                            className="bg-white shadow rounded p-3 mb-2 cursor-pointer"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => openEdit(task)}
                          >
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-gray-500">{task.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        boardId={Number(boardId)}
        task={selectedTask}
      />
    </div>
  );
};

export default BoardDetailsPage;
