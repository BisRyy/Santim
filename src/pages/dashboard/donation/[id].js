// next
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import Image from '../../../components/image/Image';

import { alpha, styled } from '@mui/material/styles';
// ----------------------------------------------------------------------

PageThree.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

const StyledTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h3,
  bottom: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    ...theme.typography.h2,
    padding: theme.spacing(5),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

export default function PageThree() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Page Three | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box
          sx={{
            overflow: 'hidden',
            position: 'relative',
            borderRadius: {
              xs: `16px 16px 16px 16px`,
              md: `16px 16px 0 0`,
            },
          }}
        >
          <StyledTitle>Page Three</StyledTitle>
          <StyledOverlay />
          <Image alt="cover" src={'/assets/images/about/hero.jpg'} ratio="16/9" />
        </Box>
        <Typography gutterBottom>Donation Page</Typography>

        
      </Container>
    </>
  );
}
