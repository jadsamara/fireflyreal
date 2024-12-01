import { View, Text } from "react-native";
import React from "react";

import styled from "styled-components";
import MapView, { Marker, Circle } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import { Header, Footer, TimeRemaining } from ".";

export const InitialPage = ({ spark }) => {
  return (
    <Container>
      <Header spark={spark} />

      <MapContainer>
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
        </Map>
      </MapContainer>
      <TimeRemaining spark={spark} />

      <Footer spark={spark} />
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
