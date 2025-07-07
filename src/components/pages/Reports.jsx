import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { formatCurrency } from '@/utils/currency';
import { reportService } from '@/services/api/reportService';

const Reports = () => {
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('30d');
  
const loadReportData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await reportService.getReports(timeRange);
      setReportData(data);
    } catch (err) {
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadReportData();
  }, [timeRange]);
  
  const pipelineChartOptions = {
    chart: {
      type: 'donut',
      height: 350,
    },
    labels: reportData.pipelineData?.labels || [],
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    legend: {
      position: 'bottom',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  
  const salesChartOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    colors: ['#3B82F6', '#10B981'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: reportData.salesData?.categories || [],
    },
    yaxis: {
      labels: {
        formatter: (value) => formatCurrency(value)
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
  };
  
  const salesSeries = reportData.salesData?.series || [];
  const pipelineSeries = reportData.pipelineData?.series || [];
  
  if (loading) {
    return <Loading type="card" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadReportData} />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Analyze your sales performance and trends</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-32"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </Select>
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Pipeline Distribution</h2>
          <Chart
            options={pipelineChartOptions}
            series={pipelineSeries}
            type="donut"
            height={350}
          />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sales Trend</h2>
          <Chart
            options={salesChartOptions}
            series={salesSeries}
            type="area"
            height={350}
          />
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(reportData.totalRevenue || 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <ApperIcon name="DollarSign" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deals Closed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {reportData.dealsCompleted || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <ApperIcon name="Trophy" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {reportData.conversionRate || 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <ApperIcon name="TrendingUp" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(reportData.avgDealSize || 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <ApperIcon name="Target" className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Reports;