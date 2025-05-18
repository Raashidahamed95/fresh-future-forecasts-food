
import React from 'react';
import PredictionChart from '@/components/PredictionChart';
import ModelTrainingForm from '@/components/ModelTrainingForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Predictions = () => {
  const demandForecastData = [
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ML Predictions</h1>
        <p className="text-muted-foreground">
          Train models and view predictions for your food supply chain
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <span className="material-icons-outlined text-blue-600 text-xl mr-2">leaderboard</span>
            <h3 className="font-semibold text-lg">Demand Forecasting</h3>
          </div>
          <p className="text-gray-700 mb-2">Accuracy: <span className="font-semibold">87.5%</span></p>
          <p className="text-sm text-gray-600">
            Uses historical sales data, seasonality patterns, and external factors to predict future demand.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <span className="material-icons-outlined text-purple-600 text-xl mr-2">inventory</span>
            <h3 className="font-semibold text-lg">Inventory Optimization</h3>
          </div>
          <p className="text-gray-700 mb-2">Accuracy: <span className="font-semibold">84.2%</span></p>
          <p className="text-sm text-gray-600">
            Recommends optimal inventory levels based on demand forecasts and lead times.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <span className="material-icons-outlined text-green-600 text-xl mr-2">route</span>
            <h3 className="font-semibold text-lg">Route Optimization</h3>
          </div>
          <p className="text-gray-700 mb-2">Accuracy: <span className="font-semibold">91.3%</span></p>
          <p className="text-sm text-gray-600">
            Determines optimal delivery routes to minimize transportation costs and time.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="forecasts" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecasts">Demand Forecasts</TabsTrigger>
          <TabsTrigger value="optimization">Inventory Optimization</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="forecasts" className="py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PredictionChart 
              data={demandForecastData}
              title="Annual Demand Forecast"
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
              title="Weekly Demand Forecast"
              description="Short-term forecast for the next 8 weeks"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="optimization" className="py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PredictionChart 
              data={[
                { name: 'Apple', actual: 1200, predicted: 1150 },
                { name: 'Orange', actual: 850, predicted: 900 },
                { name: 'Banana', actual: 1300, predicted: 1350 },
                { name: 'Grapes', actual: 680, predicted: 650 },
                { name: 'Mango', actual: 420, predicted: 400 },
              ]}
              title="Optimal Inventory Levels"
              description="Product-wise recommended inventory levels"
            />
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium">Inventory Recommendations</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                      <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimal Level</th>
                      <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="py-4 px-4 border-b text-sm font-medium">Apples</td>
                      <td className="py-4 px-4 border-b text-sm">1000 kg</td>
                      <td className="py-4 px-4 border-b text-sm">1150 kg</td>
                      <td className="py-4 px-4 border-b">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Order 150 kg
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-4 px-4 border-b text-sm font-medium">Oranges</td>
                      <td className="py-4 px-4 border-b text-sm">950 kg</td>
                      <td className="py-4 px-4 border-b text-sm">900 kg</td>
                      <td className="py-4 px-4 border-b">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Reduce 50 kg
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-4 border-b text-sm font-medium">Bananas</td>
                      <td className="py-4 px-4 border-b text-sm">1400 kg</td>
                      <td className="py-4 px-4 border-b text-sm">1350 kg</td>
                      <td className="py-4 px-4 border-b">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Reduce 50 kg
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-4 px-4 border-b text-sm font-medium">Grapes</td>
                      <td className="py-4 px-4 border-b text-sm">600 kg</td>
                      <td className="py-4 px-4 border-b text-sm">650 kg</td>
                      <td className="py-4 px-4 border-b">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Order 50 kg
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-4 border-b text-sm font-medium">Mangoes</td>
                      <td className="py-4 px-4 border-b text-sm">400 kg</td>
                      <td className="py-4 px-4 border-b text-sm">400 kg</td>
                      <td className="py-4 px-4 border-b">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Optimal
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="risk" className="py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium">Supply Chain Risk Assessment</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex items-center mb-2">
                      <span className="material-icons-outlined text-red-600 mr-2">warning</span>
                      <h4 className="font-medium">High Risk: Weather Disruption</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      90% probability of heavy rainfall affecting apple harvests in Region A next week.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-red-800">Impact: High</span>
                      <button className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                        View Mitigation Plan
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-center mb-2">
                      <span className="material-icons-outlined text-yellow-600 mr-2">error_outline</span>
                      <h4 className="font-medium">Medium Risk: Transport Delays</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      65% probability of transport delays on Route A during weeks 22-24.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-yellow-800">Impact: Medium</span>
                      <button className="text-sm px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                        View Alternate Routes
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-center mb-2">
                      <span className="material-icons-outlined text-yellow-600 mr-2">error_outline</span>
                      <h4 className="font-medium">Medium Risk: Price Fluctuation</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      70% probability of price increase for oranges in the next month.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-yellow-800">Impact: Medium</span>
                      <button className="text-sm px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                        View Price Forecast
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <ModelTrainingForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Predictions;
