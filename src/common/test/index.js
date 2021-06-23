import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AlertsProvider from "../context/alerts";
import BalanceProvider from "../context/balance";

const ContextRenderer = ({ children }) => {
  return (
    <AlertsProvider>
      <BalanceProvider>{children}</BalanceProvider>
    </AlertsProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ContextRenderer,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
