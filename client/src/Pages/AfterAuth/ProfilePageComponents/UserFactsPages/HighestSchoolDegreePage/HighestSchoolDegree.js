import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../../../Components/GlobalComponents/SafeArea";
import { BackArrow } from "../../../../../Components/PreAuthentication";
import { useSelector } from "react-redux";
import { SaveButton } from "../SaveButton";

export const HighestSchoolDegree = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const initialObj = userData.userInformation[5];

  const [userHighestSchoolDegree, setUserHighestSchoolDegree] =
    useState(initialObj);

  const changeHighestLevelAttained = (res) => {
    setUserHighestSchoolDegree((prevState) => ({
      ...prevState,
      schoolGrad: res,
    }));
  };

  const toggleHidden = () => {
    setUserHighestSchoolDegree((prevState) => ({
      ...prevState,
      isHidden: !prevState.isHidden,
    }));
  };

  const schoolDegreeList = [
    "High school",
    "Undergrad",
    "Postgrad",
    "Other",
    "Prefer not to say",
  ];

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>What's the highest level you attained</Title>

        <CurrentTagContainer>
          {schoolDegreeList.map((res) => {
            return (
              <Tag
                key={res}
                backgroundColor={
                  userHighestSchoolDegree.schoolGrad === res
                    ? "#527e65"
                    : "#e2e2e2"
                }
                onPress={() => changeHighestLevelAttained(res)}
              >
                <TagText
                  color={
                    userHighestSchoolDegree.schoolGrad === res
                      ? "white"
                      : "black"
                  }
                >
                  {res}
                </TagText>
              </Tag>
            );
          })}
        </CurrentTagContainer>
        <IsHiddenContainer>
          <Row>
            <Switch
              disabled={true}
              value={false}
              onValueChange={toggleHidden}
            />
            <IsHiddenText>Always hidden</IsHiddenText>
          </Row>
        </IsHiddenContainer>
        <SaveButton
          backgroundColor={
            initialObj.schoolGrad === userHighestSchoolDegree.schoolGrad &&
            userHighestSchoolDegree.isHidden === initialObj.isHidden
              ? "gray"
              : "#527e65"
          }
          disabled={
            initialObj.schoolGrad === userHighestSchoolDegree.schoolGrad &&
            userHighestSchoolDegree.isHidden === initialObj.isHidden
          }
          indexToUpdate={5}
          newInfo={userHighestSchoolDegree}
          navigation={navigation}
          userData={userData}
        />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const Title = styled(Text)`
  font-size: 26px;
  color: black;
  font-family: poppins-800;
  margin-left: 15px;
`;

const CurrentTagContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 40px;
  align-self: center;
`;

const Tag = styled(TouchableOpacity)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 10px;
`;

const TagText = styled(Text)`
  color: ${({ color }) => color};
  font-family: poppins-500;
  font-size: 12px;
`;

const IsHiddenContainer = styled(View)`
  border-top-width: 1px;
  border-top-color: gray;
  margin-top: 60px;
  width: 90%;
  align-self: center;
`;

const Row = styled(View)`
  flex-direction: row;
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const IsHiddenText = styled(Text)`
  color: black;
  font-family: poppins-500;
  font-size: 14px;
  margin-left: 12px;
`;
