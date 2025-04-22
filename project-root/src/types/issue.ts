// types/issue.ts
export interface Issue {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Backlog" | "InProgress" | "Done";
  assignee: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
  boardName: string;
  boardId: number;
}
