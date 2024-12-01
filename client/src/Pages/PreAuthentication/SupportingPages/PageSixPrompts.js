import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

import { ProgressBar, BackArrow } from "../../../Components/PreAuthentication";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";

export const PageSixPrompts = ({ navigation }) => {
  const { setVoicePrompt } = useContext(AuthenticationStackContext);

  const promptsList = [
    "My favourite joke is",
    "Here is a random fact",
    "Something I’m grateful for",
    "My favourite way to unwind is",
    "A song I’m in to right now is ",
    "One food everyone should try ",
    "Here’s my attempt at a tongue twister",
  ];

  const onHandlePromptPressed = (res) => {
    setVoicePrompt(res);
    navigation.goBack();
  };

  const onHandleCreatePrompt = () => {
    navigation.navigate("CreateYourOwnPromptMic");
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <TitleContainer>
          <Title>Choose from our voice prompts</Title>
        </TitleContainer>

        <InputContainer>
          {promptsList.map((res) => {
            return (
              <ListCard onPress={() => onHandlePromptPressed(res)}>
                <ListCardText>{res}</ListCardText>
              </ListCard>
            );
          })}
          <CreateButtonLabel>Didn’t find one you like? </CreateButtonLabel>
          <CreateButton onPress={onHandleCreatePrompt}>
            <CreateButtonText>Create one yourself</CreateButtonText>
            <MaterialCommunityIcons
              name="pencil-circle-outline"
              size={24}
              color="#fff"
            />
          </CreateButton>
        </InputContainer>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const TitleContainer = styled(View)`
  justify-content: flex-end;
`;

const Title = styled(Text)`
  font-size: 25px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const InputContainer = styled(View)`
  width: 100%;
  margin-top: 20px;
  padding: 15px;
`;

const ListCard = styled(TouchableOpacity)`
  border-bottom-color: #707070; /* Add a black line */
  border-bottom-width: 1px;
`;

const ListCardText = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: poppins-600;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const CreateButtonLabel = styled(Text)`
  font-size: 12px;
  color: #677e52;
  font-family: poppins-500;
  margin-top: 40px;
  text-align: center;
`;

const CreateButton = styled(TouchableOpacity)`
  width: 80%;
  height: 60px;
  background-color: #79d17c;
  align-self: center;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 30px;
  flex-direction: row;
  margin-top: 15px;
`;

const CreateButtonText = styled(Text)`
  font-size: 12px;
  color: #fff;
  font-family: poppins-500;
`;
