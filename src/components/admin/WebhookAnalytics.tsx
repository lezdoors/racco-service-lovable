
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { webhookService } from '@/services/webhooks';
import logger from '@/services/loggingService';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  description?: string;
  color?: string;
}

const AnalyticsCard = ({ title, value, description, color = 'bg-enedis-blue' }: AnalyticsCardProps) => (
  <Card className="p-4">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
    {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
  </Card>
);

const WebhookAnalytics = () => {
  const [analytics, setAnalytics] = useState(webhookService.getAnalytics());
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    // Update analytics data
    setAnalytics(webhookService.getAnalytics());
  }, [refreshKey]);
  
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    logger.info("Webhook analytics refreshed");
  };
  
  const successRate = analytics.totalCalls > 0 
    ? ((analytics.successfulCalls / analytics.totalCalls) * 100).toFixed(1) 
    : '0';
    
  const chartData = [
    { name: 'Réussi', value: analytics.successfulCalls },
    { name: 'Echoué', value: analytics.failedCalls }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytiques des webhooks</h2>
        <button 
          onClick={handleRefresh}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          Actualiser
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard 
          title="Total des appels" 
          value={analytics.totalCalls} 
        />
        <AnalyticsCard 
          title="Taux de réussite" 
          value={`${successRate}%`}
          color={Number(successRate) > 90 ? "text-green-600" : Number(successRate) > 70 ? "text-yellow-600" : "text-red-600"}
        />
        <AnalyticsCard 
          title="Appels réussis" 
          value={analytics.successfulCalls} 
          color="text-green-600"
        />
        <AnalyticsCard 
          title="Appels échoués" 
          value={analytics.failedCalls} 
          color="text-red-600"
        />
      </div>
      
      {analytics.totalCalls > 0 && (
        <div className="h-[300px]">
          <ChartContainer 
            config={{ 
              success: { color: "#22c55e" }, 
              failure: { color: "#ef4444" } 
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="var(--color-success)" 
                  radius={[4, 4, 0, 0]}
                  name="Appels"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}
      
      {analytics.totalCalls === 0 && (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500">Aucune donnée disponible pour le moment</p>
          <p className="text-sm text-gray-400 mt-1">
            Les statistiques apparaîtront après le premier envoi de webhook
          </p>
        </div>
      )}
    </div>
  );
};

// Custom tooltip component for Recharts
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-white p-2 border rounded shadow-sm">
      <p className="font-semibold">{`${payload[0].name} : ${payload[0].value}`}</p>
    </div>
  );
};

export default WebhookAnalytics;
