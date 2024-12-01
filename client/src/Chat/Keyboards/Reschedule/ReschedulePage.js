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
import { CalendarSectionComponent } from "./CalendarComponent";

import { format } from "date-fns";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, database } from "../../../Config/firebase";

export const ReschedulePage = ({ navigation, route }) => {
  const userNumber = auth.currentUser.phoneNumber;

  const [selectedDateOnCalendar, setSelectedDateOnCalendar] = useState({});

  const { chatRoomId } = route.params;

  let formattedDateString = "";

  if (Object.keys(selectedDateOnCalendar).length > 0) {
    const { time } = Object.values(selectedDateOnCalendar)[0];

    if (time) {
      formattedDateString = format(new Date(time), "MMM do, h:mm a");
    }
  }

  const goBackToChat = () => {
    navigation.goBack();
  };

  const handleSendMessage = async () => {
    try {
      // Send selected option to Firebase Firestore
      await addDoc(collection(database, "ChatMessages"), {
        roomId: chatRoomId,
        sender: userNumber,
        text: formattedDateString,
        timestamp: serverTimestamp(),
        isReschedule: {
          status: "pending",
          usersAgreed: [userNumber],
          usersDisagreed: [],
        },
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
              <PromptText>Reschedule</PromptText>
            </PromptContainerInitial>
          </ChatKeyboardGobackContainer>
          <ChatKeyboardContainer>
            <RegularText>Can we reschedule to</RegularText>
            <TextMessageInput
              value={formattedDateString}
              placeholder="Select new date/time"
              style={{
                fontFamily: "poppins-400",
              }}
              editable={false}
            />
            <RegularText>?</RegularText>
          </ChatKeyboardContainer>
          <CalendarSectionComponent
            selectedDateOnCalendar={selectedDateOnCalendar}
            setSelectedDateOnCalendar={setSelectedDateOnCalendar}
          />
          <SendMessageButton
            onPress={handleSendMessage}
            style={{
              backgroundColor:
                Object.keys(selectedDateOnCalendar).length === 0 ||
                Object.values(selectedDateOnCalendar)[0].time === undefined
                  ? "#CCCCCC"
                  : "#79D17C",
            }}
            disabled={
              Object.keys(selectedDateOnCalendar).length === 0 ||
              Object.values(selectedDateOnCalendar)[0].time === undefined
            } // Corrected to selectedValue
          >
            <SendMessageText>Send message</SendMessageText>
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
  flex-direction: row;
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
  font-size: 12px;
  margin-left: 10px;
`;

const TextMessageInput = styled(TextInput)`
  height: 30px;
  width: 40%;
  font-size: 9px;
  background-color: white;
  color: black;
  border-radius: 40px;
  text-align: center;
  margin-left: 10px;
`;

const SendMessageButton = styled(TouchableOpacity)`
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 40%;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  align-self: center;
  border-radius: 20px;
  flex-direction: row;
`;

const SendMessageText = styled(Text)`
  color: black;
  font-family: poppins-600;
  font-size: 11px;
`;
