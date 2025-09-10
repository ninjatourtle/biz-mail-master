import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft";
  created: string;
  sent: number;
  opened: number;
  replied: number;
  openRate: number;
  replyRate: number;
  lastActivity: string;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "SaaS стартапы - Q1 2024",
    status: "active",
    created: "2024-01-15",
    sent: 1250,
    opened: 875,
    replied: 125,
    openRate: 70,
    replyRate: 10,
    lastActivity: "2 часа назад",
  },
  {
    id: "2",
    name: "Enterprise финтех",
    status: "completed",
    created: "2024-01-10",
    sent: 500,
    opened: 380,
    replied: 76,
    openRate: 76,
    replyRate: 15.2,
    lastActivity: "1 день назад",
  },
  {
    id: "3",
    name: "E-commerce платформы",
    status: "paused",
    created: "2024-01-08",
    sent: 800,
    opened: 520,
    replied: 65,
    openRate: 65,
    replyRate: 8.1,
    lastActivity: "3 дня назад",
  },
  {
    id: "4",
    name: "HR Tech компании",
    status: "draft",
    created: "2024-01-20",
    sent: 0,
    opened: 0,
    replied: 0,
    openRate: 0,
    replyRate: 0,
    lastActivity: "5 минут назад",
  },
  {
    id: "5",
    name: "Маркетинговые агентства",
    status: "active",
    created: "2024-01-18",
    sent: 650,
    opened: 455,
    replied: 82,
    openRate: 70,
    replyRate: 12.6,
    lastActivity: "1 час назад",
  },
];

export default function Campaigns() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Кампании</h1>
          <p className="text-muted-foreground">
            Управляйте вашими email кампаниями
          </p>
        </div>
        <Button variant="gradient" className="shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Новая кампания
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск кампаний..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="paused">На паузе</SelectItem>
              <SelectItem value="completed">Завершенные</SelectItem>
              <SelectItem value="draft">Черновики</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Отправлено</TableHead>
              <TableHead>Открытия</TableHead>
              <TableHead>Ответы</TableHead>
              <TableHead>Последняя активность</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                <TableCell>{campaign.sent}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{campaign.opened}</span>
                    <span className="text-sm text-muted-foreground">
                      ({campaign.openRate}%)
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{campaign.replied}</span>
                    <span className="text-sm text-muted-foreground">
                      ({campaign.replyRate}%)
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {campaign.lastActivity}
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}