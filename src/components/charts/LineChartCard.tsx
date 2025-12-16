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

interface LineChartCardProps {
  title: string;
  data: any[];
  dataKeys: {
    key: string;
    name: string;
    color: string;
  }[];
  xAxisKey: string;
}

export function LineChartCard({ title, data, dataKeys, xAxisKey }: LineChartCardProps) {
  return (
    <Card className="animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis 
                dataKey={xAxisKey}
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '16px' }}
                formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
              />
              {dataKeys.map((dk) => (
                <Line
                  key={dk.key}
                  type="monotone"
                  dataKey={dk.key}
                  name={dk.name}
                  stroke={dk.color}
                  strokeWidth={2.5}
                  dot={{ fill: dk.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
