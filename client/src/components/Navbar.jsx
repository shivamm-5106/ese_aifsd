import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BrainCircuit, LogOut, Users, PlusCircle } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                <BrainCircuit size={24} />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">AI<span className="text-indigo-600">HR</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                  <Users size={18} />
                  Employees
                </Link>
                <Link to="/add" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                  <PlusCircle size={18} />
                  Add Employee
                </Link>
                <Link to="/recommend" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                  <BrainCircuit size={18} />
                  AI Insights
                </Link>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Login</Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
