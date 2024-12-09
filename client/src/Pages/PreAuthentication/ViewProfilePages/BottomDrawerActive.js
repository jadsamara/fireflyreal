import React, { useContext, useState, useRef } from "react";
import { View, Text, ScrollView } from "react-native";

import styled from "styled-components";

import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { calculateAge } from "../../../Functions/GetAgeNew";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

import { VoicePromptComponent } from "../../../Components/GlobalComponents/VoicePromptComponent";

export const BottomDrawerActive = ({ setIsModalActive }) => {
  const {
    bio,
    age,
    voicePrompt,
    recordedAudioLink,
    homeTown,
    languagesSpoken,
    userEthnicity,
    userReligion,
    userPoliticalOpinion,
    userSchool,
    userHighestSchoolDegree,
    userWork,
    userJobTitle,
    gender,
  } = useContext(AuthenticationStackContext);

  const voiceAudioObj = { voicePrompt, recordedAudioLink };
  const userInformation = [
    languagesSpoken,
    userEthnicity,
    userReligion,
    userPoliticalOpinion,
    userSchool,
    userHighestSchoolDegree,
    userWork,
    userJobTitle,
  ];

  const renderList = (list) =>
    list.map((item, index) => (
      <Paragraph key={index}>
        {item}
        {index < list.length - 1 && ", "}
      </Paragraph>
    ));

  const IconRow = ({ icon, text }) => (
    <Row>
      {icon}
      <Paragraph>{text}</Paragraph>
    </Row>
  );

  return (
    <Container>
      <ScrollContainer horizontal showsHorizontalScrollIndicator={false}>
        <HorizontalTab>
          <MaterialIcons name="cake" size={22} color="#527e65" />
          <Paragraph>{calculateAge(age)}</Paragraph>
        </HorizontalTab>
        <HorizontalTabMiddle>
          <Ionicons name="person-sharp" size={20} color="#527e65" />
          <Paragraph>{gender}</Paragraph>
        </HorizontalTabMiddle>
        {homeTown && (
          <HorizontalTabMiddle>
            <Ionicons name="location-sharp" size={20} color="#527e65" />
            <Paragraph>{homeTown}</Paragraph>
          </HorizontalTabMiddle>
        )}
        {!userInformation[1].isHidden &&
          userInformation[1].ethnicity.length > 0 && (
            <HorizontalTabMiddle>
              <Ionicons name="earth" size={20} color="#527e65" />
              {renderList(userInformation[1].ethnicity)}
            </HorizontalTabMiddle>
          )}
      </ScrollContainer>

      {/* Conditional Rows Section */}
      {!userInformation[2].isHidden && bio && (
        <IconRow
          icon={
            <MaterialCommunityIcons
              name="chat-processing"
              size={24}
              color="#686868"
            />
          }
          text={`"${bio}"`}
        />
      )}
      {!userInformation[5].isHidden && homeTown && (
        <IconRow
          icon={<FontAwesome6 name="house-chimney" size={20} color="#686868" />}
          text={homeTown}
        />
      )}
      {!userInformation[4].isHidden && userInformation[4].school && (
        <IconRow
          icon={
            <MaterialCommunityIcons name="school" size={24} color="#686868" />
          }
          text={userInformation[4].school}
        />
      )}
      {!userInformation[6].isHidden &&
        userInformation[7].title &&
        userInformation[6].company && (
          <IconRow
            icon={<FontAwesome6 name="briefcase" size={20} color="#686868" />}
            text={`${userInformation[7].title}, ${userInformation[6].company}`}
          />
        )}
      {!userInformation[3].isHidden && userInformation[3].opinion && (
        <IconRow
          icon={
            <MaterialCommunityIcons name="pillar" size={22} color="#686868" />
          }
          text={userInformation[3].opinion}
        />
      )}
      {!userInformation[0].isHidden &&
        userInformation[0].languagesList.length > 0 && (
          <IconRow
            icon={<FontAwesome6 name="language" size={20} color="#686868" />}
            text={renderList(userInformation[0].languagesList)}
          />
        )}
      {voiceAudioObj.recordedAudioLink ? (
        <VoicePromptComponent voiceAudioObj={voiceAudioObj} />
      ) : null}
    </Container>
  );
};

const Container = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`;

const ScrollContainer = styled(ScrollView)`
  width: 100%;
  padding: 10px;
  border-color: rgba(112, 112, 112, 0.3);
  border-bottom-width: 0.5px;
  margin-top: 10px;
`;

const HorizontalTab = styled(View)`
  border-color: rgba(112, 112, 112, 0.3);
  border-right-width: 0.5px;
  padding-right: 15px;
  flex-direction: row;
  align-items: center;
`;

const HorizontalTabMiddle = styled(View)`
  border-color: rgba(112, 112, 112, 0.3);
  border-right-width: 0.5px;
  padding-right: 15px;
  padding-left: 15px;
  flex-direction: row;
  align-items: center;
`;

const Paragraph = styled(Text)`
  font-size: 11px;
  font-family: poppins-500;
  margin-left: 10px;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
  align-items: center;
  justify-content: flex-start;
  border-color: rgba(112, 112, 112, 0.3);
  border-bottom-width: 0.5px;
  padding: 10px;
`;
