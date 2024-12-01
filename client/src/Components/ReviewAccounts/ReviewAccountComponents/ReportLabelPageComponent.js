import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";

import styled from "styled-components/native";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

import { BlurView } from "@react-native-community/blur";

import { auth, database } from "../../../Config/firebase";
import { FontAwesome } from "@expo/vector-icons";

export const ReportLabelPageComponent = ({
  participant = {},
  setReportLabelModal,
  reportLabel,
}) => {
  const [reportComment, setReportComment] = useState("");
  const [reportSuccessModal, setReportSuccessModal] = useState(false);

  const { name } = participant;
  const userNumber = auth.currentUser.phoneNumber;

  const goBackFunction = () => {
    setReportLabelModal(false);
  };

  const onHandleSubmitReport = async () => {
    if (reportLabel && reportComment) {
      const userRef = doc(database, "UserReviews", participant.userNumber);

      const newReport = {
        reportLabel, // e.g., "Harrasment/Bullying"
        reportComment, // the description of the report
        timestamp: Date.now(), // Automatically set the timestamp
        submittedBy: userNumber, // Optional: User ID who is submitting the report
        status: "pending", // Optional: Status of the report
      };

      try {
        // Retrieve the document from Firestore
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
          // If the document exists, update the 'reports' array field
          await updateDoc(userRef, {
            reports: arrayUnion(newReport), // Add the new report to the reports array
          });
          console.log("Report submitted successfully!");
          setReportSuccessModal(true);
        } else {
          // If the document does not exist, create a new one with the report
          await setDoc(userRef, {
            reports: [newReport], // Initialize the reports array with the first report
          });
          setReportSuccessModal(true);
          console.log("Report created successfully!");
        }
      } catch (error) {
        console.error("Error submitting report:", error);
      }
    }
  };

  const closeReportSuccessModal = () => {
    setReportSuccessModal(false);
    setReportLabelModal(false);
  };

  return (
    <Container>
      {reportSuccessModal ? (
        <ReportSubmitModal>
          <CloseButton onPress={closeReportSuccessModal}>
            <FontAwesome name="close" size={24} color="gray" />
          </CloseButton>
          <ModalTitle>Thank you for keeping our community safe</ModalTitle>
          <ModalText>
            We've recieved your submission and we will review it shortly. Your
            help keeps the Firefly community safe and enjoyable for everyone.
          </ModalText>
        </ReportSubmitModal>
      ) : null}

      {reportSuccessModal && (
        <BlurView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999, // Ensures it's on top of other elements
          }}
          blurType="light"
          blurAmount={10} // Adjust the blur level as needed
        />
      )}

      <TitleText>Protect our community</TitleText>
      <ListContainer>
        <SubTitleText>Report {name} for:</SubTitleText>

        <ListText>{reportLabel}</ListText>
        <InputContainer>
          <BioInput
            onChangeText={setReportComment}
            value={reportComment}
            placeholder="Please briefly describe the incident"
            placeholderTextColor="white"
            multiline={true}
            textAlignVertical="top"
            blurOnSubmit={true}
          />
          <MaxCharText>{reportComment.length}/250 char</MaxCharText>
        </InputContainer>
      </ListContainer>
      <FooterRow>
        <FooterButtons backgroundColor={"#686868"} onPress={goBackFunction}>
          <FooterButtonsText>Back</FooterButtonsText>
        </FooterButtons>
        <FooterButtons
          backgroundColor={"#4A5976"}
          onPress={onHandleSubmitReport}
        >
          <FooterButtonsText>Submit Report</FooterButtonsText>
        </FooterButtons>
      </FooterRow>
    </Container>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

const TitleText = styled(Text)`
  font-size: 20px;
  color: white;
  font-family: poppins-700;
  text-align: center;
  margin-top: 40px;
`;

const ListContainer = styled(View)`
  margin-top: 40px;
  margin-left: 20px;
`;

const SubTitleText = styled(Text)`
  font-size: 16px;
  color: white;
  font-family: poppins-700;
`;

const ListText = styled(Text)`
  font-size: 16px;
  color: white;
  font-family: poppins-500-italic;
  margin-top: 30px;
  margin-left: 10px;
`;

const InputContainer = styled(View)`
  width: 100%;
  align-items: center;
  margin-top: 35px;
  position: relative;
`;

const BioInput = styled(TextInput)`
  width: 90%;
  height: 270px;
  border-radius: 20px;
  text-align: left;
  padding: 18px;
  font-family: poppins-600-italic;
  font-size: 11px;
  border-width: 1px;
  border-color: white;
  color: white;
`;

const MaxCharText = styled(Text)`
  font-family: poppins-400;
  font-size: 10px;
  position: absolute;
  bottom: 10px;
  right: 40px;
  color: white;
`;

const FooterRow = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
`;

const FooterButtons = styled(TouchableOpacity)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
`;

const FooterButtonsText = styled(Text)`
  font-size: 14px;
  color: white;
  font-family: poppins-600;
`;

const ReportSubmitModal = styled(View)`
  background-color: white;
  height: 250px;
  width: 80%;
  align-self: center;
  position: absolute;
  top: 100px;
  z-index: 9999;
  border-radius: 15px;
  padding: 15px;
`;

const ModalTitle = styled(Text)`
  font-size: 15px;
  color: black;
  font-family: poppins-700;
  text-align: center;
  margin-top: 30px;
`;

const ModalText = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: poppins-600;
  text-align: center;
  margin-top: 30px;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
  top: 5px;
`;
