import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import MapView, { Marker, Circle } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import { Header, Footer, TimeRemaining } from ".";

import { auth, database } from "../../../../../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";

import { getTimeState } from "../../../../../../Functions/ArrivalTimeFunctions";

export const ArrivedPage = ({ spark, navigation, timeRemaining }) => {
  const userId = auth.currentUser.phoneNumber;
  const [updatedLocation, setUpdatedLocation] = useState(null);
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    const updateUserLocation = async () => {
      try {
        if (!auth.currentUser) {
          console.error("User not authenticated");
          return;
        }

        const userLocationRef = doc(
          database,
          "DeviceLocations",
          spark.currentDocID
        );

        const updatedDoc = await getDoc(userLocationRef);
        if (updatedDoc.exists()) {
          // Set the updated document into state
          setUpdatedLocation(updatedDoc.data());

          // Get the current user's last known location from the document data
          const currentUserLocation = updatedDoc
            .data()
            .Array.find((location) => location.userId === userId);

          if (currentUserLocation) {
            setMyLocation({
              latitude: currentUserLocation.latitude,
              longitude: currentUserLocation.longitude,
            });
          } else {
            console.log("Current user location not found in DeviceLocations");
          }
        } else {
          console.error("Updated document does not exist");
        }
      } catch (error) {
        console.error("Error updating user location:", error);
      }
    };

    updateUserLocation();
  }, []);

  const timeState = getTimeState(timeRemaining); // Get the time state

  return (
    <Container>
      <Header spark={spark} timeState={timeState} />

      <MapContainer>
        {myLocation && (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {updatedLocation.Array.map((location, index) => {
              if (location.userId === userId) {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: myLocation.latitude,
                      longitude: myLocation.longitude,
                    }}
                    title="Your Location"
                  >
                    <ProfilePicture
                      source={{
                        uri: location.profilePicture,
                      }}
                    />
                  </Marker>
                );
              }

              return (
                <Marker
                  key={index} // Use a unique key for each Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title={location.userId} // Assuming userId should be used as the title
                >
                  <ProfilePicture
                    source={{
                      uri: location.profilePicture,
                    }}
                  />
                </Marker>
              );
            })}

            <Marker
              coordinate={spark.hangoutCoordinates}
              title={`${spark.user}'s Spark`}
              description={spark.location}
            >
              <FontAwesome5 name="map-marker-alt" size={24} color="green" />
            </Marker>
            <Circle
              center={spark.hangoutCoordinates}
              radius={750}
              fillColor="rgba(44,168,255,0.3)" // Fill color of the circle
              strokeColor="rgba(44,168,255,0.3)"
            />
          </MapView>
        )}
      </MapContainer>
      <TimeRemaining
        spark={spark}
        timeState={timeState}
        timeRemaining={timeRemaining}
      />

      <Footer
        updatedLocation={updatedLocation}
        navigation={navigation}
        spark={spark}
      />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  position: relative;
`;

const MapContainer = styled(View)`
  flex: 1;
`;

const Map = styled(MapView)`
  flex: 1;
`;

const ProfilePicture = styled(Image)`
  height: 40px;
  width: 40px;
  border-radius: 10000px;
  border-width: 1px;
  border-color: #2ca8ff;
`;
