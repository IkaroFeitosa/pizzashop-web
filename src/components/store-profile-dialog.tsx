import { DialogTitle } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { getManagedRestaurant } from "@/api/get-menaged-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const sotreProfileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string(),
});

type TStoreProfileForm = z.infer<typeof sotreProfileSchema>;
export function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
  });

  const { register } = useForm<TStoreProfileForm>({
    resolver: zodResolver(sotreProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>
      <form>
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Nome
            </label>
            <Input id="name" className="col-span-3" {...register("name")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Descrição
            </label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register("description")}
            />
          </div>
          <DialogFooter>
            <Button variant={"ghost"} type="button">
              Cancelar
            </Button>
            <Button variant={"success"} type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}
