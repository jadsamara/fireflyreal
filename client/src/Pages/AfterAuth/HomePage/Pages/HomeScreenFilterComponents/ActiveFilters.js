import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import styled from "styled-components";

import { HomePageContext } from "../../../../../Context/HomePageContext";
import { doc, updateDoc } from "firebase/firestore";

import { auth, database } from "../../../../../Config/firebase";

import { FontAwesome } from "@expo/vector-icons";
import { FilterTag } from "../../../../../Components/Tags/FilterTag";

export const ActiveFilters = () => {
  const { filters, setFilters } = useContext(HomePageContext);
  const userNumber = auth.currentUser.phoneNumber;

  const deleteTag = async (index) => {
    const newFilters = filters.map((filter, idx) => {
      if (idx === index) {
        // Disable both maxPeople and minPeople
        if (filter.maxPeople !== undefined || filter.minPeople !== undefined) {
          return {
            ...filter,
            isEnabled: false,
          };
        }

        // Normal delete
        return {
          ...filter,
          isEnabled: false,
        };
      }

      // Ensure related filters are also disabled
      if (
        filters[index]?.maxPeople !== undefined &&
        filter.minPeople !== undefined
      ) {
        return { ...filter, isEnabled: false };
      }

      if (
        filters[index]?.minPeople !== undefined &&
        filter.maxPeople !== undefined
      ) {
        return { ...filter, isEnabled: false };
      }

      return filter;
    });

    try {
      await updateDoc(doc(database, "Users", userNumber), {
        filters: newFilters,
      });

      setFilters(newFilters);
    } catch (error) {
      console.error("Error updating filters:", error);
    }
  };

  return (
    <ActiveFiltersContainer>
      <ActiveFiltersText>Active Filters</ActiveFiltersText>
      <CurrentTagContainer>
        {filters &&
          filters.length > 0 && // Add a check for filters existence
          filters.map((tag, index) => {
            if (tag.isEnabled) {
              // Determine the text to display based on the object properties
              let tagText = "";
              let tagIcon = null;
              if (tag.maxDistance !== undefined) {
                tagText = `Within: ${tag.maxDistance} km`;
                tagIcon = <TagIcon name="map-marker" size={16} color="white" />;
              } else if (tag.city !== undefined) {
                tagText = `${tag.city}`;
                tagIcon = <TagIcon name="map-marker" size={16} color="white" />;
              } else if (tag.date !== undefined) {
                const startDate = new Date(
                  tag.date.startDate.seconds * 1000 +
                    tag.date.startDate.nanoseconds / 1000000
                );
                const futureDate = new Date(
                  tag.date.futureDate.seconds * 1000 +
                    tag.date.futureDate.nanoseconds / 1000000
                );
                const formattedStartDate = startDate.toLocaleDateString(
                  undefined,
                  {
                    month: "short",
                    day: "numeric",
                  }
                );
                const formattedFutureDate = futureDate.toLocaleDateString(
                  undefined,
                  { month: "short", day: "numeric" }
                );
                tagText = `${formattedStartDate} - ${formattedFutureDate}`;
                tagIcon = <TagIcon name="calendar-o" size={16} color="white" />;
              } else if (tag.maxPeople !== undefined) {
                tagText = `Max People: ${tag.maxPeople}`;
              } else if (tag.minPeople !== undefined) {
                tagText = `Min People: ${tag.minPeople}`;
              } else if (tag.vibes !== undefined) {
                tagText = `${tag.vibes}`;
              } else if (Array.isArray(tag.tags)) {
                // If the tag is an array, display each item as a separate tag
                return tag.tags.map((subTag, subIndex) => (
                  <FilterTag tagText={subTag} key={index + "-" + subIndex}>
                    <TagClose onPress={() => deleteTag(tag.subTag)}>
                      <FontAwesome name="close" size={10} color="white" />
                    </TagClose>
                  </FilterTag>
                ));
              }

              // Render the tag
              return (
                <FilterTag tagText={tagText} key={index}>
                  {tagIcon}
                  <TagClose onPress={() => deleteTag(index)}>
                    <FontAwesome name="close" size={10} color="white" />
                  </TagClose>
                </FilterTag>
              );
            }
          })}
      </CurrentTagContainer>
    </ActiveFiltersContainer>
  );
};

const ActiveFiltersContainer = styled(View)`
  width: 100%;
  margin-top: 10px;
`;

const ActiveFiltersText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.header};
  font-family: poppins-500;
`;

const CurrentTagContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: ${(props) => props.theme.space.mediumLarge};
`;

const TagClose = styled(TouchableOpacity)`
  position: absolute;
  height: ${(props) => props.theme.space.large};
  width: ${(props) => props.theme.space.large};
  justify-content: center;
  align-items: center;
  top: -5px;
  right: 0px;
  border-radius: ${(props) => props.theme.space.large};
  background-color: #79d17c;
`;

const TagIcon = styled(FontAwesome)`
  margin-left: ${(props) => props.theme.space.medium};
  margin-right: ${(props) => props.theme.space.small};
`;
