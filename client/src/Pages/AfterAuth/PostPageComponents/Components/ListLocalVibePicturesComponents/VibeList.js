import { ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { storage } from "../../../../../Config/firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import styled from "styled-components/native"; // make sure this is styled-components/native

import { VibeCard } from "./VibeCard";

export const VibeList = ({ navigation }) => {
  const [vibeCards, setVibeCards] = useState([]);

  useEffect(() => {
    const fetchStorageItems = async () => {
      try {
        const storageRef = ref(storage, "date-vibes");

        // Fetch all folders under "date-vibes"
        const folderList = await listAll(storageRef);

        // Use Promise.all to fetch all image URLs in parallel
        const vibeCardsData = await Promise.all(
          folderList.prefixes.map(async (folder) => {
            const folderName = folder.name;

            // List all images inside the current folder
            const imageList = await listAll(folder);

            // Fetch the download URLs for each image
            const imageUrls = await Promise.all(
              imageList.items.map((imageRef) => getDownloadURL(imageRef))
            );

            // Return folder name and its images
            return { folderName, images: imageUrls };
          })
        );

        // Transform the array of results into an object
        const formattedVibeCards = vibeCardsData.reduce(
          (acc, { folderName, images }) => {
            acc[folderName] = { images };
            return acc;
          },
          {}
        );

        // Update state with the structured data
        setVibeCards(formattedVibeCards);
      } catch (error) {
        console.error("Error fetching storage items:", error);
      }
    };

    // Call the function to fetch the items
    fetchStorageItems();
  }, []);

  return (
    <Container
      data={Object.entries(vibeCards)}
      keyExtractor={([key]) => key} // Use the folder name as the key
      renderItem={({ item: [key, res] }) => (
        <VibeCard images={res.images} title={key} navigation={navigation} />
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
