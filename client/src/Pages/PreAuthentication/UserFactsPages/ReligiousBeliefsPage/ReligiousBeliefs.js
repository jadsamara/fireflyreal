import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import styled from "styled-components/native";

import { AuthenticationStackContext } from "../../../../Context/AuthenticationStackContext";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../../../Components/PreAuthentication";

import { SafeArea } from "../../../../Components/GlobalComponents/SafeArea";

export const ReligiousBeliefs = ({ navigation }) => {
  const { userReligion, setUserReligion } = useContext(
    AuthenticationStackContext
  );

  const changeReligion = (res) => {
    setUserReligion((prevState) => ({
      ...prevState,
      religion: res,
    }));
  };

  const onHandleNavigate = () => {
    navigation.navigate("PoliticalBeliefs");
  };

  const toggleHidden = () => {
    setUserReligion((prevState) => ({
      ...prevState,
      isHidden: !prevState.isHidden,
    }));
  };

  const religionList = [
    "Buddhist",
    "Muslim",
    "Christian",
    "Hindu",
    "Jewish",
    "Spiritual",
    "Agnostic",
    "Atheist",
    "Other",
    "Prefer not to say",
  ];

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>What are your religious beliefs?</Title>

        <CurrentTagContainer>
          {religionList.map((res) => {
            return (
              <Tag
                key={res}
                backgroundColor={
                  userReligion.religion === res ? "#527e65" : "#e2e2e2"
                }
                onPress={() => changeReligion(res)}
              >
                <TagText
                  color={userReligion.religion === res ? "white" : "black"}
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
              value={!userReligion.isHidden}
              onValueChange={toggleHidden}
            />
            <IsHiddenText>Visible on profile?</IsHiddenText>
          </Row>
        </IsHiddenContainer>
        <ContinueButton onPress={onHandleNavigate} bottom={80} />
        <ProgressBar width={"10%"} bottom={0} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const Title = styled(Text)`
  font-size: 30px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const CurrentTagContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 40px;
  margin-left: 10px;
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
