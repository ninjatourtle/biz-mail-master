import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Settings, Trash2, Pause, Play, AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface EmailAccount {
  id: string;
  email: string;
  provider: string;
  status: "active" | "paused" | "error" | "warming";
  dailyLimit: number;
  sentToday: number;
  sentTotal: number;
  reputation: number;
  lastUsed: string;
}

const accounts: EmailAccount[] = [
  {
    id: "1",
    email: "sender1@company.com",
    provider: "Gmail SMTP",
    status: "active",
    dailyLimit: 500,
    sentToday: 124,
    sentTotal: 15234,
    reputation: 98,
    lastUsed: "5 мин назад",
  },
  {
    id: "2",
    email: "sender2@company.com",
    provider: "Outlook",
    status: "active",
    dailyLimit: 300,
    sentToday: 289,
    sentTotal: 8932,
    reputation: 95,
    lastUsed: "2 часа назад",
  },
  {
    id: "3",
    email: "noreply@company.com",
    provider: "SendGrid",
    status: "warming",
    dailyLimit: 150,
    sentToday: 45,
    sentTotal: 450,
    reputation: 88,
    lastUsed: "1 день назад",
  },
  {
    id: "4",
    email: "marketing@company.com",
    provider: "Mailgun",
    status: "paused",
    dailyLimit: 1000,
    sentToday: 0,
    sentTotal: 32100,
    reputation: 92,
    lastUsed: "3 дня назад",
  },
  {
    id: "5",
    email: "alerts@company.com",
    provider: "Amazon SES",
    status: "error",
    dailyLimit: 2000,
    sentToday: 0,
    sentTotal: 5600,
    reputation: 0,
    lastUsed: "Неделю назад",
  },
];

export function EmailAccounts() {
  const getStatusBadge = (status: EmailAccount["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="flex items-center gap-1 bg-gradient-green text-white border-0">
            <CheckCircle2 className="h-3 w-3" />
            Активен
          </Badge>
        );
      case "paused":
        return (
          <Badge className="flex items-center gap-1 bg-gradient-yellow text-white border-0">
            <Pause className="h-3 w-3" />
            Приостановлен
          </Badge>
        );
      case "error":
        return (
          <Badge className="flex items-center gap-1 bg-gradient-red text-white border-0">
            <AlertCircle className="h-3 w-3" />
            Ошибка
          </Badge>
        );
      case "warming":
        return (
          <Badge className="flex items-center gap-1 bg-gradient-blue text-white border-0">
            <Clock className="h-3 w-3" />
            Прогрев
          </Badge>
        );
    }
  };

  const getReputationColor = (reputation: number) => {
    if (reputation >= 90) return "text-gradient-green";
    if (reputation >= 70) return "text-gradient-yellow";
    if (reputation >= 50) return "text-gradient-orange";
    return "text-gradient-red";
  };

  const getLimitUsageColor = (sent: number, limit: number) => {
    const percentage = (sent / limit) * 100;
    if (percentage >= 90) return "text-gradient-red";
    if (percentage >= 70) return "text-gradient-yellow";
    return "text-muted-foreground";
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Email Аккаунты</CardTitle>
            <CardDescription>
              Управление аккаунтами для отправки рассылок
            </CardDescription>
          </div>
          <Button variant="gradient" size="sm">
            Добавить аккаунт
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Провайдер</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дневной лимит</TableHead>
              <TableHead>Отправлено всего</TableHead>
              <TableHead>Репутация</TableHead>
              <TableHead>Последнее использование</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.email}</TableCell>
                <TableCell>{account.provider}</TableCell>
                <TableCell>{getStatusBadge(account.status)}</TableCell>
                <TableCell>
                  <span className={getLimitUsageColor(account.sentToday, account.dailyLimit)}>
                    {account.sentToday} / {account.dailyLimit}
                  </span>
                </TableCell>
                <TableCell>{account.sentTotal.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`font-semibold ${getReputationColor(account.reputation)}`}>
                    {account.reputation > 0 ? `${account.reputation}%` : "—"}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{account.lastUsed}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Настройки
                      </DropdownMenuItem>
                      {account.status === "active" ? (
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" />
                          Приостановить
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Активировать
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Удалить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}