import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const PrepartionAndItems = ({
  onHandlePreparationModal,
  handleSendMessage,
}) => {
  const [messageValue, setMessageValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); // Initialize with an empty string
  const [modalVisible, setModalVisible] = useState(false);
  const options = ["Can Someone", "Can I", "Should I", "Is it OK if I"];

  const handlePickerSelect = (itemValue) => {
    setSelectedValue(itemValue);
    setModalVisible(false); // Close the modal after selection
    // handleOptionSelect(itemValue); // Call a function to handle selection
  };

  const onHandleMergeMessage = () => {
    const currentMessage = selectedValue + " " + messageValue;
    handleSendMessage(currentMessage);
  };

  return (
    <Container>
      {!modalVisible ? (
        <>
          <HeaderContainer>
            <HeaderTitle>Confirm important details</HeaderTitle>
          </HeaderContainer>
          <ChatKeyboardGobackContainer>
            <PromptContainerInitial onPress={onHandlePreparationModal}>
              <AntDesign
                name="caretleft"
                size={12}
                color="#527E65"
                style={{ marginRight: 10 }}
              />
              <PromptText>Preparation and Items</PromptText>
            </PromptContainerInitial>
          </ChatKeyboardGobackContainer>
          <ChatKeyboardContainer>
            <SelectPromptButton onPress={() => setModalVisible(true)}>
              <SelectPromptText>
                {selectedValue ? selectedValue : "Select"}
              </SelectPromptText>
            </SelectPromptButton>
            <RegularText>Bring</RegularText>
            <TextMessageInput
              value={messageValue}
              onChangeText={setMessageValue}
              placeholder={"Type Here"}
              style={{
                fontFamily: "poppins-400",
              }}
            />
            <RegularText>?</RegularText>
          </ChatKeyboardContainer>
          <SendMessageButton
            onPress={onHandleMergeMessage}
            style={{
              backgroundColor:
                messageValue && selectedValue ? "#79D17C" : "#CCCCCC",
            }}
            disabled={!messageValue || !selectedValue} // Corrected to selectedValue
          >
            <SendMessageText>Send message</SendMessageText>
            <MaterialIcons name="send" size={18} color="black" />
          </SendMessageButton>
        </>
      ) : (
        // Modal for Picker
        <Modal
          transparent={true} // Makes the modal background transparent
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ModalContainer>
            {/* <CloseButton onPress={() => setModalVisible(false)}>
              <Text style={{ color: "white", fontSize: 18 }}>Close</Text>
            </CloseButton> */}
            <PickerContainer>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => handlePickerSelect(itemValue)} // Directly use itemValue
                style={{ height: "100%", width: "100%" }} // Full height of PickerContainer
              >
                {options.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </PickerContainer>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled(View)`
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

const SelectPromptButton = styled(TouchableOpacity)``;

const SelectPromptText = styled(Text)`
  color: #527e65;
  font-family: poppins-500;
  font-size: 14px;
`;

const RegularText = styled(Text)`
  color: black;
  font-family: poppins-600;
  font-size: 14px;
  margin-left: 10px;
`;

const TextMessageInput = styled(TextInput)`
  height: 30px;
  width: 35%;
  font-size: 10px;
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

const ModalContainer = styled(View)`
  flex: 1; /* Takes full height */
  justify-content: flex-end; /* Align content to the bottom */
  background-color: rgba(0, 0, 0, 0.8); /* Optional: dim background */
`;

const PickerContainer = styled(View)`
  height: 250px; /* Set a specific height for the picker container */
  width: 100%;
  background-color: white; /* Background color of the picker */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-top: 20px; /* Add some padding at the top for aesthetics */
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 35%; /* Position close button */
  right: 20px; /* Position close button */
  padding: 10px;
  background-color: #e74c3c;
  border-radius: 5px;
`;
