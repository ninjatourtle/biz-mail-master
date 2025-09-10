import { useState } from "react";
import { Plus, Search, Upload, Download, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  status: "new" | "contacted" | "replied" | "qualified";
  tags: string[];
  lastContacted: string;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Александр Петров",
    email: "a.petrov@techcorp.com",
    company: "TechCorp",
    position: "CEO",
    status: "replied",
    tags: ["SaaS", "Enterprise"],
    lastContacted: "2 дня назад",
  },
  {
    id: "2",
    name: "Мария Иванова",
    email: "m.ivanova@startupx.io",
    company: "StartupX",
    position: "Head of Sales",
    status: "contacted",
    tags: ["Startup", "B2B"],
    lastContacted: "1 неделю назад",
  },
  {
    id: "3",
    name: "Дмитрий Соколов",
    email: "d.sokolov@fintech.ru",
    company: "FinTech Solutions",
    position: "CTO",
    status: "qualified",
    tags: ["FinTech", "Enterprise"],
    lastContacted: "3 дня назад",
  },
  {
    id: "4",
    name: "Елена Козлова",
    email: "e.kozlova@ecommerce.com",
    company: "E-Commerce Plus",
    position: "Marketing Director",
    status: "new",
    tags: ["E-commerce", "Retail"],
    lastContacted: "Не контактировали",
  },
  {
    id: "5",
    name: "Сергей Новиков",
    email: "s.novikov@hrtech.io",
    company: "HR Tech",
    position: "VP of Product",
    status: "contacted",
    tags: ["HR", "SaaS"],
    lastContacted: "5 дней назад",
  },
];

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const getStatusBadge = (status: Contact["status"]) => {
    const variants = {
      new: { label: "Новый", className: "bg-primary/10 text-primary" },
      contacted: { label: "Контакт", className: "bg-warning/10 text-warning" },
      replied: { label: "Ответил", className: "bg-success/10 text-success" },
      qualified: { label: "Квалифицирован", className: "bg-accent/10 text-accent" },
    };
    const variant = variants[status];
    return (
      <Badge variant="outline" className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map((c) => c.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Контакты</h1>
          <p className="text-muted-foreground">
            База ваших потенциальных клиентов
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Импорт
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
          <Button variant="gradient" className="shadow-glow">
            <Plus className="mr-2 h-4 w-4" />
            Добавить контакт
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск контактов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {selectedContacts.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Выбрано: {selectedContacts.length}
              </span>
              <Button variant="outline" size="sm">
                <UserCheck className="mr-2 h-4 w-4" />
                Добавить в кампанию
              </Button>
            </div>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Контакт</TableHead>
              <TableHead>Компания</TableHead>
              <TableHead>Должность</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Теги</TableHead>
              <TableHead>Последний контакт</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={() => toggleContact(contact.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.position}</TableCell>
                <TableCell>{getStatusBadge(contact.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {contact.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {contact.lastContacted}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}