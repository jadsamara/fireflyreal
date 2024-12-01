import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { ReportLabelPageComponent } from "./ReportLabelPageComponent";

export const ReportPageComponent = ({ participant = {}, setReportModal }) => {
  const [reportLabel, setReportLabel] = useState("");
  const [reportLabelModal, setReportLabelModal] = useState(false);

  const { name } = participant;

  const reportList = [
    "Harrasment/Bullying",
    "Disrespect",
    "Inappropriate conduct",
    "No-show without notice",
    "Late with no explanation",
    "Scamming/Fraudulent behavior",
  ];

  const onHandleCloseReport = () => {
    setReportModal(false);
  };

  const onHandlePressReport = (label) => {
    setReportLabel(label);
    setReportLabelModal(true);
  };

  if (reportLabelModal) {
    return (
      <Container>
        <DarkTint>
          <ReportLabelPageComponent
            participant={participant}
            reportLabel={reportLabel}
            setReportLabelModal={setReportLabelModal}
          />
        </DarkTint>
      </Container>
    );
  }

  return (
    <Container>
      <TitleText>Protect our community</TitleText>
      <ListContainer>
        <SubTitleText>Report {name} for:</SubTitleText>
        {reportList.map((res) => {
          return (
            <ListButton onPress={() => onHandlePressReport(res)}>
              <ListText>{res}</ListText>
              <MaterialIcons name="arrow-right" size={24} color="white" />
            </ListButton>
          );
        })}
      </ListContainer>
      <FooterRow>
        <CancelButton onPress={onHandleCloseReport}>
          <CancelText>Back</CancelText>
        </CancelButton>
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
  font-size: 14px;
  color: white;
  font-family: poppins-600;
`;

const DarkTint = styled(View)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ListButton = styled(TouchableOpacity)`
  flex-direction: row;
  margin-top: 40px;
  width: 95%;
  justify-content: space-between;
  align-items: center;
`;

const ListText = styled(Text)`
  font-size: 14px;
  color: white;
  font-family: poppins-800;
`;

const FooterRow = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled(TouchableOpacity)`
  background-color: #686868;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
`;

const CancelText = styled(Text)`
  font-size: 14px;
  color: white;
  font-family: poppins-600;
`;
