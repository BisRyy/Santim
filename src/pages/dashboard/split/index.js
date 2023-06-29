import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Container, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import DashboardLayout from '../../../layouts/dashboard';

const useStyles = styled((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

SplitPaymentPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


export default function SplitPaymentPage(){
  const classes = useStyles();
  const [totalAmount, setTotalAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform payment split logic or submit the data
    console.log(`Total Amount: ${totalAmount}`);
    console.log('Recipients:', recipients);
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Split Payment
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Total Amount"
          fullWidth
          value={totalAmount}
          onChange={(event) => setTotalAmount(event.target.value)}
          className={classes.textField}
        />
        
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddRecipient}
          className={classes.button}
        >
          Add Recipient
        </Button>
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Split Payment
        </Button>
      </form>
    </Container>
  );
};

