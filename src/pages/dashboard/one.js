// next
import Head from 'next/head';
import { Button, Container, Grid, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import Iconify from '../../components/iconify/Iconify';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from '../../utils/cssStyles';

// ----------------------------------------------------------------------

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();
  const color = 'primary';

  const list = [0, 1, 2, 3];
  const menu = [
    { name: 'Donations', path: '/dashboard/donations', icon: 'mdi:credit-card-outline' , color: "primary"},
    { name: 'Split Bill', path: '/dashboard/split', icon: 'mdi:credit-card-outline' , color: "info"},
    { name: 'Request Payment', path: '/dashboard/request', icon: 'mdi:credit-card-outline' , color: "warning"},
    { name: 'Payment Link', path: '/dashboard/four', icon: 'mdi:credit-card-outline' , color: "error"},
  ];

  return (
    <>
      <Head>
        <title> Page One | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {menu.map((item, index) => (
            <Grid item xs={6} md={6} lg={3} key={index}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  p: 3,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: "center",
                  py: 5,
                  boxShadow: 0,
                  color: theme.palette[color].darker,
                  bgcolor: theme.palette[`${item.color || color}`].lighter,
                }}
                href={item.path}
              >
                <Iconify
                  icon={item.icon}
                  width={48}
                  height={48}
                  sx={{
                    mb: 3,
                    p: 2.5,
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    color: theme.palette[color].dark,
                    ...bgGradient({
                      direction: '135deg',
                      startColor: `${alpha(theme.palette[color].dark, 0)} 0%`,
                      endColor: `${alpha(theme.palette[color].dark, 0.24)} 100%`,
                    }),
                  }}
                />
                <Typography variant="h6">{item.name}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
