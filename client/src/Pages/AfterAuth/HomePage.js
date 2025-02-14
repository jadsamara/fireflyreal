import { View, Text } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../Components/GlobalComponents";
import { AuthContext } from "../../Config/AuthContext";
import { useSelector } from "react-redux";

import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../Config/firebase";

import { HomeScreenFilters } from "./HomePage/Components/HomeScreenFilters";
import { NextActiveDateComponent } from "./HomePage/Components/NextActiveDateComponent";
import { PointsComponent } from "./HomePage/Components/PointsComponent";
import { HomePageFilterSearchBar } from "./HomePage/Components/HomePageFilterSearchBar";
import { SparkCardsList } from "./HomePage/Components/SparkCardsList";

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
        <SparkCardsList navigation={navigation} searchKeyword={searchKeyword} />
      </SparkCardContainer>

      {nextActiveDate && countdown ? (
        <NextActiveDateComponent
          navigation={navigation}
          countdown={countdown}
          setCountdown={setCountdown}
          userNumber={userNumber}
          nextActiveDate={nextActiveDate}
          setNextActiveDate={setNextActiveDate}
          location={location}
        />
      ) : null}
    </SafeArea>
  );
};

const Header = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${(props) => props.theme.space.large};
  padding-right: ${(props) => props.theme.space.large};
`;

const HeaderText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.header};
  font-family: poppins-500;
`;

const SearchBarContainer = styled(View)`
  padding-left: ${(props) => props.theme.space.mediumLarge};
  padding-right: ${(props) => props.theme.space.mediumLarge};
`;

const SparkCardContainer = styled(View)`
  padding: ${(props) => props.theme.space.large};
  flex: 1;
`;

const FilterContainer = styled(View)`
  width: 100%;
`;
