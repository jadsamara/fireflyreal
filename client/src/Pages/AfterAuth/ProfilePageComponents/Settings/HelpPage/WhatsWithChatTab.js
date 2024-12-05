import { View, Text, Image } from "react-native";
import React from "react";
import styled from "styled-components/native";

import ChatPic from "../../../../../Assets/convo.png";

export const WhatsWithChatTab = () => {
  return (
    <Container>
      <ImageContainer>
        <ImageLogo source={ChatPic} resizeMode={"contain"} />
      </ImageContainer>

      <FaqCardText>
        When you participate in a Spark, your deposited Lumins are in holding
        until the event concludes. Your punctuality affects how many Lumins you
        get back.
      </FaqCardText>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  width: 100%;
`;

const FaqCardText = styled(Text)`
  font-size: 10px;
  color: black;
  font-family: poppins-500;
  text-align: center;
  flex-wrap: wrap; /* Ensure items wrap if needed */
  flex-shrink: 1; /* Prevent overflow */
`;

const ImageContainer = styled(View)`
  width: 130px;
  height: 130px;
  margin-left: 5px;
`;

const ImageLogo = styled(Image)`
  height: 100%;
  width: 100%;
`;
