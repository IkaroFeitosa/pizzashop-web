import { http, HttpResponse } from "msw";
import type { IGetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductstMock = http.get<
  never,
  never,
  IGetPopularProductsResponse
>("/metrics/popular-products", () => {
  return HttpResponse.json([
    {
      product: "Pizza Margherita",
      amount: 150,
    },
    {
      product: "Spaghetti Carbonara",
      amount: 120,
    },
    {
      product: "Caesar Salad",
      amount: 100,
    },
    {
      product: "Tiramisu",
      amount: 80,
    },
    {
      product: "Margarita Pizza",
      amount: 75,
    },
    {
      product: "Penne Arrabbiata",
      amount: 60,
    },
    {
      product: "Bruschetta",
      amount: 50,
    },
    {
      product: "Caprese Salad",
      amount: 45,
    },
    {
      product: "Lasagna",
      amount: 40,
    },
    {
      product: "Gelato",
      amount: 30,
    },
  ]);
});
