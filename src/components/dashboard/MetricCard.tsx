import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  color?: "sent" | "opened" | "replied" | "bounced";
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  color = "sent",
}: MetricCardProps) {
  const isPositive = change && change > 0;
  
  const colorClasses = {
    sent: "text-metric-sent",
    opened: "text-metric-opened",
    replied: "text-metric-replied",
    bounced: "text-metric-bounced",
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 bg-gradient-card">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              {isPositive ? (
                <ArrowUp className="h-4 w-4 text-success" />
              ) : (
                <ArrowDown className="h-4 w-4 text-destructive" />
              )}
              <span className={cn(
                "font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn("p-3 rounded-lg bg-background/50", colorClasses[color])}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}