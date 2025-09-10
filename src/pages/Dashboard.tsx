import { Mail, MailOpen, MessageSquare, AlertCircle } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CampaignChart } from "@/components/dashboard/CampaignChart";
import { RecentCampaigns } from "@/components/dashboard/RecentCampaigns";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Дашборд</h1>
          <p className="text-muted-foreground">
            Обзор ваших email кампаний и метрик
          </p>
        </div>
        <Button variant="gradient" className="shadow-glow">
          Создать кампанию
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Отправлено писем"
          value="12,456"
          change={12}
          changeLabel="с прошлой недели"
          icon={<Mail className="h-5 w-5" />}
          color="sent"
        />
        <MetricCard
          title="Открыто"
          value="8,719"
          change={8}
          changeLabel="с прошлой недели"
          icon={<MailOpen className="h-5 w-5" />}
          color="opened"
        />
        <MetricCard
          title="Получено ответов"
          value="1,245"
          change={23}
          changeLabel="с прошлой недели"
          icon={<MessageSquare className="h-5 w-5" />}
          color="replied"
        />
        <MetricCard
          title="Отказы"
          value="234"
          change={-5}
          changeLabel="с прошлой недели"
          icon={<AlertCircle className="h-5 w-5" />}
          color="bounced"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <CampaignChart />
        <RecentCampaigns />
      </div>
    </div>
  );
}