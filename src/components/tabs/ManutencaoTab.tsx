import { KPICard } from "@/components/KPICard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { PieChartCard } from "@/components/charts/PieChartCard";
import { DataTable } from "@/components/DataTable";
import { weeklyData, equipmentData, mockOperations } from "@/lib/mockData";
import { Wrench, Settings, CheckCircle, AlertCircle } from "lucide-react";

const maintenanceOperations = mockOperations.filter(op => op.grupoOperacional === 'Manutenção');

const maintenanceByType = [
  { name: 'Preventiva', value: 28, color: 'hsl(210, 70%, 50%)' },
  { name: 'Corretiva', value: 18, color: 'hsl(0, 65%, 55%)' },
];

const maintenanceByEquipment = [
  { equipamento: 'Colheitadeira S790', preventiva: 8, corretiva: 0 },
  { equipamento: 'Trator John Deere 8R', preventiva: 4, corretiva: 8 },
  { equipamento: 'Pulverizador Uniport', preventiva: 6, corretiva: 4 },
  { equipamento: 'Trator Case IH', preventiva: 6, corretiva: 2 },
  { equipamento: 'Distribuidor Stara', preventiva: 4, corretiva: 4 },
];

export function ManutencaoTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Manutenção"
          value="46h"
          subtitle="Esta semana"
          icon={Wrench}
          variant="maintenance"
        />
        <KPICard
          title="Preventiva"
          value="28h"
          subtitle="61% do total"
          icon={Settings}
          variant="maintenance"
        />
        <KPICard
          title="Corretiva"
          value="18h"
          subtitle="39% do total"
          icon={AlertCircle}
          variant="maintenance"
        />
        <KPICard
          title="Disponibilidade Média"
          value="93.3%"
          subtitle="Frota total"
          icon={CheckCircle}
          variant="maintenance"
          trend={{ value: 1.2, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PieChartCard
          title="Distribuição por Tipo"
          data={maintenanceByType}
        />
        <BarChartCard
          title="Manutenção por Dia"
          data={weeklyData}
          dataKeys={[{ key: 'manutencao', name: 'Manutenção', color: 'hsl(210, 70%, 50%)' }]}
          xAxisKey="day"
        />
      </div>

      {/* Equipment Maintenance Table */}
      <BarChartCard
        title="Manutenção por Equipamento"
        data={maintenanceByEquipment}
        dataKeys={[
          { key: 'preventiva', name: 'Preventiva', color: 'hsl(210, 70%, 50%)' },
          { key: 'corretiva', name: 'Corretiva', color: 'hsl(0, 65%, 55%)' },
        ]}
        xAxisKey="equipamento"
      />

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DataTable
          title="Disponibilidade por Equipamento"
          data={equipmentData}
          columns={[
            { key: 'equipamento', header: 'Equipamento' },
            { 
              key: 'horasManutencao', 
              header: 'H. Manut.',
              render: (value) => <span className="font-semibold">{value}h</span>
            },
            { 
              key: 'disponibilidade', 
              header: 'Disponibilidade',
              render: (value) => (
                <span className={`font-semibold ${Number(value) >= 95 ? 'text-success' : Number(value) >= 90 ? 'text-warning' : 'text-destructive'}`}>
                  {value}%
                </span>
              )
            },
          ]}
        />
        <DataTable
          title="Registros de Manutenção"
          data={maintenanceOperations}
          columns={[
            { key: 'data', header: 'Data' },
            { key: 'operacao', header: 'Tipo' },
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
