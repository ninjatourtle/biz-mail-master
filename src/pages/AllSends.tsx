import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Calendar as CalendarIcon, Download, Eye, Send, CheckCircle2, XCircle, Clock, AlertCircle, Mail, Users, Target, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface SendRecord {
  id: string;
  campaignName: string;
  campaignId: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  status: "sent" | "delivered" | "opened" | "clicked" | "replied" | "bounced" | "failed" | "scheduled";
  sentAt: Date;
  openedAt?: Date;
  clickedAt?: Date;
  repliedAt?: Date;
  emailAccount: string;
  messageId: string;
  opens: number;
  clicks: number;
  bounceReason?: string;
  errorMessage?: string;
}

// Генерируем моковые данные
const generateMockData = (): SendRecord[] => {
  const campaigns = [
    "Летняя распродажа 2024",
    "Новая коллекция",
    "Black Friday",
    "Приветственная серия",
    "Реактивация клиентов",
  ];
  
  const statuses: SendRecord["status"][] = ["sent", "delivered", "opened", "clicked", "replied", "bounced", "failed", "scheduled"];
  const emailAccounts = ["sender1@company.com", "sender2@company.com", "noreply@company.com"];
  
  const data: SendRecord[] = [];
  
  for (let i = 0; i < 500; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const sentAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    data.push({
      id: `send-${i + 1}`,
      campaignName: campaigns[Math.floor(Math.random() * campaigns.length)],
      campaignId: `camp-${Math.floor(Math.random() * 5) + 1}`,
      recipientEmail: `user${i + 1}@example.com`,
      recipientName: `Пользователь ${i + 1}`,
      subject: `Тема письма ${i + 1}`,
      status,
      sentAt,
      openedAt: ["opened", "clicked", "replied"].includes(status) ? new Date(sentAt.getTime() + Math.random() * 24 * 60 * 60 * 1000) : undefined,
      clickedAt: ["clicked", "replied"].includes(status) ? new Date(sentAt.getTime() + Math.random() * 48 * 60 * 60 * 1000) : undefined,
      repliedAt: status === "replied" ? new Date(sentAt.getTime() + Math.random() * 72 * 60 * 60 * 1000) : undefined,
      emailAccount: emailAccounts[Math.floor(Math.random() * emailAccounts.length)],
      messageId: `msg-${Date.now()}-${i}`,
      opens: ["opened", "clicked", "replied"].includes(status) ? Math.floor(Math.random() * 5) + 1 : 0,
      clicks: ["clicked", "replied"].includes(status) ? Math.floor(Math.random() * 3) + 1 : 0,
      bounceReason: status === "bounced" ? "Почтовый ящик не существует" : undefined,
      errorMessage: status === "failed" ? "Превышен лимит отправки" : undefined,
    });
  }
  
  return data.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
};

export default function AllSends() {
  const [sends] = useState<SendRecord[]>(generateMockData());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [selectedSend, setSelectedSend] = useState<SendRecord | null>(null);

  const getStatusBadge = (status: SendRecord["status"]) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-gradient-blue text-white border-0"><Send className="mr-1 h-3 w-3" />Отправлено</Badge>;
      case "delivered":
        return <Badge className="bg-gradient-green text-white border-0"><CheckCircle2 className="mr-1 h-3 w-3" />Доставлено</Badge>;
      case "opened":
        return <Badge className="bg-gradient-purple text-white border-0"><Eye className="mr-1 h-3 w-3" />Открыто</Badge>;
      case "clicked":
        return <Badge className="bg-gradient-orange text-white border-0"><Target className="mr-1 h-3 w-3" />Клик</Badge>;
      case "replied":
        return <Badge className="bg-gradient-pink text-white border-0"><Mail className="mr-1 h-3 w-3" />Ответ</Badge>;
      case "bounced":
        return <Badge className="bg-gradient-yellow text-white border-0"><AlertCircle className="mr-1 h-3 w-3" />Отскок</Badge>;
      case "failed":
        return <Badge className="bg-gradient-red text-white border-0"><XCircle className="mr-1 h-3 w-3" />Ошибка</Badge>;
      case "scheduled":
        return <Badge className="bg-muted text-muted-foreground border-0"><Clock className="mr-1 h-3 w-3" />Запланировано</Badge>;
    }
  };

  const filteredSends = sends.filter(send => {
    // Фильтр по поиску
    if (searchQuery && !send.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !send.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !send.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !send.campaignName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Фильтр по статусу
    if (statusFilter !== "all" && send.status !== statusFilter) {
      return false;
    }
    
    // Фильтр по кампании
    if (campaignFilter !== "all" && send.campaignId !== campaignFilter) {
      return false;
    }
    
    // Фильтр по дате
    if (dateRange.from && send.sentAt < dateRange.from) {
      return false;
    }
    if (dateRange.to && send.sentAt > dateRange.to) {
      return false;
    }
    
    return true;
  });

  const campaigns = Array.from(new Set(sends.map(s => s.campaignId))).map(id => ({
    id,
    name: sends.find(s => s.campaignId === id)?.campaignName || ""
  }));

  // Статистика
  const stats = {
    total: filteredSends.length,
    delivered: filteredSends.filter(s => s.status === "delivered").length,
    opened: filteredSends.filter(s => s.status === "opened").length,
    clicked: filteredSends.filter(s => s.status === "clicked").length,
    replied: filteredSends.filter(s => s.status === "replied").length,
    bounced: filteredSends.filter(s => s.status === "bounced").length,
    failed: filteredSends.filter(s => s.status === "failed").length,
  };

  const openRate = stats.total > 0 ? ((stats.opened + stats.clicked + stats.replied) / stats.total * 100).toFixed(1) : "0";
  const clickRate = stats.total > 0 ? ((stats.clicked + stats.replied) / stats.total * 100).toFixed(1) : "0";
  const replyRate = stats.total > 0 ? (stats.replied / stats.total * 100).toFixed(1) : "0";
  const bounceRate = stats.total > 0 ? (stats.bounced / stats.total * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Все отправки</h1>
        <p className="text-muted-foreground">
          Детальный отчет по всем отправленным письмам
        </p>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Открытия</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.opened + stats.clicked + stats.replied} из {stats.total}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Клики</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clickRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.clicked + stats.replied} из {stats.total}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ответы</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{replyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.replied} из {stats.total}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Отскоки</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bounceRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.bounced} из {stats.total}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Фильтры */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
          <CardDescription>
            Используйте фильтры для поиска нужных отправок
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по email, имени, теме..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="sent">Отправлено</SelectItem>
                <SelectItem value="delivered">Доставлено</SelectItem>
                <SelectItem value="opened">Открыто</SelectItem>
                <SelectItem value="clicked">Клик</SelectItem>
                <SelectItem value="replied">Ответ</SelectItem>
                <SelectItem value="bounced">Отскок</SelectItem>
                <SelectItem value="failed">Ошибка</SelectItem>
                <SelectItem value="scheduled">Запланировано</SelectItem>
              </SelectContent>
            </Select>

            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Кампания" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все кампании</SelectItem>
                {campaigns.map(campaign => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd MMM", { locale: ru })} -{" "}
                        {format(dateRange.to, "dd MMM yyyy", { locale: ru })}
                      </>
                    ) : (
                      format(dateRange.from, "dd MMM yyyy", { locale: ru })
                    )
                  ) : (
                    <span>Выберите период</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range: any) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Таблица отправок */}
      <Card>
        <CardHeader>
          <CardTitle>История отправок ({filteredSends.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Время</TableHead>
                <TableHead>Кампания</TableHead>
                <TableHead>Получатель</TableHead>
                <TableHead>Тема</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Аккаунт</TableHead>
                <TableHead>Активность</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSends.slice(0, 20).map((send) => (
                <TableRow key={send.id}>
                  <TableCell className="text-muted-foreground">
                    {format(send.sentAt, "dd.MM.yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {send.campaignName}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{send.recipientEmail}</div>
                      <div className="text-sm text-muted-foreground">{send.recipientName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {send.subject}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(send.status)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {send.emailAccount}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 text-sm">
                      {send.opens > 0 && (
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {send.opens}
                        </span>
                      )}
                      {send.clicks > 0 && (
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {send.clicks}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedSend(send)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Диалог с деталями */}
      <Dialog open={!!selectedSend} onOpenChange={(open) => !open && setSelectedSend(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали отправки</DialogTitle>
            <DialogDescription>
              Полная информация об отправленном письме
            </DialogDescription>
          </DialogHeader>
          {selectedSend && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Кампания</div>
                  <div className="font-medium">{selectedSend.campaignName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Статус</div>
                  <div className="mt-1">{getStatusBadge(selectedSend.status)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Получатель</div>
                  <div className="font-medium">{selectedSend.recipientEmail}</div>
                  <div className="text-sm text-muted-foreground">{selectedSend.recipientName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email аккаунт</div>
                  <div className="font-medium">{selectedSend.emailAccount}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Message ID</div>
                  <div className="font-mono text-xs">{selectedSend.messageId}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Отправлено</div>
                  <div className="font-medium">
                    {format(selectedSend.sentAt, "dd.MM.yyyy HH:mm:ss")}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Тема письма</div>
                <div className="font-medium">{selectedSend.subject}</div>
              </div>

              {selectedSend.openedAt && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">История активности</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="h-3 w-3" />
                      <span>Открыто: {format(selectedSend.openedAt, "dd.MM.yyyy HH:mm:ss")}</span>
                      <Badge variant="outline" className="text-xs">{selectedSend.opens} раз</Badge>
                    </div>
                    {selectedSend.clickedAt && (
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-3 w-3" />
                        <span>Клик: {format(selectedSend.clickedAt, "dd.MM.yyyy HH:mm:ss")}</span>
                        <Badge variant="outline" className="text-xs">{selectedSend.clicks} раз</Badge>
                      </div>
                    )}
                    {selectedSend.repliedAt && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>Ответ: {format(selectedSend.repliedAt, "dd.MM.yyyy HH:mm:ss")}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedSend.bounceReason && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                  <div className="text-sm font-medium text-destructive">Причина отскока</div>
                  <div className="text-sm mt-1">{selectedSend.bounceReason}</div>
                </div>
              )}

              {selectedSend.errorMessage && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                  <div className="text-sm font-medium text-destructive">Ошибка отправки</div>
                  <div className="text-sm mt-1">{selectedSend.errorMessage}</div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}