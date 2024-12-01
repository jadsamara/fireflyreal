import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";

import { PostDateContext } from "../../Context/PostPagesContext";

import { SafeArea } from "../../Components/GlobalComponents";
import styled from "styled-components";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { GoogleAutoComponent } from "../../Components/GlobalComponents/GoogleAutoComponent";
import MapView, { Marker } from "react-native-maps";
import { ItalicTextInput } from "../../Components/GlobalComponents/ItalicTextInput";

export const PostPage = ({ navigation }) => {
  const {
    sparkTitle,
    setSparkTitle,
    fullAddress,
    setFullAddress,
    hangoutCoordinates,
    setUseShortName,
    useShortName,
  } = useContext(PostDateContext);

  const nextPage = () => {
    if (sparkTitle && fullAddress && hangoutCoordinates) {
      navigation.navigate("PostSparkTwo");
    } else {
      Alert.alert("Fill missing fields");
    }
  };

  const showFullAddress = () => {
    setUseShortName((res) => !res);
  };

  return (
    <SafeArea>
      <Container>
        <HeaderText>Ready to make a Spark?</HeaderText>
        <FullContainer>
          <DateInformationContainer>
            <InformationHeader>Name Your Spark</InformationHeader>
            <ItalicTextInput
              placeholder="Max. 30 characters"
              value={sparkTitle}
              onChangeText={setSparkTitle}
            />

            <SubHeader>Select Where To Meet</SubHeader>
            <Row>
              <HideFullAddressButton onPress={showFullAddress}>
                {useShortName ? (
                  <Entypo name="eye-with-line" size={22} color="white" />
                ) : (
                  <Entypo name="eye" size={22} color="white" />
                )}

                <AddressText>
                  {useShortName
                    ? "Exact address visible only for participants"
                    : "Make address visible for others?"}
                </AddressText>
              </HideFullAddressButton>
            </Row>
            <Row>
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color="white"
              />
              <GoogleAutoComponent
                searchText={fullAddress}
                setSearchText={setFullAddress}
              />
            </Row>
          </DateInformationContainer>
          <MapContainer>
            <MapWrapper>
              {hangoutCoordinates && hangoutCoordinates.latitude ? (
                <Map
                  region={{
                    latitude: hangoutCoordinates.latitude,
                    longitude: hangoutCoordinates.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  {hangoutCoordinates && (
                    <Marker
                      coordinate={hangoutCoordinates}
                      title="My Spark"
                      description={fullAddress}
                    >
                      <FontAwesome5
                        name="map-marker-alt"
                        size={30}
                        color="#79d17c"
                      />
                    </Marker>
                  )}
                </Map>
              ) : null}
            </MapWrapper>
          </MapContainer>
        </FullContainer>

        {!sparkTitle || !fullAddress ? (
          <NextPageButtonDisabled onPress={nextPage}>
            <NextPageTextDisabled>Get Started</NextPageTextDisabled>
          </NextPageButtonDisabled>
        ) : (
          <NextPageButton onPress={nextPage}>
            <NextPageText>Get Started</NextPageText>
          </NextPageButton>
        )}
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  position: relative;
`;

const HeaderText = styled(Text)`
  font-size: 28px;
  font-family: poppins-700;
  margin-bottom: 20px;
  text-align: center;
`;

const FullContainer = styled(View)`
  width: 100%;
  height: 65%;
  margin-top: 10px;
  position: relative;
`;

const HideFullAddressButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  height: 30px;
`;

const DateInformationContainer = styled(View)`
  width: 100%;
  height: 52%;
  background-color: #79d17c;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px;
`;

const InformationHeader = styled(Text)`
  font-size: 20px;
  font-family: poppins-700;
  color: white;
`;

const SubHeader = styled(Text)`
  font-size: 18px;
  font-family: poppins-700;
  color: white;
  margin-top: 20px;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
  align-items: center;
`;

const AddressText = styled(Text)`
  font-size: 11px;
  font-family: poppins-500;
  color: white;
  margin-left: 10px;
`;

const MapContainer = styled(View)`
  width: 100%;
  height: 48%;
  position: absolute;
  bottom: 0px;
  z-index: -9999;
`;

const MapWrapper = styled(View)`
  height: 100%;
  z-index: -9999;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden; /* This will clip the content inside the view */
`;

const Map = styled(MapView)`
  flex: 1;
`;

const NextPageButton = styled(TouchableOpacity)`
  height: 60px;
  width: 70%;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: #527e65;
  border-radius: 35px;
  margin-top: 40px;
`;

const NextPageButtonDisabled = styled(TouchableOpacity)`
  height: 60px;
  width: 70%;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: white;
  border-radius: 35px;
  border-color: gray;
  border-width: 3px;
  margin-top: 40px;
`;

const NextPageTextDisabled = styled(Text)`
  font-size: 22px;
  font-family: poppins-300;
  color: gray;
`;

const NextPageText = styled(Text)`
  font-size: 22px;
  font-family: poppins-500;
  color: white;
`;
