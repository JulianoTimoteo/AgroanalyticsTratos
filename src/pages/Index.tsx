import { useState } from "react";
import { Header } from "@/components/Header";
import { TabNavigation, TabId } from "@/components/TabNavigation";
import { GlobalFilters, PeriodFilter } from "@/components/GlobalFilters";
import { OverviewTab } from "@/components/tabs/OverviewTab";
import { ProdutivasTab } from "@/components/tabs/ProdutivasTab";
import { ImprodutivasTab } from "@/components/tabs/ImprodutivasTab";
import { ManutencaoTab } from "@/components/tabs/ManutencaoTab";
import { EquipesTab } from "@/components/tabs/EquipesTab";
import { ChatIATab } from "@/components/tabs/ChatIATab";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [period, setPeriod] = useState<PeriodFilter>('week');
  const [operation, setOperation] = useState('all');
  const [team, setTeam] = useState('all');
  const [equipment, setEquipment] = useState('all');
  const [isConnected] = useState(true); // Mock connected state

  const handleRefresh = () => {
    toast.success("Dados atualizados com sucesso!", {
      description: "Última sincronização: agora",
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'produtivas':
        return <ProdutivasTab />;
      case 'improdutivas':
        return <ImprodutivasTab />;
      case 'manutencao':
        return <ManutencaoTab />;
      case 'equipes':
        return <EquipesTab />;
      case 'chat':
        return <ChatIATab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onRefresh={handleRefresh} isConnected={isConnected} />
      
      <main className="container py-6 space-y-6">
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Global Filters (hidden on Chat tab) */}
        {activeTab !== 'chat' && (
          <GlobalFilters
            period={period}
            setPeriod={setPeriod}
            operation={operation}
            setOperation={setOperation}
            team={team}
            setTeam={setTeam}
            equipmentFilter={equipment}
            setEquipmentFilter={setEquipment}
          />
        )}

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 Agroanalytics Tratos. Dashboard de Operações Agrícolas.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
