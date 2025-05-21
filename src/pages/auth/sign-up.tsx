import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { registerRestaurant } from "@/api/register-restaurant";
import { useMutation } from "@tanstack/react-query";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpForm) {
    console.log(data);
    await registerRestaurantFn({
      email: data.email,
      managerName: data.managerName,
      phone: data.phone,
      restaurantName: data.restaurantName,
    });
    toast.success("Restaurante cadastrado com sucesso!", {
      action: {
        label: "Fazer login",
        onClick: () => navigate(`/sign-in?email=${data.email}`),
      },
    });
  }
  return (
    <div>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild className="absolute right-4 top-8" variant={"ghost"}>
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p>Seja um parceiro e começe suas vendas</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="managerName"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="phone" {...register("phone")} />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
              disabled={isSubmitting}
            >
              Enviar cadastro
            </button>
            <p className="p-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a href="#" className="underline underline-offset-4">
                Termos de serviços
              </a>{" "}
              e{" "}
              <a href="#" className="underline underline-offset-4">
                políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
