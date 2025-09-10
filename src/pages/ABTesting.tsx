import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Beaker, Mail, Users, Target, TrendingUp, Copy, Trash2, Play, Pause, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ABTest {
  id: string;
  name: string;
  status: "draft" | "running" | "completed" | "paused";
  variantA: {
    name: string;
    subject: string;
    content: string;
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
  };
  variantB: {
    name: string;
    subject: string;
    content: string;
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
  };
  winner?: "A" | "B";
  confidence: number;
  startDate: string;
  endDate?: string;
  audience: number;
  splitRatio: string;
}

const mockTests: ABTest[] = [
  {
    id: "1",
    name: "Тест темы письма - Скидки",
    status: "completed",
    variantA: {
      name: "Вариант A",
      subject: "Скидка 20% только сегодня!",
      content: "Специальное предложение для вас...",
      sent: 5000,
      opened: 1500,
      clicked: 450,
      converted: 90,
    },
    variantB: {
      name: "Вариант B",
      subject: "Ваша персональная скидка внутри 🎁",
      content: "Специальное предложение для вас...",
      sent: 5000,
      opened: 2100,
      clicked: 735,
      converted: 162,
    },
    winner: "B",
    confidence: 95.8,
    startDate: "2024-03-15",
    endDate: "2024-03-18",
    audience: 10000,
    splitRatio: "50/50",
  },
  {
    id: "2",
    name: "Тест времени отправки",
    status: "running",
    variantA: {
      name: "Утро (9:00)",
      subject: "Начните день с наших новостей",
      content: "Доброе утро! У нас есть для вас...",
      sent: 3000,
      opened: 720,
      clicked: 180,
      converted: 36,
    },
    variantB: {
      name: "Вечер (19:00)",
      subject: "Начните день с наших новостей",
      content: "Добрый вечер! У нас есть для вас...",
      sent: 2800,
      opened: 980,
      clicked: 294,
      converted: 71,
    },
    confidence: 72.3,
    startDate: "2024-03-20",
    audience: 8000,
    splitRatio: "50/50",
  },
];

export default function ABTesting() {
  const [tests] = useState<ABTest[]>(mockTests);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(tests[0]);
  const [newTestMode, setNewTestMode] = useState(false);

  const getStatusBadge = (status: ABTest["status"]) => {
    switch (status) {
      case "running":
        return (
          <Badge className="bg-gradient-blue text-white border-0">
            <Play className="h-3 w-3 mr-1" />
            Запущен
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gradient-green text-white border-0">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Завершен
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
        return (
          <Badge variant="outline">
            Черновик
          </Badge>
        );
    }
  };

  const calculateMetrics = (variant: ABTest["variantA"] | ABTest["variantB"]) => {
    const openRate = variant.sent > 0 ? (variant.opened / variant.sent * 100).toFixed(1) : "0";
    const clickRate = variant.opened > 0 ? (variant.clicked / variant.opened * 100).toFixed(1) : "0";
    const conversionRate = variant.clicked > 0 ? (variant.converted / variant.clicked * 100).toFixed(1) : "0";
    
    return { openRate, clickRate, conversionRate };
  };

  const getComparisonData = () => {
    if (!selectedTest) return [];
    
    const metricsA = calculateMetrics(selectedTest.variantA);
    const metricsB = calculateMetrics(selectedTest.variantB);
    
    return [
      {
        metric: "Открытия",
        "Вариант A": parseFloat(metricsA.openRate),
        "Вариант B": parseFloat(metricsB.openRate),
      },
      {
        metric: "Клики",
        "Вариант A": parseFloat(metricsA.clickRate),
        "Вариант B": parseFloat(metricsB.clickRate),
      },
      {
        metric: "Конверсия",
        "Вариант A": parseFloat(metricsA.conversionRate),
        "Вариант B": parseFloat(metricsB.conversionRate),
      },
    ];
  };

  const getPieData = () => {
    if (!selectedTest) return [];
    
    return [
      { name: selectedTest.variantA.name, value: selectedTest.variantA.converted, fill: "hsl(var(--primary))" },
      { name: selectedTest.variantB.name, value: selectedTest.variantB.converted, fill: "hsl(var(--accent))" },
    ];
  };

  const handleCreateTest = () => {
    setNewTestMode(true);
    toast({
      title: "Создание A/B теста",
      description: "Заполните параметры для нового теста",
    });
  };

  const handleDuplicateTest = () => {
    toast({
      title: "Тест дублирован",
      description: "Создана копия выбранного теста",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">A/B Тестирование</h1>
          <p className="text-muted-foreground">
            Сравнивайте эффективность разных вариантов рассылок
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDuplicateTest}>
            <Copy className="h-4 w-4 mr-2" />
            Дублировать
          </Button>
          <Button variant="gradient" onClick={handleCreateTest}>
            <Beaker className="h-4 w-4 mr-2" />
            Новый тест
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Активные тесты</CardTitle>
              <CardDescription>Выберите тест для просмотра</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTest?.id === test.id ? "bg-muted border-primary" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedTest(test)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{test.name}</div>
                    {getStatusBadge(test.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Аудитория: {test.audience.toLocaleString()} • {test.splitRatio}
                  </div>
                  {test.winner && (
                    <div className="text-sm mt-2">
                      <span className="text-gradient-green font-medium">
                        Победитель: Вариант {test.winner}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        ({test.confidence}% уверенность)
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedTest && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTest.name}</CardTitle>
                  <CardDescription>
                    Период: {selectedTest.startDate} - {selectedTest.endDate || "В процессе"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Обзор</TabsTrigger>
                      <TabsTrigger value="variants">Варианты</TabsTrigger>
                      <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                              {selectedTest.variantA.name}
                              {selectedTest.winner === "A" && (
                                <Badge className="ml-2 bg-gradient-green text-white border-0">
                                  Победитель
                                </Badge>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Отправлено:</span>
                              <span className="font-medium">{selectedTest.variantA.sent.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Открыто:</span>
                              <span className="font-medium">
                                {selectedTest.variantA.opened.toLocaleString()} ({calculateMetrics(selectedTest.variantA).openRate}%)
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Кликов:</span>
                              <span className="font-medium">
                                {selectedTest.variantA.clicked.toLocaleString()} ({calculateMetrics(selectedTest.variantA).clickRate}%)
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Конверсия:</span>
                              <span className="font-medium text-gradient-green">
                                {selectedTest.variantA.converted.toLocaleString()} ({calculateMetrics(selectedTest.variantA).conversionRate}%)
                              </span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                              {selectedTest.variantB.name}
                              {selectedTest.winner === "B" && (
                                <Badge className="ml-2 bg-gradient-green text-white border-0">
                                  Победитель
                                </Badge>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Отправлено:</span>
                              <span className="font-medium">{selectedTest.variantB.sent.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Открыто:</span>
                              <span className="font-medium">
                                {selectedTest.variantB.opened.toLocaleString()} ({calculateMetrics(selectedTest.variantB).openRate}%)
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Кликов:</span>
                              <span className="font-medium">
                                {selectedTest.variantB.clicked.toLocaleString()} ({calculateMetrics(selectedTest.variantB).clickRate}%)
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Конверсия:</span>
                              <span className="font-medium text-gradient-green">
                                {selectedTest.variantB.converted.toLocaleString()} ({calculateMetrics(selectedTest.variantB).conversionRate}%)
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Статистическая значимость</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Уверенность:</span>
                              <span className={`font-medium ${selectedTest.confidence >= 95 ? "text-gradient-green" : "text-gradient-yellow"}`}>
                                {selectedTest.confidence}%
                              </span>
                            </div>
                            <Progress value={selectedTest.confidence} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              {selectedTest.confidence >= 95 
                                ? "Результаты статистически значимы. Можно принимать решение."
                                : "Требуется больше данных для достижения статистической значимости."}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="variants" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">{selectedTest.variantA.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <Label className="text-xs">Тема письма</Label>
                              <div className="mt-1 p-2 bg-muted rounded text-sm">
                                {selectedTest.variantA.subject}
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">Превью контента</Label>
                              <div className="mt-1 p-2 bg-muted rounded text-sm">
                                {selectedTest.variantA.content}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">{selectedTest.variantB.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <Label className="text-xs">Тема письма</Label>
                              <div className="mt-1 p-2 bg-muted rounded text-sm">
                                {selectedTest.variantB.subject}
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">Превью контента</Label>
                              <div className="mt-1 p-2 bg-muted rounded text-sm">
                                {selectedTest.variantB.content}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Сравнение метрик</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer
                            config={{
                              "Вариант A": {
                                label: "Вариант A",
                                color: "hsl(var(--primary))",
                              },
                              "Вариант B": {
                                label: "Вариант B",
                                color: "hsl(var(--accent))",
                              },
                            }}
                            className="h-[300px]"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={getComparisonData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="metric" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar dataKey="Вариант A" fill="hsl(var(--primary))" />
                                <Bar dataKey="Вариант B" fill="hsl(var(--accent))" />
                              </BarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Распределение конверсий</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer
                            config={{
                              conversions: {
                                label: "Конверсии",
                              },
                            }}
                            className="h-[200px]"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={getPieData()}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {getPieData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}