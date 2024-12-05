import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

export const TableComponent = ({
  leftColumn,
  rightColumn,
  leftColor,
  rightColor,
}) => {
  return (
    <TableContainer>
      {/* Left Column */}
      <Column>
        <Header>
          <HeaderText color={leftColor}>{leftColumn.title}</HeaderText>
          <HorizontalLine color={"#4CAF50"} />
        </Header>
        <Content>
          {leftColumn.data.map((item, index) => (
            <React.Fragment key={index}>
              <Title>{item.title}</Title>
              <Body>{item.body}</Body>
            </React.Fragment>
          ))}
        </Content>
      </Column>

      {/* Vertical Divider */}
      <VerticalDivider />

      {/* Right Column */}
      <Column>
        <Header>
          <HeaderText color={rightColor}>{rightColumn.title}</HeaderText>
          <HorizontalLine color={"#4CAF50"} />
        </Header>
        <Content>
          {rightColumn.data.map((item, index) => (
            <React.Fragment key={index}>
              <Title>{item.title}</Title>
              <Body>{item.body}</Body>
            </React.Fragment>
          ))}
        </Content>
      </Column>
    </TableContainer>
  );
};

const TableContainer = styled(View)`
  flex-direction: row;
  background-color: #fff;
  margin-top: 10px;
`;

const Column = styled(View)`
  flex: 1;
`;

const Header = styled(View)`
  align-items: center;
`;

const HeaderText = styled(Text)`
  font-size: 10px;
  color: ${(props) => props.color};
  font-family: poppins-700;
`;

const HorizontalLine = styled(View)`
  height: 2px;
  width: 100%;
  background-color: ${(props) => props.color};
  margin-top: 5px;
`;

const VerticalDivider = styled(View)`
  width: 2px;
  background-color: #4caf50;
`;

const Content = styled(View)``;

const Title = styled(Text)`
  font-size: 9px;
  color: #333;
  margin-top: 10px;
  font-family: poppins-700;
  margin-left: 5px;
`;

const Body = styled(Text)`
  font-size: 8px;
  color: #555;
  margin-top: 5px;
  font-family: poppins-500;
  margin-left: 5px;
`;
