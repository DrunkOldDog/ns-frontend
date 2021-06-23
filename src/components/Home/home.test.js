import { act, render, screen } from "../../common/test";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import Home from "./index";

jest.mock("axios");

describe("Home Component", () => {
  // mock data
  let email = "juanireyes182@gmail.com";

  it("should not request on empty email submit", () => {
    render(<Home />);

    axios.get.mockImplementation(() =>
      Promise.resolve({
        message: "User not found",
        isNew: true,
      })
    );

    const submitBtn = screen.getByRole("button", { name: /Validate Email/i });
    userEvent.click(submitBtn);
    expect(axios.get).toHaveBeenCalledTimes(0);
  });

  it("should request on email submit", async () => {
    render(<Home />);

    const emailField = screen.getByPlaceholderText("Enter your email");
    userEvent.type(emailField, email);

    axios.get.mockImplementation(() =>
      Promise.resolve({
        message: `Incoming new user ${email}`,
        isNew: true,
      })
    );

    const submitBtn = screen.getByRole("button", { name: /Validate Email/i });
    await act(async () => userEvent.click(submitBtn));

    expect(axios.get).toHaveBeenCalled();
  });
});
