import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft";
  sent: number;
  opened: number;
  replied: number;
  openRate: number;
  replyRate: number;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "SaaS стартапы - Q1 2024",
    status: "active",
    sent: 1250,
    opened: 875,
    replied: 125,
    openRate: 70,
    replyRate: 10,
  },
  {
    id: "2",
    name: "Enterprise финтех",
    status: "completed",
    sent: 500,
    opened: 380,
    replied: 76,
    openRate: 76,
    replyRate: 15.2,
  },
  {
    id: "3",
    name: "E-commerce платформы",
    status: "paused",
    sent: 800,
    opened: 520,
    replied: 65,
    openRate: 65,
    replyRate: 8.1,
  },
  {
    id: "4",
    name: "HR Tech компании",
    status: "draft",
    sent: 0,
    opened: 0,
    replied: 0,
    openRate: 0,
    replyRate: 0,
  },
];

export function RecentCampaigns() {
  const getStatusBadge = (status: Campaign["status"]) => {
    const variants = {
      active: { label: "Активна", className: "bg-success/10 text-success hover:bg-success/20" },
      paused: { label: "Пауза", className: "bg-warning/10 text-warning hover:bg-warning/20" },
      completed: { label: "Завершена", className: "bg-muted text-muted-foreground" },
      draft: { label: "Черновик", className: "bg-primary/10 text-primary hover:bg-primary/20" },
    };
    const variant = variants[status];
    return (
      <Badge variant="outline" className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Последние кампании</CardTitle>
        <Button variant="outline" size="sm">
          Все кампании
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-card-hover transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium">{campaign.name}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>{campaign.sent} отправлено</span>
                    <span>•</span>
                    <span>{campaign.openRate}% открытий</span>
                    <span>•</span>
                    <span>{campaign.replyRate}% ответов</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(campaign.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Просмотр</DropdownMenuItem>
                    <DropdownMenuItem>Редактировать</DropdownMenuItem>
                    <DropdownMenuItem>Дублировать</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}