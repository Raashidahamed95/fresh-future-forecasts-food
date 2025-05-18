
import React from 'react';
import SupplyChainMap from '@/components/SupplyChainMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChainView = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Supply Chain View</h1>
        <p className="text-muted-foreground">
          Visualize and monitor your entire food supply chain network
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <SupplyChainMap />
        
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Lead Time (days)</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm w-24">Farm to Processing:</span>
                      <div className="h-2 flex-1 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm w-8 text-right">2</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">Processing to Warehouse:</span>
                      <div className="h-2 flex-1 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-sm w-8 text-right">3</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">Warehouse to Retail:</span>
                      <div className="h-2 flex-1 bg-gray-200 rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                      <span className="text-sm w-8 text-right">5</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Inventory Levels (% of capacity)</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm w-24">Farm Storage:</span>
                      <div className="h-2 flex-1 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm w-8 text-right">60%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">Processing:</span>
                      <div className="h-2 flex-1 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-sm w-8 text-right">80%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">Warehouses:</span>
                      <div className="h-2 flex-1 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm w-8 text-right">45%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-24">Retail:</span>
                      <div className="h-2 flex-1 bg-gray-200 rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <span className="text-sm w-8 text-right">35%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Quality Control</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Spoilage Rate</span>
                        <span className="text-sm font-bold text-green-600">2.8%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>Target: &lt;3%</span>
                        <span>Critical: &gt;5%</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Quality Rating</span>
                        <span className="text-sm font-bold text-green-600">4.2/5</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>Target: &gt;4</span>
                        <span>Critical: &lt;3.5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-4 px-4 border-b text-sm font-medium">Harvest Completed</td>
                    <td className="py-4 px-4 border-b text-sm">Farm A</td>
                    <td className="py-4 px-4 border-b text-sm">Apples</td>
                    <td className="py-4 px-4 border-b text-sm">2023-05-15 08:30</td>
                    <td className="py-4 px-4 border-b">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-4 border-b text-sm font-medium">Shipment Dispatched</td>
                    <td className="py-4 px-4 border-b text-sm">Processing Plant B</td>
                    <td className="py-4 px-4 border-b text-sm">Oranges</td>
                    <td className="py-4 px-4 border-b text-sm">2023-05-15 10:15</td>
                    <td className="py-4 px-4 border-b">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        In Transit
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-4 px-4 border-b text-sm font-medium">Quality Check</td>
                    <td className="py-4 px-4 border-b text-sm">Warehouse C</td>
                    <td className="py-4 px-4 border-b text-sm">Bananas</td>
                    <td className="py-4 px-4 border-b text-sm">2023-05-15 11:30</td>
                    <td className="py-4 px-4 border-b">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        In Progress
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-4 border-b text-sm font-medium">Delivery Scheduled</td>
                    <td className="py-4 px-4 border-b text-sm">Retail Store D</td>
                    <td className="py-4 px-4 border-b text-sm">Multiple</td>
                    <td className="py-4 px-4 border-b text-sm">2023-05-16 09:00</td>
                    <td className="py-4 px-4 border-b">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        Scheduled
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-4 px-4 border-b text-sm font-medium">Temperature Alert</td>
                    <td className="py-4 px-4 border-b text-sm">Transport Vehicle E</td>
                    <td className="py-4 px-4 border-b text-sm">Dairy</td>
                    <td className="py-4 px-4 border-b text-sm">2023-05-15 14:22</td>
                    <td className="py-4 px-4 border-b">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Alert
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChainView;
