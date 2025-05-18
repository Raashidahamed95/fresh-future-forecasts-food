
import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import PredictionChart from '@/components/PredictionChart';

const dummyForecastData = [
  { name: 'Jan', actual: 4000, predicted: 4200 },
  { name: 'Feb', actual: 3000, predicted: 3100 },
  { name: 'Mar', actual: 5000, predicted: 4800 },
  { name: 'Apr', actual: 2780, predicted: 2900 },
  { name: 'May', actual: 1890, predicted: 2000 },
  { name: 'Jun', actual: 2390, predicted: 2500 },
  { name: 'Jul', predicted: 3490 },
  { name: 'Aug', predicted: 4000 },
  { name: 'Sep', predicted: 4500 },
  { name: 'Oct', predicted: 3800 },
  { name: 'Nov', predicted: 3200 },
  { name: 'Dec', predicted: 4100 }
];

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Supply Chain Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your food supply chain performance and forecasts
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Inventory Turnover" 
          value="8.3x"
          icon="cyclone"
          description="Annual average"
          trend="up"
          trendValue="12% vs. last year"
        />
        <DashboardCard 
          title="On-Time Delivery" 
          value="94.2%"
          icon="local_shipping"
          description="Last 30 days"
          trend="up"
          trendValue="3.1% vs. previous period"
        />
        <DashboardCard 
          title="Spoilage Rate" 
          value="2.8%"
          icon="delete"
          description="Last 30 days"
          trend="down"
          trendValue="1.5% vs. previous period"
        />
        <DashboardCard 
          title="Forecast Accuracy" 
          value="87.5%"
          icon="analytics"
          description="Previous predictions"
          trend="neutral"
          trendValue="0.2% vs. previous model"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PredictionChart 
          data={dummyForecastData}
          title="Demand Forecast"
          description="Actual vs. Predicted Demand (in tons)"
        />
        
        <PredictionChart 
          data={[
            { name: 'Week 1', actual: 420, predicted: 430 },
            { name: 'Week 2', actual: 380, predicted: 390 },
            { name: 'Week 3', actual: 430, predicted: 410 },
            { name: 'Week 4', actual: 380, predicted: 390 },
            { name: 'Week 5', predicted: 420 },
            { name: 'Week 6', predicted: 450 },
            { name: 'Week 7', predicted: 430 },
            { name: 'Week 8', predicted: 410 },
          ]}
          title="Inventory Forecast"
          description="Projected Inventory Levels (in tons)"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Risk Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <span className="material-icons-outlined text-red-600 mr-2">warning</span>
              <h3 className="font-medium">High Risk</h3>
            </div>
            <p className="text-sm text-gray-600">
              Possible supplier disruption for apples due to weather conditions
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="flex items-center mb-2">
              <span className="material-icons-outlined text-yellow-600 mr-2">error_outline</span>
              <h3 className="font-medium">Medium Risk</h3>
            </div>
            <p className="text-sm text-gray-600">
              Potential transport delays on Route A during next week
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <span className="material-icons-outlined text-green-600 mr-2">check_circle</span>
              <h3 className="font-medium">Low Risk</h3>
            </div>
            <p className="text-sm text-gray-600">
              All other supply routes and products showing stable conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
