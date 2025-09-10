import { Plus, Copy, Edit, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Template {
  id: string;
  name: string;
  subject: string;
  preview: string;
  category: string;
  usage: number;
  openRate: number;
  replyRate: number;
  lastUsed: string;
}

const templates: Template[] = [
  {
    id: "1",
    name: "Холодное письмо - SaaS",
    subject: "Увеличьте продажи на 30% с помощью {{product}}",
    preview: "Здравствуйте {{firstName}}, Заметил, что {{company}} активно развивается в сфере...",
    category: "Продажи",
    usage: 245,
    openRate: 68,
    replyRate: 12,
    lastUsed: "Вчера",
  },
  {
    id: "2",
    name: "Follow-up #1",
    subject: "Re: {{previousSubject}}",
    preview: "Добрый день {{firstName}}, Хотел уточнить, получили ли вы мое предыдущее письмо...",
    category: "Follow-up",
    usage: 189,
    openRate: 72,
    replyRate: 18,
    lastUsed: "2 дня назад",
  },
  {
    id: "3",
    name: "Партнерское предложение",
    subject: "Партнерство {{yourCompany}} и {{company}}",
    preview: "Здравствуйте {{firstName}}, Мы в {{yourCompany}} восхищены тем, что делает {{company}}...",
    category: "Партнерство",
    usage: 67,
    openRate: 65,
    replyRate: 15,
    lastUsed: "Неделю назад",
  },
  {
    id: "4",
    name: "Приглашение на вебинар",
    subject: "Эксклюзивный вебинар для {{company}}",
    preview: "Добрый день {{firstName}}, Приглашаем вас на эксклюзивный вебинар...",
    category: "События",
    usage: 34,
    openRate: 58,
    replyRate: 8,
    lastUsed: "2 недели назад",
  },
];

export default function Templates() {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Продажи": "bg-primary/10 text-primary",
      "Follow-up": "bg-warning/10 text-warning",
      "Партнерство": "bg-accent/10 text-accent",
      "События": "bg-success/10 text-success",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Шаблоны писем</h1>
          <p className="text-muted-foreground">
            Создавайте и управляйте шаблонами для ваших кампаний
          </p>
        </div>
        <Button variant="gradient" className="shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Создать шаблон
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="outline" className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Дублировать
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Тема:</p>
                <p className="text-sm font-mono bg-muted/50 p-2 rounded">
                  {template.subject}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Превью:</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {template.preview}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold">{template.usage}</p>
                  <p className="text-xs text-muted-foreground">Использований</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-metric-opened">{template.openRate}%</p>
                  <p className="text-xs text-muted-foreground">Открытий</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-metric-replied">{template.replyRate}%</p>
                  <p className="text-xs text-muted-foreground">Ответов</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  Использован: {template.lastUsed}
                </span>
                <Button variant="outline" size="sm">
                  Использовать
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}