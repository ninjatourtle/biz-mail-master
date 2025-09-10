import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FileDown, FileSpreadsheet, CalendarIcon, Filter, RefreshCw, Send, Eye, Clock, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ReportData {
  campaigns: {
    name: string;
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
    bounced: number;
  }[];
  timeline: {
    date: string;
    sent: number;
    opened: number;
    clicked: number;
  }[];
  segments: {
    name: string;
    value: number;
    percentage: number;
  }[];
}

const mockData: ReportData = {
  campaigns: [
    { name: "Новогодняя акция", sent: 15000, opened: 8500, clicked: 2100, replied: 450, bounced: 120 },
    { name: "Черная пятница", sent: 22000, opened: 13200, clicked: 4800, replied: 890, bounced: 180 },
    { name: "Летняя распродажа", sent: 18000, opened: 9800, clicked: 3200, replied: 620, bounced: 150 },
    { name: "День рождения компании", sent: 12000, opened: 7200, clicked: 1800, replied: 380, bounced: 90 },
    { name: "Новинки марта", sent: 9000, opened: 4500, clicked: 900, replied: 180, bounced: 60 },
  ],
  timeline: [
    { date: "2024-03-01", sent: 2500, opened: 1500, clicked: 450 },
    { date: "2024-03-05", sent: 3200, opened: 2100, clicked: 680 },
    { date: "2024-03-10", sent: 2800, opened: 1900, clicked: 520 },
    { date: "2024-03-15", sent: 4500, opened: 3200, clicked: 980 },
    { date: "2024-03-20", sent: 3800, opened: 2600, clicked: 750 },
    { date: "2024-03-25", sent: 4200, opened: 3100, clicked: 890 },
  ],
  segments: [
    { name: "Активные подписчики", value: 45, percentage: 45 },
    { name: "Средняя активность", value: 30, percentage: 30 },
    { name: "Низкая активность", value: 15, percentage: 15 },
    { name: "Неактивные", value: 10, percentage: 10 },
  ],
};

export default function Reports() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 2, 1),
    to: new Date(2024, 2, 31),
  });
  const [selectedMetrics, setSelectedMetrics] = useState({
    sent: true,
    opened: true,
    clicked: true,
    replied: true,
    bounced: true,
  });
  const [reportType, setReportType] = useState("detailed");
  const [exportFormat, setExportFormat] = useState("pdf");

  const handleExport = (format: string) => {
    toast({
      title: "Экспорт отчета",
      description: `Отчет экспортируется в формате ${format.toUpperCase()}...`,
    });
    
    // Имитация скачивания
    setTimeout(() => {
      toast({
        title: "Отчет готов",
        description: `Отчет успешно экспортирован в ${format.toUpperCase()}`,
      });
    }, 2000);
  };

  const handleGenerateReport = () => {
    toast({
      title: "Генерация отчета",
      description: "Отчет генерируется, это может занять несколько секунд...",
    });
  };

  const calculateTotals = () => {
    return mockData.campaigns.reduce(
      (acc, campaign) => ({
        sent: acc.sent + campaign.sent,
        opened: acc.opened + campaign.opened,
        clicked: acc.clicked + campaign.clicked,
        replied: acc.replied + campaign.replied,
        bounced: acc.bounced + campaign.bounced,
      }),
      { sent: 0, opened: 0, clicked: 0, replied: 0, bounced: 0 }
    );
  };

  const totals = calculateTotals();
  const openRate = ((totals.opened / totals.sent) * 100).toFixed(1);
  const clickRate = ((totals.clicked / totals.opened) * 100).toFixed(1);
  const replyRate = ((totals.replied / totals.sent) * 100).toFixed(1);

  const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--muted-foreground))", "hsl(var(--secondary))"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Отчеты и экспорт</h1>
          <p className="text-muted-foreground">
            Детальная аналитика и экспорт данных
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateReport}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
          <Button
            variant="gradient"
            onClick={() => handleExport(exportFormat)}
          >
            <FileDown className="h-4 w-4 mr-2" />
            Экспортировать
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Параметры отчета</CardTitle>
            <CardDescription>Настройте фильтры и параметры</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Тип отчета</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailed">Детальный</SelectItem>
                  <SelectItem value="summary">Сводный</SelectItem>
                  <SelectItem value="comparison">Сравнительный</SelectItem>
                  <SelectItem value="custom">Пользовательский</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Период</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Метрики</Label>
              <div className="space-y-2">
                {Object.entries(selectedMetrics).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setSelectedMetrics((prev) => ({ ...prev, [key]: checked as boolean }))
                      }
                    />
                    <Label
                      htmlFor={key}
                      className="text-sm font-normal capitalize cursor-pointer"
                    >
                      {key === "sent" && "Отправлено"}
                      {key === "opened" && "Открыто"}
                      {key === "clicked" && "Клики"}
                      {key === "replied" && "Ответы"}
                      {key === "bounced" && "Отказы"}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Формат экспорта</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" variant="outline" onClick={handleGenerateReport}>
              <Filter className="h-4 w-4 mr-2" />
              Применить фильтры
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Всего отправлено</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.sent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12% за период
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Открываемость</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{openRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totals.opened.toLocaleString()} открытий
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Кликабельность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clickRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totals.clicked.toLocaleString()} кликов
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Конверсия в ответы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{replyRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totals.replied.toLocaleString()} ответов
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="timeline" className="space-y-4">
            <TabsList>
              <TabsTrigger value="timeline">Временная шкала</TabsTrigger>
              <TabsTrigger value="campaigns">По кампаниям</TabsTrigger>
              <TabsTrigger value="segments">Сегментация</TabsTrigger>
              <TabsTrigger value="table">Таблица</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика показателей</CardTitle>
                  <CardDescription>Изменение метрик во времени</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      sent: {
                        label: "Отправлено",
                        color: "hsl(var(--primary))",
                      },
                      opened: {
                        label: "Открыто",
                        color: "hsl(var(--accent))",
                      },
                      clicked: {
                        label: "Клики",
                        color: "hsl(var(--muted-foreground))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockData.timeline}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        {selectedMetrics.sent && (
                          <Area
                            type="monotone"
                            dataKey="sent"
                            stackId="1"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.6}
                          />
                        )}
                        {selectedMetrics.opened && (
                          <Area
                            type="monotone"
                            dataKey="opened"
                            stackId="1"
                            stroke="hsl(var(--accent))"
                            fill="hsl(var(--accent))"
                            fillOpacity={0.6}
                          />
                        )}
                        {selectedMetrics.clicked && (
                          <Area
                            type="monotone"
                            dataKey="clicked"
                            stackId="1"
                            stroke="hsl(var(--muted-foreground))"
                            fill="hsl(var(--muted-foreground))"
                            fillOpacity={0.6}
                          />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns">
              <Card>
                <CardHeader>
                  <CardTitle>Эффективность кампаний</CardTitle>
                  <CardDescription>Сравнение показателей по кампаниям</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      sent: {
                        label: "Отправлено",
                        color: "hsl(var(--primary))",
                      },
                      opened: {
                        label: "Открыто",
                        color: "hsl(var(--accent))",
                      },
                      clicked: {
                        label: "Клики",
                        color: "hsl(var(--secondary))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockData.campaigns}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        {selectedMetrics.sent && <Bar dataKey="sent" fill="hsl(var(--primary))" />}
                        {selectedMetrics.opened && <Bar dataKey="opened" fill="hsl(var(--accent))" />}
                        {selectedMetrics.clicked && <Bar dataKey="clicked" fill="hsl(var(--secondary))" />}
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="segments">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Активность подписчиков</CardTitle>
                    <CardDescription>Распределение по уровню вовлеченности</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        value: {
                          label: "Процент",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockData.segments}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {mockData.segments.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Детали сегментов</CardTitle>
                    <CardDescription>Подробная информация по группам</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.segments.map((segment, index) => (
                        <div key={segment.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm font-medium">{segment.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {(segment.percentage * 1000).toLocaleString()} подписчиков
                            </span>
                            <Badge variant="outline">{segment.percentage}%</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="table">
              <Card>
                <CardHeader>
                  <CardTitle>Детальные данные</CardTitle>
                  <CardDescription>Полная таблица с метриками кампаний</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Кампания</TableHead>
                          {selectedMetrics.sent && <TableHead>Отправлено</TableHead>}
                          {selectedMetrics.opened && <TableHead>Открыто</TableHead>}
                          {selectedMetrics.clicked && <TableHead>Клики</TableHead>}
                          {selectedMetrics.replied && <TableHead>Ответы</TableHead>}
                          {selectedMetrics.bounced && <TableHead>Отказы</TableHead>}
                          <TableHead>CTR</TableHead>
                          <TableHead>Статус</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockData.campaigns.map((campaign) => (
                          <TableRow key={campaign.name}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            {selectedMetrics.sent && <TableCell>{campaign.sent.toLocaleString()}</TableCell>}
                            {selectedMetrics.opened && <TableCell>{campaign.opened.toLocaleString()}</TableCell>}
                            {selectedMetrics.clicked && <TableCell>{campaign.clicked.toLocaleString()}</TableCell>}
                            {selectedMetrics.replied && <TableCell>{campaign.replied.toLocaleString()}</TableCell>}
                            {selectedMetrics.bounced && <TableCell>{campaign.bounced.toLocaleString()}</TableCell>}
                            <TableCell>
                              {((campaign.clicked / campaign.opened) * 100).toFixed(1)}%
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-gradient-green text-white border-0">
                                Завершена
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}