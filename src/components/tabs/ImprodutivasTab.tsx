import { KPICard } from "@/components/KPICard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { PieChartCard } from "@/components/charts/PieChartCard";
import { DataTable } from "@/components/DataTable";
import { weeklyData, topImprodutividades, mockOperations } from "@/lib/mockData";
import { TrendingDown, AlertTriangle, Clock, Target } from "lucide-react";

const unproductiveOperations = mockOperations.filter(op => op.grupoOperacional === 'Improdutivas');

const improdutividadesByCategory = [
  { name: 'Deslocamento', value: 45, color: 'hsl(0, 65%, 55%)' },
  { name: 'Aguardando Peças', value: 28, color: 'hsl(20, 70%, 50%)' },
  { name: 'Parada Refeição', value: 25, color: 'hsl(40, 75%, 50%)' },
  { name: 'Abastecimento', value: 22, color: 'hsl(60, 70%, 45%)' },
  { name: 'Outros', value: 20, color: 'hsl(80, 60%, 45%)' },
];

export function ImprodutivasTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Improdutivas"
          value="79h"
          subtitle="Esta semana"
          icon={TrendingDown}
          variant="unproductive"
          trend={{ value: 8.2, isPositive: false }}
        />
        <KPICard
          title="% do Tempo Total"
          value="9.9%"
          subtitle="Meta: < 10%"
          icon={Target}
          variant="unproductive"
        />
        <KPICard
          title="Principal Causa"
          value="Deslocamento"
          subtitle="45h (32%)"
          icon={AlertTriangle}
          variant="unproductive"
        />
        <KPICard
          title="Média por Equipamento"
          value="15.8h"
          subtitle="Por equipamento/semana"
          icon={Clock}
          variant="unproductive"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PieChartCard
          title="Distribuição por Motivo"
          data={improdutividadesByCategory}
        />
        <BarChartCard
          title="Improdutividade por Dia"
          data={weeklyData}
          dataKeys={[{ key: 'improdutivas', name: 'Improdutivas', color: 'hsl(0, 65%, 55%)' }]}
          xAxisKey="day"
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DataTable
          title="Top 5 Motivos de Improdutividade"
          data={topImprodutividades}
          columns={[
            { key: 'motivo', header: 'Motivo' },
            { 
              key: 'horas', 
              header: 'Horas',
              render: (value) => <span className="font-semibold text-chart-unproductive">{value}h</span>
            },
            { 
              key: 'percentual', 
              header: '% do Total',
              render: (value) => (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[80px]">
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
        <DataTable
          title="Registros Recentes"
          data={unproductiveOperations}
          columns={[
            { key: 'data', header: 'Data' },
            { key: 'operacao', header: 'Motivo' },
            { key: 'equipamento', header: 'Equipamento' },
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
