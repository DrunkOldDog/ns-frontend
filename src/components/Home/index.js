import { useRef } from "react";
import { useBalance } from "../../common/context/balance";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import Balance from "../Balance";
import Loans from "../Loans";

import "./styles.css";
import { useAlerts } from "../../common/context/alerts";

export default function Home() {
  const emailRef = useRef();
  const [alertState, alertActions] = useAlerts();
  const [state, actions] = useBalance();

  const onEmailSearch = (e) => {
    e.preventDefault();
    actions.resetStateToDefault();
    actions.loginUser(emailRef.current.value);
  };

  const { email, balance, isNewUser } = state;

  return (
    <div>
      <h1>Check your loan status here!</h1>
      <p>Please, enter your email to validate your balance status</p>
      <form onSubmit={onEmailSearch}>
        <input ref={emailRef} type="email" />
        <button>Validate Email</button>
      </form>

      {email ? (
        <div className="home-content">
          <h2>{`${isNewUser ? "Welcome" : "Welcome back"} ${email}!`}</h2>
          <h2>Your current balance is: ${balance}</h2>
          <p>What do you want to do next?</p>
          <Balance />
          <Loans />
        </div>
      ) : null}

      <Snackbar
        open={alertState.display}
        autoHideDuration={alertState.duration}
        onClose={alertActions.onAlertDismiss}
      >
        <Alert
          variant="filled"
          severity={alertState.alertType}
          onClose={alertActions.onAlertDismiss}
        >
          {alertState.content}
        </Alert>
      </Snackbar>
    </div>
  );
}
