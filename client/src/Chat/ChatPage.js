import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { database, auth } from "../Config/firebase";
import { AntDesign } from "@expo/vector-icons";

import styled from "styled-components";
import { ChatPageKeyboard } from "./ChatPageKeyboard";
import { MessagesComponent } from "./MessagesComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const ChatScreen = ({ route, navigation }) => {
  const { chatRoomId, spark } = route.params;
  const userNumber = auth.currentUser.phoneNumber;

  const [messages, setMessages] = useState([]);

  const isHost = spark.host === userNumber;

  useEffect(() => {
    const messagesRef = collection(database, "ChatMessages");

    const unsubscribeMessages = onSnapshot(messagesRef, (snapshot) => {
      const filteredData = snapshot.docs
        .map((doc) => ({ docID: doc.id, ...doc.data() })) // Add doc.id and spread the data fields
        .filter((message) => message.roomId === chatRoomId) // Filter messages by roomId
        .sort((a, b) => a.timestamp - b.timestamp); // Sort by timestamp in ascending order

      setMessages(filteredData); // Update the state with filtered and sorted messages
    });

    return () => {
      unsubscribeMessages(); // Clean up the listener
    };
  }, [chatRoomId]);

  const handleSendMessage = async (option) => {
    try {
      // Send selected option to Firebase Firestore
      await addDoc(collection(database, "ChatMessages"), {
        roomId: chatRoomId,
        sender: userNumber,
        text: option,
        timestamp: serverTimestamp(),
        isReschedule: { status: "no", usersAgreed: [], usersDisagreed: [] },
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToReschedulePage = () => {
    navigation.navigate("ReschedulePage", {
      spark,
      chatRoomId,
    });
  };

  const navigateToAnnouncementPage = () => {
    navigation.navigate("AnnouncementPage", {
      chatRoomId,
    });
  };

  return (
    <>
      <Header>
        <BackArrowButton onPress={goBack}>
          <AntDesign name="arrowleft" size={34} color="white" />
        </BackArrowButton>

        <HeaderMiddleContainer>
          <HeaderText>{spark.sparkTitle}</HeaderText>

          {spark.isSparkActive ? (
            <LiveTag>
              <LiveTagText>Live</LiveTagText>
            </LiveTag>
          ) : spark.chosenTime ? (
            <SoonLiveTag>
              <SoonLiveTagText>Confirmed</SoonLiveTagText>
            </SoonLiveTag>
          ) : (
            <SoonLiveTag>
              <SoonLiveTagText>Accepted</SoonLiveTagText>
            </SoonLiveTag>
          )}
        </HeaderMiddleContainer>
      </Header>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
      >
        <Container>
          <MessagesComponent messages={messages} navigation={navigation} />

          <ChatPageKeyboard
            isHost={isHost}
            navigateToReschedulePage={navigateToReschedulePage}
            navigateToAnnouncementPage={navigateToAnnouncementPage}
            handleSendMessage={handleSendMessage}
          />
        </Container>
      </KeyboardAwareScrollView>
    </>
  );
};

const Container = styled(View)`
  flex: 1;
  position: relative;
`;

const Header = styled(View)`
  background-color: #527e65;
  height: 15%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const BackArrowButton = styled(TouchableOpacity)`
  justify-content: center;
  left: 20px;
  bottom: 40px;
  position: absolute;
`;

const HeaderMiddleContainer = styled(View)`
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;

const HeaderText = styled(Text)`
  color: white;
  font-family: poppins-600;
  font-size: 22px;
`;

const SoonLiveTag = styled(View)`
  background-color: #415f74;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const SoonLiveTagText = styled(Text)`
  color: white;
  font-family: poppins-600;
  font-size: 10px;
`;

const LiveTag = styled(View)`
  height: 20px;
  width: 80px;
  background-color: #d9c36e;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;
`;

const LiveTagText = styled(Text)`
  color: white;
  font-family: poppins-600;
  font-size: 12px;
`;
