import { KPICard } from "@/components/KPICard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { DataTable } from "@/components/DataTable";
import { weeklyData, monthlyData, mockOperations } from "@/lib/mockData";
import { TrendingUp, Clock, Target, Zap } from "lucide-react";

const productiveOperations = mockOperations.filter(op => op.grupoOperacional === 'Produtivas');

const operationsByType = [
  { operacao: 'Plantio', horas: 16.5, percentual: 25 },
  { operacao: 'Colheita', horas: 18, percentual: 28 },
  { operacao: 'Pulverização', horas: 14, percentual: 22 },
  { operacao: 'Adubação', horas: 12, percentual: 19 },
  { operacao: 'Preparo Solo', horas: 4, percentual: 6 },
];

export function ProdutivasTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Horas Produtivas"
          value="641h"
          subtitle="Esta semana"
          icon={TrendingUp}
          variant="productive"
          trend={{ value: 12.5, isPositive: true }}
        />
        <KPICard
          title="Média Diária"
          value="91.6h"
          subtitle="Horas/dia"
          icon={Clock}
          variant="productive"
        />
        <KPICard
          title="Meta Semanal"
          value="85%"
          subtitle="700h meta"
          icon={Target}
          variant="productive"
          trend={{ value: 5, isPositive: true }}
        />
        <KPICard
          title="Pico Produtivo"
          value="Qui"
          subtitle="30h no dia"
          icon={Zap}
          variant="productive"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarChartCard
          title="Horas Produtivas por Dia"
          data={weeklyData}
          dataKeys={[{ key: 'produtivas', name: 'Produtivas', color: 'hsl(152, 60%, 40%)' }]}
          xAxisKey="day"
        />
        <LineChartCard
          title="Tendência Mensal"
          data={monthlyData}
          dataKeys={[{ key: 'produtivas', name: 'Produtivas', color: 'hsl(152, 60%, 40%)' }]}
          xAxisKey="week"
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DataTable
          title="Horas por Tipo de Operação"
          data={operationsByType}
          columns={[
            { key: 'operacao', header: 'Operação' },
            { 
              key: 'horas', 
              header: 'Horas',
              render: (value) => <span className="font-semibold text-chart-productive">{value}h</span>
            },
            { 
              key: 'percentual', 
              header: 'Participação',
              render: (value) => (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[80px]">
                    <div 
                      className="h-full bg-chart-productive rounded-full" 
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{value}%</span>
                </div>
              )
            },
          ]}
        />
        <DataTable
          title="Últimas Operações Produtivas"
          data={productiveOperations.slice(0, 5)}
          columns={[
            { key: 'data', header: 'Data' },
            { key: 'operacao', header: 'Operação' },
            { key: 'equipe', header: 'Equipe' },
            { 
              key: 'horasOperacionais', 
              header: 'Horas',
              render: (value) => <span className="font-semibold">{value}h</span>
            },
          ]}
        />
      </div>
    </div>
  );
}
