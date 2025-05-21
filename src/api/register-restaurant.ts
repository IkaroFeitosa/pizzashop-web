import { api } from "@/lib/axios";
export interface IRegisterRestaurantBody {
  email: string;
  restaurantName: string;
  managerName: string;
  phone: string;
}
export function registerRestaurant({
  email,
  restaurantName,
  managerName,
  phone,
}: IRegisterRestaurantBody) {
  return api.post("/restaurants", {
    email,
    restaurantName,
    managerName,
    phone,
  });
}
