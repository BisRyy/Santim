// next
import Head from 'next/head';
import { Box, Button, Card, Container, Divider, Link, Modal, Stack, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import Image from '../../components/image/Image';
import { fCurrency, fShortenNumber } from '../../utils/formatNumber';
import axiosInstance from '../../utils/axios';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

PageThree.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettingsContext();

  // const data = [
  //   { id: 1,name: 'Hager', description: 'shjdhsjdhsj', image: '/assets/images/about/hero.jpg' },
  //   { id: 2,name: 'Hager', description: 'shjdhsjdhsj', image: '/assets/images/about/testimonials.jpg' },
  //   { id: 3,name: 'Hager', description: 'shjdhsjdhsj', image: '/assets/images/about/vision.jpg' },
  //   { id: 4,name: 'Hager', description: 'shjdhsjdhsj', image: '/assets/images/about/what_1.jpg' },
  // ];
  
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    const result = await axiosInstance('/api/donates');
    console.log(result.data.data);
    setData(result.data.data);
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
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" component="h1" paragraph>
            Donations
          </Typography>
          <Button variant="contained" href="/dashboard/donation/new">Create New Donation</Button>
        </Stack>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {
            // donation card
            data && data.map((value, index) => (
              <Card sx={{ textAlign: 'center' }} key={index}>
                <Box sx={{ position: 'relative' }}>
                  <Image src={value.image} alt={value.image} ratio="16/9" />
                </Box>

                <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
                  <Link href={`/dashboard/donation/${value._id}`}>{value.title}</Link>
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', py: 3 }}>
                  {value.description}
                </Typography>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
                  <div>
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{ mb: 0.75, color: 'text.disabled' }}
                    >
                      Goal
                    </Typography>
                    <Typography variant="subtitle1">{fCurrency(2010)}</Typography>
                  </div>

                  <div>
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{ mb: 0.75, color: 'text.disabled' }}
                    >
                      Current
                    </Typography>

                    <Typography variant="subtitle1">{fCurrency(1000)}</Typography>
                  </div>

                  <div>
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{ mb: 0.75, color: 'text.disabled' }}
                    >
                      Donators
                    </Typography>
                    <Typography variant="subtitle1">{fShortenNumber(100)}</Typography>
                  </div>
                </Box>
              </Card>
            ))
          }
        </Box>
      </Container>
    </>
  );
}

const popUp = () => {
  <Modal open={true} onClose={() => {}}>
    <div>hello</div>
  </Modal>
}