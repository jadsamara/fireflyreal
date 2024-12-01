import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";

import { auth, database } from "../../../Config/firebase";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const AnnouncementPage = ({ navigation, route }) => {
  const userNumber = auth.currentUser.phoneNumber;

  const { chatRoomId } = route.params;
  const [announcementMessage, setAnnouncementMessage] = useState();

  const handleSendMessage = async () => {
    try {
      // Send selected option to Firebase Firestore
      await addDoc(collection(database, "ChatMessages"), {
        roomId: chatRoomId,
        sender: userNumber,
        text: announcementMessage,
        timestamp: serverTimestamp(),
        isReschedule: { status: "no", usersAgreed: [], usersDisagreed: [] },
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const goBackToChat = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <SafeArea>
        <ScrollContainer>
          <HeaderContainer>
            <HeaderTitle>Confirm important details</HeaderTitle>
          </HeaderContainer>
          <ChatKeyboardGobackContainer>
            <PromptContainerInitial onPress={goBackToChat}>
              <AntDesign
                name="caretleft"
                size={12}
                color="#527E65"
                style={{ marginRight: 10 }}
              />
              <PromptText>Announcement</PromptText>
            </PromptContainerInitial>
          </ChatKeyboardGobackContainer>
          <ChatKeyboardContainer>
            <RegularText>
              Feel free to announce anything important about your spark to the
              group. Make sure to communicate logistics, preparations or missing
              information.
            </RegularText>
            <TextMessageInput
              value={announcementMessage}
              onChangeText={setAnnouncementMessage}
              multiline={true}
              textAlignVertical="top"
              blurOnSubmit={true}
              placeholder="Announcement"
              style={{
                fontFamily: "poppins-400",
              }}
            />
            <RegularText style={{ marginTop: 20 }}>
              Only the host can make announcements
            </RegularText>
          </ChatKeyboardContainer>

          <SendMessageButton
            onPress={handleSendMessage}
            style={{
              backgroundColor: announcementMessage ? "#79D17C" : "#CCCCCC",
            }}
            disabled={!announcementMessage} // Corrected to selectedValue
          >
            <SendMessageText>Send announcement</SendMessageText>
            <MaterialIcons name="send" size={18} color="black" />
          </SendMessageButton>
        </ScrollContainer>
      </SafeArea>
    </Container>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
  background-color: #9a9999;
`;

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
  background-color: #9a9999;
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

const ChatKeyboardGobackContainer = styled(View)`
  width: 90%;
  align-items: self-start;
  align-self: center;
  justify-content: center;
  margin-top: 10px;
`;

const ChatKeyboardContainer = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const PromptContainerInitial = styled(TouchableOpacity)`
  height: 40px;
  padding-left: 10px;
  padding-right: 20px;
  background-color: #ebebeb;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const PromptText = styled(Text)`
  color: black;
  font-family: poppins-700;
  font-size: 12px;
`;

const RegularText = styled(Text)`
  color: black;
  font-family: poppins-600;
  font-size: 10px;
  text-align: center;
  width: 90%;
`;

const TextMessageInput = styled(TextInput)`
  height: 230px;
  width: 90%;
  font-size: 9px;
  background-color: white;
  color: black;
  border-radius: 20px;
  margin-top: 30px;
  padding: 18px;
  text-align: left; /* Align text to the left */
`;

const SendMessageButton = styled(TouchableOpacity)`
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 55%;
  padding: 10px;
  align-self: center;
  border-radius: 20px;
  flex-direction: row;
`;

const SendMessageText = styled(Text)`
  color: black;
  font-family: poppins-600;
  font-size: 11px;
`;
