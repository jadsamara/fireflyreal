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

export const SparkCardsList = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [initialData, setInitialData] = useState([0]);

  const { location } = useContext(AuthContext);
  const { setSelectedDate, reset } = useContext(HomePageContext);
  const userNumber = auth.currentUser.phoneNumber;

  const onHandleNavigateViewSpark = (item) => {
    navigation.navigate("ViewSparkPage", {
      sparkData: item,
    });
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate an asynchronous task (e.g., data fetching)
    setTimeout(() => {
      // Fetch the data or perform any other necessary operations
      const getData = async () => {
        try {
          const querySnapshot = await getDocs(
            query(collection(database, "Sparks"), orderBy("timeOfPost", "desc"))
          );

          if (querySnapshot) {
            const dataWithDistances = await Promise.all(
              querySnapshot.docs.map(async (doc) => {
                const dates = doc.data();
                if (
                  dates.isSparkActive ||
                  dates.isCompleted.some((user) => user === userNumber) ||
                  dates.host === userNumber ||
                  dates.currentlyJoinedProfileParticipants.includes(
                    userNumber
                  ) ||
                  dates.allRequesters.some(
                    (requester) => requester.user === userNumber
                  )
                ) {
                  return null; // Skip this document if the host doesn't match the userNumber
                }
                const documentId = doc.id;

                const distance = getDistance(location, dates);
                const userInfo = await getUserInfo(dates.host);

                return { documentId, distance, userInfo, ...dates };
              })
            );

            const homeScreenData = dataWithDistances.filter(Boolean);

            setFilteredData(homeScreenData);
            setInitialData(homeScreenData);
          }

          setRefreshing(false); // Set refreshing state back to false after data fetching is complete
        } catch (error) {
          // Handle errors, e.g., log them or show a message to the user
          console.error("Error fetching data:", error);
          setRefreshing(false);
        }
      };

      if (location) {
        getData();
      } else {
        setRefreshing(false);
      }
    }, 10); // Adjust the delay time as needed
  }, []);

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
