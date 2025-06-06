import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z
    .enum([
      "all",
      "pending",
      "canceled",
      "processing",
      "delivering",
      "delivered",
    ])
    .optional(),
});
type TOrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status") as TOrderFiltersSchema["status"];
  const { register, handleSubmit, control, reset } =
    useForm<TOrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        orderId: orderId ?? "",
        customerName: customerName ?? "",
        status: status ?? "all",
      },
    });
  function handleFilter({
    customerName,
    orderId,
    status,
  }: TOrderFiltersSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }
      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }
      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }
      state.set("page", "1");
      return state;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");
      state.set("page", "1");
      return state;
    });
    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  }
  return (
    <form
      action=""
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold"> Filtros </span>
      <Input
        placeholder="ID do cliente"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { name, onChange, disabled, value } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              disabled={disabled}
              value={value}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />
      <Button type="submit" variant="secondary" size="xs">
        <Search className="h-4 w-4 mr-2" />
        Filtrar resultados
      </Button>
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="h-4 w-4 mr-2" />
        Remover filtros
      </Button>
    </form>
  );
}
