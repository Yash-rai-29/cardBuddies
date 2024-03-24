import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableCard = () => {
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-cards');
        const filteredData = {};

        for (const userId in response.data.usersWithCards) {
          const userCards = response.data.usersWithCards[userId];
          filteredData[userId] = [];

          userCards.forEach(cardList => {
            Object.keys(cardList).forEach(cardId => {
              const cardDetails = cardList[cardId];
              filteredData[userId].push(cardDetails);
            });
          });
        }

        setUserCards(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Available Cards</h1>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(userCards).map(([userId, cards]) => (
          <div key={userId} className="flex justify-center">
            <div className="max-w-sm w-full">
              {cards.length > 0 ? (
                cards.map((card, index) => (
                  <div key={index} className="animate-fade-in mb-4">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">Card Details</span>
                        </div>
                        <p className="mt-2 text-gray-600">Nickname: {card.nickname}</p>
                        <p className="mt-2 text-gray-600">Purchase Limit: {card.purchaseLimit}</p>
                        <p className="mt-2 text-gray-600">Selected Bank: {card.selectedBank}</p>
                        <p className="mt-2 text-gray-600">Selected Card Type: {card.selectedCardType}</p>
                        <p className="mt-2 text-gray-600">Selected Card Variant: {card.selectedCardVariant}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">No cards available for this user</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCard;
