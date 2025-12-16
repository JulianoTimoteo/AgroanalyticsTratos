import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function DataTable<T extends Record<string, any>>({ 
  title, 
  data, 
  columns,
  className 
}: DataTableProps<T>) {
  return (
    <Card className={cn("animate-slide-up", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {columns.map((col) => (
                  <TableHead 
                    key={String(col.key)} 
                    className={cn("font-semibold text-foreground", col.className)}
                  >
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow 
                  key={index}
                  className="transition-colors hover:bg-muted/30"
                >
                  {columns.map((col) => (
                    <TableCell 
                      key={String(col.key)} 
                      className={col.className}
                    >
                      {col.render 
                        ? col.render(row[col.key], row)
                        : String(row[col.key])
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
