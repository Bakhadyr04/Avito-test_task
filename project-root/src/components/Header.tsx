import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b px-6 py-3 bg-white shadow-sm">
      <div className="space-x-4">
        <Link to="/issues" className="text-blue-600 hover:underline">
          Все задачи
        </Link>
        <Link to="/boards" className="text-blue-600 hover:underline">
          Проекты
        </Link>
      </div>
      <Button variant="default">Создать задачу</Button>
    </header>
  );
};

export default Header;
