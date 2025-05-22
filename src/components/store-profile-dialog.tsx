import { DialogTitle } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getManagedRestaurant,
  type IGetManagedRestaurantResponse,
} from "@/api/get-menaged-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const sotreProfileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().nullable(),
});

type TStoreProfileForm = z.infer<typeof sotreProfileSchema>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();
  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TStoreProfileForm>({
    resolver: zodResolver(sotreProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });
  function updateManagerRestaurantCache({
    name,
    description,
  }: TStoreProfileForm) {
    const cached = queryClient.getQueryData<IGetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);
    if (cached) {
      queryClient.setQueryData<IGetManagedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name,
          description,
        },
      );
    }
    return { cached };
  }
  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagerRestaurantCache({ name, description });
      return { previousProfile: cached };
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagerRestaurantCache(context.previousProfile);
      }
    },
  });

  async function handleUpdateProfile(data: TStoreProfileForm) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
      return;
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
            <DialogClose asChild>
              <Button variant={"ghost"} type="button">
                Cancelar
              </Button>
            </DialogClose>

            <Button variant={"success"} type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}
