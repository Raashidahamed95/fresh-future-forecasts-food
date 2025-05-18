
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const DashboardCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue
}: DashboardCardProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-muted-foreground">{title}</CardTitle>
        <div className="rounded-full bg-green-100 p-2 text-green-600">
          <span className="material-icons-outlined">{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            <span className="material-icons-outlined text-sm mr-1">
              {trend === 'up' ? 'trending_up' : trend === 'down' ? 'trending_down' : 'trending_flat'}
            </span>
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
