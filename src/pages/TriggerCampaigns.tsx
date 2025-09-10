import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Zap, Calendar, UserPlus, ShoppingCart, Mail, Clock, Settings, Plus, Play, Pause, Trash2, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Trigger {
  id: string;
  name: string;
  type: "welcome" | "abandoned_cart" | "birthday" | "re-engagement" | "custom";
  status: "active" | "paused" | "draft";
  event: string;
  delay: string;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  lastTriggered?: string;
}

const mockTriggers: Trigger[] = [
  {
    id: "1",
    name: "Приветственная серия",
    type: "welcome",
    status: "active",
    event: "Регистрация нового пользователя",
    delay: "Сразу",
    sent: 1250,
    opened: 875,
    clicked: 312,
    converted: 156,
    lastTriggered: "5 минут назад",
  },
  {
    id: "2",
    name: "Брошенная корзина",
    type: "abandoned_cart",
    status: "active",
    event: "Корзина без покупки 2 часа",
    delay: "2 часа",
    sent: 430,
    opened: 258,
    clicked: 86,
    converted: 43,
    lastTriggered: "1 час назад",
  },
  {
    id: "3",
    name: "День рождения",
    type: "birthday",
    status: "active",
    event: "День рождения контакта",
    delay: "В 9:00 утра",
    sent: 89,
    opened: 67,
    clicked: 23,
    converted: 12,
    lastTriggered: "Сегодня в 9:00",
  },
  {
    id: "4",
    name: "Реактивация",
    type: "re-engagement",
    status: "paused",
    event: "Неактивность 30 дней",
    delay: "После 30 дней",
    sent: 320,
    opened: 128,
    clicked: 32,
    converted: 8,
    lastTriggered: "3 дня назад",
  },
];

export default function TriggerCampaigns() {
  const [triggers] = useState<Trigger[]>(mockTriggers);
  const [selectedTrigger, setSelectedTrigger] = useState<Trigger | null>(null);
  const [createMode, setCreateMode] = useState(false);

  const getTypeIcon = (type: Trigger["type"]) => {
    switch (type) {
      case "welcome":
        return <UserPlus className="h-4 w-4" />;
      case "abandoned_cart":
        return <ShoppingCart className="h-4 w-4" />;
      case "birthday":
        return <Calendar className="h-4 w-4" />;
      case "re-engagement":
        return <Clock className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: Trigger["type"]) => {
    switch (type) {
      case "welcome":
        return "bg-gradient-green text-white border-0";
      case "abandoned_cart":
        return "bg-gradient-yellow text-white border-0";
      case "birthday":
        return "bg-gradient-blue text-white border-0";
      case "re-engagement":
        return "bg-gradient-purple text-white border-0";
      default:
        return "bg-muted";
    }
  };

  const getStatusBadge = (status: Trigger["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-gradient-green text-white border-0">
            <Play className="h-3 w-3 mr-1" />
            Активен
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-gradient-yellow text-white border-0">
            <Pause className="h-3 w-3 mr-1" />
            Приостановлен
          </Badge>
        );
      default:
        return <Badge variant="outline">Черновик</Badge>;
    }
  };

  const handleCreateTrigger = () => {
    setCreateMode(true);
    toast({
      title: "Создание триггера",
      description: "Настройте автоматическую кампанию",
    });
  };

  const handleToggleStatus = (trigger: Trigger) => {
    const newStatus = trigger.status === "active" ? "paused" : "active";
    toast({
      title: newStatus === "active" ? "Триггер активирован" : "Триггер приостановлен",
      description: `${trigger.name} ${newStatus === "active" ? "запущен" : "остановлен"}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Триггерные кампании</h1>
          <p className="text-muted-foreground">
            Автоматические рассылки на основе событий
          </p>
        </div>
        <Button variant="gradient" onClick={handleCreateTrigger}>
          <Plus className="h-4 w-4 mr-2" />
          Новый триггер
        </Button>
      </div>

      {createMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Создание триггерной кампании</CardTitle>
            <CardDescription>
              Настройте автоматическую рассылку на основе событий
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="setup">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="setup">Настройка</TabsTrigger>
                <TabsTrigger value="content">Контент</TabsTrigger>
                <TabsTrigger value="conditions">Условия</TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Название триггера</Label>
                    <Input placeholder="Например: Приветственное письмо" />
                  </div>
                  <div className="space-y-2">
                    <Label>Тип триггера</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="welcome">Приветствие</SelectItem>
                        <SelectItem value="abandoned_cart">Брошенная корзина</SelectItem>
                        <SelectItem value="birthday">День рождения</SelectItem>
                        <SelectItem value="re-engagement">Реактивация</SelectItem>
                        <SelectItem value="custom">Пользовательский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Событие</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите событие" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="signup">Регистрация</SelectItem>
                        <SelectItem value="purchase">Покупка</SelectItem>
                        <SelectItem value="cart_abandon">Брошенная корзина</SelectItem>
                        <SelectItem value="page_visit">Посещение страницы</SelectItem>
                        <SelectItem value="email_open">Открытие письма</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Задержка отправки</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите задержку" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Сразу</SelectItem>
                        <SelectItem value="1h">Через 1 час</SelectItem>
                        <SelectItem value="2h">Через 2 часа</SelectItem>
                        <SelectItem value="1d">Через 1 день</SelectItem>
                        <SelectItem value="3d">Через 3 дня</SelectItem>
                        <SelectItem value="7d">Через 7 дней</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="active" />
                  <Label htmlFor="active">Активировать сразу после создания</Label>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label>Тема письма</Label>
                  <Input placeholder="Добро пожаловать в {{company_name}}!" />
                </div>
                <div className="space-y-2">
                  <Label>Шаблон письма</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите шаблон" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Приветственный</SelectItem>
                      <SelectItem value="promo">Промо предложение</SelectItem>
                      <SelectItem value="reminder">Напоминание</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="conditions" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="segment" />
                    <Label htmlFor="segment">Только для определенного сегмента</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="once" />
                    <Label htmlFor="once">Отправлять только один раз</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="working-hours" />
                    <Label htmlFor="working-hours">Только в рабочее время (9:00-18:00)</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setCreateMode(false)}>
                Отмена
              </Button>
              <Button variant="gradient">
                Создать триггер
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Активные триггеры</CardTitle>
              <CardDescription>
                Управляйте автоматическими кампаниями
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Событие</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Отправлено</TableHead>
                    <TableHead>Конверсия</TableHead>
                    <TableHead>Последний запуск</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {triggers.map((trigger) => (
                    <TableRow key={trigger.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(trigger.type)}>
                            {getTypeIcon(trigger.type)}
                          </Badge>
                          <span className="font-medium">{trigger.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{trigger.event}</TableCell>
                      <TableCell>{getStatusBadge(trigger.status)}</TableCell>
                      <TableCell>{trigger.sent.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className="text-gradient-green font-medium">
                          {((trigger.converted / trigger.sent) * 100).toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>{trigger.lastTriggered}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(trigger)}
                          >
                            {trigger.status === "active" ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTrigger(trigger)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Всего триггеров</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{triggers.length}</div>
                <p className="text-xs text-muted-foreground">
                  {triggers.filter(t => t.status === "active").length} активных
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Отправлено писем</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {triggers.reduce((sum, t) => sum + t.sent, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">За последние 30 дней</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Средняя конверсия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gradient-green">
                  {(
                    triggers.reduce((sum, t) => sum + (t.converted / t.sent) * 100, 0) /
                    triggers.length
                  ).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">По всем триггерам</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}