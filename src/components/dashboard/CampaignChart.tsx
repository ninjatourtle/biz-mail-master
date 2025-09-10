import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { date: "Пн", sent: 400, opened: 240, replied: 80 },
  { date: "Вт", sent: 300, opened: 180, replied: 60 },
  { date: "Ср", sent: 500, opened: 320, replied: 120 },
  { date: "Чт", sent: 280, opened: 200, replied: 90 },
  { date: "Пт", sent: 450, opened: 380, replied: 150 },
  { date: "Сб", sent: 200, opened: 150, replied: 50 },
  { date: "Вс", sent: 150, opened: 100, replied: 30 },
];

export function CampaignChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Активность за неделю</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sent"
              stroke="hsl(var(--metric-sent))"
              strokeWidth={2}
              name="Отправлено"
              dot={{ fill: "hsl(var(--metric-sent))", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="opened"
              stroke="hsl(var(--metric-opened))"
              strokeWidth={2}
              name="Открыто"
              dot={{ fill: "hsl(var(--metric-opened))", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="replied"
              stroke="hsl(var(--metric-replied))"
              strokeWidth={2}
              name="Ответы"
              dot={{ fill: "hsl(var(--metric-replied))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}