import { api } from "@/lib/axios";
export interface ISignInBody {
  email: string;
}
export function signIn({ email }: ISignInBody) {
  return api.post("/authenticate", {
    email,
  });
}
