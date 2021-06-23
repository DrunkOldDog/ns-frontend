import { useRef } from "react";
import { useBalance } from "../../common/context/balance";

export default function Loans() {
  const loansRef = useRef();
  const [, actions] = useBalance();

  const handleLoanSubmit = (e) => {
    e.preventDefault();
    actions.requestLoan(loansRef.current.value);
    loansRef.current.value = "";
  };

  return (
    <div>
      <h2>Take a loan:</h2>
      <form onSubmit={handleLoanSubmit}>
        <input ref={loansRef} type="number" />
        <button>Take a loan</button>
      </form>
    </div>
  );
}
