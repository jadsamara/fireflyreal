import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { SparkCard } from "./SparkCard";
import styled from "styled-components";

import { AuthContext } from "../../../../Config/AuthContext";
import { HomePageContext } from "../../../../Context/HomePageContext";

import { auth, database } from "../../../../Config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { getUserInfo } from "../../../../Functions/GetUserInfo";

import { getDistance } from "../../../../Functions/GetDistance";

const OPEN_AI_KEY =
  "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";

export const SparkCardsList = ({ navigation, searchKeyword }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [initialData, setInitialData] = useState([0]);

  const { location } = useContext(AuthContext);
  const { filters } = useContext(HomePageContext);
  const userNumber = auth.currentUser.phoneNumber;

  const onHandleNavigateViewSpark = (item) => {
    navigation.navigate("ViewSparkPage", {
      sparkData: item,
    });
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    const getData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(database, "Sparks"), orderBy("timeOfPost", "desc"))
        );

        if (querySnapshot) {
          // Get AI-generated tags based on the search query
          const dataWithDistances = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const dates = doc.data();

              // Early filtering based on the filters state
              for (const filter of filters) {
                if (!filter.isEnabled) continue;

                // Filter by max distance
                if (filter.maxDistance && location) {
                  const distance = getDistance(location, dates);
                  if (distance > filter.maxDistance) return null; // Skip this document
                }

                // Filter by date range
                if (filter.date) {
                  const { startDate, futureDate } = filter.date;
                  const itemDate = dates.chosenTime;
                  const startDateMS = startDate.seconds * 1000;
                  const futureDateMS = futureDate.seconds * 1000;
                  if (startDateMS > itemDate || futureDateMS < itemDate) {
                    return null; // Skip this document
                  }
                }

                // Filter by max people
                if (
                  filter.maxPeople &&
                  dates.totalNumberOfParticipants > filter.maxPeople
                ) {
                  return null;
                }

                // Filter by min people
                if (
                  filter.minPeople &&
                  dates.totalNumberOfParticipants < filter.minPeople
                ) {
                  return null;
                }
              }

              // Skip if spark is not active or the user is involved
              if (
                dates.isSparkActive ||
                dates.isCompleted.some((user) => user === userNumber) ||
                dates.host === userNumber ||
                dates.currentlyJoinedProfileParticipants.includes(userNumber) ||
                dates.allRequesters.some(
                  (requester) => requester.user === userNumber
                )
              ) {
                return null; // Skip this spark
              }

              // Now, check if the spark matches any of the AI-generated tags

              const documentId = doc.id;
              const distance = getDistance(location, dates); // Calculate distance once
              const userInfo = await getUserInfo(dates.host); // Fetch user info

              return { documentId, distance, userInfo, ...dates };
            })
          );

          const homeScreenData = dataWithDistances.filter(Boolean); // Remove null entries

          setInitialData(homeScreenData);
        }

        setRefreshing(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setRefreshing(false);
      }
    };

    if (location) {
      getData(); // Directly call getData if location is available
    } else {
      setRefreshing(false);
    }
  }, [filters, location, userNumber, searchKeyword]); // Add `searchKeyword` as a dependency to update when the search input changes

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity onPress={() => onHandleNavigateViewSpark(item)}>
        <SparkCard spark={item} />
      </TouchableOpacity>
    );
  }, []);

  if (initialData[0] !== 0) {
    return (
      <>
        <FlatList
          data={initialData}
          removeClippedSubviews={true} // Enable virtualization
          initialNumToRender={10} // Adjust the initial batch size as needed
          windowSize={5} // Adjust the window size as needed
          maxToRenderPerBatch={3} // Adjust the number of items rendered per batch as needed
          showsVerticalScrollIndicator={false}
          numColumns={1}
          renderItem={renderItem} // Memoized renderItem function
          keyExtractor={(item) => item.documentId}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
        {initialData.length === 0 ? (
          <Container>
            <EmptyListText>Nothing to show!</EmptyListText>
          </Container>
        ) : null}
      </>
    );
  }
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  margin-top: 40px;
`;

const EmptyListText = styled(Text)`
  font-family: poppins-300;
  font-size: 18px;
`;
