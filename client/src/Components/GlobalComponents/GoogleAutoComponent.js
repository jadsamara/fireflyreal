import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { AuthContext } from "../../Config/AuthContext";
import { PostDateContext } from "../../Context/PostPagesContext";

export const GoogleAutoComponent = ({ setSearchText, searchText }) => {
  const GOOGLE_API_KEY = "AIzaSyCGaJwEFJ65xMcXTPGFBgLg6LGNPXmAeKo";
  const [isFocused, setIsFocused] = useState(false);

  const [predictions, setPredictions] = useState([]);
  const [show, setShow] = useState(false);
  const { location } = useContext(AuthContext);
  const {
    setHangoutCoordinates,
    setFullLocationName,
    setHangoutPhotos,
    setLocationName,
  } = useContext(PostDateContext);

  const fetchPredictions = async (inputText) => {
    try {
      const apiKey = GOOGLE_API_KEY;
      const latitude = location.latitude;
      const longitude = location.longitude;
      const radius = 5000; // Set the radius in meters (e.g., 5000 meters or 5 kilometers)

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
          `input=${inputText}&location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const fetchedPredictions = data.predictions;
        setPredictions(fetchedPredictions); // Update the state with fetched predictions
      } else {
        console.error("Error fetching predictions:", data.status);
        setPredictions([]);
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setPredictions([]);
    }
  };

  const handleSearchTextChange = (text) => {
    if (text) {
      setSearchText(text);
      fetchPredictions(text);
      setShow(true);
    } else {
      setSearchText(text);
      fetchPredictions(text);
      setShow(false);
    }
  };

  const onHandlePressAddress = async (item) => {
    setSearchText(item.description);
    setFullLocationName(item.structured_formatting.main_text);
    setLocationName(item.terms[2].value);
    setShow(false);
    const placeID = item.place_id;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();

    const photoReferences = data.result.photos.map(
      (obj) => obj.photo_reference
    );

    // Create a filtered array without duplicates
    const filteredPhotoReferences = photoReferences.filter(
      (value, index, self) => {
        // Check if the current value is the first occurrence in the array
        return self.indexOf(value) === index;
      }
    );

    setHangoutPhotos(filteredPhotoReferences);

    setHangoutCoordinates({
      latitude: data.result.geometry.location.lat,
      longitude: data.result.geometry.location.lng,
    });

    // const distanceInKm = calculateDistance(location, placeLocation);
  };

  const renderItem = ({ item }) => {
    const matchIndex = item.description
      .toLowerCase()
      .indexOf(searchText.toLowerCase());

    return (
      <Row onPress={() => onHandlePressAddress(item)}>
        <TextRow>
          <ListText style={{ fontFamily: "poppins-300" }}>
            {matchIndex !== -1 ? (
              <>
                {item.description.slice(0, matchIndex)}
                <ListTextBold>
                  {item.description.slice(
                    matchIndex,
                    matchIndex + searchText.length
                  )}
                </ListTextBold>
                {item.description.slice(matchIndex + searchText.length)}
              </>
            ) : (
              item.description
            )}
          </ListText>
        </TextRow>
      </Row>
    );
  };

  return (
    <Container>
      <AddressIconView>
        <SparkLocation
          value={searchText}
          onChangeText={handleSearchTextChange}
          placeholder={"Select a location"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            fontFamily: searchText ? "poppins-400" : "poppins-400-italic",

            borderTopRightRadius: show ? 15 : 40,
            borderTopLeftRadius: show ? 15 : 40,
            borderBottomRightRadius: show ? 0 : 40,
            borderBottomLeftRadius: show ? 0 : 40,
          }}
        />
      </AddressIconView>

      {show ? (
        <PlacesListWrapper>
          <PlacesList
            data={predictions.slice(0, 4)} // Limit the number of predictions shown to 5
            renderItem={renderItem}
            keyExtractor={(item) => item.place_id}
            nestedScrollEnabled
          />
        </PlacesListWrapper>
      ) : null}
    </Container>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
  margin-left: 5px;
`;

const AddressIconView = styled(View)`
  flex-direction: row;
`;

const Row = styled(TouchableOpacity)`
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  padding-top: 10px;

  width: 100%;
  align-self: flex-start;
  background-color: white;
`;

const TextRow = styled(View)`
  flex-direction: row;
`;

const ListText = styled(Text)`
  color: black;
  font-family: poppins-300;
  font-size: 10px;
`;

const ListTextBold = styled(Text)`
  color: black;
  font-family: poppins-600;
  font-size: 10px;
`;

const PlacesListWrapper = styled(View)`
  height: 200px;
  width: 275px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
`;

const PlacesList = styled(FlatList)``;

const SparkLocation = styled(TextInput)`
  height: 30px;
  width: 275px;
  font-size: 10px;
  background-color: white;
  color: black;
  align-self: center;
  padding-left: 10px;
`;
