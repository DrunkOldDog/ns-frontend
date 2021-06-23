import { useRef } from "react";
import { useBalance } from "../../common/context/balance";

import { Snackbar, TextField, Button, Grid } from "@material-ui/core";
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
    if (emailRef.current.value) {
      actions.resetStateToDefault();
      actions.loginUser(emailRef.current.value);
    }
  };

  const { email, balance, isNewUser } = state;

  return (
    <div>
      <h1>Check your loan status here!</h1>
      <p>Please, enter your email to validate your balance status</p>
      <form onSubmit={onEmailSearch}>
        <Grid container spacing={1} style={{ width: 500 }}>
          <Grid item xs={7}>
            <TextField
              label="Email"
              variant="outlined"
              placeholder="Enter your email"
              inputRef={emailRef}
              type="email"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={5}>
            <button style={{ height: "100%" }}>Validate Email</button>
          </Grid>
        </Grid>
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
