import React from "react";
import { Button, Container, Paper, Grid, TextField, Typography } from "@mui/material";

export default function Home() {

  return (
    <>
    <div className="bg-black px-8 py-16">
      <div className="max-w-7xl mx-auto">
      <section style={{ backgroundColor: '#000', color: '#fff', padding: '20px 10px' }}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={12} md={6} style={{ marginBottom: '10px' }}>
        <Typography variant="h3" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
            Discover exclusive credit card offers from top banks
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: '20px' }}>
            Explore offers by bank, category or discounts
          </Typography>
          <TextField 
            variant="outlined" 
            fullWidth 
            placeholder="Find your perfect credit card offer here"
            InputProps={{
              style: { color: '#fff', borderColor: '#fff' },
              startAdornment: null,
            }}
            style={{ borderColor: 'white' }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '10px' }}
          >
            Find
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            alt="Credit Card Offers"
            src="/hero.png"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            }}
          />
        </Grid>
      </Grid>
    </section>
    <section style={{ backgroundColor: '#121212', color: '#fff', padding: '80px 0' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          How CardBuddies works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', height: '100%' }}>
              <img
                alt="Step 1"
                src="/1.png"
                style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
              />
              <Typography variant="h3" gutterBottom>
                Step 1
              </Typography>
              <Typography paragraph>
                Enter your card details securely. Start exploring exclusive deals today!
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', height: '100%' }}>
              <img
                alt="Step 2"
                src="/2.png"
                style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
              />
              <Typography variant="h3" gutterBottom>
                Step 2
              </Typography>
              <Typography paragraph>
                Choose an offer and complete the transaction. Enjoy the benefits of special discounts.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', height: '100%' }}>
              <img
                alt="Step 3"
                src="/3.png"
                style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
              />
              <Typography variant="h3" gutterBottom>
                Step 3
              </Typography>
              <Typography paragraph>
                Redeem your offer. Sit back and relax as your savings grow!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      </section>
    </div>
    </div>
  </>
  );
}
