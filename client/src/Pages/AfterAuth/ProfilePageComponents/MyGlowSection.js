import { View, Text } from "react-native";
import React from "react";

import styled from "styled-components/native";
import { MyGlowCard } from "./MyGlowCard";
import { useSelector } from "react-redux";

export const MyGlowSection = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const userInformationSectionArray = [
    "Work",
    "Job Title",
    "School",
    "Education Level",
    "Politics",
    "Languages Spoken",
    "Religious Beliefs",
  ];

  const navigationMap = {
    Work: "WorkPage",
    "Job Title": "JobTitle",
    School: "SchoolPage",
    "Education Level": "HighestSchoolDegree",
    Politics: "PoliticalBeliefs",
    "Languages Spoken": "LanguagesPage",
    "Religious Beliefs": "ReligiousBeliefs",
    Ethnicity: "EthnicityPage",
    HomeTown: "HomeTown",
  };

  const getUserInfoBySection = (sectionName) => {
    switch (sectionName) {
      case "Work":
        const workData = userData.userInformation.find((item) => item.company);
        return workData
          ? { data: workData.company, isHidden: workData.isHidden }
          : { data: "Not Provided", isHidden: false };

      case "Job Title":
        const titleData = userData.userInformation.find((item) => item.title);
        return titleData
          ? { data: titleData.title, isHidden: titleData.isHidden }
          : { data: "Not Provided", isHidden: false };

      case "School":
        const schoolData = userData.userInformation.find((item) => item.school);
        return schoolData
          ? { data: schoolData.school, isHidden: schoolData.isHidden }
          : { data: "Not Provided", isHidden: false };

      case "Education Level":
        const educationLevelData = userData.userInformation.find(
          (item) => item.schoolGrad
        );
        return educationLevelData
          ? {
              data: educationLevelData.schoolGrad,
              isHidden: educationLevelData.isHidden,
            }
          : { data: "Not Provided", isHidden: false };

      case "Politics":
        const politicsData = userData.userInformation.find(
          (item) => item.opinion
        );
        return politicsData
          ? { data: politicsData.opinion, isHidden: politicsData.isHidden }
          : { data: "Prefer not to say", isHidden: false };

      case "Languages Spoken":
        const languagesData = userData.userInformation.find(
          (item) => item.languagesList
        );
        return languagesData
          ? {
              data: languagesData.languagesList.join(", "),
              isHidden: languagesData.isHidden,
            }
          : { data: "Not Provided", isHidden: false };

      case "Religious Beliefs":
        const religionData = userData.userInformation.find(
          (item) => item.religion
        );
        return religionData
          ? { data: religionData.religion, isHidden: religionData.isHidden }
          : { data: "Not Provided", isHidden: false };

      default:
        return { data: "Not Provided", isHidden: false };
    }
  };

  return (
    <Container>
      <SectionLabel>My Glow</SectionLabel>
      {userInformationSectionArray.map((section) => {
        const { data, isHidden } = getUserInfoBySection(section);
        return (
          <MyGlowCard
            key={section}
            title={section}
            content={data}
            isHidden={isHidden}
            onPress={() => navigation.navigate(navigationMap[section])}
          />
        );
      })}
    </Container>
  );
};

const Container = styled(View)`
  margin-bottom: 40px;
`;

const SectionLabel = styled(Text)`
  font-size: 16px;
  font-family: poppins-400;
  margin-left: 10px;
  color: green;
`;
