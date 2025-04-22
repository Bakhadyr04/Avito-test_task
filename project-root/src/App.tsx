// src/App.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import IssuesPage from './pages/IssuesPage';
import TaskPage from './pages/TaskPage';
import TasksPage from "./pages/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import BoardDetailsPage from "./pages/BoardDetailsPage";
import UsersPage from './pages/UsersPage';
import TeamsPage from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";
import TeamTasksPage from "./pages/TeamTasksPage";
import UserTasksPage from "./pages/UserTasksPage";
import TeamBoardsPage from "./pages/TeamBoardsPage";

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <button onClick={toggleTheme} className="absolute top-4 right-4 px-4 py-2 border rounded">
        {theme === 'light' ? '🌙 Темная тема' : '🌞 Светлая тема'}
      </button>

      {/* ✅ БЕЗ BrowserRouter здесь */}
      <Routes>
        <Route path="/" element={<Navigate to="/boards" />} />
        <Route path="/boards" element={<BoardPage />} />
        <Route path="/board/:boardId" element={<BoardPage />} />
        <Route path="/board/:boardId/create-task" element={<CreateTaskPage />} />
        <Route path="/board/:boardId" element={<BoardDetailsPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/task/:taskId" element={<TaskPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/team/:teamId" element={<TeamPage />} />
        <Route path="/team/:teamId/tasks" element={<TeamTasksPage />} />
        <Route path="/users/:id/tasks" element={<UserTasksPage />} />
        <Route path="/team/:teamId/boards" element={<TeamBoardsPage />} />
      </Routes>
    </div>
  );
}

export default App;
