import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { database, auth } from "../Config/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const RescheduleChatMessages = ({
  item,
  userNumber,
  profilePics,
  renderTime,
  navigation,
}) => {
  const onHandleAcceptReschedule = async () => {
    const messageDocRef = doc(database, "ChatMessages", item.docID);
    try {
      await updateDoc(messageDocRef, {
        "isReschedule.usersAgreed": arrayUnion(userNumber), // Add userNumber to usersAgreed
      });
      console.log("User added to usersAgreed array");
    } catch (error) {
      console.error("Error updating usersAgreed array: ", error);
    }
  };

  // Update usersDisagreed array by adding userNumber
  const onHandleRefuseReschedule = async () => {
    const messageDocRef = doc(database, "ChatMessages", item.docID);
    try {
      await updateDoc(messageDocRef, {
        "isReschedule.usersDisagreed": arrayUnion(userNumber), // Add userNumber to usersDisagreed
      });
      console.log("User added to usersDisagreed array");
    } catch (error) {
      console.error("Error updating usersDisagreed array: ", error);
    }
  };

  const hasResponded =
    item.isReschedule.usersAgreed.includes(userNumber) ||
    item.isReschedule.usersDisagreed.includes(userNumber);

  const onHandleNavigateToProfile = async () => {
    const participant = await getUserInfo(userNumber);

    navigation.navigate("ViewParticipantAccountPage", {
      participant: participant,
    });
  };

  return (
    <>
      {userNumber === item.sender ? (
        <Container>
          <MessageIndexContainer>
            <MessageContainer>
              <MessageText>Reschedule to {item.text} ?</MessageText>
              <Row>
                <AntDesign name="checkcircle" size={24} color="#236225" />
                {item.isReschedule.usersAgreed.map((res) => {
                  return (
                    <ProfilePictureOthers
                      key={res}
                      source={{
                        uri: profilePics[res],
                      }}
                    />
                  );
                })}
              </Row>
              <Row>
                <AntDesign name="closecircle" size={24} color="red" />
                {item.isReschedule.usersDisagreed.map((res) => {
                  return (
                    <ProfilePictureOthers
                      key={res}
                      source={{
                        uri: profilePics[res],
                      }}
                    />
                  );
                })}
              </Row>

              <TimeText>{renderTime(item.timestamp)}</TimeText>
            </MessageContainer>
            <TouchableOpacity onPress={onHandleNavigateToProfile}>
              <ProfilePicture
                source={{
                  uri: profilePics[item.sender],
                }}
              />
            </TouchableOpacity>
          </MessageIndexContainer>
        </Container>
      ) : (
        <Container>
          <MessageIndexContainerLeft>
            <TouchableOpacity onPress={onHandleNavigateToProfile}>
              <ProfilePictureLeft
                source={{
                  uri: profilePics[item.sender],
                }}
              />
            </TouchableOpacity>
            <MessageContainerOthers>
              <MessageTextOthers>Reschedule to {item.text} ?</MessageTextOthers>
              <Row>
                <AntDesign name="checkcircle" size={24} color="green" />
                {item.isReschedule.usersAgreed.map((res) => {
                  return (
                    <ProfilePictureOthers
                      key={res}
                      source={{
                        uri: profilePics[res],
                      }}
                    />
                  );
                })}
              </Row>
              <Row>
                <AntDesign name="closecircle" size={24} color="red" />
                {item.isReschedule.usersDisagreed.map((res) => {
                  return (
                    <ProfilePictureOthers
                      key={res}
                      source={{
                        uri: profilePics[res],
                      }}
                    />
                  );
                })}
              </Row>

              <TimeText>{renderTime(item.timestamp)}</TimeText>
            </MessageContainerOthers>
          </MessageIndexContainerLeft>
          {!hasResponded && (
            <Row>
              <DeclineAndAcceptButtonsOthers
                backgroundColor="red"
                onPress={onHandleRefuseReschedule}
              >
                <DeclineAndAcceptTextOthers>No</DeclineAndAcceptTextOthers>
              </DeclineAndAcceptButtonsOthers>
              <DeclineAndAcceptButtonsOthers
                backgroundColor="#79d17c"
                onPress={onHandleAcceptReschedule}
              >
                <DeclineAndAcceptTextOthers>Yes</DeclineAndAcceptTextOthers>
              </DeclineAndAcceptButtonsOthers>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default React.memo(RescheduleChatMessages);

const Container = styled(View)`
  margin-top: 20px;
`;

const MessageIndexContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const MessageContainer = styled(View)`
  background-color: #79d17c;
  width: 75%;
  border-radius: 15px;
  padding-top: 15px;
  padding-left: 15px;
  padding-bottom: 20px;
  position: relative;
  align-items: flex-start;
`;

const MessageText = styled(Text)`
  color: white;
  font-family: "poppins-400";
  font-size: 10px;
`;

const MessageContainerOthers = styled(View)`
  background-color: #dbdbdb;
  width: 75%;
  border-radius: 15px;
  padding-top: 15px;
  padding-left: 15px;
  padding-bottom: 20px;
  position: relative;
  align-items: flex-start;
`;

const MessageTextOthers = styled(Text)`
  color: black;
  font-family: "poppins-400";
  font-size: 10px;
`;

const ProfilePicture = styled(Image)`
  height: 50px;
  width: 50px;
  border-radius: 30px;
  margin-left: 10px;
  margin-right: 15px;
`;

const MessageIndexContainerLeft = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ProfilePictureLeft = styled(Image)`
  height: 50px;
  width: 50px;
  border-radius: 30px;
  margin-left: 15px;
  margin-right: 10px;
`;

const TimeText = styled(Text)`
  position: absolute;
  color: black;
  font-family: "poppins-400";
  font-size: 7px;
  bottom: 7px;
  right: 15px;
`;

const Row = styled(View)`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ProfilePictureOthers = styled(Image)`
  height: 24px;
  width: 24px;
  border-radius: 30px;
  margin-left: 5px;
`;

const DeclineAndAcceptButtonsOthers = styled(TouchableOpacity)`
  width: 110px;
  height: 40px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
`;

const DeclineAndAcceptTextOthers = styled(Text)`
  color: white;
  font-family: "poppins-600";
  font-size: 14px;
`;
