import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../Config/AuthContext";

import {
  HomePage,
  ListingPage,
  BrowsePage,
  ProfilePage,
  PostPage,
  DeactivatedPage,
} from "../Pages/AfterAuth/";
import { MaterialIcons } from "@expo/vector-icons";

import { DefaultProvider } from "../Context/DefaultContext";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomePageProvider } from "../Context/HomePageContext";
import { PostDateProvider } from "../Context/PostPagesContext";
import { ListingPageProvider } from "../Context/ListingPageContext";
import { ProfilePageProvider } from "../Context/ProfilePageContext";

import { ViewParticipantAccountPage } from "../Components/ViewParticipantAccount/ViewParticipantAccountPage";

import {
  PostSparkSeven,
  PostSparkTwo,
  PostSparkThree,
  PostSparkFour,
  PostSparkFive,
  PostSparkSix,
  ListLocalVibePictures,
} from "../Pages/AfterAuth/PostPageComponents";
import {
  ViewSparkPage,
  ConfirmSendRequestPage,
  FinishedRequestPage,
} from "../Pages/AfterAuth/HomePage/Pages/";

import { ViewSparkRequestsPage } from "../Pages/AfterAuth/ListingPageComponents/AllSparkCards/ViewSparkRequests/ViewSparkRequestsPage";

import { ViewRequestInfo } from "../Pages/AfterAuth/ListingPageComponents/AllSparkCards/ViewSparkRequests/ViewRequestInfo";
import { ViewSparkPageHost } from "../Pages/AfterAuth/ListingPageComponents/AllSparkCards/Host/ViewSparkPageHost";
import { ViewActiveSparkPage } from "../Pages/AfterAuth/HomePage/Pages/ViewActiveSparkPage";
import { OnMyWayToSparkPage } from "../Pages/AfterAuth/HomePage/Pages/OnMyWayToSparkPage";

import { ChatScreen } from "../Chat/ChatPage";

import { ViewSparkPageParticipant } from "../Pages/AfterAuth/ListingPageComponents/AllSparkCards/Participant/ViewSparkPageParticipant";

import { AllVibeCards } from "../Pages/AfterAuth/PostPageComponents/Components/ListLocalVibePicturesComponents";

import { ReschedulePage } from "../Chat/Keyboards/Reschedule/ReschedulePage";
import { AnnouncementPage } from "../Chat/Keyboards/Announcement/AnnouncementPage";

import { HomeScreenFiltersPage } from "../Pages/AfterAuth/HomePage/Pages/HomeScreenFiltersPage";

import { InitialArrivedPage } from "../Pages/AfterAuth/HomePage/Pages/ArrivalPages/InitialArrivedPage";

import { SecondArrivedPage } from "../Pages/AfterAuth/HomePage/Pages/ArrivalPages/SecondArrivedPage";

import { ThirdArrivedPage } from "../Pages/AfterAuth/HomePage/Pages/ArrivalPages/ThirdArrivedPage";

import { ReviewAccountsPage } from "../Components/ReviewAccounts/ReviewAccountsPage";
import { DoneSparkPage } from "../Components/ReviewAccounts/DoneSparkPage";

import { PastSparkPage } from "../Pages/AfterAuth/ListingPageComponents/AllSparkCards/PastSpark/PastSparkPage";

import {
  AddPhotosPrompts,
  CreateYourOwnPrompt,
} from "../Pages/AfterAuth/ProfilePageComponents/";

import { CancelledSparkPage } from "../Pages/AfterAuth/ListingPageComponents/AllSparkCards/Cancelled/CancelledSparkPage";
import { NoshowSparkPage } from "../Pages/AfterAuth/ListingPageComponents/AllSparkCards/Noshow/NoshowSparkPage";

import {
  SettingsPage,
  AccountPage,
  CommunityPage,
  HelpPage,
  LanguagePage,
  LegalPage,
  NotificationsPage,
  PrivacyPage,
  AboutPage,
} from "../Pages/AfterAuth/ProfilePageComponents/Settings";

import { auth, database } from "../Config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const DefaultNav = () => {
  const { accountStatus, setAccountStatus } = useContext(AuthContext);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const checkAccountStatus = async () => {
      try {
        const userNumber = auth.currentUser?.phoneNumber;

        if (!userNumber) {
          setAccountStatus("unauthenticated"); // Handle unauthenticated state
          return;
        }

        const userRef = doc(database, "Users", userNumber);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setAccountStatus(userData.accountStatus || "active"); // Default to "active"
        } else {
          setAccountStatus("active"); // Default if no user document
        }
      } catch (error) {
        console.error("Error fetching account status:", error);
        setAccountStatus("active"); // Fallback in case of error
      }
    };

    checkAccountStatus();
  }, []);

  const TAB_ICON = {
    Home: "home",
    Browse: "search",
    Post: "add-box",
    Listings: "view-list",
    Profile: "account-box",
  };

  const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];

    return {
      tabBarIcon: ({ size, color }) => (
        <MaterialIcons name={iconName} size={24} color={color} />
      ),
      tabBarActiveTintColor: "green",
      tabBarInactiveTintColor: "gray",

      headerShown: false,
      unmountOnBlur: true,
    };
  };

  const StackNavigatorHome = () => (
    <HomePageProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeStack" component={HomePage} />
        <Stack.Screen name="ViewSparkPage" component={ViewSparkPage} />
        <Stack.Screen
          name="ViewActiveSparkPage"
          component={ViewActiveSparkPage}
        />
        <Stack.Screen
          name="OnMyWayToSparkPage"
          component={OnMyWayToSparkPage}
        />
        <Stack.Screen
          name="ReviewAccountsPage"
          component={ReviewAccountsPage}
        />

        <Stack.Screen
          name="InitialArrivedPage"
          component={InitialArrivedPage}
        />
        <Stack.Screen name="SecondArrivedPage" component={SecondArrivedPage} />
        <Stack.Screen name="ThirdArrivedPage" component={ThirdArrivedPage} />

        <Stack.Screen
          name="HomeScreenFiltersPage"
          component={HomeScreenFiltersPage}
        />

        <Stack.Screen
          name="ConfirmSendRequestPage"
          component={ConfirmSendRequestPage}
        />
        <Stack.Screen
          name="FinishedRequestPage"
          component={FinishedRequestPage}
        />

        <Stack.Screen name="DoneSparkPage" component={DoneSparkPage} />
      </Stack.Navigator>
    </HomePageProvider>
  );

  const StackNavigatorPost = () => (
    <PostDateProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PostStack" component={PostPage} />
        <Stack.Screen name="PostSparkTwo" component={PostSparkTwo} />
        <Stack.Screen name="PostSparkThree" component={PostSparkThree} />
        <Stack.Screen name="PostSparkFour" component={PostSparkFour} />
        <Stack.Screen name="PostSparkFive" component={PostSparkFive} />
        <Stack.Screen name="PostSparkSix" component={PostSparkSix} />
        <Stack.Screen name="PostSparkSeven" component={PostSparkSeven} />

        <Stack.Screen
          name="ListLocalVibePictures"
          component={ListLocalVibePictures}
        />

        <Stack.Screen name="AllVibeCards" component={AllVibeCards} />
      </Stack.Navigator>
    </PostDateProvider>
  );

  const StackNavigatorListing = () => (
    <ListingPageProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ListingStack" component={ListingPage} />
        <Stack.Screen
          name="ViewSparkRequestsPage"
          component={ViewSparkRequestsPage}
        />

        <Stack.Screen
          name="ViewSparkPageParticipant"
          component={ViewSparkPageParticipant}
        />
        <Stack.Screen
          name="CancelledSparkPage"
          component={CancelledSparkPage}
        />

        <Stack.Screen name="NoshowSparkPage" component={NoshowSparkPage} />

        <Stack.Screen name="ViewSparkPageHost" component={ViewSparkPageHost} />

        <Stack.Screen name="ViewRequestInfo" component={ViewRequestInfo} />
        <Stack.Screen name="PastSparkPage" component={PastSparkPage} />
      </Stack.Navigator>
    </ListingPageProvider>
  );

  const StackNavigatorProfile = () => (
    <ProfilePageProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileStack" component={ProfilePage} />
        <Stack.Screen
          name="CreateYourOwnPrompt"
          component={CreateYourOwnPrompt}
        />
        <Stack.Screen name="AddPhotosPrompts" component={AddPhotosPrompts} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
        <Stack.Screen name="AccountPage" component={AccountPage} />
        <Stack.Screen name="CommunityPage" component={CommunityPage} />
        <Stack.Screen name="HelpPage" component={HelpPage} />
        <Stack.Screen name="LanguagePage" component={LanguagePage} />
        <Stack.Screen name="LegalPage" component={LegalPage} />
        <Stack.Screen name="NotificationsPage" component={NotificationsPage} />
        <Stack.Screen name="PrivacyPage" component={PrivacyPage} />
        <Stack.Screen name="AboutPage" component={AboutPage} />
      </Stack.Navigator>
    </ProfilePageProvider>
  );

  const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Home" component={StackNavigatorHome} />
        <Tab.Screen name="Browse" component={BrowsePage} />
        <Tab.Screen name="Post" component={StackNavigatorPost} />
        <Tab.Screen name="Listings" component={StackNavigatorListing} />
        <Tab.Screen name="Profile" component={StackNavigatorProfile} />
      </Tab.Navigator>
    );
  };

  const RootNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accountStatus === "disabled" ? (
        <Stack.Screen name="DeactivatedPage" component={DeactivatedPage} />
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen
            name="ViewParticipantAccountPage"
            component={ViewParticipantAccountPage}
          />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ReschedulePage" component={ReschedulePage} />
          <Stack.Screen name="AnnouncementPage" component={AnnouncementPage} />
        </>
      )}

      {/* <Stack.Screen name="AddPhotosPrompts">
        {(props) => (
          <ProfilePageProvider>
            <AddPhotosPrompts {...props} />
          </ProfilePageProvider>
        )}
      </Stack.Screen>
      <Stack.Screen name="CreateYourOwnPrompt">
        {(props) => (
          <ProfilePageProvider>
            <CreateYourOwnPrompt {...props} />
          </ProfilePageProvider>
        )}
      </Stack.Screen> */}
    </Stack.Navigator>
  );

  if (accountStatus === null) {
    // Show a loading indicator while checking the account status
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <DefaultProvider>
      <RootNavigator />
    </DefaultProvider>
  );
};
