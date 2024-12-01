import { View, Text } from "react-native";
import React from "react";

import styled from "styled-components";

import MapView, { Marker } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";

export const MapSection = ({ spark }) => {
  return (
    <Container>
      <MapSubTitle>Map View</MapSubTitle>
      <MapContainer>
        <MapWrapper>
          <Map
            region={{
              latitude: spark.hangoutCoordinates.latitude,
              longitude: spark.hangoutCoordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={spark.hangoutCoordinates}
              title={`${spark.hostName}'s Spark`}
              description={spark.locationName}
            >
              <FontAwesome5 name="map-marker-alt" size={34} color="green" />
            </Marker>
          </Map>
        </MapWrapper>
      </MapContainer>
    </Container>
  );
};

const Container = styled(View)`
  margin-top: 20px;
`;

const MapSubTitle = styled(Text)`
  font-size: 14px;
  font-family: poppins-500;
  text-align: center;
`;

const MapContainer = styled(View)`
  width: 90%;
  height: 300px;
  margin-top: 15px;
  align-self: center;
`;

const MapWrapper = styled(View)`
  height: 100%;
  border-radius: 20px;
  overflow: hidden; /* This will clip the content inside the view */
`;

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
