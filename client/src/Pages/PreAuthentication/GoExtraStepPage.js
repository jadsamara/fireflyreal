import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import IdCard from "../../Assets/idcard.png";
import VerifiedGuy from "../../Assets/verifiedguy.png";
import { SafeArea } from "../../Components/GlobalComponents";
import { BackArrow, ContinueButton } from "../../Components/PreAuthentication";

import { FontAwesome6 } from "@expo/vector-icons";

export const GoExtraStepPage = ({ navigation }) => {
  const onHandleNavigate = () => {
    navigation.navigate("CreateAccountPageFour");
  };

  const onHandleNavigateSkip = () => {
    navigation.navigate("CreateAccountPageEight");
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />
      <Container>
        <TitleText>Go the extra step</TitleText>
        <SubTitleText>
          Want to ensure users know you’re real? Complete our ID verification to
          obtain the green verification check mark on your profile.
        </SubTitleText>

        <SectionOne>
          <Label>1. Take a picture of your ID </Label>
          <Row>
            <ImageContainer source={IdCard} />
            <RowTwo>
              <Col>
                <FontAwesome6
                  name="drivers-license"
                  size={20}
                  color="#79D17C"
                />
                <FontAwesome6
                  name="car-side"
                  size={20}
                  color="#79D17C"
                  style={{ marginTop: 10 }}
                />
                <FontAwesome6
                  name="passport"
                  size={20}
                  color="#79D17C"
                  style={{ marginTop: 10, marginLeft: 2 }}
                />
              </Col>
              <Col>
                <Paragraph>State/Province Photo ID</Paragraph>
                <ParagraphTwo>Driver’s License</ParagraphTwo>
                <ParagraphTwo>Passport</ParagraphTwo>
              </Col>
            </RowTwo>
          </Row>
        </SectionOne>

        <Section>
          <Label>2. You’re Verified!</Label>
          <Row>
            <ImageContainer source={VerifiedGuy} />
            <View>
              <ParagraphMargined>
                We will verify and match your picture in your ID and selfie in a
                matter of seconds. Once you are verified, you will receive the
                green check mark for others to see.
              </ParagraphMargined>
            </View>
          </Row>
        </Section>
      </Container>
      <SkipButton onPress={onHandleNavigateSkip}>
        <SkipButtonText>Skip for now</SkipButtonText>
      </SkipButton>
      <ContinueButton onPress={onHandleNavigate} />
    </SafeArea>
  );
};

const Container = styled(View)`
  padding: 5px;
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
  margin-top: 20px;
  align-self: center;
  text-align: center;
  width: 90%;
`;

const SectionOne = styled(View)`
  flex-direction: column;
  margin-top: 60px;
`;

const Section = styled(View)`
  flex-direction: column;
`;

const Label = styled(Text)`
  font-size: 16px;
  color: black;
  font-family: poppins-500;
  margin-left: 20px;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const Col = styled(View)`
  align-self: flex-start;
  align-items: start;
`;

const RowTwo = styled(View)`
  flex-direction: row;
`;

const ImageContainer = styled(Image)`
  height: 128px;
  width: 128px;
`;

const Paragraph = styled(Text)`
  font-size: 11px;
  font-family: poppins-500;
  margin-left: 5px;
`;

const ParagraphTwo = styled(Text)`
  font-size: 11px;
  font-family: poppins-500;
  margin-left: 5px;
  margin-top: 10px;
`;

const ParagraphMargined = styled(Text)`
  text-align: left;
  font-size: 12px;
  width: 210px;
  font-family: poppins-600;
`;

const SkipButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 140px;
  right: 50px;
`;

const SkipButtonText = styled(Text)`
  font-size: 14px;
  color: gray;
  font-family: poppins-500;
`;
