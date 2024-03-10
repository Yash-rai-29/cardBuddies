import React, { useState, useEffect } from "react";
import { Button, Grid, Slide } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [showCardIndex, setShowCardIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false); // State to control the sliding animation
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([
    {
      title: "I can help buyers grab that deal",
      content:
        "Find someone who needs my card to avail a specific online deal.",
      actions: [
        { label: "Add cards", variant: "outlined" },
        {
          label: "See Available Cards",
          variant: "contained",
          color: "primary",
          link: "/account/profile", // Link to the available cards page
        },
      ],
    },
    {
      title: "Another card title",
      content: "Another card content",
      actions: [
        { label: "Custom Action", variant: "contained", color: "secondary" },
      ],
    },
    // Add more card data objects as needed
  ]);

  const toggleCard = (direction) => {
    setTransitioning(true); // Trigger the sliding animation
    setTimeout(() => {
      setTransitioning(false); // Reset the transitioning state after the transition completes
      if (direction === "prev") {
        setShowCardIndex((prevIndex) =>
          prevIndex === 0 ? cardData.length - 1 : prevIndex - 1
        );
      } else {
        setShowCardIndex((prevIndex) =>
          prevIndex === cardData.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 300); // Adjust the delay to match the transition duration in milliseconds
  };

  // Function to automatically switch cards after 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      toggleCard("next");
    }, 5000);
    return () => clearInterval(timer);
  }, [showCardIndex]);

  return (
    <div className="bg-blue-100 px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Find right cards
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Never miss out on any online offer on any bank cards.
              </p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="flex flex-col space-y-6 relative">
              {/* Slide component to display cards */}
              <Slide direction={transitioning ? "left" : "right"} in={true} mountOnEnter unmountOnExit>
                <Card className="bg-white shadow-lg p-6">
                  <CardHeader title={cardData[showCardIndex].title} />
                  <CardContent>{cardData[showCardIndex].content}</CardContent>
                  {/* Card actions */}
                  <CardActions>
                    {cardData[showCardIndex].actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant}
                        color={action.color}
                        onClick={() => {
                          if (action.link) {
                            navigate(action.link);
                          }
                        }}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </CardActions>
                </Card>
              </Slide>
              {/* Navigation icons */}
              <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between">
                <ChevronLeftIcon
                  onClick={() => toggleCard("prev")}
                  className="text-gray-600 h-6 w-6 cursor-pointer"
                />
                <ChevronRightIcon
                  onClick={() => toggleCard("next")}
                  className="text-gray-600 h-6 w-6 cursor-pointer"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
