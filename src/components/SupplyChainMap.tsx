
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SupplyChainMap = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Supply Chain Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-8">
          {/* Producer/Farm Level */}
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-green-600">agriculture</span>
              </div>
              <p className="text-sm font-medium">Farms</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-green-600">spa</span>
              </div>
              <p className="text-sm font-medium">Producers</p>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="material-icons-outlined text-gray-400">arrow_downward</span>
          </div>
          
          {/* Processing Level */}
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-blue-600">factory</span>
              </div>
              <p className="text-sm font-medium">Processing</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-blue-600">inventory_2</span>
              </div>
              <p className="text-sm font-medium">Packaging</p>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="material-icons-outlined text-gray-400">arrow_downward</span>
          </div>
          
          {/* Distribution Level */}
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-purple-600">local_shipping</span>
              </div>
              <p className="text-sm font-medium">Distribution</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-purple-600">warehouse</span>
              </div>
              <p className="text-sm font-medium">Warehousing</p>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="material-icons-outlined text-gray-400">arrow_downward</span>
          </div>
          
          {/* Retail Level */}
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-orange-600">store</span>
              </div>
              <p className="text-sm font-medium">Retail</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-orange-600">shopping_cart</span>
              </div>
              <p className="text-sm font-medium">Consumer</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyChainMap;
