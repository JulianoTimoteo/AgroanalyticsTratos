import { KPICard } from "@/components/KPICard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { PieChartCard } from "@/components/charts/PieChartCard";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { DataTable } from "@/components/DataTable";
import { weeklyData, topImprodutividades } from "@/lib/mockData";
import { 
  TrendingUp, 
  TrendingDown, 
  Wrench, 
  CloudRain,
  Activity 
} from "lucide-react";

const pieData = [
  { name: 'Produtivas', value: 641, color: 'hsl(152, 60%, 40%)' },
  { name: 'Improdutivas', value: 79, color: 'hsl(0, 65%, 55%)' },
  { name: 'Manutenção', value: 46, color: 'hsl(210, 70%, 50%)' },
  { name: 'Climático', value: 29, color: 'hsl(42, 85%, 55%)' },
];

const barDataKeys = [
  { key: 'produtivas', name: 'Produtivas', color: 'hsl(152, 60%, 40%)' },
  { key: 'improdutivas', name: 'Improdutivas', color: 'hsl(0, 65%, 55%)' },
  { key: 'manutencao', name: 'Manutenção', color: 'hsl(210, 70%, 50%)' },
  { key: 'climatico', name: 'Climático', color: 'hsl(42, 85%, 55%)' },
];

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Horas Produtivas"
          value="641h"
          subtitle="Esta semana"
          icon={TrendingUp}
          variant="productive"
          trend={{ value: 12.5, isPositive: true }}
        />
        <KPICard
          title="Horas Improdutivas"
          value="79h"
          subtitle="Esta semana"
          icon={TrendingDown}
          variant="unproductive"
          trend={{ value: 8.2, isPositive: false }}
        />
        <KPICard
          title="Horas Manutenção"
          value="46h"
          subtitle="Esta semana"
          icon={Wrench}
          variant="maintenance"
        />
        <KPICard
          title="Paradas Climáticas"
          value="29h"
          subtitle="Esta semana"
          icon={CloudRain}
          variant="climate"
        />
      </div>

      {/* Efficiency Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <KPICard
          title="Eficiência Operacional"
          value="80.6%"
          subtitle="Horas produtivas / Total"
          icon={Activity}
          trend={{ value: 3.2, isPositive: true }}
          className="lg:col-span-1"
        />
        <div className="lg:col-span-2">
          <PieChartCard 
            title="Distribuição de Horas por Categoria" 
            data={pieData} 
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarChartCard
          title="Horas por Dia da Semana"
          data={weeklyData}
          dataKeys={barDataKeys}
          xAxisKey="day"
        />
        <LineChartCard
          title="Tendência Semanal - Produtivas"
          data={weeklyData}
          dataKeys={[{ key: 'produtivas', name: 'Produtivas', color: 'hsl(152, 60%, 40%)' }]}
          xAxisKey="day"
        />
      </div>

      {/* Top Improdutividades Table */}
      <DataTable
        title="Top 5 Motivos de Improdutividade"
        data={topImprodutividades}
        columns={[
          { key: 'motivo', header: 'Motivo' },
          { 
            key: 'horas', 
            header: 'Horas',
            render: (value) => <span className="font-semibold">{value}h</span>
          },
          { 
            key: 'percentual', 
            header: '% do Total',
            render: (value) => (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
                  <div 
                    className="h-full bg-chart-unproductive rounded-full" 
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">{value}%</span>
              </div>
            )
          },
        ]}
      />
    </div>
  );
}
