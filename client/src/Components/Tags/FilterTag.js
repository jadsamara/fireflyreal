import { View, Text } from "react-native";
import React from "react";

import styled from "styled-components";

export const FilterTag = ({ tagText, children }) => {
  return (
    <Tag>
      <TagText>{tagText}</TagText>
      {children}
    </Tag>
  );
};

const Tag = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.colors.firefly.secondary};
  padding: ${(props) => props.theme.space.small};
  padding-left: ${(props) => props.theme.space.large};
  padding-right: ${(props) => props.theme.space.large};
  border-radius: ${(props) => props.theme.space.large};
  margin-left: ${(props) => props.theme.space.small};
  margin-top: ${(props) => props.theme.space.small};
`;

const TagText = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: poppins-900;
`;
