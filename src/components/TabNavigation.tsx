import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Wrench, 
  Users, 
  MessageSquare 
} from "lucide-react";

export type TabId = 'overview' | 'produtivas' | 'improdutivas' | 'manutencao' | 'equipes' | 'chat';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'produtivas', label: 'Produtivas', icon: TrendingUp },
  { id: 'improdutivas', label: 'Improdutivas', icon: TrendingDown },
  { id: 'manutencao', label: 'Manutenção', icon: Wrench },
  { id: 'equipes', label: 'Equipes', icon: Users },
  { id: 'chat', label: 'Chat IA', icon: MessageSquare },
];

interface TabNavigationProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <nav className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 h-10 rounded-lg transition-all duration-200 whitespace-nowrap",
              isActive 
                ? "bg-card text-foreground shadow-sm font-semibold" 
                : "text-muted-foreground hover:text-foreground hover:bg-card/50"
            )}
          >
            <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
            <span className="hidden sm:inline">{tab.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}
