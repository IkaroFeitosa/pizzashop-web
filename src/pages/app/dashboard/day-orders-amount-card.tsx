import { getDayOrdersAmount } from "@/api/get-day-orders-amounts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmunt } = useQuery({
    queryKey: ["metrics", "day-orders-amount"],
    queryFn: getDayOrdersAmount,
  });
  return (
    <Card className="gap-4">
      <CardHeader className="flex items-center justify-between gap-2 space-y-0">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmunt ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {" "}
              {dayOrdersAmunt.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmunt.diffFromYesterday >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{dayOrdersAmunt.diffFromYesterday}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {dayOrdersAmunt.diffFromYesterday}%
                </span>
              )}{" "}
              em relação ao ontem
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
