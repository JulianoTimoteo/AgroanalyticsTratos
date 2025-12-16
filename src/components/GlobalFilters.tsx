import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Filter } from "lucide-react";
import { operationTypes, teams, equipment } from "@/lib/mockData";

export type PeriodFilter = 'day' | 'week' | 'month' | 'year';

interface GlobalFiltersProps {
  period: PeriodFilter;
  setPeriod: (period: PeriodFilter) => void;
  operation: string;
  setOperation: (operation: string) => void;
  team: string;
  setTeam: (team: string) => void;
  equipmentFilter: string;
  setEquipmentFilter: (equipment: string) => void;
}

export function GlobalFilters({
  period,
  setPeriod,
  operation,
  setOperation,
  team,
  setTeam,
  equipmentFilter,
  setEquipmentFilter,
}: GlobalFiltersProps) {
  const periods: { value: PeriodFilter; label: string }[] = [
    { value: 'day', label: 'Dia' },
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mês' },
    { value: 'year', label: 'Ano' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-sm animate-fade-in">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filtros:</span>
      </div>

      {/* Period Filter */}
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
        {periods.map((p) => (
          <Button
            key={p.value}
            variant="tab"
            size="sm"
            data-active={period === p.value}
            onClick={() => setPeriod(p.value)}
            className="h-8"
          >
            {p.label}
          </Button>
        ))}
      </div>

      {/* Operation Filter */}
      <Select value={operation} onValueChange={setOperation}>
        <SelectTrigger className="w-[160px] h-9 bg-background">
          <SelectValue placeholder="Operação" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas Operações</SelectItem>
          {operationTypes.map((op) => (
            <SelectItem key={op} value={op}>{op}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Team Filter */}
      <Select value={team} onValueChange={setTeam}>
        <SelectTrigger className="w-[160px] h-9 bg-background">
          <SelectValue placeholder="Equipe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas Equipes</SelectItem>
          {teams.map((t) => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Equipment Filter */}
      <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
        <SelectTrigger className="w-[180px] h-9 bg-background">
          <SelectValue placeholder="Equipamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Equipamentos</SelectItem>
          {equipment.map((eq) => (
            <SelectItem key={eq} value={eq}>{eq}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date indicator */}
      <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{new Date().toLocaleDateString('pt-BR', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short',
          year: 'numeric'
        })}</span>
      </div>
    </div>
  );
}
