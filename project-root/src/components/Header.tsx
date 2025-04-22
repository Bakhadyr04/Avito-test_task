import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-6 py-4 bg-white shadow flex justify-between items-center sticky top-0 z-50">
      <nav className="space-x-6">
        <Link to="/tasks" className="text-blue-600 hover:underline">
          Все задачи
        </Link>
        <Link to="/boards" className="text-blue-600 hover:underline">
          Все доски
        </Link>
      </nav>
    </header>
  );
};

export default Header;
