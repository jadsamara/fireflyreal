import React, { useContext, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styled from "styled-components/native";

import Selfie from "../../Assets/selfie.png";
import ScreeningSelfie from "../../Assets/screeningselfie.png";
import { SafeArea } from "../../Components/GlobalComponents";
import {
  BackArrow,
  ContinueButton,
  ProgressBarFixed,
} from "../../Components/PreAuthentication";
import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";

import { useFace } from "@biopassid/face-sdk-react-native";
import { useCameraPermission } from "react-native-vision-camera";

export const MandatoryScreeningOne = ({ navigation }) => {
  const { takeFace } = useFace();
  const { setProfilePictureURI, setIsPhotoIDVerified, profilePicture } =
    useContext(AuthenticationStackContext);

  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    const checkPermission = async () => {
      // Explicitly request permission if not determined
      if (hasPermission.status === "notDetermined" || hasPermission === false) {
        await requestPermission();
      }
    };

    checkPermission();
  }, [hasPermission.status, requestPermission]);

  const onPress = async () => {
    await takeFace({
      config: {
        licenseKey: "NWK5-KPH4-5MGS-NHFA",
      },
      onFaceCapture: async (image) => {
        const base64 = image;

        setIsPhotoIDVerified(1);
        navigation.navigate("FaceScanSuccessPage");
        // await performIDScan(base64);
      },
    });
  };

  const performIDScan = async (base64Image) => {
    try {
      setProfilePictureURI(base64Image);
      const apiKey = "injFW5TCX0aUihI6zGIVOypSO0KSQAtb";
      const url = "https://api2.idanalyzer.com/face";

      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          face: base64Image,
          reference: profilePicture,
          saveFile: true,
          region: "US", // Replace with appropriate region code
        }),
      };

      const response = await fetch(url, options);
      const responseData = await response.json();
      console.log(responseData);

      if (responseData) {
        setIsPhotoIDVerified(1);
        navigation.navigate("FaceScanSuccessPage");
      }
    } catch (e) {}
  };

  return (
    <SafeArea>
      <ScrollContainer>
        <BackArrow navigation={navigation} />
        <Container>
          <TitleText>Complete Mandatory Screening</TitleText>
          <SubTitleText>
            We require all users to verify their identity for the{" "}
            <SubTitleTextBold>safety and security</SubTitleTextBold> of our app.
          </SubTitleText>

          <SectionOne>
            <LabelBold>1. Take A Selfie </LabelBold>
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
            <LabelBold>2. Selfie to Profile Picture Match</LabelBold>
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
            feature.
          </BottomFooterText>
          <BottomFooterTextTwo>
            Additionally, we will retain the outcome of the verification process
            (whether verified or not).
          </BottomFooterTextTwo>
        </Container>
        <ContinueButton onPress={onPress} bottom={90} />
      </ScrollContainer>
      <ProgressBarFixed width={"10%"} bottom={0} backgroundColor="white" />
    </SafeArea>
  );
};

const ScrollContainer = styled(ScrollView)``;

const Container = styled(View)`
  padding: 10px;
`;

const TitleText = styled(Text)`
  font-size: 30px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const SubTitleText = styled(Text)`
  font-size: 16px;
  color: black;
  font-family: poppins-400;
  align-self: center;
  margin-left: 15px;
  margin-top: 20px;
`;

const SubTitleTextBold = styled(Text)`
  font-size: 16px;
  color: #527e65;
  font-family: poppins-700;
`;

const SectionOne = styled(View)`
  flex-direction: column;
  margin-top: 25px;
`;

const Section = styled(View)`
  flex-direction: column;
  margin-top: 40px;
`;

const LabelBold = styled(Text)`
  color: #527e65;
  font-family: poppins-800;
  font-size: 18px;
  margin-left: 15px;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25px;
  padding-left: 25px;
`;

const ImageContainer = styled(Image)`
  height: 128px;
  width: 128px;
`;

const Paragraph = styled(Text)`
  text-align: center;
  font-size: 13px;
  width: 150px;
  font-family: poppins-500;
  align-self: flex-end;
  margin-right: 20px;
`;

const ParagraphMargined = styled(Text)`
  text-align: center;
  font-size: 13px;
  width: 150px;
  font-family: poppins-800;
  align-self: flex-end;
  margin-right: 20px;
  margin-top: 20px;
`;

const BottomFooterText = styled(Text)`
  text-align: center;
  font-size: 13px;
  width: 90%;
  font-family: poppins-600;
  align-self: center;
  margin-top: 50px;
`;

const BottomFooterTextTwo = styled(Text)`
  text-align: center;
  font-size: 13px;
  width: 90%;
  font-family: poppins-600;
  align-self: center;
  margin-top: 30px;
  margin-bottom: 180px;
`;
