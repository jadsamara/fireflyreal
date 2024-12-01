import { View } from "react-native";
import React, { useState } from "react";

import styled from "styled-components";

import { Header } from "./Header";
import { Body } from "./Body";
import { BodyWithModal } from "./BodyWithModal";

export const ViewProfilePage = ({ navigation }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <Container>
      {!isModalActive ? (
        <>
          <Header navigation={navigation} />
          <Body
            navigation={navigation}
            setIsModalActive={setIsModalActive}
            isModalActive={isModalActive}
          />
        </>
      ) : (
        <BodyWithModal
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        />
      )}
    </Container>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;
