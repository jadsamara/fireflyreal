import React, { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { PostDateContext } from "../../../../Context/PostPagesContext";

export const TagsComponent = () => {
  const { tags, setTags } = useContext(PostDateContext);

  const deleteTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const addTag = () => {
    if (tags.length < 5) {
      setTags([...tags, { id: tags.length, text: "" }]);
    }
  };

  const editTag = (index, text) => {
    const newTags = tags.map((tag, i) =>
      i === index ? { ...tag, text } : tag
    );
    setTags(newTags);
  };

  return (
    <Container>
      <TagsHeaderText>Tags (Max 5)</TagsHeaderText>

      <TagsContainer>
        {tags.length < 5 && (
          <InitialAddTag onPress={addTag}>
            <TagText>Add Tag</TagText>
          </InitialAddTag>
        )}
        {tags.map((tag, index) => (
          <TagWrapper key={index}>
            <Tag
              placeholder="New Tag"
              value={tag.text}
              onChangeText={(text) => editTag(index, text)}
              placeholderTextColor="white"
            />
            <DeleteButton onPress={() => deleteTag(index)}>
              <FontAwesome name="times" size={10} color="white" />
            </DeleteButton>
          </TagWrapper>
        ))}
      </TagsContainer>
    </Container>
  );
};

const Container = styled(View)`
  margin-top: 60px;
  width: 100%;
`;

const TagsHeaderText = styled(Text)`
  font-size: 16px;
  font-family: poppins-700;
  margin-bottom: 10px;
`;

const TagsContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`;

const InitialAddTag = styled(TouchableOpacity)`
  background-color: #686868;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  flex-direction: row;
`;

const TagText = styled(Text)`
  color: white;
  font-size: 12px;
  font-family: poppins-500;
`;

const Tag = styled(TextInput)`
  background-color: #527e65;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 5px;
  margin-top: 5px;
  border-radius: 15px;
  color: white;
  font-size: 12px;
  font-family: poppins-500;
`;

const DeleteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 0px;
  right: -5px;
  background-color: #686868;
  border-radius: 10px;
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
`;

const TagWrapper = styled(View)`
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
`;
