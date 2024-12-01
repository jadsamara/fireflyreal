import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";

import { database, auth } from "../Config/firebase";
import { doc, getDoc } from "firebase/firestore";

import RegularChatMessages from "./RegularChatMessages";
import RescheduleChatMessages from "./RescheduleChatMessage";

export const MessagesComponent = ({ messages, navigation }) => {
  const userNumber = auth.currentUser.phoneNumber;

  const [profilePics, setProfilePics] = useState({});

  useEffect(() => {
    const fetchProfilePics = async () => {
      const uniqueSenders = new Set(messages.map((message) => message.sender));

      const pics = {};

      for (const sender of uniqueSenders) {
        try {
          const userDocRef = doc(database, "Users", sender);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            pics[sender] = userData.profilePicture;
          } else {
            console.log(`Profile picture not found for user ${sender}`);
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      }

      setProfilePics(pics);
    };

    fetchProfilePics();
  }, [messages]);

  const renderTime = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert 24-hour format to 12-hour format
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Ensure two-digit representation for minutes
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
    return "";
  };

  const renderMessageItem = useCallback(
    ({ item, index }) => {
      // Check if the item or its timestamp is null/undefined
      if (!item || !item.timestamp || !item.timestamp.seconds) {
        return null; // Skip rendering if data is invalid
      }

      const currentTimestamp = item.timestamp.seconds * 1000; // Convert seconds to milliseconds
      const previousTimestamp =
        index > 0 && messages[index - 1]?.timestamp?.seconds
          ? messages[index - 1].timestamp.seconds * 1000
          : null; // Get the previous message timestamp if it exists

      const isMoreThanThreeHours =
        previousTimestamp &&
        currentTimestamp - previousTimestamp > 3 * 60 * 60 * 1000; // 3 hours in milliseconds

      const labelText = new Date(currentTimestamp).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

      return (
        <>
          {(isMoreThanThreeHours || previousTimestamp === null) && (
            <DateLabel>
              <DateLabelText>{labelText}</DateLabelText>
            </DateLabel>
          )}
          {item.isReschedule?.status === "no" ? (
            <RegularChatMessages
              item={item}
              userNumber={userNumber}
              profilePics={profilePics}
              renderTime={renderTime}
              navigation={navigation}
            />
          ) : item.isReschedule?.status === "pending" ? (
            <RescheduleChatMessages
              item={item}
              userNumber={userNumber}
              profilePics={profilePics}
              renderTime={renderTime}
              navigation={navigation}
            />
          ) : null}
        </>
      );
    },
    [messages, userNumber, profilePics, renderTime]
  );

  return (
    <Container>
      <ChatScreenContainer>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          removeClippedSubviews={true}
        />
      </ChatScreenContainer>
    </Container>
  );
};

const Container = styled(View)`
  height: 70%;
  width: 100%;
  background-color: #e5e5e5;
`;

const ChatScreenContainer = styled(View)`
  height: 98%;
  width: 100%;
`;

const DateLabel = styled(View)`
  background-color: gray;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  align-self: center;
  border-radius: 20px;
`;

const DateLabelText = styled(Text)`
  text-align: center;
  color: white;
  font-family: "poppins-500";
  font-size: 6px;
`;
