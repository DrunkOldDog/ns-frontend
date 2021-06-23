import { useRef } from "react";
import { useBalance } from "../../common/context/balance";

export default function Balance() {
  const balanceRef = useRef();
  const [, actions] = useBalance();

  const payBalance = (e) => {
    e.preventDefault();
    actions.updateBalance(balanceRef.current.value);
    balanceRef.current.value = "";
  };

  return (
    <div>
      <form onSubmit={payBalance}>
        <h2>Pay debts</h2>
        <input placeholder="Insert Amount" ref={balanceRef} type="number" />
        <button>Pay Balance</button>
      </form>
    </div>
  );
}
