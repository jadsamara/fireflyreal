import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../../../Components/GlobalComponents";
import { SettingsHeader, SettingsSearchBar } from "../Components";
import { EditNameComponent } from "./EditNameComponent";
import { EditHomeTown } from "./EditHomeTown";
import { VerifyAccount } from "./VerifyAccount";
import { DeactivateAccount } from "./DeactivateAccount";
import { DeactivateModal } from "./DeactivateModal";

import { useSelector } from "react-redux";

export const AccountPage = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const isVerified = userData.isVerified;

  const isActiveBool = userData.accountStatus === "active" ? false : true;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [isEnabled, setIsEnabled] = useState(isActiveBool);

  return (
    <>
      {toggleModal ? (
        <DeactivateModal
          setToggleModal={setToggleModal}
          setIsEnabled={setIsEnabled}
          navigation={navigation}
        />
      ) : null}
      <SafeArea pointerEvents={toggleModal ? "none" : "auto"}>
        <ScrollContainer
          opacity={toggleModal ? "0.1" : "1"}
          scrollEnabled={!toggleModal}
        >
          <SettingsHeader
            navigation={navigation}
            title="Account"
            icon="account-circle"
          />
          <SearchBarContainer>
            <SettingsSearchBar
              setSearchKeyword={setSearchKeyword}
              searchKeyword={searchKeyword}
            />
          </SearchBarContainer>
          <EditNameComponent />
          <EditHomeTown />
          {isVerified !== 2 ? <VerifyAccount /> : null}
          <DeactivateAccount
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            setIsEnabled={setIsEnabled}
            isEnabled={isEnabled}
          />
        </ScrollContainer>
      </SafeArea>
    </>
  );
};

const ScrollContainer = styled(ScrollView)`
  width: 100%;
  height: 100%;
  opacity: ${({ opacity }) => opacity};
`;

const SearchBarContainer = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 15px;
`;
