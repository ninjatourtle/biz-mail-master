import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Mail,
  Users,
  TrendingUp,
  Clock,
  Eye,
  MousePointer,
  Reply,
  Send,
  Download,
  Edit,
  Play,
  Pause,
  Copy,
  Search,
  MoreVertical,
  UserCheck,
  XCircle,
  AlertCircle,
  Smile,
  Frown,
  Meh,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "@/hooks/use-toast";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Основные данные кампании
  const campaign = {
    id: id,
    name: "Новый продукт Q1 2024",
    status: "active",
    subject: "Инновационное решение для вашего бизнеса",
    stats: {
      sent: 2456,
      delivered: 2398,
      opened: 1199,
      clicked: 359,
      replied: 87,
      bounced: 58,
      unsubscribed: 12,
    },
    rates: {
      deliveryRate: 97.6,
      openRate: 50.0,
      clickRate: 15.0,
      replyRate: 3.6,
      bounceRate: 2.4,
    },
  };

  // Данные для графика
  const performanceData = [
    { day: "Пн", sent: 345, opened: 172, clicked: 45, replied: 12 },
    { day: "Вт", sent: 512, opened: 298, clicked: 89, replied: 23 },
    { day: "Ср", sent: 423, opened: 201, clicked: 67, replied: 18 },
    { day: "Чт", sent: 389, opened: 178, clicked: 56, replied: 15 },
    { day: "Пт", sent: 456, opened: 234, clicked: 78, replied: 19 },
    { day: "Сб", sent: 189, opened: 67, clicked: 12, replied: 0 },
    { day: "Вс", sent: 142, opened: 49, clicked: 9, replied: 0 },
  ];

  // Анализ настроения ответов
  const sentimentAnalysis = {
    positive: 62,
    neutral: 28,
    negative: 10,
    total: 87,
  };

  // Контакты кампании
  const contacts = [
    {
      id: "1",
      name: "Александр Петров",
      email: "a.petrov@techcorp.com",
      company: "TechCorp",
      status: "replied",
      sentAt: "15.01.2024 09:30",
      openedAt: "15.01.2024 10:15",
      repliedAt: "15.01.2024 14:30",
    },
    {
      id: "2",
      name: "Мария Иванова",
      email: "m.ivanova@startuphub.com",
      company: "StartupHub",
      status: "clicked",
      sentAt: "15.01.2024 09:30",
      openedAt: "15.01.2024 11:45",
      repliedAt: null,
    },
    {
      id: "3",
      name: "Дмитрий Сидоров",
      email: "d.sidorov@innovatelab.com",
      company: "InnovateLab",
      status: "opened",
      sentAt: "15.01.2024 09:30",
      openedAt: "15.01.2024 12:15",
      repliedAt: null,
    },
    {
      id: "4",
      name: "Елена Козлова",
      email: "e.kozlova@digital.com",
      company: "Digital Agency",
      status: "sent",
      sentAt: "15.01.2024 09:30",
      openedAt: null,
      repliedAt: null,
    },
    {
      id: "5",
      name: "Сергей Николаев",
      email: "s.nikolaev@techstart.com",
      company: "TechStart",
      status: "bounced",
      sentAt: "15.01.2024 09:30",
      openedAt: null,
      repliedAt: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      replied: { variant: "default" as const, label: "Ответил", icon: Reply },
      clicked: { variant: "secondary" as const, label: "Кликнул", icon: MousePointer },
      opened: { variant: "secondary" as const, label: "Открыл", icon: Eye },
      sent: { variant: "outline" as const, label: "Отправлено", icon: Send },
      bounced: { variant: "destructive" as const, label: "Отказ", icon: XCircle },
      unsubscribed: { variant: "outline" as const, label: "Отписался", icon: AlertCircle },
    };

    const { variant, label, icon: Icon } = config[status] || config.sent;

    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `Действие "${action}" выполнено`,
    });
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/campaigns")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
            <p className="text-muted-foreground">{campaign.subject}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
            {campaign.status === "active" ? "Активна" : "Завершена"}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAction("Редактировать")}>
                <Edit className="h-4 w-4 mr-2" />
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("Дублировать")}>
                <Copy className="h-4 w-4 mr-2" />
                Дублировать
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("Экспорт")}>
                <Download className="h-4 w-4 mr-2" />
                Экспорт данных
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction(campaign.status === "active" ? "Остановить" : "Запустить")}>
                {campaign.status === "active" ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Остановить
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Запустить
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Отправлено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.sent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Доставлено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.delivered}</div>
            <p className="text-xs text-muted-foreground">
              {campaign.rates.deliveryRate}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Открыто
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.opened}</div>
            <p className="text-xs text-muted-foreground">
              {campaign.rates.openRate}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Клики
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.clicked}</div>
            <p className="text-xs text-muted-foreground">
              {campaign.rates.clickRate}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ответы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.replied}</div>
            <p className="text-xs text-muted-foreground">
              {campaign.rates.replyRate}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Отказы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.bounced}</div>
            <p className="text-xs text-muted-foreground">
              {campaign.rates.bounceRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Производительность по дням</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sent"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    name="Отправлено"
                  />
                  <Area
                    type="monotone"
                    dataKey="opened"
                    stackId="1"
                    stroke="hsl(var(--success))"
                    fill="hsl(var(--success))"
                    fillOpacity={0.2}
                    name="Открыто"
                  />
                  <Area
                    type="monotone"
                    dataKey="clicked"
                    stackId="1"
                    stroke="hsl(var(--warning))"
                    fill="hsl(var(--warning))"
                    fillOpacity={0.2}
                    name="Клики"
                  />
                  <Area
                    type="monotone"
                    dataKey="replied"
                    stackId="1"
                    stroke="hsl(var(--info))"
                    fill="hsl(var(--info))"
                    fillOpacity={0.2}
                    name="Ответы"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Воронка конверсии</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Отправлено</span>
                  <span className="font-medium">{campaign.stats.sent}</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Доставлено</span>
                  <span className="font-medium">{campaign.stats.delivered}</span>
                </div>
                <Progress value={campaign.rates.deliveryRate} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Открыто</span>
                  <span className="font-medium">{campaign.stats.opened}</span>
                </div>
                <Progress value={campaign.rates.openRate} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Клики</span>
                  <span className="font-medium">{campaign.stats.clicked}</span>
                </div>
                <Progress value={campaign.rates.clickRate} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ответы</span>
                  <span className="font-medium">{campaign.stats.replied}</span>
                </div>
                <Progress value={campaign.rates.replyRate} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Контакты кампании</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск контактов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Контакт</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Компания</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Отправлено</TableHead>
                    <TableHead>Открыто</TableHead>
                    <TableHead>Ответ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{getStatusBadge(contact.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contact.sentAt}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contact.openedAt || "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contact.repliedAt || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Динамика показателей</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="opened"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Открытия"
                  />
                  <Line
                    type="monotone"
                    dataKey="clicked"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    name="Клики"
                  />
                  <Line
                    type="monotone"
                    dataKey="replied"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    name="Ответы"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Лучшее время отправки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Вторник, 10:00-11:00</span>
                    <Badge variant="secondary">Оптимально</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Наибольший процент открытий и кликов
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Среднее время ответа</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">4.2 часа</span>
                    <Badge variant="secondary">Хорошо</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    После открытия письма
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sentiment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Анализ настроения ответов</CardTitle>
              <p className="text-sm text-muted-foreground">
                AI-анализ тональности полученных ответов
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Positive */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-success/10">
                        <Smile className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">Позитивные</p>
                        <p className="text-xs text-muted-foreground">
                          Заинтересованность, благодарность
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{sentimentAnalysis.positive}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((sentimentAnalysis.positive / sentimentAnalysis.total) * 100)}%
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={(sentimentAnalysis.positive / sentimentAnalysis.total) * 100}
                    className="h-2 bg-success/20 [&>div]:bg-success"
                  />
                </div>

                {/* Neutral */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-muted">
                        <Meh className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Нейтральные</p>
                        <p className="text-xs text-muted-foreground">
                          Вопросы, уточнения
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{sentimentAnalysis.neutral}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((sentimentAnalysis.neutral / sentimentAnalysis.total) * 100)}%
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={(sentimentAnalysis.neutral / sentimentAnalysis.total) * 100}
                    className="h-2"
                  />
                </div>

                {/* Negative */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <Frown className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="font-medium">Негативные</p>
                        <p className="text-xs text-muted-foreground">
                          Жалобы, отказы
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{sentimentAnalysis.negative}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((sentimentAnalysis.negative / sentimentAnalysis.total) * 100)}%
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={(sentimentAnalysis.negative / sentimentAnalysis.total) * 100}
                    className="h-2 bg-destructive/20 [&>div]:bg-destructive"
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Всего проанализировано:</span>
                    <span className="font-semibold">{sentimentAnalysis.total} ответов</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetails;