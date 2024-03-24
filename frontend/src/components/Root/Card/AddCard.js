import {
  Button,
  MenuItem,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  SignalCellularAlt,
  Instagram,
} from "@mui/icons-material";
import React, { useState } from "react";
import { CardHeader, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { makeStyles } from "@mui/styles";
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "auto",
    marginTop: theme.spacing(4),
  },
  form: {
    padding: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const banks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Punjab National Bank",
  "Axis Bank",
  "Canara Bank",
  "Bank of Baroda",
  "Union Bank of India",
  "Bank of India",
  "Indian Bank",
  "Central Bank of India",
  "IDBI Bank",
  "Yes Bank",
  "Kotak Mahindra Bank",
  "IndusInd Bank",
  "Federal Bank",
  "RBL Bank",
  "South Indian Bank",
  "Bandhan Bank",
  "IDFC First Bank",
  "City Union Bank",
  "Karur Vysya Bank",
  "DCB Bank",
  "Lakshmi Vilas Bank",
  "Jammu & Kashmir Bank",
  "Nainital Bank",
  "Karnataka Bank",
  "AU Small Finance Bank",
  "Equitas Small Finance Bank",
  "Ujjivan Small Finance Bank",
  "Suryoday Small Finance Bank",
  "Fincare Small Finance Bank",
  "ESAF Small Finance Bank",
  "Paytm Payments Bank",
  "Airtel Payments Bank",
  "India Post Payments Bank",
];

const cardTypes = ["Visa", "MasterCard", "American Express"];

export default function AddCard() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    selectedBank: "",
    selectedCardType: "",
    selectedCardVariant: "",
    purchaseLimit: "",
    nickname: "",
  });
  const [bankNames, setBankNames] = useState(banks);
  const [cardVariants, setCardVariants] = useState(cardTypes);
  const [selectedCardType, setSelectedCardType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCardTypeSelect = (type) => {
    setSelectedCardType(type);
    setFormData((prevData) => ({
      ...prevData,
      selectedCardType: type,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if any form field is empty
    if (
      Object.values(formData).some((value) => value === "") ||
      selectedCardType === ""
    ) {
      toast.error('Please fill out all fields.', {
        autoClose: 5000,
      });
      return;
    }

    try {
      // Get userId from cookies
      const userId = Cookies.get("userId");

      if (!userId) {
        alert("User not authenticated");
        return;
      }

      // Send userId and cardDetails to /add-card endpoint
      const response = await fetch("http://localhost:3000/add-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          cardDetails: formData,
        }),
      });

      if (!response.ok) {
        // throw new Error("Failed to add card");
        toast.error('Failed to add card', {
          autoClose: 5000,
        });
      }

      // Reset form after successful submission
      setFormData({
        selectedBank: "",
        selectedCardType: "",
        selectedCardVariant: "",
        purchaseLimit: "",
        nickname: "",
      });

      // alert("Card added successfully!");
      toast.success('Congratulations! Card added successfully', {
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('Failed to add card', {
        autoClose: 5000,
      });
    }
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <main className=" mx-auto py-12">
      <ToastContainer />
        <Card
          component={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className={classes.card}
        >
          <CardHeader title="Which Bank's Card Do You Want To Add?" />
          <CardContent className={classes.form}>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Search Bank"
                    name="selectedBank"
                    value={formData.selectedBank}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    {bankNames.map((bank, index) => (
                      <MenuItem key={index} value={bank}>
                        {bank}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Card
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        sx={{
                          cursor: "pointer",
                          textAlign: "center",
                          p: 2,
                          bgcolor:
                          selectedCardType === "credit"
                              ? "blue.100"
                              : "background.paper",
                          borderRadius: 1,
                          ...(isMobile && { mb: 2 }),
                        }}
                        style={{
                            backgroundColor:
                              selectedCardType === "credit" ? "#2196f3" : "transparent",
                            color: selectedCardType === "credit" ? "#fff" : "#000",
                            padding: "10px",
                            margin: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        onClick={() => handleCardTypeSelect("credit")}
                      >
                        <CreditCardIcon sx={{ mb: 1 }} />
                        <span>Credit Card</span>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        sx={{
                          cursor: "pointer",
                          textAlign: "center",
                          p: 2,
                          bgcolor:
                            selectedCardType === "debit"
                              ? "blue.100"
                              : "background.paper",
                          borderRadius: 1,
                          ...(isMobile && { mb: 2 }),
                        }}
                        style={{
                            backgroundColor:
                              selectedCardType === "debit" ? "#2196f3" : "transparent",
                            color: selectedCardType === "debit" ? "#fff" : "#000",
                            padding: "10px",
                            margin: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        onClick={() => handleCardTypeSelect("debit")}
                      >
                        <CreditCardIcon sx={{ mb: 1 }} />
                        <span>Debit Card</span>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Enter the purchase limit"
                    name="purchaseLimit"
                    value={formData.purchaseLimit}
                    onChange={handleChange}
                    variant="outlined"
                    helperText="This is the maximum amount you want to spend per transaction when you purchase a product for the buyer."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="What is the card type?"
                    name="selectedCardVariant"
                    value={formData.selectedCardVariant}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    {cardVariants.map((variant, index) => (
                      <MenuItem key={index} value={variant}>
                        {variant}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nickname for card"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className={classes.submitButton}
                  >
                    NEXT
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex justify-center items-center">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Facebook fontSize="large" />
              </a>
            </div>
            <div className="flex justify-center items-center">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Twitter fontSize="large" />
              </a>
            </div>
            <div className="flex justify-center items-center">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <SignalCellularAlt fontSize="large" />
              </a>
            </div>
            <div className="flex justify-center items-center">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Instagram fontSize="large" />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Typography>
              Need help? Send us a mail at:{" "}
              <a
                href="mailto:care@CardBuddies.com"
                className="text-blue-600 hover:text-blue-800"
              >
                care@CardBuddies.com
              </a>
            </Typography>
          </div>
          <div className="flex justify-center mt-4">
            <Typography variant="body2">
              <a href="#" className="text-blue-600 hover:text-blue-800 mr-4">
                Privacy Policy
              </a>
            </Typography>
            <Typography variant="body2">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </a>
            </Typography>
          </div>
          <Typography variant="body2" align="center" className="mt-4">
            © CardBuddies. Powered by Bazzinga Internet Pvt Ltd. All rights
            reserved.
          </Typography>
        </div>
      </footer>
    </div>
  );
}
