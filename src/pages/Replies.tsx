import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Mail, 
  Send, 
  Reply, 
  Archive, 
  Trash2,
  Star,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowRight,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface EmailThread {
  id: string;
  contact: {
    name: string;
    email: string;
    company: string;
    avatar?: string;
  };
  campaign: string;
  subject: string;
  status: "unread" | "read" | "replied" | "archived";
  priority: "high" | "medium" | "low";
  emailAccount: string; // Добавлено поле для email аккаунта
  messages: {
    id: string;
    from: string;
    to: string;
    content: string;
    timestamp: Date;
    isOutgoing: boolean;
  }[];
  lastReplyDate: Date;
}

const Replies = () => {
  const [selectedThread, setSelectedThread] = useState<EmailThread | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [collapsedMessages, setCollapsedMessages] = useState<Set<string>>(new Set());
  const [showThreadStats, setShowThreadStats] = useState(true);

  // Список email аккаунтов
  const emailAccounts = [
    { email: "sales@company.com", name: "Отдел продаж" },
    { email: "marketing@company.com", name: "Маркетинг" },
    { email: "support@company.com", name: "Поддержка" },
    { email: "info@company.com", name: "Общая почта" },
  ];

  // Пример данных
  const threads: EmailThread[] = [
    {
      id: "1",
      contact: {
        name: "Александр Петров",
        email: "a.petrov@techcorp.ru",
        company: "TechCorp",
      },
      campaign: "Новый продукт Q1",
      subject: "Re: Инновационное решение для вашего бизнеса",
      status: "unread",
      priority: "high",
      emailAccount: "sales@company.com",
      messages: [
        {
          id: "m1",
          from: "you@company.com",
          to: "a.petrov@techcorp.ru",
          content: "Здравствуйте, Александр!\n\nХотел бы рассказать вам о нашем новом решении для автоматизации бизнес-процессов...",
          timestamp: new Date(2024, 0, 15, 10, 30),
          isOutgoing: true,
        },
        {
          id: "m2",
          from: "a.petrov@techcorp.ru",
          to: "you@company.com",
          content: "Добрый день!\n\nСпасибо за ваше предложение. Звучит интересно. Можете ли вы предоставить более подробную информацию о ценах и условиях внедрения?",
          timestamp: new Date(2024, 0, 15, 14, 45),
          isOutgoing: false,
        },
      ],
      lastReplyDate: new Date(2024, 0, 15, 14, 45),
    },
    {
      id: "2",
      contact: {
        name: "Мария Иванова",
        email: "m.ivanova@startup.io",
        company: "StartupHub",
      },
      campaign: "Летняя акция",
      subject: "Re: Специальное предложение для стартапов",
      status: "replied",
      priority: "medium",
      emailAccount: "marketing@company.com",
      messages: [
        {
          id: "m3",
          from: "you@company.com",
          to: "m.ivanova@startup.io",
          content: "Здравствуйте, Мария!\n\nСпециально для стартапов мы подготовили уникальные условия...",
          timestamp: new Date(2024, 0, 14, 9, 15),
          isOutgoing: true,
        },
        {
          id: "m4",
          from: "m.ivanova@startup.io",
          to: "you@company.com",
          content: "Здравствуйте!\n\nМы заинтересованы. Когда можем назначить демо?",
          timestamp: new Date(2024, 0, 14, 16, 30),
          isOutgoing: false,
        },
        {
          id: "m5",
          from: "you@company.com",
          to: "m.ivanova@startup.io",
          content: "Отлично! Предлагаю провести демо в четверг в 15:00. Подходит?",
          timestamp: new Date(2024, 0, 15, 10, 0),
          isOutgoing: true,
        },
      ],
      lastReplyDate: new Date(2024, 0, 15, 10, 0),
    },
  ];

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = searchQuery === "" || 
      thread.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "unread" && thread.status === "unread") ||
      (activeTab === "replied" && thread.status === "replied") ||
      (activeTab === "archived" && thread.status === "archived");
    
    const matchesAccount = selectedAccount === "all" || thread.emailAccount === selectedAccount;
    
    return matchesSearch && matchesTab && matchesAccount;
  });

  const handleReply = () => {
    if (selectedThread && replyContent.trim()) {
      // Здесь будет логика отправки ответа
      console.log("Отправка ответа:", replyContent);
      setReplyContent("");
    }
  };

  const getStatusIcon = (status: EmailThread["status"]) => {
    switch (status) {
      case "unread":
        return <AlertCircle className="h-4 w-4 text-primary" />;
      case "replied":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Mail className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: EmailThread["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  const toggleMessageCollapse = (messageId: string) => {
    const newCollapsed = new Set(collapsedMessages);
    if (newCollapsed.has(messageId)) {
      newCollapsed.delete(messageId);
    } else {
      newCollapsed.add(messageId);
    }
    setCollapsedMessages(newCollapsed);
  };

  const getThreadStats = (thread: EmailThread) => {
    const totalMessages = thread.messages.length;
    const outgoingMessages = thread.messages.filter(m => m.isOutgoing).length;
    const incomingMessages = totalMessages - outgoingMessages;
    const threadDuration = thread.messages.length > 1
      ? Math.abs(thread.messages[thread.messages.length - 1].timestamp.getTime() - thread.messages[0].timestamp.getTime()) / (1000 * 60 * 60 * 24)
      : 0;
    
    return {
      totalMessages,
      outgoingMessages,
      incomingMessages,
      threadDuration: Math.round(threadDuration),
      responseTime: formatDistanceToNow(thread.lastReplyDate, { locale: ru, addSuffix: true })
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ответы на рассылки</h1>
        <p className="text-muted-foreground">
          Управляйте ответами и продолжайте диалог с потенциальными клиентами
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список писем */}
        <div className="lg:col-span-1">
          <Card className="h-[calc(100vh-200px)]">
            <CardHeader className="pb-3">
              <div className="space-y-3">
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите аккаунт" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>Все аккаунты</span>
                      </div>
                    </SelectItem>
                    <Separator className="my-1" />
                    {emailAccounts.map((account) => (
                      <SelectItem key={account.email} value={account.email}>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <div className="flex flex-col">
                            <span className="font-medium">{account.name}</span>
                            <span className="text-xs text-muted-foreground">{account.email}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">Все</TabsTrigger>
                    <TabsTrigger value="unread">Новые</TabsTrigger>
                    <TabsTrigger value="replied">Отвечено</TabsTrigger>
                    <TabsTrigger value="archived">Архив</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по письмам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-360px)]">
                <div className="space-y-1 p-3">
                  {filteredThreads.map((thread) => (
                    <div
                      key={thread.id}
                      onClick={() => setSelectedThread(thread)}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-accent ${
                        selectedThread?.id === thread.id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3 flex-1">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={thread.contact.avatar} />
                            <AvatarFallback>
                              {thread.contact.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm truncate">
                                {thread.contact.name}
                              </p>
                              {getStatusIcon(thread.status)}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {thread.contact.company}
                            </p>
                            <p className="text-sm mt-1 line-clamp-2">
                              {thread.subject}
                            </p>
                            <div className="flex items-center flex-wrap gap-2 mt-2">
                              <Badge variant={getPriorityColor(thread.priority)} className="text-xs">
                                {thread.priority === "high" ? "Высокий" : 
                                 thread.priority === "medium" ? "Средний" : "Низкий"}
                              </Badge>
                              <Badge variant="outline" className="text-xs flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {thread.messages.length}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {emailAccounts.find(acc => acc.email === thread.emailAccount)?.name || thread.emailAccount}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {format(thread.lastReplyDate, "d MMM", { locale: ru })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Просмотр и ответ */}
        <div className="lg:col-span-2">
          {selectedThread ? (
            <Card className="h-[calc(100vh-200px)]">
              <CardHeader className="border-b space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {selectedThread.subject}
                      <Badge variant="secondary" className="text-xs">
                        Цепочка: {selectedThread.messages.length}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <span>{selectedThread.contact.name}</span>
                        <span>•</span>
                        <span>{selectedThread.contact.email}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => setShowThreadStats(!showThreadStats)}
                    >
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {showThreadStats && (() => {
                  const stats = getThreadStats(selectedThread);
                  return (
                    <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-xs">Всего сообщений</span>
                        </div>
                        <p className="text-2xl font-bold">{stats.totalMessages}</p>
                        <p className="text-xs text-muted-foreground">
                          {stats.outgoingMessages} исходящих / {stats.incomingMessages} входящих
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs">Последний ответ</span>
                        </div>
                        <p className="text-sm font-semibold">{stats.responseTime}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(selectedThread.lastReplyDate, "d MMM, HH:mm", { locale: ru })}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-xs">Длительность</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {stats.threadDuration > 0 ? `${stats.threadDuration}д` : 'Сегодня'}
                        </p>
                        <p className="text-xs text-muted-foreground">диалога</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span className="text-xs">Участники</span>
                        </div>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-xs text-muted-foreground">в переписке</p>
                      </div>
                    </div>
                  );
                })()}
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-580px)]">
                  <div className="p-6 space-y-1">
                    {selectedThread.messages.map((message, index) => {
                      const isCollapsed = collapsedMessages.has(message.id);
                      const canCollapse = index < selectedThread.messages.length - 2;
                      
                      return (
                        <div key={message.id} className="relative">
                          {/* Thread connection line */}
                          {index < selectedThread.messages.length - 1 && (
                            <div className={`absolute left-6 top-12 h-[calc(100%+1rem)] w-0.5 bg-border ${
                              message.isOutgoing ? 'left-auto right-6' : ''
                            }`} />
                          )}
                          
                          <div className={`flex ${message.isOutgoing ? "justify-end" : "justify-start"} relative z-10`}>
                            <div className={`max-w-[80%] space-y-2 ${
                              message.isOutgoing ? "items-end" : "items-start"
                            }`}>
                              {/* Message header */}
                              <div className="flex items-center gap-2 px-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {message.isOutgoing ? "Я" : selectedThread.contact.name.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-medium">
                                  {message.isOutgoing ? "Вы" : selectedThread.contact.name}
                                </span>
                                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {message.isOutgoing ? selectedThread.contact.name : "Вы"}
                                </span>
                              </div>
                              
                              {/* Collapsible message content */}
                              {canCollapse && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleMessageCollapse(message.id)}
                                  className="h-6 text-xs px-2"
                                >
                                  {isCollapsed ? (
                                    <>
                                      <ChevronDown className="h-3 w-3 mr-1" />
                                      Показать сообщение
                                    </>
                                  ) : (
                                    <>
                                      <ChevronUp className="h-3 w-3 mr-1" />
                                      Скрыть сообщение
                                    </>
                                  )}
                                </Button>
                              )}
                              
                              {(!canCollapse || !isCollapsed) && (
                                <div className={`rounded-lg p-4 shadow-sm ${
                                  message.isOutgoing 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-muted"
                                }`}>
                                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                              )}
                              
                              {/* Message footer */}
                              <div className="flex items-center gap-2 px-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {format(message.timestamp, "d MMM, HH:mm", { locale: ru })}
                                </span>
                                {index === selectedThread.messages.length - 1 && !message.isOutgoing && (
                                  <Badge variant="outline" className="text-xs ml-2">
                                    Последнее сообщение
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Thread progress indicator */}
                          {index < selectedThread.messages.length - 1 && (
                            <div className="flex items-center justify-center my-4">
                              <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-xs text-muted-foreground">
                                  {index + 1} из {selectedThread.messages.length}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
                <div className="border-t p-4 space-y-3">
                  <Textarea
                    placeholder="Напишите ваш ответ..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Кампания: <Badge variant="outline">{selectedThread.campaign}</Badge>
                    </div>
                    <Button onClick={handleReply} disabled={!replyContent.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Отправить ответ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[calc(100vh-200px)] flex items-center justify-center">
              <div className="text-center space-y-3">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="text-lg font-medium">Выберите письмо</p>
                  <p className="text-sm text-muted-foreground">
                    Выберите письмо из списка для просмотра и ответа
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Replies;