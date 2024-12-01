import { View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../../../Components/GlobalComponents";
import { SettingsHeader, SettingsSearchBar } from "../Components";

export const AboutPage = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <SafeArea>
      <ScrollContainer>
        <SettingsHeader navigation={navigation} title="About Us" icon="info" />
        <SearchBarContainer>
          <SettingsSearchBar
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
          />
        </SearchBarContainer>
        <Container>
          <BackgroundContainer>
            <TitleText>Thank you for joining our community.</TitleText>
            <Spacing />
            <RegularText>
              We are a passionate team of university students who couldn’t
              ignore a troubling trend we saw around us: the growing loneliness
              and the increasing difficulty people face in forming real,
              meaningful friendships. Social media and mobile technology, once
              created to bring us closer, have instead widened the gap,
              fostering a world that feels more superficial and disconnected
              than ever before.
            </RegularText>
            <Spacing />
            <RegularText>
              At Firefly, we believe it’s time for change. We recognize that the
              very tools meant to connect us have failed. Texting, swiping, and
              endless scrolling often leave us feeling more isolated than
              before. That’s why we’ve created Firefly—a modern antidote to the
              ailments of modern society.
            </RegularText>
            <Spacing />
            <RegularText>
              Our app is designed to bring people together in the way that truly
              matters: face-to-face. Firefly eliminates the barriers of endless
              digital chatter and replaces them with opportunities for safe,
              real-world connections. Whether it’s finding new friends, creating
              unforgettable memories, or just rediscovering the joy of human
              interaction, Firefly makes it easier and safer to bridge the gap.
            </RegularText>
            <Spacing />
            <BoldText>
              Because we believe that behind every glowing screen lies the
              potential for real connection—and just like a firefly in the dark,
              all it takes is a little light to bring people together.
            </BoldText>
          </BackgroundContainer>
        </Container>
      </ScrollContainer>
    </SafeArea>
  );
};

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const SearchBarContainer = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 15px;
`;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  padding: 15px;
`;

const BackgroundContainer = styled(View)`
  border-radius: 10px;
  padding: 15px;
  padding-bottom: 55px;
  margin-top: 10px;
  background-color: rgba(82, 126, 101, 0.8);
`;

const TitleText = styled(Text)`
  font-size: 10px;
  color: white;
  font-family: poppins-600;
`;

const RegularText = styled(Text)`
  font-size: 10px;
  color: white;
  font-family: poppins-400;
`;

const BoldText = styled(Text)`
  font-size: 10px;
  color: white;
  font-family: poppins-600;
`;

const Spacing = styled(View)`
  margin-top: 10px;
`;
