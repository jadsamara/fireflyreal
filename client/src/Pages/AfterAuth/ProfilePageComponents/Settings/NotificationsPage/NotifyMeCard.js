import { View, Text, Switch } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

export const NotifyMeCard = ({ res }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <TabContainer key={res}>
      <TabTitle>{res}</TabTitle>
      <Switch
        value={isEnabled}
        onValueChange={(value) => setIsEnabled(value)}
      />
    </TabContainer>
  );
};

const TabContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.3px;
  border-color: gray;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TabTitle = styled(Text)`
  font-size: 13px;
  color: black;
  font-family: poppins-500;
`;
