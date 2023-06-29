// next
import Head from 'next/head';
import { Button, Container, Stack, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from '../../components/image/Image';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

// PageThree.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettingsContext();
  const [donation, setDonation] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const fetchData = async () => {
    const result = await axiosInstance(`/api/donates/${id}`);
    setDonation(result.data.data);
    };
    useEffect(() => {
        fetchData();
    }, []);


  return (
    <>
      <Head>
        <title> Page Three | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Page Three
        </Typography>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Image src={donation.image} alt={donation.title} />
            <Typography variant="h3" component="h1" paragraph>
                {donation.title}
            </Typography>
            <Typography variant="h3" component="h1" paragraph>
                {donation.description}
            </Typography>
            <Typography variant="h3" component="h1" paragraph>
                {donation.amount}
            </Typography>
            <Button variant="contained">
                Donate
            </Button>
        </Stack>
      </Container>
    </>
  );
}
