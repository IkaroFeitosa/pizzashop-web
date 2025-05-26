import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Signin } from "./sign-in";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { HelmetProvider } from "react-helmet-async";

describe("SignIn", () => {
  it("should set default email input value if email is present on search params", () => {
    const wrapper = render(
      <>
        <Signin />
      </>,
      {
        wrapper: ({ children }) => (
          <HelmetProvider>
            <MemoryRouter
              initialEntries={["/sign-in?email=ikarosfeitosa@gmail.com"]}
            >
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        ),
      },
    );
    const emailInput = wrapper.getByLabelText("Email") as HTMLInputElement;
    expect(emailInput.value).toBe("ikarosfeitosa@gmail.com");
  });
});
