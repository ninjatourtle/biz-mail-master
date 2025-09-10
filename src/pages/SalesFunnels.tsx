import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Mail, DollarSign, ArrowRight, Plus, Edit, Trash2, Play, Pause, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FunnelStep {
  id: string;
  name: string;
  type: "email" | "delay" | "condition";
  contacts: number;
  conversion: number;
  revenue: number;
}

interface Funnel {
  id: string;
  name: string;
  status: "active" | "paused" | "draft";
  steps: FunnelStep[];
  totalContacts: number;
  totalRevenue: number;
  conversionRate: number;
  created: string;
}

const mockFunnels: Funnel[] = [
  {
    id: "1",
    name: "Онбординг новых клиентов",
    status: "active",
    steps: [
      { id: "1", name: "Приветственное письмо", type: "email", contacts: 1000, conversion: 65, revenue: 0 },
      { id: "2", name: "Ожидание 1 день", type: "delay", contacts: 650, conversion: 100, revenue: 0 },
      { id: "3", name: "Обучающий контент", type: "email", contacts: 650, conversion: 45, revenue: 0 },
      { id: "4", name: "Ожидание 3 дня", type: "delay", contacts: 293, conversion: 100, revenue: 0 },
      { id: "5", name: "Специальное предложение", type: "email", contacts: 293, conversion: 25, revenue: 73250 },
    ],
    totalContacts: 1000,
    totalRevenue: 73250,
    conversionRate: 7.3,
    created: "2024-03-01",
  },
  {
    id: "2",
    name: "Реактивация неактивных",
    status: "active",
    steps: [
      { id: "1", name: "Напоминание", type: "email", contacts: 500, conversion: 30, revenue: 0 },
      { id: "2", name: "Ожидание 7 дней", type: "delay", contacts: 150, conversion: 100, revenue: 0 },
      { id: "3", name: "Скидка 20%", type: "email", contacts: 150, conversion: 20, revenue: 15000 },
    ],
    totalContacts: 500,
    totalRevenue: 15000,
    conversionRate: 6.0,
    created: "2024-02-15",
  },
];

export default function SalesFunnels() {
  const [funnels] = useState<Funnel[]>(mockFunnels);
  const [selectedFunnel, setSelectedFunnel] = useState<Funnel | null>(funnels[0]);
  const [createMode, setCreateMode] = useState(false);

  const getStatusBadge = (status: Funnel["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-gradient-green text-white border-0">
            <Play className="h-3 w-3 mr-1" />
            Активна
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-gradient-yellow text-white border-0">
            <Pause className="h-3 w-3 mr-1" />
            Приостановлена
          </Badge>
        );
      default:
        return <Badge variant="outline">Черновик</Badge>;
    }
  };

  const getStepIcon = (type: FunnelStep["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "delay":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const handleCreateFunnel = () => {
    setCreateMode(true);
    toast({
      title: "Создание воронки",
      description: "Настройте последовательность писем",
    });
  };

  const calculateDropoff = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((previous - current) / previous * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Воронки продаж</h1>
          <p className="text-muted-foreground">
            Автоматизированные последовательности для конверсии
          </p>
        </div>
        <Button variant="gradient" onClick={handleCreateFunnel}>
          <Plus className="h-4 w-4 mr-2" />
          Новая воронка
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Активные воронки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {funnels.filter(f => f.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Из {funnels.length} всего</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Контакты в воронках</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {funnels.reduce((sum, f) => sum + f.totalContacts, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Всего обработано</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Общий доход</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient-green">
              ₽{funnels.reduce((sum, f) => sum + f.totalRevenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">За все время</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Средняя конверсия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(funnels.reduce((sum, f) => sum + f.conversionRate, 0) / funnels.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">По всем воронкам</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Воронки</CardTitle>
              <CardDescription>Выберите воронку для просмотра</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {funnels.map((funnel) => (
                <div
                  key={funnel.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedFunnel?.id === funnel.id ? "bg-muted border-primary" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedFunnel(funnel)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{funnel.name}</div>
                    {getStatusBadge(funnel.status)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {funnel.steps.length} шагов • {funnel.totalContacts.toLocaleString()} контактов
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gradient-green font-medium">
                        ₽{funnel.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      Конверсия: <span className="font-medium">{funnel.conversionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedFunnel && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedFunnel.name}</CardTitle>
                    <CardDescription>
                      Создана {selectedFunnel.created} • {selectedFunnel.totalContacts.toLocaleString()} контактов
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="flow">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="flow">Схема воронки</TabsTrigger>
                    <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                  </TabsList>

                  <TabsContent value="flow" className="space-y-4">
                    <div className="space-y-3">
                      {selectedFunnel.steps.map((step, index) => {
                        const previousContacts = index > 0 ? selectedFunnel.steps[index - 1].contacts : selectedFunnel.totalContacts;
                        const dropoff = calculateDropoff(step.contacts, previousContacts);
                        
                        return (
                          <div key={step.id}>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                {getStepIcon(step.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">{step.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {step.contacts.toLocaleString()} контактов
                                      {step.type === "email" && dropoff !== "0.0" && (
                                        <span className="text-gradient-red ml-2">
                                          (-{dropoff}%)
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {step.revenue > 0 && (
                                    <div className="text-right">
                                      <div className="text-sm font-medium text-gradient-green">
                                        ₽{step.revenue.toLocaleString()}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        Доход
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {step.type === "email" && (
                                  <Progress value={step.conversion} className="h-1 mt-2" />
                                )}
                              </div>
                            </div>
                            {index < selectedFunnel.steps.length - 1 && (
                              <div className="flex justify-center my-2">
                                <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Общая конверсия</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{selectedFunnel.conversionRate}%</div>
                          <Progress value={selectedFunnel.conversionRate} className="h-2 mt-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Доход на контакт</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-gradient-green">
                            ₽{Math.round(selectedFunnel.totalRevenue / selectedFunnel.totalContacts)}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Средний показатель
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Эффективность шагов</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedFunnel.steps.filter(s => s.type === "email").map((step) => (
                            <div key={step.id} className="flex items-center justify-between">
                              <span className="text-sm">{step.name}</span>
                              <div className="flex items-center gap-2">
                                <Progress value={step.conversion} className="h-2 w-[100px]" />
                                <span className="text-sm font-medium w-[50px] text-right">
                                  {step.conversion}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}