import { http, HttpResponse } from "msw";
import type { IGetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, IGetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "1",
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "4599989898",
      createdAt: new Date(),
      updatedAt: null,
      role: "manager",
    });
  },
);
