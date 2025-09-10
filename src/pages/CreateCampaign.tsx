import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Save, Plus, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { SpamChecker } from "@/components/SpamChecker";

interface EmailStep {
  id: string;
  subject: string;
  content: string;
  delay: number;
  delayUnit: "days" | "hours";
}

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaignName, setCampaignName] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [dailyLimit, setDailyLimit] = useState("50");
  const [timezone, setTimezone] = useState("UTC");
  const [trackOpens, setTrackOpens] = useState(true);
  const [trackClicks, setTrackClicks] = useState(true);
  const [stopOnReply, setStopOnReply] = useState(true);
  const [emailSteps, setEmailSteps] = useState<EmailStep[]>([
    {
      id: "1",
      subject: "",
      content: "",
      delay: 0,
      delayUnit: "days",
    },
  ]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [contactsCount, setContactsCount] = useState(0);

  const addEmailStep = () => {
    const newStep: EmailStep = {
      id: Date.now().toString(),
      subject: "",
      content: "",
      delay: 3,
      delayUnit: "days",
    };
    setEmailSteps([...emailSteps, newStep]);
  };

  const removeEmailStep = (id: string) => {
    if (emailSteps.length > 1) {
      setEmailSteps(emailSteps.filter((step) => step.id !== id));
    }
  };

  const updateEmailStep = (id: string, field: keyof EmailStep, value: any) => {
    setEmailSteps(
      emailSteps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      // Симулируем подсчет контактов
      setContactsCount(Math.floor(Math.random() * 1000) + 100);
    }
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveDraft = () => {
    toast({
      title: "Черновик сохранен",
      description: "Кампания сохранена как черновик",
    });
    navigate("/campaigns");
  };

  const handleStartCampaign = () => {
    if (!campaignName || !fromName || !fromEmail || !csvFile || emailSteps[0].subject === "" || emailSteps[0].content === "") {
      toast({
        title: "Заполните обязательные поля",
        description: "Название, отправитель, контакты и первое письмо обязательны",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Кампания запущена",
      description: `Кампания "${campaignName}" успешно запущена`,
    });
    navigate("/campaigns");
  };

  return (
    <div className="space-y-6">
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
            <h1 className="text-3xl font-bold tracking-tight">Новая кампания</h1>
            <p className="text-muted-foreground">
              Создайте и настройте email кампанию
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Сохранить черновик
          </Button>
          <Button variant="gradient" onClick={handleStartCampaign}>
            <Send className="mr-2 h-4 w-4" />
            Запустить кампанию
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Основные</TabsTrigger>
          <TabsTrigger value="emails">Письма</TabsTrigger>
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>
                Настройте базовые параметры кампании
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Название кампании</Label>
                <Input
                  id="campaign-name"
                  placeholder="Например: SaaS стартапы Q1 2024"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-name">Имя отправителя</Label>
                  <Input
                    id="from-name"
                    placeholder="Иван Иванов"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-email">Email отправителя</Label>
                  <Input
                    id="from-email"
                    type="email"
                    placeholder="ivan@company.com"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply-to">Reply-to email</Label>
                <Input
                  id="reply-to"
                  type="email"
                  placeholder="support@company.com"
                  value={replyTo}
                  onChange={(e) => setReplyTo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Теги</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Добавить тег"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails" className="space-y-4">
          {emailSteps.map((step, index) => (
            <Card key={step.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {index === 0 ? "Первое письмо" : `Follow-up ${index}`}
                  </CardTitle>
                  {emailSteps.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEmailStep(step.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {index > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <Label>Отправить через:</Label>
                    <Input
                      type="number"
                      value={step.delay}
                      onChange={(e) =>
                        updateEmailStep(step.id, "delay", parseInt(e.target.value))
                      }
                      className="w-20"
                    />
                    <Select
                      value={step.delayUnit}
                      onValueChange={(value: "days" | "hours") =>
                        updateEmailStep(step.id, "delayUnit", value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">дней</SelectItem>
                        <SelectItem value="hours">часов</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Тема письма</Label>
                  <Input
                    placeholder="Введите тему письма"
                    value={step.subject}
                    onChange={(e) =>
                      updateEmailStep(step.id, "subject", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Текст письма</Label>
                  <Textarea
                    placeholder="Введите текст письма. Используйте {{name}}, {{company}} для персонализации"
                    value={step.content}
                    onChange={(e) =>
                      updateEmailStep(step.id, "content", e.target.value)
                    }
                    rows={10}
                  />
                </div>
                {step.content && (
                  <SpamChecker emailContent={`${step.subject}\n\n${step.content}`} />
                )}
              </CardContent>
            </Card>
          ))}

          <Button onClick={addEmailStep} variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Добавить follow-up
          </Button>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Список контактов</CardTitle>
              <CardDescription>
                Загрузите CSV файл с контактами для кампании
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <Label htmlFor="csv-upload" className="cursor-pointer">
                  <span className="text-primary hover:underline">
                    Загрузите CSV файл
                  </span>
                  {" или перетащите его сюда"}
                </Label>
                <Input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Формат: email, name, company, custom_field1, custom_field2
                </p>
              </div>

              {csvFile && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{csvFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contactsCount} контактов
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCsvFile(null);
                        setContactsCount(0);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Фильтры контактов</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сегмент" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все контакты</SelectItem>
                    <SelectItem value="new">Новые контакты</SelectItem>
                    <SelectItem value="engaged">Активные</SelectItem>
                    <SelectItem value="cold">Холодные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки отправки</CardTitle>
              <CardDescription>
                Настройте параметры и ограничения отправки
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="daily-limit">Дневной лимит отправки</Label>
                  <Input
                    id="daily-limit"
                    type="number"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Часовой пояс</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="Europe/Moscow">Москва</SelectItem>
                      <SelectItem value="America/New_York">Нью-Йорк</SelectItem>
                      <SelectItem value="Europe/London">Лондон</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Отслеживать открытия</Label>
                    <p className="text-sm text-muted-foreground">
                      Отслеживание открытий писем получателями
                    </p>
                  </div>
                  <Switch checked={trackOpens} onCheckedChange={setTrackOpens} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Отслеживать клики</Label>
                    <p className="text-sm text-muted-foreground">
                      Отслеживание кликов по ссылкам в письмах
                    </p>
                  </div>
                  <Switch checked={trackClicks} onCheckedChange={setTrackClicks} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Остановить при ответе</Label>
                    <p className="text-sm text-muted-foreground">
                      Прекратить отправку follow-up писем при получении ответа
                    </p>
                  </div>
                  <Switch checked={stopOnReply} onCheckedChange={setStopOnReply} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Расписание отправки</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Время начала</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Время окончания</Label>
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Дни недели</Label>
                <div className="flex gap-2">
                  {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                    <Button
                      key={day}
                      variant="outline"
                      size="sm"
                      className="w-12"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}