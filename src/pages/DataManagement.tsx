
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DatasetUploader from '@/components/DatasetUploader';

const DataManagement = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Management</h1>
        <p className="text-muted-foreground">
          Upload, manage, and analyze your supply chain datasets
        </p>
      </div>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Datasets</TabsTrigger>
          <TabsTrigger value="existing">Existing Datasets</TabsTrigger>
          <TabsTrigger value="processing">Data Processing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DatasetUploader />
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Dataset Requirements</h3>
                <ul className="space-y-2 list-disc pl-5 text-gray-600">
                  <li>Files must be in CSV or Excel (XLSX) format</li>
                  <li>Maximum file size: 10MB</li>
                  <li>Required columns: date, product_id, location, quantity</li>
                  <li>Date format should be YYYY-MM-DD</li>
                  <li>First row should contain column headers</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Sample Dataset Structure</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-3 text-left">date</th>
                        <th className="py-2 px-3 text-left">product_id</th>
                        <th className="py-2 px-3 text-left">location</th>
                        <th className="py-2 px-3 text-left">quantity</th>
                        <th className="py-2 px-3 text-left">price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3">2023-01-15</td>
                        <td className="py-2 px-3">APPLE-123</td>
                        <td className="py-2 px-3">WAREHOUSE-A</td>
                        <td className="py-2 px-3">500</td>
                        <td className="py-2 px-3">1.25</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3">2023-01-15</td>
                        <td className="py-2 px-3">ORANGE-456</td>
                        <td className="py-2 px-3">WAREHOUSE-A</td>
                        <td className="py-2 px-3">350</td>
                        <td className="py-2 px-3">0.85</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="existing" className="py-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium">Available Datasets</h3>
              <p className="text-sm text-gray-500">Manage and explore your uploaded datasets</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded On</th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-4 px-4 border-b text-sm font-medium">Inventory Data 2023</td>
                    <td className="py-4 px-4 border-b text-sm">CSV</td>
                    <td className="py-4 px-4 border-b text-sm">2,480</td>
                    <td className="py-4 px-4 border-b text-sm">2023-12-15</td>
                    <td className="py-4 px-4 border-b text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-4 border-b text-sm font-medium">Sales Data 2022-2023</td>
                    <td className="py-4 px-4 border-b text-sm">XLSX</td>
                    <td className="py-4 px-4 border-b text-sm">5,230</td>
                    <td className="py-4 px-4 border-b text-sm">2023-11-10</td>
                    <td className="py-4 px-4 border-b text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-4 px-4 border-b text-sm font-medium">Full Supply Chain Data</td>
                    <td className="py-4 px-4 border-b text-sm">CSV</td>
                    <td className="py-4 px-4 border-b text-sm">8,750</td>
                    <td className="py-4 px-4 border-b text-sm">2023-10-05</td>
                    <td className="py-4 px-4 border-b text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="processing" className="py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Data Processing Options</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center mb-2">
                    <span className="material-icons-outlined text-blue-600 mr-2">cleaning_services</span>
                    <h4 className="font-medium">Data Cleaning</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Remove outliers, handle missing values, and standardize formats
                  </p>
                  <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Run Cleaning
                  </button>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <div className="flex items-center mb-2">
                    <span className="material-icons-outlined text-purple-600 mr-2">merge</span>
                    <h4 className="font-medium">Data Enrichment</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Add weather data, economic indicators, and seasonal factors
                  </p>
                  <button className="text-sm px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700">
                    Enrich Data
                  </button>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center mb-2">
                    <span className="material-icons-outlined text-green-600 mr-2">analytics</span>
                    <h4 className="font-medium">Feature Engineering</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Create new features to improve prediction accuracy
                  </p>
                  <button className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                    Generate Features
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Processing History</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Feature Engineering</span>
                    <span className="text-gray-500 text-sm">2023-12-20</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Generated 8 new features from Inventory Data 2023
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Data Cleaning</span>
                    <span className="text-gray-500 text-sm">2023-12-18</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Removed 23 outliers from Sales Data 2022-2023
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 py-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Data Enrichment</span>
                    <span className="text-gray-500 text-sm">2023-12-15</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Added weather data to Full Supply Chain Data
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Feature Engineering</span>
                    <span className="text-gray-500 text-sm">2023-11-30</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Generated seasonal indicators for Sales Data
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Data Cleaning</span>
                    <span className="text-gray-500 text-sm">2023-11-15</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Fixed missing values in Full Supply Chain Data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataManagement;
