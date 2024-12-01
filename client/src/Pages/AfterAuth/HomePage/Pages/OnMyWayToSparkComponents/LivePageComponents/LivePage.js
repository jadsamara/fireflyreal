import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import MapView, { Marker, Circle } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import { Header, Footer, TimeRemaining } from ".";

import { auth } from "../../../../../../Config/firebase";

import { getTimeState } from "../../../../../../Functions/ArrivalTimeFunctions";

export const LivePage = ({
  spark,
  myLocation,
  updatedLocation,
  setArrivedToLocation,
  navigation,
  timeRemaining,
}) => {
  const userId = auth.currentUser.phoneNumber;

  const getDistance = (coords1, coords2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;

    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert degrees to radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };

  const distanceToTarget = myLocation
    ? getDistance(myLocation, spark.hangoutCoordinates)
    : null;

  useEffect(() => {
    if (distanceToTarget !== null && distanceToTarget < 1110.5) {
      setArrivedToLocation(true);
    }
  }, [distanceToTarget]);

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
              title={`${spark.sparkTitle} Spark`}
              description={spark.locationName}
            >
              <FontAwesome5 name="map-marker-alt" size={24} color="green" />
            </Marker>
            <Circle
              center={spark.hangoutCoordinates}
              radius={500}
              fillColor="rgba(44,168,255,0.3)" // Fill color of the circle
              strokeColor="rgba(44,168,255,0.3)"
            />
          </MapView>
        )}
      </MapContainer>
      <TimeRemaining timeRemaining={timeRemaining} timeState={timeState} />

      <Footer
        spark={spark}
        distanceToTarget={distanceToTarget}
        updatedLocation={updatedLocation}
        navigation={navigation}
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

const ProfilePicture = styled(Image)`
  height: 30px;
  width: 30px;
  border-radius: 10000px;
  border-width: 1px;
  border-color: #2ca8ff;
`;
