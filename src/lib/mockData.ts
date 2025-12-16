// Mock data simulating CSV/XLSX agricultural operations data

export interface OperationRecord {
  id: string;
  data: string;
  operacao: string;
  equipe: string;
  equipamento: string;
  grupoOperacional: 'Produtivas' | 'Improdutivas' | 'Manutenção' | 'Climático';
  horasOperacionaisSec: number;
  horasOperacionais: number;
  descricao: string;
}

export const mockOperations: OperationRecord[] = [
  // Produtivas
  { id: '1', data: '2024-01-15', operacao: 'Plantio', equipe: 'Equipe Alpha', equipamento: 'Trator John Deere 8R', grupoOperacional: 'Produtivas', horasOperacionaisSec: 28800, horasOperacionais: 8, descricao: 'Plantio de soja - Talhão A1' },
  { id: '2', data: '2024-01-15', operacao: 'Colheita', equipe: 'Equipe Beta', equipamento: 'Colheitadeira S790', grupoOperacional: 'Produtivas', horasOperacionaisSec: 32400, horasOperacionais: 9, descricao: 'Colheita milho - Talhão B2' },
  { id: '3', data: '2024-01-16', operacao: 'Pulverização', equipe: 'Equipe Alpha', equipamento: 'Pulverizador Uniport', grupoOperacional: 'Produtivas', horasOperacionaisSec: 25200, horasOperacionais: 7, descricao: 'Aplicação herbicida' },
  { id: '4', data: '2024-01-16', operacao: 'Plantio', equipe: 'Equipe Gamma', equipamento: 'Trator Case IH', grupoOperacional: 'Produtivas', horasOperacionaisSec: 30600, horasOperacionais: 8.5, descricao: 'Plantio algodão' },
  { id: '5', data: '2024-01-17', operacao: 'Adubação', equipe: 'Equipe Beta', equipamento: 'Distribuidor Stara', grupoOperacional: 'Produtivas', horasOperacionaisSec: 21600, horasOperacionais: 6, descricao: 'Adubação cobertura' },
  
  // Improdutivas
  { id: '6', data: '2024-01-15', operacao: 'Aguardando Peças', equipe: 'Equipe Alpha', equipamento: 'Trator John Deere 8R', grupoOperacional: 'Improdutivas', horasOperacionaisSec: 7200, horasOperacionais: 2, descricao: 'Espera por filtro óleo' },
  { id: '7', data: '2024-01-16', operacao: 'Deslocamento', equipe: 'Equipe Beta', equipamento: 'Colheitadeira S790', grupoOperacional: 'Improdutivas', horasOperacionaisSec: 5400, horasOperacionais: 1.5, descricao: 'Transporte entre talhões' },
  { id: '8', data: '2024-01-17', operacao: 'Parada Refeição', equipe: 'Equipe Gamma', equipamento: 'Trator Case IH', grupoOperacional: 'Improdutivas', horasOperacionaisSec: 3600, horasOperacionais: 1, descricao: 'Intervalo almoço' },
  { id: '9', data: '2024-01-17', operacao: 'Abastecimento', equipe: 'Equipe Alpha', equipamento: 'Pulverizador Uniport', grupoOperacional: 'Improdutivas', horasOperacionaisSec: 1800, horasOperacionais: 0.5, descricao: 'Reabastecimento diesel' },
  
  // Manutenção
  { id: '10', data: '2024-01-15', operacao: 'Manutenção Preventiva', equipe: 'Equipe Manutenção', equipamento: 'Colheitadeira S790', grupoOperacional: 'Manutenção', horasOperacionaisSec: 14400, horasOperacionais: 4, descricao: 'Troca óleo e filtros' },
  { id: '11', data: '2024-01-16', operacao: 'Reparo Corretivo', equipe: 'Equipe Manutenção', equipamento: 'Trator John Deere 8R', grupoOperacional: 'Manutenção', horasOperacionaisSec: 10800, horasOperacionais: 3, descricao: 'Substituição correia' },
  { id: '12', data: '2024-01-17', operacao: 'Manutenção Preventiva', equipe: 'Equipe Manutenção', equipamento: 'Pulverizador Uniport', grupoOperacional: 'Manutenção', horasOperacionaisSec: 7200, horasOperacionais: 2, descricao: 'Calibração bicos' },
  
  // Climático
  { id: '13', data: '2024-01-15', operacao: 'Parada Chuva', equipe: 'Equipe Beta', equipamento: 'Colheitadeira S790', grupoOperacional: 'Climático', horasOperacionaisSec: 10800, horasOperacionais: 3, descricao: 'Interrupção por precipitação' },
  { id: '14', data: '2024-01-16', operacao: 'Parada Chuva', equipe: 'Equipe Alpha', equipamento: 'Trator John Deere 8R', grupoOperacional: 'Climático', horasOperacionaisSec: 7200, horasOperacionais: 2, descricao: 'Solo úmido' },
  { id: '15', data: '2024-01-17', operacao: 'Parada Vento', equipe: 'Equipe Gamma', equipamento: 'Pulverizador Uniport', grupoOperacional: 'Climático', horasOperacionaisSec: 5400, horasOperacionais: 1.5, descricao: 'Vento forte - deriva' },
];

// Extended data for charts
export const weeklyData = [
  { day: 'Seg', produtivas: 24, improdutivas: 4, manutencao: 3, climatico: 2 },
  { day: 'Ter', produtivas: 28, improdutivas: 3, manutencao: 2, climatico: 1 },
  { day: 'Qua', produtivas: 22, improdutivas: 5, manutencao: 4, climatico: 3 },
  { day: 'Qui', produtivas: 30, improdutivas: 2, manutencao: 1, climatico: 0 },
  { day: 'Sex', produtivas: 26, improdutivas: 4, manutencao: 2, climatico: 2 },
  { day: 'Sáb', produtivas: 18, improdutivas: 2, manutencao: 1, climatico: 0 },
  { day: 'Dom', produtivas: 8, improdutivas: 1, manutencao: 0, climatico: 0 },
];

export const monthlyData = [
  { week: 'Sem 1', produtivas: 156, improdutivas: 21, manutencao: 13, climatico: 8 },
  { week: 'Sem 2', produtivas: 168, improdutivas: 18, manutencao: 10, climatico: 5 },
  { week: 'Sem 3', produtivas: 142, improdutivas: 25, manutencao: 15, climatico: 12 },
  { week: 'Sem 4', produtivas: 175, improdutivas: 15, manutencao: 8, climatico: 4 },
];

export const teamPerformance = [
  { equipe: 'Equipe Alpha', horasProdutivas: 185, horasImprodutivas: 24, eficiencia: 88.5 },
  { equipe: 'Equipe Beta', horasProdutivas: 172, horasImprodutivas: 28, eficiencia: 86.0 },
  { equipe: 'Equipe Gamma', horasProdutivas: 168, horasImprodutivas: 32, eficiencia: 84.0 },
  { equipe: 'Equipe Manutenção', horasProdutivas: 0, horasImprodutivas: 0, eficiencia: 0 },
];

export const equipmentData = [
  { equipamento: 'Trator John Deere 8R', horasProdutivas: 145, horasManutencao: 12, disponibilidade: 92.3 },
  { equipamento: 'Colheitadeira S790', horasProdutivas: 168, horasManutencao: 8, disponibilidade: 95.5 },
  { equipamento: 'Pulverizador Uniport', horasProdutivas: 132, horasManutencao: 15, disponibilidade: 89.8 },
  { equipamento: 'Trator Case IH', horasProdutivas: 156, horasManutencao: 10, disponibilidade: 94.0 },
  { equipamento: 'Distribuidor Stara', horasProdutivas: 98, horasManutencao: 5, disponibilidade: 95.1 },
];

export const topImprodutividades = [
  { motivo: 'Deslocamento', horas: 45, percentual: 32 },
  { motivo: 'Aguardando Peças', horas: 28, percentual: 20 },
  { motivo: 'Parada Refeição', horas: 25, percentual: 18 },
  { motivo: 'Abastecimento', horas: 22, percentual: 16 },
  { motivo: 'Troca de Operador', horas: 20, percentual: 14 },
];

export const operationTypes = ['Plantio', 'Colheita', 'Pulverização', 'Adubação', 'Preparo Solo'];
export const teams = ['Equipe Alpha', 'Equipe Beta', 'Equipe Gamma', 'Equipe Manutenção'];
export const equipment = ['Trator John Deere 8R', 'Colheitadeira S790', 'Pulverizador Uniport', 'Trator Case IH', 'Distribuidor Stara'];
