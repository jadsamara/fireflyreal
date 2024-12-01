import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useCallback } from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../../Components/GlobalComponents";

import {
  SettingsListCard,
  SettingsSearchBar,
  SettingsHeader,
} from "./Components/";

import { clearUserData, setUser } from "../../../../Slices/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../../../../Config/firebase";
import { signOut } from "firebase/auth";

const settingsData = [
  {
    label: "Account",
    tab: "Account",
    key: "1",
    sections: [
      { label: "Change Username", key: "1-1" },
      { label: "Edit Hometown", key: "1-2" },
      { label: "Verify Account", key: "1-3" },
      { label: "Deactivate Account", key: "1-4" },
    ],
  },
  {
    label: "Privacy & Data",
    tab: "Privacy",
    key: "2",
    sections: [
      { label: "Personalized Ads", key: "2-1" },
      { label: "Download Your Data", key: "2-2" },
      { label: "Delete Account", key: "2-3" },
    ],
  },
  {
    label: "Community Guidelines",
    tab: "Community",
    key: "3",
    sections: [
      { label: "Safety", key: "3-1" },
      { label: "Let's Just Be Friends", key: "3-2" },
      { label: "Join the Mission", key: "3-3" },
    ],
  },
  // {
  //   label: "Language",
  //   tab: "Language",
  //   key: "4",
  //   sections: [
  //     { label: "Data Sharing Settings", key: "4-1" },
  //     { label: "Blocked Accounts", key: "4-2" },
  //   ],
  // },
  // {
  //   label: "Notifications",
  //   tab: "Notifications",
  //   key: "5",
  //   sections: [
  //     { label: "Push Notificationsr", key: "5-1" },
  //     { label: "Email Notificationsr", key: "5-2" },
  //   ],
  // },
  {
    label: "Legal",
    tab: "Legal",
    key: "6",
    sections: [
      { label: "Terms of Use", key: "6-1" },
      { label: "Privacy Policy", key: "6-2" },
      { label: "Cookies Policy", key: "6-3" },
      { label: "Support", key: "6-4" },
    ],
  },
  {
    label: "Help",
    tab: "Help",
    key: "7",
    sections: [
      { label: "What are Lumins", key: "7-1" },
      { label: "Lumin Deposit System", key: "7-2" },
      { label: "Earning And Losing Lumins", key: "7-3" },
      { label: "Cancelling Sparks", key: "7-4" },
      { label: "What's With The Chat?", key: "7-6" },
      { label: "Keeping Our Community Safe", key: "7-7" },
      { label: "Contact us", key: "7-8" },
    ],
  },
  {
    label: "About",
    tab: "About",
    key: "8",
    sections: [
      { label: "Thank you!", key: "8-1" },
      { label: "Firefly", key: "8-2" },
    ],
  },
];

export const SettingsPage = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      dispatch(setUser(null)); // Clear Redux user info
      dispatch(clearUserData()); // Clear Redux user data
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel", // iOS-specific styling
        },
        {
          text: "Yes",
          style: "destructive", // iOS-specific styling
          onPress: async () => {
            await handleLogout(); // Perform logout
          },
        },
      ],
      { cancelable: true } // Dismiss when tapped outside the alert
    );
  };

  const handleSearch = useCallback(
    (query) => {
      setSearchKeyword(query);
      if (query.trim() === "") {
        setFilteredData([]);
      } else {
        const results = [];
        settingsData.forEach((tab) => {
          const matchingSections = (tab.sections || []).filter((section) =>
            section.label.toLowerCase().includes(query.toLowerCase())
          );

          if (matchingSections.length > 0) {
            results.push({
              ...tab,
              sections: matchingSections,
            });
          }
        });
        setFilteredData(results);
      }
    },
    [settingsData] // Dependencies
  );

  const onHandleNavigateTree = (res) => {
    navigation.navigate(`${res}Page`);
  };

  return (
    <SafeArea>
      <SettingsHeader
        navigation={navigation}
        title="Settings"
        icon="settings"
      />

      <SearchBarContainer>
        <SettingsSearchBar
          setSearchKeyword={handleSearch}
          searchKeyword={searchKeyword}
        />
      </SearchBarContainer>
      <ScrollContainer>
        {searchKeyword.trim() ? (
          filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {
                    <SettingsListCard
                      key={index}
                      res={item.tab}
                      onHandleNavigateTree={onHandleNavigateTree}
                    />
                  }
                  {item.sections &&
                    item.sections.map((section) => (
                      <SectionItem
                        key={`section-${item.key}-${section.key}`}
                        onPress={() => onHandleNavigateTree(item.tab)}
                      >
                        <SectionText>{section.label}</SectionText>
                      </SectionItem>
                    ))}
                </React.Fragment>
              );
            })
          ) : (
            <Text>No results found</Text>
          )
        ) : (
          <View>
            {settingsData.map((res) => (
              <SettingsListCard
                key={res.tab}
                res={res.tab}
                onHandleNavigateTree={onHandleNavigateTree}
              />
            ))}
            <ConfimButton onPress={confirmLogout}>
              <ConfimButtonText>Log Out</ConfimButtonText>
            </ConfimButton>
          </View>
        )}
      </ScrollContainer>
    </SafeArea>
  );
};

const SearchBarContainer = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 15px;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 15px;
`;

const SectionItem = styled(TouchableOpacity)`
  padding: 10px;
  margin-left: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const SectionText = styled(Text)`
  font-size: 14px;
  color: #555;
`;

const ConfimButton = styled(TouchableOpacity)`
  background-color: #527e65;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 24px;
  align-self: center;
  margin-top: 34px;
`;

const ConfimButtonText = styled(Text)`
  font-size: 14px;
  color: white;
  font-family: poppins-500;
`;
