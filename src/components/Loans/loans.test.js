import userEvent from "@testing-library/user-event";
import Loans from ".";
import { act, render, screen } from "../../common/test";
import axios from "axios";

jest.mock("axios");

describe("Loans Component", () => {
  let amount = "200";

  it("should clean value on submit", async () => {
    render(<Loans />);

    const payField = screen.getByPlaceholderText("Insert Amount");
    userEvent.type(payField, amount);

    const submitBtn = screen.getByRole("button", { name: /Take a loan/i });
    await act(async () => userEvent.click(submitBtn));

    expect(payField).toHaveValue("" || null);
  });

  it("shoud request on submit", async () => {
    render(<Loans />);

    const payField = screen.getByPlaceholderText("Insert Amount");
    userEvent.type(payField, amount);

    axios.post.mockImplementation(() =>
      Promise.resolve({
        message: `Updated juanireyes@gmail.com amount.`,
        amount,
      })
    );

    const submitBtn = screen.getByRole("button", { name: /Take a loan/i });
    await act(async () => userEvent.click(submitBtn));

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
