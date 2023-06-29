// next
import Head from 'next/head';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import { useState } from 'react';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

PageThree.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();

  return (
    <>
      <Head>
        <title> Page Three | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Page Three
        </Typography>
        <CreateDonation />
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

// create donation using form and api /donates
const CreateDonation = () => {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();

  const [donation, setDonation] = useState({
    title: 'Education Fund',
    description: 'Supporting educational programs',
    amount: 500,
    image: '/assets/images/about/hero.jpg',
  });

  const handleChange = (event) => {
    setDonation({ ...donation, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log('submit');
    console.log(donation);
    fetch('/api/donates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donation),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // pop up a message
        alert('Donation created successfully');
        // redirect to donations page
        router.push('/dashboard/donations');
      })
      .catch(console.log);
  };

  return (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <TextField
          label="Title"
          type="text"
          name="title"
          value={donation.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          type="text"
          name="description"
          value={donation.description}
          onChange={handleChange}
          rows={4}
          multiline
          required
        />
        <TextField
          label="Goal Amount"
          type="number"
          name="amount"
          value={donation.amount}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Create Donation
        </Button>
      </Stack>
    </>
  );
};
