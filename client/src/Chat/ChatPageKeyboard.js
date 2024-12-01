import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Entypo,
} from "@expo/vector-icons";

import { QuestionsKeyboard } from "./Keyboards";

import FastImage from "react-native-fast-image";

import ChatWallpaper from "../Assets/chatwp.png";

const screenHeight = Dimensions.get("window").height;

export const ChatPageKeyboard = ({
  isHost,
  navigateToReschedulePage,
  navigateToAnnouncementPage,
  handleSendMessage,
}) => {
  const [questionsModal, setQuestionsModal] = useState(false);

  useEffect(() => {
    FastImage.preload([{ uri: Image.resolveAssetSource(ChatWallpaper).uri }]);
  }, []);

  const onHandleQuestionsModal = () => {
    setQuestionsModal((res) => !res);
  };

  const PromptButton = React.memo(({ onPress, text, icon }) => (
    <PromptContainer onPress={onPress}>
      <PromptText>{text}</PromptText>
      {icon}
      <AntDesign name="caretright" size={12} color="#527E65" />
    </PromptContainer>
  ));

  if (questionsModal) {
    return (
      <Container>
        <QuestionsKeyboard
          onHandleQuestionsModal={onHandleQuestionsModal}
          handleSendMessage={handleSendMessage}
        />
      </Container>
    );
  }

  return (
    <Container>
      <ChatBackground
        source={{
          uri: Image.resolveAssetSource(ChatWallpaper).uri, // Resolve local URI
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      >
        <HeaderContainer>
          <HeaderTitle>Get to know each other in person</HeaderTitle>
          <HeaderSubtitle>
            Use our prompts to confirm important details in the meantime
          </HeaderSubtitle>
        </HeaderContainer>
        <ChatKeyboardContainer>
          <PromptButton
            onPress={onHandleQuestionsModal}
            text="Questions"
            icon={
              <FontAwesome
                name="question-circle"
                size={18}
                color="black"
                style={styles.icon}
              />
            }
          />
          <PromptButton
            onPress={navigateToReschedulePage}
            text="Reschedule"
            icon={
              <FontAwesome6
                name="calendar-days"
                size={16}
                color="black"
                style={styles.icon}
              />
            }
          />
        </ChatKeyboardContainer>
        {isHost && (
          <ChatKeyboardContainer>
            <PromptButton
              onPress={navigateToAnnouncementPage}
              text="Announcement"
              icon={
                <Entypo
                  name="circle-with-plus"
                  size={18}
                  color="black"
                  style={styles.icon}
                />
              }
            />
          </ChatKeyboardContainer>
        )}
      </ChatBackground>
    </Container>
  );
};

const Container = styled(View)`
  height: ${0.37 * screenHeight}px;
  width: 100%;
  position: absolute;
  bottom: 0px;
`;

const ChatBackground = styled(FastImage).attrs({})`
  flex: 1;
`;

const HeaderContainer = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const HeaderTitle = styled(Text)`
  color: black;
  font-family: poppins-600;
  font-size: 14px;
`;

const HeaderSubtitle = styled(Text)`
  color: white;
  font-family: poppins-500;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  width: 90%;
`;

const ChatKeyboardContainer = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 20px;
`;

const PromptContainer = styled(TouchableOpacity)`
  padding: 10px 20px;
  background-color: #ebebeb;
  border-radius: 25px;
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
`;

const PromptText = styled(Text)`
  color: black;
  font-family: poppins-700;
  font-size: 12px;
`;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 5,
  },
});
