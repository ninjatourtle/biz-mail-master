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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
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
  Activity,
  Globe,
  Zap,
  Settings,
  Filter,
  Search,
  ChevronRight,
  MoreVertical,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Share2,
  Timer,
  MessageSquare,
  UserCheck,
  Link2,
  PieChart,
  Info,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { MetricCard } from "@/components/dashboard/MetricCard";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [timeRange, setTimeRange] = useState("7d");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Расширенные данные кампании
  const campaign = {
    id: id,
    name: "Новый продукт Q1 2024",
    status: "active",
    type: "cold",
    createdDate: new Date(2024, 0, 10),
    startDate: new Date(2024, 0, 15),
    endDate: new Date(2024, 2, 15),
    subject: "Инновационное решение для автоматизации вашего бизнеса",
    template: "tech-product-launch",
    description: "Кампания по продвижению нового продукта для B2B сегмента в технологическом секторе",
    tags: ["B2B", "Tech", "Q1", "Product Launch"],
    stats: {
      sent: 2456,
      delivered: 2398,
      opened: 1199,
      clicked: 359,
      replied: 87,
      bounced: 58,
      unsubscribed: 12,
      conversion: 23,
      pending: 21,
      spam: 3,
    },
    rates: {
      deliveryRate: 97.6,
      openRate: 50.0,
      clickRate: 15.0,
      replyRate: 3.6,
      bounceRate: 2.4,
      conversionRate: 0.96,
      spamRate: 0.12,
    },
    performance: {
      bestDay: "Вторник",
      bestTime: "10:00 - 11:00",
      avgResponseTime: "4.2 часа",
      topDomain: "gmail.com",
      avgReadTime: "18 сек",
      topDevice: "Desktop (67%)",
      topLocation: "Москва",
    },
    roi: {
      spent: 15000,
      revenue: 87000,
      roi: 480,
      costPerLead: 652,
      costPerConversion: 3782,
    },
    audience: {
      total: 2456,
      segments: [
        { name: "IT директора", count: 823, percentage: 33.5, openRate: 62, clickRate: 18 },
        { name: "CEO/Founder", count: 612, percentage: 24.9, openRate: 45, clickRate: 12 },
        { name: "CTO", count: 589, percentage: 24.0, openRate: 58, clickRate: 16 },
        { name: "Менеджеры", count: 432, percentage: 17.6, openRate: 38, clickRate: 10 },
      ],
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
    { day: "Пн", sent: 345, opened: 172, clicked: 45, replied: 12, conversion: 2 },
    { day: "Вт", sent: 512, opened: 298, clicked: 89, replied: 23, conversion: 5 },
    { day: "Ср", sent: 423, opened: 201, clicked: 67, replied: 18, conversion: 3 },
    { day: "Чт", sent: 389, opened: 178, clicked: 56, replied: 15, conversion: 4 },
    { day: "Пт", sent: 456, opened: 234, clicked: 78, replied: 19, conversion: 6 },
    { day: "Сб", sent: 189, opened: 67, clicked: 12, replied: 0, conversion: 2 },
    { day: "Вс", sent: 142, opened: 49, clicked: 9, replied: 0, conversion: 1 },
  ];

  const conversionFunnel = [
    { stage: "Отправлено", value: 2456, percentage: 100, color: "hsl(var(--primary))" },
    { stage: "Доставлено", value: 2398, percentage: 97.6, color: "hsl(var(--primary))" },
    { stage: "Открыто", value: 1199, percentage: 50.0, color: "hsl(var(--success))" },
    { stage: "Клики", value: 359, percentage: 15.0, color: "hsl(var(--warning))" },
    { stage: "Ответы", value: 87, percentage: 3.6, color: "hsl(var(--info))" },
    { stage: "Конверсии", value: 23, percentage: 0.96, color: "hsl(var(--metric-replied))" },
  ];

  const deviceData = [
    { device: "Desktop", value: 67, sessions: 1647 },
    { device: "Mobile", value: 28, sessions: 688 },
    { device: "Tablet", value: 5, sessions: 121 },
  ];

  const heatmapData = [
    { hour: "09:00", day: "Пн", value: 75 },
    { hour: "10:00", day: "Пн", value: 88 },
    { hour: "11:00", day: "Пн", value: 92 },
    { hour: "09:00", day: "Вт", value: 82 },
    { hour: "10:00", day: "Вт", value: 95 },
    { hour: "11:00", day: "Вт", value: 89 },
    { hour: "09:00", day: "Ср", value: 78 },
    { hour: "10:00", day: "Ср", value: 85 },
    { hour: "11:00", day: "Ср", value: 81 },
  ];

  const linkPerformance = [
    { url: "product-demo", clicks: 145, uniqueClicks: 98, ctr: 12.1 },
    { url: "pricing", clicks: 89, uniqueClicks: 67, ctr: 7.4 },
    { url: "case-studies", clicks: 67, uniqueClicks: 45, ctr: 5.6 },
    { url: "contact", clicks: 58, uniqueClicks: 41, ctr: 4.8 },
  ];

  const recentActivity = [
    {
      id: "1",
      type: "reply",
      contact: "Александр Петров",
      company: "TechCorp",
      action: "ответил на письмо",
      time: new Date(2024, 0, 15, 14, 30),
      message: "Заинтересованы в демо версии",
    },
    {
      id: "2",
      type: "click",
      contact: "Мария Иванова",
      company: "StartupHub",
      action: "перешел по ссылке",
      time: new Date(2024, 0, 15, 13, 45),
      link: "product-demo",
    },
    {
      id: "3",
      type: "open",
      contact: "Дмитрий Сидоров",
      company: "InnovateLab",
      action: "открыл письмо",
      time: new Date(2024, 0, 15, 12, 15),
      readTime: "23 сек",
    },
    {
      id: "4",
      type: "conversion",
      contact: "Елена Козлова",
      company: "Digital Agency",
      action: "зарегистрировался на демо",
      time: new Date(2024, 0, 15, 11, 30),
      value: "$3,500",
    },
  ];

  // Данные контактов для кампании
  const campaignContacts = [
    {
      id: "1",
      name: "Александр Петров",
      email: "a.petrov@techcorp.com",
      company: "TechCorp",
      position: "IT Director",
      status: "replied",
      score: 95,
      sentAt: new Date(2024, 0, 15, 9, 30),
      openedAt: new Date(2024, 0, 15, 10, 15),
      clickedAt: new Date(2024, 0, 15, 10, 20),
      repliedAt: new Date(2024, 0, 15, 14, 30),
      engagementScore: 95,
      tags: ["Hot Lead", "Decision Maker"],
    },
    {
      id: "2",
      name: "Мария Иванова",
      email: "m.ivanova@startuphub.com",
      company: "StartupHub",
      position: "CEO",
      status: "clicked",
      score: 75,
      sentAt: new Date(2024, 0, 15, 9, 30),
      openedAt: new Date(2024, 0, 15, 11, 45),
      clickedAt: new Date(2024, 0, 15, 13, 45),
      repliedAt: null,
      engagementScore: 75,
      tags: ["Warm Lead"],
    },
    {
      id: "3",
      name: "Дмитрий Сидоров",
      email: "d.sidorov@innovatelab.com",
      company: "InnovateLab",
      position: "CTO",
      status: "opened",
      score: 45,
      sentAt: new Date(2024, 0, 15, 9, 30),
      openedAt: new Date(2024, 0, 15, 12, 15),
      clickedAt: null,
      repliedAt: null,
      engagementScore: 45,
      tags: ["Engaged"],
    },
  ];

  const getContactStatusBadge = (status: string) => {
    const statusConfig = {
      replied: { color: "bg-success/10 text-success border-success/20", label: "Ответил", icon: Reply },
      clicked: { color: "bg-primary/10 text-primary border-primary/20", label: "Кликнул", icon: MousePointer },
      opened: { color: "bg-secondary/10 text-secondary border-secondary/20", label: "Открыл", icon: Eye },
      sent: { color: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20", label: "Отправлено", icon: Send },
      bounced: { color: "bg-destructive/10 text-destructive border-destructive/20", label: "Отказ", icon: XCircle },
      unsubscribed: { color: "bg-warning/10 text-warning border-warning/20", label: "Отписался", icon: AlertCircle },
    };

    const config = statusConfig[status] || statusConfig.sent;
    const Icon = config.icon;

    return (
      <Badge className={cn("flex items-center gap-1", config.color)}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
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
      case "conversion":
        return <Target className="h-4 w-4 text-metric-replied" />;
      default:
        return <Mail className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const filteredContacts = campaignContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-card rounded-lg p-6 border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/campaigns")}
              className="hover-scale"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {campaign.name}
                </h1>
                {isRefreshing && (
                  <RefreshCw className="h-5 w-5 text-muted-foreground animate-spin" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={getStatusColor(campaign.status)} className="animate-fade-in">
                  <Activity className="h-3 w-3 mr-1" />
                  {campaign.status === "active" ? "Активна" : 
                   campaign.status === "paused" ? "На паузе" : "Завершена"}
                </Badge>
                <Badge variant="outline" className="animate-fade-in">
                  <Zap className="h-3 w-3 mr-1" />
                  {campaign.type === "cold" ? "Холодная" : "Теплая"}
                </Badge>
                {campaign.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="animate-fade-in">
                    {tag}
                  </Badge>
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  Создана {format(campaign.createdDate, "d MMMM yyyy", { locale: ru })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleRefresh}
              className="hover-scale"
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
            <Button variant="outline" size="sm" className="hover-scale">
              <Share2 className="h-4 w-4 mr-2" />
              Поделиться
            </Button>
            <Button variant="outline" size="sm" className="hover-scale">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
            <Button variant="outline" size="sm" className="hover-scale">
              <Copy className="h-4 w-4 mr-2" />
              Дублировать
            </Button>
            <Button variant="outline" size="sm" className="hover-scale">
              <Edit className="h-4 w-4 mr-2" />
              Редактировать
            </Button>
            <Button 
              size="sm" 
              variant={campaign.status === "active" ? "destructive" : "default"}
              className="hover-scale"
            >
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

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{campaign.stats.sent}</p>
            <p className="text-xs text-muted-foreground">Отправлено</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{campaign.rates.openRate}%</p>
            <p className="text-xs text-muted-foreground">Открыто</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{campaign.rates.clickRate}%</p>
            <p className="text-xs text-muted-foreground">CTR</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-info">{campaign.rates.replyRate}%</p>
            <p className="text-xs text-muted-foreground">Ответы</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-metric-replied">{campaign.rates.conversionRate}%</p>
            <p className="text-xs text-muted-foreground">Конверсия</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">{campaign.rates.bounceRate}%</p>
            <p className="text-xs text-muted-foreground">Отказы</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{campaign.roi.roi}%</p>
            <p className="text-xs text-muted-foreground">ROI</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">₽{(campaign.roi.revenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground">Доход</p>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid grid-cols-6 lg:grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Контакты
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Вовлечение
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              Аудитория
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center gap-1">
              <Link2 className="h-3 w-3" />
              Ссылки
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              Активность
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-3 w-3" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 часа</SelectItem>
              <SelectItem value="7d">7 дней</SelectItem>
              <SelectItem value="30d">30 дней</SelectItem>
              <SelectItem value="all">Все время</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Emails отправлено"
              value={campaign.stats.sent}
              change={12}
              changeLabel="vs прошлая кампания"
              icon={<Send className="h-5 w-5" />}
              color="sent"
            />
            <MetricCard
              title="Открытия"
              value={`${campaign.stats.opened} (${campaign.rates.openRate}%)`}
              change={-5}
              changeLabel="vs прошлая кампания"
              icon={<Eye className="h-5 w-5" />}
              color="opened"
            />
            <MetricCard
              title="Ответы"
              value={`${campaign.stats.replied} (${campaign.rates.replyRate}%)`}
              change={23}
              changeLabel="vs прошлая кампания"
              icon={<Reply className="h-5 w-5" />}
              color="replied"
            />
            <MetricCard
              title="Конверсии"
              value={`${campaign.stats.conversion} (${campaign.rates.conversionRate}%)`}
              change={15}
              changeLabel="vs прошлая кампания"
              icon={<Target className="h-5 w-5" />}
              color="replied"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversion Funnel */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Воронка конверсии
                </CardTitle>
                <CardDescription>Прохождение получателей через этапы</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={conversionFunnel} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {conversionFunnel.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* ROI Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  ROI метрики
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Потрачено</span>
                    <span className="font-bold">₽{campaign.roi.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Доход</span>
                    <span className="font-bold text-success">₽{campaign.roi.revenue.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">ROI</span>
                    <span className="text-2xl font-bold text-success">{campaign.roi.roi}%</span>
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Цена за лид</span>
                      <span>₽{campaign.roi.costPerLead}</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Цена за конверсию</span>
                      <span>₽{campaign.roi.costPerConversion}</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Ежедневная производительность</CardTitle>
              <CardDescription>Активность кампании по дням недели</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="sent" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSent)" />
                  <Area type="monotone" dataKey="opened" stroke="hsl(var(--success))" fillOpacity={1} fill="url(#colorOpened)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle>Тепловая карта активности</CardTitle>
                <CardDescription>Оптимальное время для отправки</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-1">
                  {["", "09:00", "10:00", "11:00", "12:00", "14:00", "16:00", "18:00", "", "", "", ""].map((hour, i) => (
                    <div key={i} className="text-xs text-center text-muted-foreground">{hour}</div>
                  ))}
                  {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                    <>
                      <div className="text-xs text-muted-foreground py-2">{day}</div>
                      {[0, 75, 88, 92, 65, 45, 38, 25, 0, 0, 0, 0].map((value, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded"
                          style={{
                            backgroundColor: value > 0 ? `hsl(var(--primary) / ${value / 100})` : 'hsl(var(--muted))',
                          }}
                        />
                      ))}
                    </>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Устройства</CardTitle>
                <CardDescription>Распределение по типам устройств</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ device, value }) => `${device}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--warning))"][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Радар вовлеченности по сегментам</CardTitle>
              <CardDescription>Сравнение метрик по разным сегментам аудитории</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={campaign.audience.segments}>
                  <PolarGrid strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Open Rate" dataKey="openRate" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                  <Radar name="Click Rate" dataKey="clickRate" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Контакты кампании</CardTitle>
                  <CardDescription>
                    Все получатели и их статус взаимодействия
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Поиск контактов..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Фильтры
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Контакт</TableHead>
                    <TableHead>Компания</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Вовлеченность</TableHead>
                    <TableHead>Теги</TableHead>
                    <TableHead>Последняя активность</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id} className="hover:bg-accent/5 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">{contact.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{contact.company}</div>
                          <div className="text-sm text-muted-foreground">{contact.position}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getContactStatusBadge(contact.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={contact.engagementScore} className="w-20 h-2" />
                          <span className="text-sm font-medium">{contact.engagementScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {contact.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contact.repliedAt ? format(contact.repliedAt, "d MMM HH:mm", { locale: ru }) :
                         contact.clickedAt ? format(contact.clickedAt, "d MMM HH:mm", { locale: ru }) :
                         contact.openedAt ? format(contact.openedAt, "d MMM HH:mm", { locale: ru }) :
                         "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Engagement Overview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Динамика вовлеченности</CardTitle>
                <CardDescription>Изменение метрик вовлеченности во времени</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="opened" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="clicked" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Топ вовлеченные</CardTitle>
                <CardDescription>Самые активные получатели</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {campaignContacts.slice(0, 5).map((contact, index) => (
                    <div key={contact.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                          index === 0 ? "bg-yellow-500/20 text-yellow-500" :
                          index === 1 ? "bg-gray-400/20 text-gray-400" :
                          index === 2 ? "bg-orange-500/20 text-orange-500" :
                          "bg-muted text-muted-foreground"
                        )}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.company}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{contact.engagementScore}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Среднее время чтения</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.performance.avgReadTime}</div>
                <Progress value={65} className="mt-2 h-1" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Топ устройство</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.performance.topDevice}</div>
                <Progress value={67} className="mt-2 h-1" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Время ответа</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.performance.avgResponseTime}</div>
                <Progress value={42} className="mt-2 h-1" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Топ локация</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.performance.topLocation}</div>
                <Progress value={55} className="mt-2 h-1" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <Progress value={segment.percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Open Rate: {segment.openRate}%</span>
                        <span>CTR: {segment.clickRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Производительность сегментов</CardTitle>
                <CardDescription>Сравнение метрик по сегментам</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={campaign.audience.segments}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="openRate" fill="hsl(var(--success))" name="Open Rate" />
                    <Bar dataKey="clickRate" fill="hsl(var(--primary))" name="Click Rate" />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Производительность ссылок</CardTitle>
              <CardDescription>Статистика кликов по ссылкам в письме</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL</TableHead>
                    <TableHead>Всего кликов</TableHead>
                    <TableHead>Уникальные клики</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>График</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkPerformance.map((link) => (
                    <TableRow key={link.url}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono text-sm">{link.url}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{link.clicks}</TableCell>
                      <TableCell>{link.uniqueClicks}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{link.ctr}%</Badge>
                      </TableCell>
                      <TableCell>
                        <Progress value={link.ctr * 8} className="w-20" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Лента активности</CardTitle>
                  <CardDescription>Последние действия в реальном времени</CardDescription>
                </div>
                <Badge variant="secondary" className="animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/5 transition-colors border">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.contact}</span>
                          <span className="text-muted-foreground"> из </span>
                          <span className="font-medium">{activity.company}</span>
                          <span className="text-muted-foreground"> {activity.action}</span>
                        </p>
                        {activity.message && (
                          <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                            "{activity.message}"
                          </p>
                        )}
                        {activity.link && (
                          <p className="text-sm text-primary flex items-center gap-1">
                            <Link2 className="h-3 w-3" />
                            {activity.link}
                          </p>
                        )}
                        {activity.readTime && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Timer className="h-3 w-3" />
                            Время чтения: {activity.readTime}
                          </p>
                        )}
                        {activity.value && (
                          <Badge className="bg-success/10 text-success border-success/20">{activity.value}</Badge>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {format(activity.time, "d MMM в HH:mm", { locale: ru })}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Основные настройки</CardTitle>
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
                  <p className="text-sm font-medium">Период кампании</p>
                  <p className="text-sm text-muted-foreground">
                    {format(campaign.startDate, "d MMMM yyyy", { locale: ru })} - {format(campaign.endDate, "d MMMM yyyy", { locale: ru })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Отслеживание и аналитика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Включенные метрики</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="default">Открытия</Badge>
                    <Badge variant="default">Клики</Badge>
                    <Badge variant="default">Ответы</Badge>
                    <Badge variant="default">Конверсии</Badge>
                    <Badge variant="default">Отписки</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-medium">UTM параметры</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>utm_source=email</p>
                    <p>utm_medium=campaign</p>
                    <p>utm_campaign={campaign.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetails;