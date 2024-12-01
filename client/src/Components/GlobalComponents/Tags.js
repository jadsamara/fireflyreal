import { View, Text } from "react-native";
import React from "react";

import styled from "styled-components";

export const Tags = ({ tagsArray }) => {
  return (
    <TagsContainer>
      {tagsArray.map((res, index) => {
        if (index === 0) {
          return (
            <TagContainerInitial>
              <TagText>{res}</TagText>
            </TagContainerInitial>
          );
        }

        return (
          <TagContainer>
            <TagText>{res}</TagText>
          </TagContainer>
        );
      })}
    </TagsContainer>
  );
};

const TagsContainer = styled(View)`
  flex-direction: row;
  margin-top: 5px;
`;

const TagContainerInitial = styled(View)`
  background-color: black;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 16px;
`;

const TagContainer = styled(View)`
  background-color: #527e65;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 16px;
  margin-left: 3px;
`;

const TagText = styled(Text)`
  font-family: "poppins-700";
  font-size: 10px;
  color: white;
`;
