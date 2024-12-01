import React, { useContext, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import { SafeArea } from "../../../Components/GlobalComponents";

import { AntDesign } from "@expo/vector-icons";
import { PostDateContext } from "../../../Context/PostPagesContext";

import { ImagesFromWeb } from "./Components/ImagesFromWeb";

import { BackArrow } from "../../../Components/PreAuthentication/BackArrow";

import { FooterGradient } from "../../../Components/GlobalComponents/FooterGradient";

export const PostSparkFour = ({ navigation }) => {
  const GOOGLE_API_KEY = "AIzaSyCGaJwEFJ65xMcXTPGFBgLg6LGNPXmAeKo";

  const { hangoutPhotos, sparkImage, setSparkImage, sparkTitle } =
    useContext(PostDateContext);
  const googlePlacesPhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hangoutPhotos[0]}&key=${GOOGLE_API_KEY}`;

  useEffect(() => {
    setSparkImage(googlePlacesPhotoUrl);
  }, []);

  const nextPage = () => {
    navigation.navigate("PostSparkFive");
  };

  const chooseLocalVibe = () => {
    navigation.navigate("ListLocalVibePictures");
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <HeaderText>Set a photo</HeaderText>
        <ImageContainer>
          <CurrentVibeImage source={{ uri: sparkImage }} />

          <VibeText>{sparkTitle}</VibeText>
        </ImageContainer>
        <InfoText>Other options from the web</InfoText>
        <ScrollViewContainer>
          <ScrollView
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
          >
            {hangoutPhotos.map((res, index) => {
              // Check if the current index is a multiple of 3
              if (index % 3 === 0) {
                return (
                  <ImageRow key={index}>
                    <ImageCol>
                      <ImagesFromWeb
                        imageURL={res}
                        setCurrentPhoto={setSparkImage}
                        currentPhoto={sparkImage}
                      />
                      {hangoutPhotos[index + 1] && (
                        <ImagesFromWeb
                          imageURL={hangoutPhotos[index + 1]}
                          setCurrentPhoto={setSparkImage}
                          currentPhoto={sparkImage}
                        />
                      )}
                    </ImageCol>
                    <ImageCol>
                      {/* Check if there is a next image and render it */}
                      {hangoutPhotos[index + 2] && (
                        <ImagesFromWeb
                          imageURL={hangoutPhotos[index + 2]}
                          setCurrentPhoto={setSparkImage}
                          currentPhoto={sparkImage}
                        />
                      )}
                    </ImageCol>
                  </ImageRow>
                );
              } else {
                // If the current index is not a multiple of 3, return null (empty)
                return null;
              }
            })}
          </ScrollView>
        </ScrollViewContainer>

        <Footer>
          <FooterButton onPress={chooseLocalVibe}>
            <FooterButtonText>Try some of our options</FooterButtonText>
          </FooterButton>
          <NextPageButton onPress={nextPage}>
            <AntDesign name="arrowright" size={34} color="white" />
          </NextPageButton>
        </Footer>
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
  font-size: 32px;
  font-family: poppins-700;
  margin-bottom: 10px;

  text-align: center;
`;

const VibeText = styled(Text)`
  font-size: 24px;
  font-family: poppins-800;
  position: absolute;
  color: white;
  z-index: 999999;
  bottom: 10px;
  left: 15px;
`;

const ImageContainer = styled(View)`
  height: 175px;
  width: 100%;
  align-self: center;
  margin-top: 10px;
  position: relative;
`;

const CurrentVibeImage = styled(Image)`
  flex: 1;
  border-radius: 20px;
`;

const InfoText = styled(Text)`
  font-size: 16px;
  font-family: poppins-400-italic;
  margin-top: 10px;
  color: gray;
`;

const ScrollViewContainer = styled(View)`
  width: 100%;
  height: 45%;
  margin-top: 10px;
`;

const Footer = styled(View)`
  width: 100%;
  right: 20px;
  bottom: 10px;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const FooterButton = styled(TouchableOpacity)`
  background-color: #79d17c;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const FooterButtonText = styled(Text)`
  font-size: 12px;
  font-family: poppins-700;
  color: white;
`;

const NextPageButton = styled(TouchableOpacity)`
  height: 55px;
  width: 55px;

  background-color: green;
  border-radius: 1000px;
  justify-content: center;
  align-items: center;
`;

const ImageRow = styled(View)`
  flex-direction: row;
  width: 100%;
  height: 200px;
`;

const ImageCol = styled(View)`
  height: 200px;
  width: 50%;
`;
