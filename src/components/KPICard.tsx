import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'productive' | 'unproductive' | 'maintenance' | 'climate';
  className?: string;
}

const variantStyles = {
  default: {
    card: 'bg-card border-border',
    icon: 'bg-primary/10 text-primary',
    value: 'text-foreground',
  },
  productive: {
    card: 'bg-gradient-to-br from-chart-productive/10 to-chart-productive/5 border-chart-productive/20',
    icon: 'bg-chart-productive/20 text-chart-productive',
    value: 'text-chart-productive',
  },
  unproductive: {
    card: 'bg-gradient-to-br from-chart-unproductive/10 to-chart-unproductive/5 border-chart-unproductive/20',
    icon: 'bg-chart-unproductive/20 text-chart-unproductive',
    value: 'text-chart-unproductive',
  },
  maintenance: {
    card: 'bg-gradient-to-br from-chart-maintenance/10 to-chart-maintenance/5 border-chart-maintenance/20',
    icon: 'bg-chart-maintenance/20 text-chart-maintenance',
    value: 'text-chart-maintenance',
  },
  climate: {
    card: 'bg-gradient-to-br from-chart-climate/10 to-chart-climate/5 border-chart-climate/20',
    icon: 'bg-chart-climate/20 text-chart-climate',
    value: 'text-chart-climate',
  },
};

export function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default',
  className 
}: KPICardProps) {
  const styles = variantStyles[variant];
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-scale-in",
        styles.card,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn("text-3xl font-bold tracking-tight animate-counter", styles.value)}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5",
              trend.isPositive 
                ? "bg-success/10 text-success" 
                : "bg-destructive/10 text-destructive"
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          styles.icon
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
