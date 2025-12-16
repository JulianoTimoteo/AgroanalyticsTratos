import { KPICard } from "@/components/KPICard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { DataTable } from "@/components/DataTable";
import { teamPerformance } from "@/lib/mockData";
import { Users, Trophy, TrendingUp, Target } from "lucide-react";

const teamChartData = teamPerformance.filter(t => t.equipe !== 'Equipe Manutenção');

export function EquipesTab() {
  const bestTeam = teamPerformance.reduce((best, current) => 
    current.eficiencia > best.eficiencia ? current : best
  , teamPerformance[0]);

  const totalProductiveHours = teamPerformance.reduce((sum, t) => sum + t.horasProdutivas, 0);
  const avgEfficiency = teamPerformance.filter(t => t.eficiencia > 0).reduce((sum, t) => sum + t.eficiencia, 0) / 
    teamPerformance.filter(t => t.eficiencia > 0).length;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Equipes Ativas"
          value="4"
          subtitle="Esta semana"
          icon={Users}
        />
        <KPICard
          title="Melhor Performance"
          value={bestTeam.equipe.replace('Equipe ', '')}
          subtitle={`${bestTeam.eficiencia}% eficiência`}
          icon={Trophy}
          variant="productive"
        />
        <KPICard
          title="Total Horas Produtivas"
          value={`${totalProductiveHours}h`}
          subtitle="Todas equipes"
          icon={TrendingUp}
          variant="productive"
        />
        <KPICard
          title="Eficiência Média"
          value={`${avgEfficiency.toFixed(1)}%`}
          subtitle="Equipes operacionais"
          icon={Target}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      {/* Team Performance Chart */}
      <BarChartCard
        title="Performance por Equipe"
        data={teamChartData}
        dataKeys={[
          { key: 'horasProdutivas', name: 'H. Produtivas', color: 'hsl(152, 60%, 40%)' },
          { key: 'horasImprodutivas', name: 'H. Improdutivas', color: 'hsl(0, 65%, 55%)' },
        ]}
        xAxisKey="equipe"
      />

      {/* Team Details Table */}
      <DataTable
        title="Detalhamento por Equipe"
        data={teamPerformance}
        columns={[
          { key: 'equipe', header: 'Equipe' },
          { 
            key: 'horasProdutivas', 
            header: 'H. Produtivas',
            render: (value) => <span className="font-semibold text-chart-productive">{value}h</span>
          },
          { 
            key: 'horasImprodutivas', 
            header: 'H. Improdutivas',
            render: (value) => <span className="font-semibold text-chart-unproductive">{value}h</span>
          },
          { 
            key: 'eficiencia', 
            header: 'Eficiência',
            render: (value, row) => {
              if (row.equipe === 'Equipe Manutenção') {
                return <span className="text-muted-foreground">N/A</span>;
              }
              return (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
                    <div 
                      className="h-full bg-chart-productive rounded-full" 
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className={`font-semibold ${Number(value) >= 85 ? 'text-success' : 'text-warning'}`}>
                    {value}%
                  </span>
                </div>
              );
            }
          },
        ]}
      />
    </div>
  );
}
