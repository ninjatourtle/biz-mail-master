import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Target, Users, Filter, Plus, TrendingUp, Activity, UserCheck, Settings, Copy, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Segment {
  id: string;
  name: string;
  description: string;
  contacts: number;
  conditions: string[];
  engagement: number;
  created: string;
  lastUpdated: string;
  growth: number;
  type: "behavioral" | "demographic" | "engagement" | "custom";
}

const mockSegments: Segment[] = [
  {
    id: "1",
    name: "Активные покупатели",
    description: "Клиенты с покупками за последние 30 дней",
    contacts: 2340,
    conditions: ["Покупка за последние 30 дней", "Сумма покупок > 5000₽"],
    engagement: 85,
    created: "2024-02-15",
    lastUpdated: "2024-03-20",
    growth: 12.5,
    type: "behavioral",
  },
  {
    id: "2",
    name: "VIP клиенты",
    description: "Топ 10% по сумме покупок",
    contacts: 450,
    conditions: ["Сумма покупок > 50000₽", "Количество заказов > 10"],
    engagement: 92,
    created: "2024-01-10",
    lastUpdated: "2024-03-19",
    growth: 5.2,
    type: "engagement",
  },
  {
    id: "3",
    name: "Новые подписчики",
    description: "Зарегистрировались за последние 7 дней",
    contacts: 890,
    conditions: ["Дата регистрации < 7 дней", "Не совершали покупок"],
    engagement: 45,
    created: "2024-03-01",
    lastUpdated: "2024-03-20",
    growth: 28.3,
    type: "demographic",
  },
  {
    id: "4",
    name: "Неактивные",
    description: "Не открывали письма более 60 дней",
    contacts: 1200,
    conditions: ["Последнее открытие > 60 дней", "Не отписались"],
    engagement: 12,
    created: "2024-02-20",
    lastUpdated: "2024-03-18",
    growth: -8.5,
    type: "engagement",
  },
];

export default function Segmentation() {
  const [segments] = useState<Segment[]>(mockSegments);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(segments[0]);
  const [createMode, setCreateMode] = useState(false);

  const getTypeIcon = (type: Segment["type"]) => {
    switch (type) {
      case "behavioral":
        return <Activity className="h-4 w-4" />;
      case "demographic":
        return <Users className="h-4 w-4" />;
      case "engagement":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: Segment["type"]) => {
    switch (type) {
      case "behavioral":
        return "bg-gradient-blue text-white border-0";
      case "demographic":
        return "bg-gradient-green text-white border-0";
      case "engagement":
        return "bg-gradient-purple text-white border-0";
      default:
        return "bg-muted";
    }
  };

  const handleCreateSegment = () => {
    setCreateMode(true);
    toast({
      title: "Создание сегмента",
      description: "Настройте условия для нового сегмента",
    });
  };

  const handleDuplicateSegment = () => {
    toast({
      title: "Сегмент дублирован",
      description: "Создана копия выбранного сегмента",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Сегментация</h1>
          <p className="text-muted-foreground">
            Управление сегментами аудитории для таргетированных рассылок
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDuplicateSegment}>
            <Copy className="h-4 w-4 mr-2" />
            Дублировать
          </Button>
          <Button variant="gradient" onClick={handleCreateSegment}>
            <Plus className="h-4 w-4 mr-2" />
            Новый сегмент
          </Button>
        </div>
      </div>

      {createMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Создание сегмента</CardTitle>
            <CardDescription>
              Настройте условия для автоматической сегментации контактов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Основное</TabsTrigger>
                <TabsTrigger value="conditions">Условия</TabsTrigger>
                <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Название сегмента</Label>
                    <Input placeholder="Например: Активные покупатели" />
                  </div>
                  <div className="space-y-2">
                    <Label>Описание</Label>
                    <Input placeholder="Краткое описание сегмента" />
                  </div>
                  <div className="space-y-2">
                    <Label>Тип сегмента</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="behavioral">Поведенческий</SelectItem>
                        <SelectItem value="demographic">Демографический</SelectItem>
                        <SelectItem value="engagement">По вовлеченности</SelectItem>
                        <SelectItem value="custom">Пользовательский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="conditions" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Условия сегментации</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить условие
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg space-y-3">
                      <div className="grid gap-3 md:grid-cols-3">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Поле" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="name">Имя</SelectItem>
                            <SelectItem value="purchase">Покупка</SelectItem>
                            <SelectItem value="activity">Активность</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Условие" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Равно</SelectItem>
                            <SelectItem value="contains">Содержит</SelectItem>
                            <SelectItem value="greater">Больше</SelectItem>
                            <SelectItem value="less">Меньше</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Значение" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Select defaultValue="and">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="and">И</SelectItem>
                          <SelectItem value="or">ИЛИ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-3 border rounded-lg space-y-3">
                      <div className="grid gap-3 md:grid-cols-3">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Поле" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date">Дата регистрации</SelectItem>
                            <SelectItem value="last_open">Последнее открытие</SelectItem>
                            <SelectItem value="total_spent">Сумма покупок</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Условие" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="last_days">За последние дни</SelectItem>
                            <SelectItem value="before">До</SelectItem>
                            <SelectItem value="after">После</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Значение" type="number" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Предварительный результат</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Контактов в сегменте:</span>
                        <span className="font-medium">~1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Процент от базы:</span>
                        <span className="font-medium">12.3%</span>
                      </div>
                      <Progress value={12.3} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setCreateMode(false)}>
                Отмена
              </Button>
              <Button variant="gradient">
                Создать сегмент
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Сегменты</CardTitle>
                <CardDescription>Выберите сегмент для просмотра</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {segments.map((segment) => (
                  <div
                    key={segment.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedSegment?.id === segment.id ? "bg-muted border-primary" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedSegment(segment)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(segment.type)}>
                          {getTypeIcon(segment.type)}
                        </Badge>
                        <div className="font-medium">{segment.name}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {segment.contacts.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {segment.description}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">
                        Вовлеченность: {segment.engagement}%
                      </div>
                      <div className={`text-xs font-medium ${
                        segment.growth > 0 ? "text-gradient-green" : "text-gradient-red"
                      }`}>
                        {segment.growth > 0 ? "+" : ""}{segment.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedSegment && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedSegment.name}</CardTitle>
                        <CardDescription>{selectedSegment.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Контакты</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {selectedSegment.contacts.toLocaleString()}
                          </div>
                          <div className={`text-xs ${
                            selectedSegment.growth > 0 ? "text-gradient-green" : "text-gradient-red"
                          }`}>
                            {selectedSegment.growth > 0 ? "+" : ""}{selectedSegment.growth}% за месяц
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Вовлеченность</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{selectedSegment.engagement}%</div>
                          <Progress value={selectedSegment.engagement} className="h-1 mt-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Обновлено</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">{selectedSegment.lastUpdated}</div>
                          <div className="text-xs text-muted-foreground">Создан: {selectedSegment.created}</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6 space-y-3">
                      <Label>Условия сегмента</Label>
                      <div className="space-y-2">
                        {selectedSegment.conditions.map((condition, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <Button variant="gradient" className="flex-1">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Использовать в кампании
                      </Button>
                      <Button variant="outline">
                        Экспортировать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}