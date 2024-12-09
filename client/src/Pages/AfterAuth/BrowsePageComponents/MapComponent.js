import { View, Image, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";

import { database } from "../../../Config/firebase";
import { collection, getDocs } from "firebase/firestore";

import { AntDesign } from "@expo/vector-icons";

import MapView, { Marker, Circle, Callout } from "react-native-maps";

import { getUserInfo } from "../../../Functions/GetUserInfo";

import { AuthContext } from "../../../Config/AuthContext";

export const MapComponent = () => {
  const [allSparks, setAllSparks] = useState([]);
  const { location } = useContext(AuthContext);

  useEffect(() => {
    const fetchSparks = async () => {
      try {
        const sparksCollection = collection(database, "Sparks");
        const sparksSnapshot = await getDocs(sparksCollection);

        // Fetch user data for each spark's host
        const sparksList = await Promise.all(
          sparksSnapshot.docs.map(async (doc) => {
            const sparkData = { id: doc.id, ...doc.data() };
            try {
              // Fetch host user data
              const userData = await getUserInfo(sparkData.host);
              return {
                ...sparkData,
                hostProfilePicture: userData?.profilePicture || null, // Add profile picture to spark
              };
            } catch (error) {
              console.error(
                `Error fetching user info for host ${sparkData.host}:`,
                error
              );
              return {
                ...sparkData,
                hostProfilePicture: null, // Default to null if fetching fails
              };
            }
          })
        );

        setAllSparks(sparksList);
      } catch (error) {
        console.error("Error fetching sparks:", error);
      }
    };

    fetchSparks();
  }, []);

  return (
    <MapContainer>
      <MapView
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
      >
        {allSparks.map((spark, index) => {
          return (
            <React.Fragment key={index}>
              <Marker coordinate={spark.hangoutCoordinates}>
                <ProfilePicture
                  source={{
                    uri: spark.hostProfilePicture,
                  }}
                />

                <Callout
                  tooltip={true}
                  style={{
                    backgroundColor: "#79d17c",
                    padding: 5,
                    paddingBottom: 50,

                    borderRadius: 20,
                  }}
                >
                  <SparkImageContainer>
                    <SparkImage
                      resizeMode={"cover"}
                      source={{ uri: spark.sparkImage }}
                    />
                    <SparkScheduledDate>
                      <SparkScheduledText>{"TBD"}</SparkScheduledText>
                    </SparkScheduledDate>
                    <SparkScheduledDateDays>
                      <AntDesign name="clockcircle" size={12} color="white" />
                      <SparkScheduledTextDays>
                        {"2 Days"}
                      </SparkScheduledTextDays>
                    </SparkScheduledDateDays>
                    <SparkTitle>{spark.sparkTitle}</SparkTitle>
                  </SparkImageContainer>
                  <FooterContainer>
                    <ProfilePictureHost
                      source={{ uri: spark.hostProfilePicture }}
                    />
                  </FooterContainer>
                </Callout>
              </Marker>
              <Circle
                center={spark.hangoutCoordinates}
                radius={300} // Adjust radius in meters as needed
                fillColor="rgba(121,209,124,0.4)" // Circle fill color
                strokeColor="rgba(44,168,255,0.3)" // Circle border color
              />
            </React.Fragment>
          );
        })}
      </MapView>
    </MapContainer>
  );
};

const MapContainer = styled(View)`
  flex: 1;
`;

const ProfilePicture = styled(Image)`
  height: 45px;
  width: 45px;
  border-radius: 10000px;
  border-width: 2px;
  border-color: green;
`;

const SparkImageContainer = styled(View)`
  width: 250px;
  height: 120px;
  position: relative;
`;

const SparkImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const SparkScheduledDate = styled(View)`
  background-color: #79d17c;
  position: absolute;
  z-index: 999;
  top: 15px;
  left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 10px;
`;

const SparkScheduledText = styled(Text)`
  color: white;
  font-size: 7px;
  font-family: poppins-800;
`;

const SparkScheduledDateDays = styled(View)`
  background-color: #79d17c;
  position: absolute;
  z-index: 999;
  top: 15px;
  right: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
`;

const SparkScheduledTextDays = styled(Text)`
  color: white;
  font-size: 7px;
  margin-left: 5px;
  font-family: poppins-800;
`;

const SparkTitle = styled(Text)`
  color: white;
  font-size: 18px;
  font-family: poppins-800;
  position: absolute;
  z-index: 999;
  bottom: 10px;
  left: 15px;
`;

const FooterContainer = styled(View)`
  width: 100%;
  height: 60px;
`;

const ProfilePictureHost = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  position: absolute;
  left: 0px;
  top: 5px;
`;
