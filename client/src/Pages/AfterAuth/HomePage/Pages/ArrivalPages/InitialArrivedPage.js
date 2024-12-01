import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

import styled from "styled-components/native";

import { SafeArea } from "../../../../../Components/GlobalComponents/SafeArea";

import { Header } from "./ArrivalPageComponents/InitialArrivalComponents/Header";
import { ParticipantsComponent } from "./ArrivalPageComponents/InitialArrivalComponents/ParticipantsComponent";
import { BodyComponent } from "./ArrivalPageComponents/InitialArrivalComponents/BodyComponent";
import { DurationComponent } from "./ArrivalPageComponents/InitialArrivalComponents/DurationComponent";
import { Footer } from "./ArrivalPageComponents/InitialArrivalComponents/Footer";

import { auth, database } from "../../../../../Config/firebase";
import { doc, getDoc, collection } from "firebase/firestore";

export const InitialArrivedPage = ({ navigation, route }) => {
  const { spark } = route.params;

  const [arrivalData, setArrivalData] = useState([]);

  useEffect(() => {
    const getArrivalData = async () => {
      try {
        const userId = auth.currentUser.phoneNumber;
        const arrivedPartyRef = collection(database, "ArrivedParty");
        const arrivedPartyDocRef = doc(arrivedPartyRef, spark.currentDocID);

        const docSnap = await getDoc(arrivedPartyDocRef);

        if (docSnap.exists()) {
          const currentData = docSnap.data();
          const arrivals = currentData.arrivals || [];

          const userExists = arrivals.some(
            (arrival) => arrival.phoneNumber === userId
          );

          const currentUserArrival = arrivals.find(
            (arrival) => arrival.phoneNumber === userId
          );

          setArrivalData(currentUserArrival);

          if (!userExists) {
            console.log("Not in array");
          }
        }
      } catch (error) {
        console.error("Error setting arrival data:", error);
      }
    };
    getArrivalData();
  }, []);

  return (
    <Container>
      <SafeArea>
        <ScrollContainer>
          <TitleText>Memories being made…</TitleText>
          <Header spark={spark} />
          <ParticipantsComponent spark={spark} navigation={navigation} />
          <BodyComponent spark={spark} arrivalData={arrivalData} />
          <DurationComponent spark={spark} arrivalData={arrivalData} />
          <Footer
            spark={spark}
            navigation={navigation}
            arrivalData={arrivalData}
          />
        </ScrollContainer>
      </SafeArea>
    </Container>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
  background-color: white;
`;

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
  background-color: white;
`;

const TitleText = styled(Text)`
  color: black;
  font-family: "poppins-700";
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
`;
