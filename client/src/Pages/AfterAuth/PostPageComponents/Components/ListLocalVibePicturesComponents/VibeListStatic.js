import { ScrollView, FlatList } from "react-native";
import React from "react";
import styled from "styled-components/native"; // make sure this is styled-components/native

import { VibeCardStatic } from "./VibeCardStatic";

export const VibeListStatic = ({ navigation, images }) => {
  return (
    <Container
      data={images}
      keyExtractor={(item, index) => `${item}-${index}`} // Generate a unique key using the image URL and index
      renderItem={({ item }) => (
        <VibeCardStatic image={item} navigation={navigation} />
      )}
      initialNumToRender={10} // Render only the first 10 items initially
      maxToRenderPerBatch={10} // Load 10 more items per batch
      updateCellsBatchingPeriod={50} // Time (ms) between batch rendering
      removeClippedSubviews={true} // Unmount off-screen items
      windowSize={5}
    />
  );
};

const Container = styled(FlatList)`
  flex: 1;
  height: 100%;
  margin-bottom: 50px;
  width: 100%;
`;
