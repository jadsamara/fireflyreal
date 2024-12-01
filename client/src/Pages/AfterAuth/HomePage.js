import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import { SparkCardsList } from "./HomePage/Components/SparkCardsList";
import { SafeArea } from "../../Components/GlobalComponents";

import styled from "styled-components";
import { AuthContext } from "../../Config/AuthContext";

import { PointsComponent } from "./HomePage/Components/PointsComponent";
import { HomePageFilterSearchBar } from "./HomePage/Components/HomePageFilterSearchBar";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { HomeScreenFilters } from "./HomePage/Components/HomeScreenFilters";

import { auth, database } from "../../Config/firebase";

import { getDistance } from "../../Functions/GetDistance";
import { getUserInfo } from "../../Functions/GetUserInfo";
import { useSelector } from "react-redux";

export const HomePage = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [nextActiveDate, setNextActiveDate] = useState(null);
  const [countdown, setCountdown] = useState("");

  const userNumber = auth.currentUser.phoneNumber;
  const { location } = useContext(AuthContext);
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const checkSparksForReview = async () => {
      if (
        !userData.currentActiveSparks ||
        userData.currentActiveSparks.length === 0
      ) {
        return;
      }

      try {
        const sparksToReview = [];

        // Iterate over currentActiveSparks
        for (const sparkId of userData.currentActiveSparks) {
          const sparkDocRef = doc(database, "Sparks", sparkId);
          const sparkDoc = await getDoc(sparkDocRef);

          if (sparkDoc.exists()) {
            const sparkData = sparkDoc.data();

            // Check if userReviewList exists and has an entry for this user
            const needsReview = sparkData.userReviewList?.some(
              (entry) => entry.user === userNumber
            );

            if (needsReview) {
              sparksToReview.push({
                currentDocID: sparkId,
                ...sparkData,
              });
              const arrivalDataDocRef = doc(database, "ArrivedParty", sparkId);
              const ArrivedPartyDoc = await getDoc(arrivalDataDocRef);

              navigation.navigate("ReviewAccountsPage", {
                spark: sparksToReview[0],
                arrivalData: ArrivedPartyDoc,
              });
            }
          } else {
            console.warn(`Spark with ID ${sparkId} not found.`);
          }
        }
      } catch (error) {
        console.error("Error checking Sparks for review:", error);
      }
    };

    checkSparksForReview();
  }, [userNumber]);

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
    <SafeArea>
      <Header>
        <HeaderText>Welcome back, {userData.name}.</HeaderText>
        <PointsComponent />
      </Header>

      <SearchBarContainer>
        <HomePageFilterSearchBar
          setSearchKeyword={setSearchKeyword}
          searchKeyword={searchKeyword}
          placeholder="Looking for a particular hangout spot?"
          navigation={navigation}
        />
      </SearchBarContainer>

      <FilterContainer>
        <HomeScreenFilters />
      </FilterContainer>

      <SparkCardContainer>
        <SparkCardsList navigation={navigation} />
      </SparkCardContainer>

      {nextActiveDate && countdown ? (
        <ActiveDateContainer onPress={navigateToActiveDate}>
          <ActiveDateText>{countdown} until hangout</ActiveDateText>
        </ActiveDateContainer>
      ) : null}
    </SafeArea>
  );
};

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  align-self: center;
`;

const HeaderText = styled(Text)`
  font-size: 18px;
  font-family: poppins-500;
`;

const SearchBarContainer = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
`;

const SparkCardContainer = styled(View)`
  padding: 15px;
  flex: 1;
`;

const FilterContainer = styled(View)`
  width: 100%;
`;

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
