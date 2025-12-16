import { Button } from "@/components/ui/button";
import { Cloud, RefreshCw, Settings, Leaf } from "lucide-react";

interface HeaderProps {
  onRefresh: () => void;
  isConnected: boolean;
}

export function Header({ onRefresh, isConnected }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Agroanalytics <span className="text-primary">Tratos</span>
            </h1>
            <p className="text-xs text-muted-foreground">Dashboard Operacional</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Connection Status */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
            isConnected 
              ? 'bg-success/10 text-success' 
              : 'bg-muted text-muted-foreground'
          }`}>
            <Cloud className="h-4 w-4" />
            <span className="hidden sm:inline">
              {isConnected ? 'OneDrive Conectado' : 'Desconectado'}
            </span>
            <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
          </div>

          {/* Refresh */}
          <Button variant="ghost" size="icon" onClick={onRefresh} title="Atualizar dados">
            <RefreshCw className="h-4 w-4" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" title="Configurações">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
