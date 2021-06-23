import { useRef } from "react";
import { useBalance } from "../../common/context/balance";

import { TextField, Button, Grid } from "@material-ui/core";

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
        <Grid container spacing={2} style={{ width: 400 }}>
          <Grid item xs={7}>
            <TextField
              placeholder="Insert Amount"
              inputRef={loansRef}
              label="Loans"
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
              Take a loan
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
