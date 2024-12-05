import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styled from "styled-components/native";

import Selfie from "../../Assets/selfie.png";
import ScreeningSelfie from "../../Assets/screeningselfie.png";
import { SafeArea } from "../../Components/GlobalComponents";
import { BackArrow, ContinueButton } from "../../Components/PreAuthentication";

export const MandatoryScreeningOne = ({ navigation }) => {
  const onHandleNavigate = () => {
    navigation.navigate("CreateAccountPageThree");
  };

  return (
    <SafeArea>
      <ScrollContainer>
        <BackArrow navigation={navigation} />
        <Container>
          <TitleText>Complete Mandatory Screening</TitleText>
          <SubTitleText>
            We require all users to verify their identity for the safety and
            security of our app.
          </SubTitleText>

          <SectionOne>
            <Label>1. Take A Selfie </Label>
            <Row>
              <ImageContainer source={Selfie} />
              <Paragraph>
                Take a quick selfie of yourself in good lighting. This selfie is
                private, and will not be shared to your profile or other people
                on Firefly.
              </Paragraph>
            </Row>
          </SectionOne>

          <Section>
            <Label>2. Selfie to Profile Picture Match</Label>
            <Row>
              <ImageContainer source={ScreeningSelfie} />
              <View>
                <Paragraph>
                  We will match your selfie to the face in your profile picture.
                </Paragraph>
                <ParagraphMargined>
                  Note: Your face must be clearly visible in your profile
                  picture.
                </ParagraphMargined>
              </View>
            </Row>
          </Section>
          <BottomFooterText>
            We will store your verification selfie for the duration of your
            account to ensure proper auditing and management of our verification
            feature. Additionally, we will retain the outcome of the
            verification process (whether verified or not).
          </BottomFooterText>
        </Container>
        <ContinueButton onPress={onHandleNavigate} />
      </ScrollContainer>
    </SafeArea>
  );
};

const ScrollContainer = styled(ScrollView)``;

const Container = styled(View)`
  padding: 10px;
`;

const TitleText = styled(Text)`
  font-size: 24px;
  color: black;
  font-family: poppins-700;
  margin-left: 10px;
  margin-top: 20px;
  width: 100%;
`;

const SubTitleText = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: poppins-400;
  margin-top: 10px;
  align-self: center;
  padding: 10px;
`;

const SectionOne = styled(View)`
  flex-direction: column;
  margin-top: 60px;
`;

const Section = styled(View)`
  flex-direction: column;
  margin-top: 100px;
`;

const Label = styled(Text)`
  font-size: 16px;
  color: black;
  font-family: poppins-500;
  margin-left: 20px;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

const ImageContainer = styled(Image)`
  height: 128px;
  width: 128px;
`;

const Paragraph = styled(Text)`
  text-align: center;
  font-size: 12px;
  width: 210px;
  font-family: poppins-400;
`;

const ParagraphMargined = styled(Text)`
  text-align: center;
  font-size: 12px;
  width: 210px;
  font-family: poppins-700;
  margin-top: 30px;
`;

const BottomFooterText = styled(Text)`
  text-align: center;
  font-size: 10px;
  width: 95%;
  font-family: poppins-400;
  align-self: center;
  margin-top: 60px;
  margin-bottom: 200px;
`;
