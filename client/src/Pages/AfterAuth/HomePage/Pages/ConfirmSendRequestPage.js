import { Text, ScrollView } from "react-native";
import React, { useState, useContext } from "react";

import styled from "styled-components";

import { SafeArea } from "../../../../Components/GlobalComponents";
import {
  UserComment,
  UserSelectedDates,
  UserLuminDeposit,
  UserRequestDuration,
  TermsOfUse,
  FooterComponent,
} from "./ConfirmSendRequestComponents";

import { doc, arrayUnion, writeBatch } from "firebase/firestore";
import { auth, database } from "../../../../Config/firebase";

import { sendPushNotification } from "../../../../Functions/SendNotification";

import { AuthContext } from "../../../../Config/AuthContext";

import { updateLuminsAndSparks } from "../../../../Slices/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const ConfirmSendRequestPage = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { spark, availableTimesSelected } = route.params;
  const [userComment, setUserComment] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  });
  const [checkedTerms, setCheckedTerms] = useState(false);
  const userData = useSelector((state) => state.user.userData);

  const onHandleDatabaseQueries = async () => {
    try {
      navigation.navigate("FinishedRequestPage");
      const userNumber = auth.currentUser.phoneNumber;
      const userDocRef = doc(database, "Users", userNumber);
      const selectedDateDocRef = doc(database, "Sparks", spark.documentId);

      const availableTimesSelectedArr = spark.chosenTime
        ? 0
        : availableTimesSelected.map((item) => item.id);

      const requesterObjData = {
        user: userNumber,
        availableTimesFromRequester: availableTimesSelectedArr,
        requesterComment: userComment,
        requestDuration: date,
      };

      const batch = writeBatch(database);

      // Update Users document
      batch.update(userDocRef, {
        userLumins: userData.userLumins - spark.luminsPrice,
        sparksRequestedByUser: arrayUnion(spark.documentId),
      });

      // Update Sparks document
      batch.update(selectedDateDocRef, {
        allRequesters: arrayUnion(requesterObjData),
      });

      await batch.commit();

      const newSpark = {
        ...spark,
        allRequesters: [...(spark.allRequesters || []), requesterObjData],
      };

      const notificationsArray = spark.userInfo.notificationsArray;
      await sendPushNotification({
        notificationsArray,
        title: "Firefly",
        body: "Someone just requested you!",
        screen: "ViewSparkRequestsPage",
        spark: newSpark,
      });

      dispatch(
        updateLuminsAndSparks({
          lumins: spark.luminsPrice,
          sparkId: spark.documentId,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeArea>
      <ScrollContainer>
        <Title>A few things before you request...</Title>

        <UserComment
          userComment={userComment}
          setUserComment={setUserComment}
        />

        <UserSelectedDates availableTimesSelected={availableTimesSelected} />

        <UserLuminDeposit spark={spark} />
        <UserRequestDuration date={date} setDate={setDate} />
        <TermsOfUse
          checkedTerms={checkedTerms}
          setCheckedTerms={setCheckedTerms}
        />
        <FooterComponent sendPushNotification={onHandleDatabaseQueries} />
      </ScrollContainer>
    </SafeArea>
  );
};

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
  flex: 1;
  padding: 20px;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-family: poppins-600;
  margin-top: 10px;
  margin-bottom: 20px;
`;
