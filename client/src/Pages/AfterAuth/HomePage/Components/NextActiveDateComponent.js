import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";

import { getUserInfo } from "../../../../Functions/GetUserInfo";
import { getDistance } from "../../../../Functions/GetDistance";

import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../../../Config/firebase";

export const NextActiveDateComponent = ({
  navigation,
  countdown,
  setCountdown,
  userNumber,
  nextActiveDate,
  setNextActiveDate,
  location,
}) => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const userDataFetched = await getUserInfo(userNumber);
        const currentActiveSparks = userDataFetched.currentActiveSparks || [];

        if (currentActiveSparks.length > 0) {
          const sparksData = await Promise.all(
            currentActiveSparks.map(async (dateId) => {
              const dateDocRef = doc(database, "Sparks", dateId);
              const dateDocSnapshot = await getDoc(dateDocRef);
              if (dateDocSnapshot.exists()) {
                return { ...dateDocSnapshot.data(), currentDocID: dateId };
              }
              return null;
            })
          );

          const validSparks = sparksData
            .filter((data) => data !== null)
            .map((data) => ({
              ...data,
              difference: Math.abs(
                new Date(data.chosenTime).getTime() - Date.now()
              ),
            }))
            .sort((a, b) => a.difference - b.difference);

          const nearestDateData = validSparks[0];

          if (nearestDateData) {
            const currentTime = Date.now();
            const timeDifference = nearestDateData.chosenTime - currentTime;

            if (timeDifference > -86400000 && timeDifference <= 86400000) {
              nearestDateData.distance = getDistance(location, nearestDateData);
              setNextActiveDate(nearestDateData);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, [userNumber]);

  useEffect(() => {
    if (nextActiveDate) {
      const interval = setInterval(() => {
        const now = new Date().getTime(); // Current time in ms
        const timeLeft = nextActiveDate.chosenTime - now; // Difference in ms

        if (timeLeft <= 0) {
          clearInterval(interval);
          setCountdown("00:00:00"); // Timer ends
        } else {
          const hours = String(
            Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
          ).padStart(2, "0");
          const minutes = String(
            Math.floor((timeLeft / (1000 * 60)) % 60)
          ).padStart(2, "0");
          const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(
            2,
            "0"
          );
          setCountdown(`${hours}:${minutes}:${seconds}`);
        }
      }, 1000);

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [nextActiveDate]);

  const navigateToActiveDate = () => {
    navigation.navigate("ViewActiveSparkPage", {
      spark: nextActiveDate,
    });
  };

  return (
    <ActiveDateContainer onPress={navigateToActiveDate}>
      <ActiveDateText>{countdown} until hangout</ActiveDateText>
    </ActiveDateContainer>
  );
};

const ActiveDateContainer = styled(TouchableOpacity)`
  position: absolute;
  height: 30px;
  background-color: #ffd572;
  border-radius: 30px;
  bottom: 20px;
  right: 20px;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  width: 220px;
`;

const ActiveDateText = styled(Text)`
  font-size: 12px;
  font-family: poppins-600;
  color: white;
`;
