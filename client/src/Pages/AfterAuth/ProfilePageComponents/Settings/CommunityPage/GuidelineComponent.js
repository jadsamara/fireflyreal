import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";

import Shield from "../../../../../Assets/shield.png";
import Friends from "../../../../../Assets/friends.png";
import Calendar from "../../../../../Assets/calendar.png";
import Friendship from "../../../../../Assets/friendship.png";
import Convo from "../../../../../Assets/convo.png";

export const GuidelineComponent = () => {
  return (
    <Container>
      <Section>
        <Label>Safety is #1 priority</Label>
        <Row>
          <ImageContainer source={Shield} />
          <Paragraph>
            We take safety very seriously. Every user on Firefly will be
            verified through their phone number and photo ID using our seamless
            verification process. This is to ensure everyone will be accountable
            and that people are who they say they are.
          </Paragraph>
        </Row>
      </Section>

      <Section>
        <Label>Let’s just be friends</Label>
        <Row>
          <ImageContainer source={Friends} />
          <Paragraph>
            Firefly is a place to find and meet friends, not lovers (sorry to
            disappoint). Now that’s out of the way: Relax, have an open mind,
            and be ready to make real, genuine connections.
          </Paragraph>
        </Row>
      </Section>

      <Section>
        <Label>Respect each other’s time</Label>
        <Row>
          <ImageContainer source={Calendar} />
          <Paragraph>
            There will be penalties for “flaking” or cancelling last minute to a
            spark within 24 hours of the agreed time. Penalties will also be
            applied for arriving too late to a spark, leaving others waiting.
          </Paragraph>
        </Row>
      </Section>

      <Section>
        <Label>Save the conversation for later</Label>
        <Row>
          <ImageContainer source={Convo} />
          <Paragraph>
            In the effort to preserve human interaction we decided to limit our
            chat system to the bare essentials. Users will only be able to share
            simple greetings or confirm details such as ETA, scheduling, and
            location.
          </Paragraph>
        </Row>
      </Section>

      <Section>
        <Label>Join the mission</Label>
        <Row>
          <ImageContainer source={Friendship} />
          <Paragraph>
            Pay attention, look around, and be in the moment. You will be
            joining an emerging community that values real, human interactions
            above all else, and rejects the false promises of modern social
            media.
          </Paragraph>
        </Row>
      </Section>
    </Container>
  );
};

const Container = styled(View)`
  padding-left: 15px;
  padding-right: 15px;
`;

const Section = styled(View)`
  flex-direction: column;
  margin-top: 40px;
`;

const Label = styled(Text)`
  font-size: 16px;
  color: gray;
  font-family: poppins-500;
  text-align: center;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
`;

const ImageContainer = styled(Image)`
  height: 120px;
  width: 120px;
`;

const Paragraph = styled(Text)`
  text-align: center;
  font-size: 10px;
  width: 210px;
`;
