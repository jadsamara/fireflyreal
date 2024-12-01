import React, { useEffect, useState, useContext, useCallback } from "react";
import { FlatList, View, Text, RefreshControl } from "react-native";

import styled from "styled-components";

import { AuthContext } from "../../../Config/AuthContext";

import { auth, database } from "../../../Config/firebase";
import { getDoc, doc } from "firebase/firestore";

import { getUserInfo } from "../../../Functions/GetUserInfo";
import { SparkCardPaths } from "./SparkCardPaths";

import { getDistance } from "../../../Functions/GetDistance";

export const SparkCardsList = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [initialData, setInitialData] = useState([0]);

  const { location } = useContext(AuthContext);
  const userNumber = auth.currentUser.phoneNumber;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      const getData = async () => {
        try {
          // Fetch user document based on userNumber
          const userDocRef = doc(database, "Users", userNumber);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();

            const isCancelled =
              userData.penalties?.map((penalty) => penalty.sparkDocID) || [];
            // Collect all unique Spark IDs from the specified arrays
            const sparkIds = new Set([
              ...(userData.sparksRequestedByUser || []),
              ...(userData.postedSparksByUser || []),
              ...(userData.currentConfirmedSparks || []),
              ...(userData.currentActiveSparks || []),
              ...(userData.pastSparks || []),
              ...isCancelled,
            ]);

            // Fetch the corresponding Spark documents
            const sparkPromises = Array.from(sparkIds).map((sparkId) =>
              getDoc(doc(database, "Sparks", sparkId))
            );
            const sparkDocs = await Promise.all(sparkPromises);

            // Process each Spark document
            const dataWithDistances = await Promise.all(
              sparkDocs.map(async (sparkDoc) => {
                if (sparkDoc.exists()) {
                  const dates = sparkDoc.data();
                  const documentId = sparkDoc.id;

                  const isPastSpark = userData.pastSparks || [];

                  const distanceVal = await getDistance(location, dates);
                  const roundedVal = parseFloat(distanceVal).toFixed(1);
                  const distance = `(${roundedVal} km)`;

                  // Fetch user information for the spark's host
                  const userInfo = await getUserInfo(dates.host);

                  return {
                    documentId,
                    distance,
                    userInfo,
                    isPastSpark,
                    ...dates,
                  };
                }
                return null;
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
    return <SparkCardPaths spark={item} navigation={navigation} />;
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
