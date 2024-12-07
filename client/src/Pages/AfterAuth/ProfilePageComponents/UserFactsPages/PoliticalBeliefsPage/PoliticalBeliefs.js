import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../../../Components/GlobalComponents/SafeArea";

import { Ionicons } from "@expo/vector-icons";

export const PoliticalBeliefs = ({ navigation }) => {
  const [userPoliticalOpinion, setUserPoliticalOpinion] = useState({
    opinion: "",
    isHidden: false,
  });

  const changeOpinion = (res) => {
    setUserPoliticalOpinion((prevState) => ({
      ...prevState,
      opinion: res,
    }));
  };

  const onHandleNavigate = () => {
    navigation.navigate("SchoolPage");
  };

  const toggleHidden = () => {
    setUserPoliticalOpinion((prevState) => ({
      ...prevState,
      isHidden: !prevState.isHidden,
    }));
  };

  const politicalList = [
    "Conservative",
    "Liberal",
    "Moderate",
    "Other",
    "Prefer not to say",
  ];

  return (
    <SafeArea>
      <Container>
        <Title>What are your political beliefs?</Title>

        <CurrentTagContainer>
          {politicalList.map((res) => {
            return (
              <Tag
                key={res}
                backgroundColor={
                  userPoliticalOpinion.opinion === res ? "#527e65" : "gray"
                }
                onPress={() => changeOpinion(res)}
              >
                <TagText>{res}</TagText>
              </Tag>
            );
          })}
        </CurrentTagContainer>
        <IsHiddenContainer>
          <Row>
            <TouchableOpacity onPress={toggleHidden}>
              {userPoliticalOpinion.isHidden ? (
                <Ionicons name="square-outline" size={34} color="black" />
              ) : (
                <Ionicons name="checkbox" size={34} color="black" />
              )}
            </TouchableOpacity>
            <IsHiddenText>Visible on profile?</IsHiddenText>
          </Row>
        </IsHiddenContainer>
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
  color: white;
  font-family: poppins-600;
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
  margin-left: 10px;
`;
