import React,{useState,useEffect} from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';


const StatsCards = () => {

  const [stats, setStats] = useState([
    { title: 'Total Children', value: '0', bgColor: 'bg-[#4A90E2]', textColor: 'text-white' },
    { title: 'Out Of School', value: '0', bgColor: 'bg-[#FFE4CC]', textColor: 'text-[#D97706]' },
    { title: 'Girls', value: '0%', bgColor: 'bg-[#E1F5FE]', textColor: 'text-[#1976D2]' },
    { title: 'Reduced Demand', value: '0', bgColor: 'bg-[#F5F5F5]', textColor: 'text-[#424242]' }
  ])
  const [loading, setLoading] = useState(false)

  const fetchStats = async () => {
  setLoading(true);
  try {
    const response = await axiosInstance.get(API_PATHS.ENTRIES.GET_ALL_ENTRIES);
    const data = Array.isArray(response.data) ? response.data : (response.data?.entries || response.data?.data || []);

    let totalChildren = 0;
    let outOfSchool = 0;
    let totalGirls = 0;

    data.forEach(entry => {
      const children = Number(entry.totalChildren) || 0;
      const outOfSchoolCount = Number(entry.outOfSchoolChildren) || 0;
      const girlsPercentage = Number(entry.girlsPercentage) || 0;

      totalChildren += children;
      outOfSchool += outOfSchoolCount;
      totalGirls += (girlsPercentage / 100) * children;
    });

    const totalBoys = totalChildren - totalGirls;

    const girlsOverallPercentage = totalChildren > 0 ? ((totalGirls / totalChildren) * 100).toFixed(1) : '0';
    const boysOverallPercentage = totalChildren > 0 ? ((totalBoys / totalChildren) * 100).toFixed(1) : '0';

    setStats([
      {
        title: 'Total Children',
        value: totalChildren.toLocaleString(),
        bgColor: 'bg-[#4A90E2]',
        textColor: 'text-white'
      },
      {
        title: 'Out Of School',
        value: outOfSchool.toLocaleString(),
        bgColor: 'bg-[#FFE4CC]',
        textColor: 'text-[#D97706]'
      },
      {
        title: 'Girls (%)',
        value: `${girlsOverallPercentage}%`,
        bgColor: 'bg-[#E1F5FE]',
        textColor: 'text-[#1976D2]'
      },
      {
        title: 'Boys (%)',
        value: `${boysOverallPercentage}%`,
        bgColor: 'bg-[#F5F5F5]',
        textColor: 'text-[#424242]'
      }
    ]);
  } catch (error) {
    console.error('Error fetching stats:', error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchStats()
  }, [])



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-lg p-4 md:p-6 shadow-sm`}
        >
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <h3 className={`text-xs md:text-sm font-medium ${stat.textColor}`}>
              {stat.title}
            </h3>
          </div>
          <div className={`text-2xl md:text-3xl font-bold ${stat.textColor}`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
