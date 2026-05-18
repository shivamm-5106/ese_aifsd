import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BrainCircuit, Sparkles, TrendingUp, AlertCircle, Medal } from 'lucide-react';
import clsx from 'clsx';

const AIRecommendation = () => {
  const [recommendationData, setRecommendationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.post(
        '/api/ai/recommend',
        {}, // Empty body to get recommendations for all employees
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setRecommendationData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch AI recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-purple-900 opacity-20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <BrainCircuit size={28} className="text-indigo-100" />
              </div>
              <span className="uppercase tracking-widest text-sm font-semibold text-indigo-100">AI Powered Insights</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Smart Employee <br />Recommendations
            </h1>
            <p className="text-indigo-100 max-w-xl text-lg">
              Leverage advanced artificial intelligence to analyze performance metrics, identify skill gaps, and generate actionable improvement plans for your team.
            </p>
          </div>
          
          <button
            onClick={fetchRecommendations}
            disabled={loading}
            className="shrink-0 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-700"></div>
                Analyzing Data...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Insights
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {recommendationData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-lg">
                <TrendingUp size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Overall Recommendation</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {recommendationData.recommendation}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-100 text-amber-600 p-2.5 rounded-lg">
                <BrainCircuit size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Improvement Plan</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {recommendationData.improvement}
            </p>
          </div>

          {recommendationData.ranking && recommendationData.ranking.length > 0 && (
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 text-purple-600 p-2.5 rounded-lg">
                  <Medal size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Performance Ranking</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-sm font-semibold uppercase tracking-wider">
                      <th className="pb-3 px-4">Rank</th>
                      <th className="pb-3 px-4">Employee Name</th>
                      <th className="pb-3 px-4 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recommendationData.ranking.map((emp, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <span className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                            i === 0 ? "bg-amber-100 text-amber-700" :
                            i === 1 ? "bg-slate-200 text-slate-700" :
                            i === 2 ? "bg-orange-100 text-orange-700" :
                            "bg-slate-50 text-slate-500"
                          )}>
                            #{emp.rank || i + 1}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-medium text-slate-800">{emp.name}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full text-sm">
                            {emp.score}/100
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;
