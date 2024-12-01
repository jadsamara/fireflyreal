import { View, Text, TextInput } from "react-native";
import React from "react";

import styled from "styled-components";

export const UserComment = ({ setUserComment, userComment }) => {
  return (
    <Container>
      <Title>Write a comment</Title>
      <CommentInput
        placeholder="Write something fun and quirky to get people to hang out with you! "
        placeholderTextColor="black"
        multiline={true}
        blurOnSubmit={true}
        maxLength={250}
        onChangeText={setUserComment}
        value={userComment}
      />
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 10px;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-family: poppins-400;
`;

const CommentInput = styled(TextInput)`
  height: 169px;
  width: 100%;
  background-color: #e4e4e4;
  margin-top: 5px;
  padding: 15px;
  border-radius: 14px;
  font-size: 11px;
  font-family: poppins-300;
  color: black;
`;
