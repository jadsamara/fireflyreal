import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { SectionComponent } from "../Components";

export const DownloadData = () => {
  return (
    <SectionComponent title="Download Your Data">
      <SectionDescription>
        You can download your Firefly personal data here.
      </SectionDescription>

      <DownloadDataButton>
        <DownloadDataButtonText>REQUEST DATA</DownloadDataButtonText>
      </DownloadDataButton>
    </SectionComponent>
  );
};

const SectionDescription = styled(Text)`
  font-size: 8px;
  color: black;
  font-family: poppins-500;
`;

const DownloadDataButton = styled(TouchableOpacity)`
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

const DownloadDataButtonText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-400;
`;
