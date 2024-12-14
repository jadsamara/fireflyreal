import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  LoginPage,
  VerifyCodePage,
  CreateAccountPageOne,
  CreateAccountPageTwo,
  CreateAccountPageThree,
  CreateAccountPageFour,
  CreateAccountPageFive,
  CreateAccountPageSix,
  PageSixPrompts,
  CreateAccountPageSeven,
  CreateAccountPageEight,
  MandatoryScreeningOne,
  FaceScanSuccessPage,
  GoExtraStepPage,
} from "../Pages/PreAuthentication";

import {
  AddPhotosOne,
  AddPhotosTwo,
  AddPhotosPrompts,
  CreateYourOwnPrompt,
} from "../Pages/PreAuthentication/CreateAccountAddPhotosPage";

import { ViewProfilePage } from "../Pages/PreAuthentication/ViewProfilePages/ViewProfilePage";

import { AuthenticationStackProvider } from "../Context/AuthenticationStackContext";

import { CreateYourOwnPromptMic } from "../Pages/PreAuthentication/SupportingPages/CreateYourOwnPromptMic";

import {
  WorkPage,
  SchoolPage,
  ReligiousBeliefs,
  PoliticalBeliefs,
  LanguagePage,
  JobTitle,
  HighestSchoolDegree,
  EthnicityPage,
  HomeTown,
} from "../Pages/PreAuthentication/UserFactsPages";

import { AreaCodePage } from "../Pages/PreAuthentication/SupportingPages/AreaCodePage";

export const AuthNav = () => {
  const Stack = createNativeStackNavigator();

  const screenOptions = () => {
    return {
      headerShown: false,
      // ...TransitionPresets.ModalPresentationIOS,
      gestureResponseDistance: 150,
    };
  };

  return (
    <AuthenticationStackProvider>
      <Stack.Navigator
        initialRouteName="CreateAccountPageThree"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="VerifyCodePage" component={VerifyCodePage} />
        <Stack.Screen
          name="CreateAccountPageOne"
          component={CreateAccountPageOne}
        />
        <Stack.Screen
          name="CreateAccountPageTwo"
          component={CreateAccountPageTwo}
        />

        <Stack.Screen name="AreaCodePage" component={AreaCodePage} />

        <Stack.Screen name="AddPhotosOne" component={AddPhotosOne} />

        <Stack.Screen name="AddPhotosTwo" component={AddPhotosTwo} />
        <Stack.Screen name="AddPhotosPrompts" component={AddPhotosPrompts} />
        <Stack.Screen name="ViewProfilePage" component={ViewProfilePage} />

        <Stack.Screen
          name="CreateAccountPageThree"
          component={CreateAccountPageThree}
        />
        <Stack.Screen
          name="CreateAccountPageFour"
          component={CreateAccountPageFour}
        />
        <Stack.Screen
          name="CreateAccountPageFive"
          component={CreateAccountPageFive}
        />
        <Stack.Screen
          name="CreateAccountPageSix"
          component={CreateAccountPageSix}
        />
        <Stack.Screen
          name="CreateAccountPageSeven"
          component={CreateAccountPageSeven}
        />
        <Stack.Screen
          name="CreateAccountPageEight"
          component={CreateAccountPageEight}
        />
        <Stack.Screen
          name="CreateYourOwnPrompt"
          component={CreateYourOwnPrompt}
        />
        <Stack.Screen
          name="MandatoryScreeningOne"
          component={MandatoryScreeningOne}
        />
        <Stack.Screen
          name="FaceScanSuccessPage"
          component={FaceScanSuccessPage}
        />

        <Stack.Screen name="GoExtraStepPage" component={GoExtraStepPage} />

        <Stack.Screen name="WorkPage" component={WorkPage} />
        <Stack.Screen name="SchoolPage" component={SchoolPage} />
        <Stack.Screen name="ReligiousBeliefs" component={ReligiousBeliefs} />
        <Stack.Screen name="PoliticalBeliefs" component={PoliticalBeliefs} />
        <Stack.Screen name="LanguagePage" component={LanguagePage} />
        <Stack.Screen name="JobTitle" component={JobTitle} />
        <Stack.Screen
          name="HighestSchoolDegree"
          component={HighestSchoolDegree}
        />
        <Stack.Screen name="EthnicityPage" component={EthnicityPage} />
        <Stack.Screen name="HomeTown" component={HomeTown} />

        <Stack.Screen name="PageSixPrompts" component={PageSixPrompts} />
        <Stack.Screen
          name="CreateYourOwnPromptMic"
          component={CreateYourOwnPromptMic}
        />
      </Stack.Navigator>
    </AuthenticationStackProvider>
  );
};
