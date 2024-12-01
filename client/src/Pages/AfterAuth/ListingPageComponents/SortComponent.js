import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import styled from "styled-components/native";

import { ListingPageContext } from "../../../Context/ListingPageContext";

export const SortComponent = () => {
  const { currentFilter, setCurrentFilter } = useContext(ListingPageContext);

  const sortArr = [
    { id: 0, title: "Recent Activity" },
    { id: 1, title: "Upcoming" },
    { id: 2, title: "Hosting" },
    { id: 3, title: "Requested" },
    { id: 4, title: "Past Sparks" },
    { id: 5, title: "Canceled" },
  ];

  const sortBySelectedTag = (index) => {
    setCurrentFilter(index);
  };

  return (
    <Container>
      <SubTitle>Sort</SubTitle>
      <TagContainer>
        {sortArr.map((res, index) => (
          <Tag
            key={res.id}
            isActive={currentFilter === index}
            onPress={() => sortBySelectedTag(index)}
          >
            <TagText>{res.title}</TagText>
          </Tag>
        ))}
      </TagContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 20px;
  padding: 5px;
`;

const SubTitle = styled(Text)`
  font-size: 18px;
  font-family: poppins-500;
`;

const TagContainer = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  margin-top: 10px;
`;

const Tag = styled(TouchableOpacity)`
  background-color: ${(props) => (props.isActive ? "#527e65" : "#ccc")};
  padding: 5px 13px;
  border-radius: 15px;
  margin-left: 6px;
  justify-content: center;
  align-items: center;
`;

const TagText = styled(Text)`
  font-size: 12px;
  font-family: poppins-500;
  color: white;
`;
