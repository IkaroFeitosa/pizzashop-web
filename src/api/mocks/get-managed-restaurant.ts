import { http, HttpResponse } from "msw";
import type { IGetManagedRestaurantResponse } from "../get-menaged-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  IGetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "12345",
    name: "Test Restaurant",
    description: "A sample restaurant for testing purposes.",
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: null,
    managerId: "1",
  });
});
