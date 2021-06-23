import Home from './components/Home';
import BalanceProvider from './common/context/balance';

import './App.css';

function App() {
  return (
    <div className="App">
      <BalanceProvider>
        <Home />
      </BalanceProvider>
    </div>
  );
}

export default App;
