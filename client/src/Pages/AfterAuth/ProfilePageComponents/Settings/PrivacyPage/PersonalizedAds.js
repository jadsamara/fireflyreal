import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { SectionComponent } from "../Components";

export const PersonalizedAds = () => {
  return (
    <SectionComponent title="Personalized Ads">
      <SectionDescription>
        To provide you with the most relevant and engaging content, we use
        personalized ads based on information like your location, age, name,
        gender, and your previous Sparks in the app. Just like many apps you
        already use, tailoring ads to your interests helps us make your
        experience more enjoyable and meaningful and keeps Firefly free to use.
      </SectionDescription>
      <SectionDescriptionTwo>
        Rest assured, we handle your information responsibly and with your
        privacy in mind. By allowing personalized ads, you’ll see promotions
        that better match your preferences, enhancing your overall experience
        with our app.
      </SectionDescriptionTwo>
      <AcceptPersonalizedAdsButton>
        <AcceptPersonalizedAdsButtonText>
          PERSONALIZED ADS
        </AcceptPersonalizedAdsButtonText>
      </AcceptPersonalizedAdsButton>
    </SectionComponent>
  );
};

const SectionDescription = styled(Text)`
  font-size: 8px;
  color: black;
  font-family: poppins-500;
`;

const SectionDescriptionTwo = styled(Text)`
  font-size: 8px;
  color: black;
  font-family: poppins-500;
  margin-top: 10px;
`;

const AcceptPersonalizedAdsButton = styled(TouchableOpacity)`
  background-color: #79d17c;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 24px;
  align-self: flex-start;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const AcceptPersonalizedAdsButtonText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-400;
`;
