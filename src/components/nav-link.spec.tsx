import { render } from "@testing-library/react";
import { NavLink } from "./NavLink";
import { MemoryRouter } from "react-router";

describe("NavLink", () => {
  it("should highlight the nav link when the current page link is active", () => {
    const wrapper = render(
      <>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
        ),
      },
    );
    expect(wrapper.getByText("Home").dataset.current).toEqual("false");
    expect(wrapper.getByText("About").dataset.current).toEqual("true");
  });
});
