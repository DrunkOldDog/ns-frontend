import userEvent from "@testing-library/user-event";
import Balance from ".";
import { act, render, screen } from "../../common/test";
import axios from "axios";

jest.mock("axios");

describe("Balance Component", () => {
  let amount = "200";

  it("should clean value on submit", async () => {
    render(<Balance />);

    const payField = screen.getByPlaceholderText("Insert Amount");
    userEvent.type(payField, amount);

    const submitBtn = screen.getByRole("button", { name: /Pay Balance/i });
    await act(async () => userEvent.click(submitBtn));

    expect(payField).toHaveValue("" || null);
  });

  it("shoud request on submit", async () => {
    render(<Balance />);

    const payField = screen.getByPlaceholderText("Insert Amount");
    userEvent.type(payField, amount);

    axios.post.mockImplementation(() =>
      Promise.resolve({
        message: `Updated juanireyes@gmail.com amount.`,
        amount,
      })
    );

    const submitBtn = screen.getByRole("button", { name: /Pay Balance/i });
    await act(async () => userEvent.click(submitBtn));

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
