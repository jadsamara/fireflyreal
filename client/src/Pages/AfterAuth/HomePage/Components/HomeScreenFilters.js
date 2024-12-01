import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

import { doc, updateDoc } from "firebase/firestore";

import { auth, database } from "../../../../Config/firebase";

import { HomePageContext } from "../../../../Context/HomePageContext";
import { FontAwesome } from "@expo/vector-icons";

export const HomeScreenFilters = () => {
  const { filters, setFilters } = useContext(HomePageContext);
  const userNumber = auth.currentUser.phoneNumber;

  const deleteTag = async (index) => {
    // Create a new array where the isEnabled property of the filter at the specified index is set to false
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
      // Update the Firestore document with the modified filters
      await updateDoc(doc(database, "Users", userNumber), {
        filters: newFilters,
      });

      // Update the local state with the modified filters
      setFilters(newFilters);
    } catch (error) {
      console.error("Error updating filters:", error);
    }
  };

  return (
    <CurrentTagContainer>
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
                tagIcon = <TagIcon name="map-marker" size={14} color="white" />;
              } else if (tag.city !== undefined) {
                tagText = `${tag.city}`;
                tagIcon = <TagIcon name="map-marker" size={14} color="white" />;
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
                tagIcon = <TagIcon name="calendar-o" size={14} color="white" />;
              } else if (tag.maxPeople !== undefined) {
                tagText = `Max People: ${tag.maxPeople}`;
              } else if (tag.minPeople !== undefined) {
                tagText = `Min People: ${tag.minPeople}`;
              } else if (tag.vibes !== undefined) {
                tagText = `${tag.vibes}`;
              } else if (Array.isArray(tag.tags)) {
                // If the tag is an array, display each item as a separate tag
                return tag.tags.map((subTag, subIndex) => (
                  <Tag key={index + "-" + subIndex}>
                    <TagText>{subTag}</TagText>
                    <TagClose onPress={() => deleteTag(tag.subTag)}>
                      <TagCloseText>x</TagCloseText>
                    </TagClose>
                  </Tag>
                ));
              }

              // Render the tag
              return (
                <Tag key={index}>
                  <TagText>{tagText}</TagText>
                  {tagIcon}
                  <TagClose onPress={() => deleteTag(index)}>
                    <TagCloseText>x</TagCloseText>
                  </TagClose>
                </Tag>
              );
            }
          })}
      </CurrentTagContainer>
    </CurrentTagContainer>
  );
};

const CurrentTagContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 10px;
`;

const Tag = styled(View)`
  background-color: #527e65;
  padding: 4px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: 5px;
  margin-top: 5px;
  flex-direction: row;
  height: 25px;
`;

const TagText = styled(Text)`
  color: white;
  font-size: 11px;
  font-family: poppins-900;
`;

const TagClose = styled(TouchableOpacity)`
  position: absolute;
  height: 15px;
  width: 15px;
  justify-content: center;
  align-items: center;
  top: -5px;
  right: -5px;
  border-radius: 20px;
  background-color: #79d17c;
`;

const TagIcon = styled(FontAwesome)`
  margin-left: 10px;
`;

const TagCloseText = styled(Text)`
  color: white;
  font-family: poppins-700;
  font-size: 10px;
`;
