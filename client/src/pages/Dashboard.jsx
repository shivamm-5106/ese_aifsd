import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Search, Briefcase, Award, TrendingUp, Trash2 } from 'lucide-react';
import clsx from 'clsx';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchEmployees = async (searchQuery = '') => {
    try {
      setLoading(true);
      const url = searchQuery 
        ? `/api/employees/search?department=${searchQuery}`
        : `/api/employees`;
        
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setEmployees(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(search);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Employees Directory</h1>
          <p className="text-slate-500 mt-1">Manage and view your organization's talent</p>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by department..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-slate-50 focus:bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : employees.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-2xl border border-slate-100">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase size={32} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-medium text-slate-800">No employees found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or add a new employee.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div key={emp._id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-lg">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-800">{emp.name}</h3>
                    <p className="text-sm text-slate-500">{emp.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(emp._id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Briefcase size={16} className="text-indigo-500" />
                  <span className="font-medium text-slate-700">{emp.department}</span>
                  <span className="text-slate-400">•</span>
                  <span>{emp.experience} yrs exp</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <TrendingUp size={16} className={clsx(
                    "text-emerald-500",
                    emp.performanceScore < 60 ? "text-red-500" : emp.performanceScore < 80 ? "text-amber-500" : ""
                  )} />
                  Score: <span className="font-bold">{emp.performanceScore}/100</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Award size={14} /> Skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {emp.skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
