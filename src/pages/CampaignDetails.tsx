import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft,
  Mail,
  Users,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MousePointer,
  Reply,
  Send,
  Calendar,
  BarChart3,
  Download,
  Edit,
  Play,
  Pause,
  Copy,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Пример данных кампании
  const campaign = {
    id: id,
    name: "Новый продукт Q1 2024",
    status: "active",
    type: "cold",
    createdDate: new Date(2024, 0, 10),
    startDate: new Date(2024, 0, 15),
    subject: "Инновационное решение для автоматизации вашего бизнеса",
    template: "tech-product-launch",
    description: "Кампания по продвижению нового продукта для B2B сегмента в технологическом секторе",
    stats: {
      sent: 2456,
      delivered: 2398,
      opened: 1199,
      clicked: 359,
      replied: 87,
      bounced: 58,
      unsubscribed: 12,
      conversion: 23,
    },
    rates: {
      deliveryRate: 97.6,
      openRate: 50.0,
      clickRate: 15.0,
      replyRate: 3.6,
      bounceRate: 2.4,
      conversionRate: 0.96,
    },
    audience: {
      total: 2456,
      segments: [
        { name: "IT директора", count: 823, percentage: 33.5 },
        { name: "CEO/Founder", count: 612, percentage: 24.9 },
        { name: "CTO", count: 589, percentage: 24.0 },
        { name: "Менеджеры", count: 432, percentage: 17.6 },
      ],
    },
    performance: {
      bestDay: "Вторник",
      bestTime: "10:00 - 11:00",
      avgResponseTime: "4.2 часа",
      topDomain: "gmail.com",
    },
  };

  // Данные для графиков
  const hourlyData = [
    { hour: "00:00", sent: 0, opened: 0, clicked: 0 },
    { hour: "06:00", sent: 145, opened: 23, clicked: 5 },
    { hour: "09:00", sent: 423, opened: 189, clicked: 45 },
    { hour: "10:00", sent: 512, opened: 287, clicked: 89 },
    { hour: "11:00", sent: 489, opened: 245, clicked: 67 },
    { hour: "12:00", sent: 234, opened: 98, clicked: 34 },
    { hour: "14:00", sent: 345, opened: 156, clicked: 45 },
    { hour: "16:00", sent: 267, opened: 134, clicked: 38 },
    { hour: "18:00", sent: 41, opened: 67, clicked: 36 },
  ];

  const dailyData = [
    { day: "Пн", sent: 345, opened: 172, clicked: 45, replied: 12 },
    { day: "Вт", sent: 512, opened: 298, clicked: 89, replied: 23 },
    { day: "Ср", sent: 423, opened: 201, clicked: 67, replied: 18 },
    { day: "Чт", sent: 389, opened: 178, clicked: 56, replied: 15 },
    { day: "Пт", sent: 456, opened: 234, clicked: 78, replied: 19 },
    { day: "Сб", sent: 189, opened: 67, clicked: 12, replied: 0 },
    { day: "Вс", sent: 142, opened: 49, clicked: 9, replied: 0 },
  ];

  const conversionFunnel = [
    { stage: "Отправлено", value: 2456, percentage: 100 },
    { stage: "Доставлено", value: 2398, percentage: 97.6 },
    { stage: "Открыто", value: 1199, percentage: 50.0 },
    { stage: "Клики", value: 359, percentage: 15.0 },
    { stage: "Ответы", value: 87, percentage: 3.6 },
    { stage: "Конверсии", value: 23, percentage: 0.96 },
  ];

  const pieData = [
    { name: "Открыто", value: 1199, color: "hsl(var(--success))" },
    { name: "Не открыто", value: 1199, color: "hsl(var(--muted))" },
    { name: "Отказы", value: 58, color: "hsl(var(--destructive))" },
  ];

  const recentActivity = [
    {
      id: "1",
      type: "reply",
      contact: "Александр Петров",
      company: "TechCorp",
      action: "ответил на письмо",
      time: new Date(2024, 0, 15, 14, 30),
    },
    {
      id: "2",
      type: "click",
      contact: "Мария Иванова",
      company: "StartupHub",
      action: "перешел по ссылке",
      time: new Date(2024, 0, 15, 13, 45),
    },
    {
      id: "3",
      type: "open",
      contact: "Дмитрий Сидоров",
      company: "InnovateLab",
      action: "открыл письмо",
      time: new Date(2024, 0, 15, 12, 15),
    },
  ];

  // Данные контактов для кампании
  const campaignContacts = [
    {
      id: "1",
      name: "Александр Петров",
      email: "a.petrov@techcorp.com",
      company: "TechCorp",
      status: "replied",
      sentAt: new Date(2024, 0, 15, 9, 30),
      openedAt: new Date(2024, 0, 15, 10, 15),
      clickedAt: new Date(2024, 0, 15, 10, 20),
      repliedAt: new Date(2024, 0, 15, 14, 30),
    },
    {
      id: "2",
      name: "Мария Иванова",
      email: "m.ivanova@startuphub.com",
      company: "StartupHub",
      status: "clicked",
      sentAt: new Date(2024, 0, 15, 9, 30),
      openedAt: new Date(2024, 0, 15, 11, 45),
      clickedAt: new Date(2024, 0, 15, 13, 45),
      repliedAt: null,
    },
    {
      id: "3",
      name: "Дмитрий Сидоров",
      email: "d.sidorov@innovatelab.com",
      company: "InnovateLab",
      status: "opened",
      sentAt: new Date(2024, 0, 15, 9, 30),
      openedAt: new Date(2024, 0, 15, 12, 15),
      clickedAt: null,
      repliedAt: null,
    },
    {
      id: "4",
      name: "Елена Козлова",
      email: "e.kozlova@digitalagency.ru",
      company: "Digital Agency",
      status: "sent",
      sentAt: new Date(2024, 0, 15, 9, 30),
      openedAt: null,
      clickedAt: null,
      repliedAt: null,
    },
    {
      id: "5",
      name: "Игорь Новиков",
      email: "i.novikov@cloudtech.com",
      company: "CloudTech",
      status: "bounced",
      sentAt: new Date(2024, 0, 15, 9, 30),
      openedAt: null,
      clickedAt: null,
      repliedAt: null,
    },
    {
      id: "6",
      name: "Ольга Смирнова",
      email: "o.smirnova@fintech.io",
      company: "FinTech Solutions",
      status: "unsubscribed",
      sentAt: new Date(2024, 0, 15, 9, 30),
      openedAt: new Date(2024, 0, 15, 10, 45),
      clickedAt: null,
      repliedAt: null,
    },
    {
      id: "7",
      name: "Павел Морозов",
      email: "p.morozov@consulting.com",
      company: "Business Consulting",
      status: "opened",
      sentAt: new Date(2024, 0, 15, 9, 31),
      openedAt: new Date(2024, 0, 15, 14, 20),
      clickedAt: null,
      repliedAt: null,
    },
    {
      id: "8",
      name: "Анна Волкова",
      email: "a.volkova@retail.ru",
      company: "Retail Group",
      status: "replied",
      sentAt: new Date(2024, 0, 15, 9, 31),
      openedAt: new Date(2024, 0, 15, 15, 10),
      clickedAt: new Date(2024, 0, 15, 15, 12),
      repliedAt: new Date(2024, 0, 15, 16, 45),
    },
  ];

  const getContactStatusBadge = (status: string) => {
    switch (status) {
      case "replied":
        return <Badge className="bg-success/10 text-success border-success/20">Ответил</Badge>;
      case "clicked":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Кликнул</Badge>;
      case "opened":
        return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Открыл</Badge>;
      case "sent":
        return <Badge className="bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20">Отправлено</Badge>;
      case "bounced":
        return <Badge variant="destructive">Отказ</Badge>;
      case "unsubscribed":
        return <Badge variant="outline">Отписался</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "paused":
        return "secondary";
      case "completed":
        return "outline";
      default:
        return "outline";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "reply":
        return <Reply className="h-4 w-4 text-success" />;
      case "click":
        return <MousePointer className="h-4 w-4 text-primary" />;
      case "open":
        return <Eye className="h-4 w-4 text-secondary" />;
      default:
        return <Mail className="h-4 w-4 text-muted-foreground" />;
    }
  };

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
            <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={getStatusColor(campaign.status)}>
                {campaign.status === "active" ? "Активна" : 
                 campaign.status === "paused" ? "На паузе" : "Завершена"}
              </Badge>
              <Badge variant="outline">{campaign.type === "cold" ? "Холодная" : "Теплая"}</Badge>
              <span className="text-sm text-muted-foreground">
                Создана {format(campaign.createdDate, "d MMMM yyyy", { locale: ru })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Дублировать
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Редактировать
          </Button>
          <Button size="sm" variant={campaign.status === "active" ? "destructive" : "default"}>
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
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Отправлено</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.sent}</div>
            <Progress value={100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Открыто</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.opened}</div>
            <p className="text-xs text-muted-foreground">{campaign.rates.openRate}%</p>
            <Progress value={campaign.rates.openRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Клики</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.clicked}</div>
            <p className="text-xs text-muted-foreground">{campaign.rates.clickRate}%</p>
            <Progress value={campaign.rates.clickRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Ответы</CardTitle>
              <Reply className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.replied}</div>
            <p className="text-xs text-muted-foreground">{campaign.rates.replyRate}%</p>
            <Progress value={campaign.rates.replyRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.stats.conversion}</div>
            <p className="text-xs text-muted-foreground">{campaign.rates.conversionRate}%</p>
            <Progress value={campaign.rates.conversionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="audience">Аудитория</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Info */}
            <Card>
              <CardHeader>
                <CardTitle>Информация о кампании</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Описание</p>
                  <p className="mt-1">{campaign.description}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Тема письма</p>
                  <p className="mt-1 font-medium">{campaign.subject}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Начало кампании</p>
                    <p className="mt-1 font-medium">
                      {format(campaign.startDate, "d MMMM yyyy", { locale: ru })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Шаблон</p>
                    <p className="mt-1 font-medium">{campaign.template}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Ключевые показатели</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Лучший день</span>
                    </div>
                    <p className="font-medium">{campaign.performance.bestDay}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Лучшее время</span>
                    </div>
                    <p className="font-medium">{campaign.performance.bestTime}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Reply className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Среднее время ответа</span>
                    </div>
                    <p className="font-medium">{campaign.performance.avgResponseTime}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Топ домен</span>
                    </div>
                    <p className="font-medium">{campaign.performance.topDomain}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставлено</span>
                    <span className="font-medium">{campaign.rates.deliveryRate}%</span>
                  </div>
                  <Progress value={campaign.rates.deliveryRate} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Отказы</span>
                    <span className="font-medium">{campaign.rates.bounceRate}%</span>
                  </div>
                  <Progress value={campaign.rates.bounceRate} className="bg-destructive/20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Воронка конверсии</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnel.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium">{stage.stage}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-lg">{stage.value}</span>
                        <span className="text-sm text-muted-foreground ml-2">({stage.percentage}%)</span>
                      </div>
                    </div>
                    <Progress 
                      value={stage.percentage} 
                      className="h-2"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) ${stage.percentage}%, hsl(var(--muted)) ${stage.percentage}%)`
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Активность по часам</CardTitle>
                <CardDescription>Распределение отправок и активности</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sent" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" name="Отправлено" />
                    <Area type="monotone" dataKey="opened" stackId="2" stroke="hsl(var(--success))" fill="hsl(var(--success))" name="Открыто" />
                    <Area type="monotone" dataKey="clicked" stackId="3" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" name="Клики" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Активность по дням</CardTitle>
                <CardDescription>Эффективность по дням недели</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sent" fill="hsl(var(--primary))" name="Отправлено" />
                    <Bar dataKey="opened" fill="hsl(var(--success))" name="Открыто" />
                    <Bar dataKey="clicked" fill="hsl(var(--warning))" name="Клики" />
                    <Bar dataKey="replied" fill="hsl(var(--info))" name="Ответы" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Email Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Распределение статусов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="col-span-2 space-y-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.value} писем</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Контакты кампании</CardTitle>
              <CardDescription>
                Статус отправки писем для всех контактов в кампании
              </CardDescription>
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
                    <TableHead>Кликнул</TableHead>
                    <TableHead>Ответил</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{getContactStatusBadge(contact.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contact.sentAt ? format(contact.sentAt, "HH:mm", { locale: ru }) : "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contact.openedAt ? format(contact.openedAt, "HH:mm", { locale: ru }) : "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contact.clickedAt ? format(contact.clickedAt, "HH:mm", { locale: ru }) : "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contact.repliedAt ? format(contact.repliedAt, "HH:mm", { locale: ru }) : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Сегменты аудитории</CardTitle>
              <CardDescription>Распределение получателей по сегментам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaign.audience.segments.map((segment) => (
                  <div key={segment.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{segment.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{segment.count}</span>
                        <span className="text-sm text-muted-foreground ml-2">({segment.percentage}%)</span>
                      </div>
                    </div>
                    <Progress value={segment.percentage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
              <CardDescription>Недавние действия получателей</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.contact}</span>
                          <span className="text-muted-foreground"> из </span>
                          <span className="font-medium">{activity.company}</span>
                          <span className="text-muted-foreground"> {activity.action}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(activity.time, "d MMM в HH:mm", { locale: ru })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки кампании</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">График отправки</p>
                <p className="text-sm text-muted-foreground">
                  Ежедневно с 9:00 до 18:00 по московскому времени
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Лимит отправок</p>
                <p className="text-sm text-muted-foreground">
                  500 писем в день
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Отслеживание</p>
                <div className="flex items-center gap-4">
                  <Badge variant="default">Открытия</Badge>
                  <Badge variant="default">Клики</Badge>
                  <Badge variant="default">Ответы</Badge>
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