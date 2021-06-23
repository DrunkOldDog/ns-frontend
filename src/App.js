import Home from "./components/Home";
import AlertsProvider from "./common/context/alerts";
import BalanceProvider from "./common/context/balance";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AlertsProvider>
        <BalanceProvider>
          <Home />
        </BalanceProvider>
      </AlertsProvider>
    </div>
  );
}

export default App;
