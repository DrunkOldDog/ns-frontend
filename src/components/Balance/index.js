import { useRef } from "react";
import { useBalance } from "../../common/context/balance";

import { TextField, Button, Grid } from "@material-ui/core";

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

        <Grid container spacing={2} style={{ width: 400 }}>
          <Grid item xs={7}>
            <TextField
              placeholder="Insert Amount"
              inputRef={balanceRef}
              label="Payment"
              type="number"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={5}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ height: "100%" }}
            >
              Pay Balance
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
