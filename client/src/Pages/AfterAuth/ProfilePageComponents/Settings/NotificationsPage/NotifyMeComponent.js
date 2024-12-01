import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

import { NotifyMeCard } from "./NotifyMeCard";
import { SectionComponent } from "../Components";

export const NotifyMeComponent = () => {
  const listOfNotifications = [
    "New Sparks",
    "Spark Updates",
    "Spark Reminders",
    "Deposit & Cancellations",
    "Messages",
    "Updates & Announcements",
  ];

  return (
    <SectionComponent title="Notify Me About">
      {listOfNotifications.map((res) => {
        return <NotifyMeCard res={res} />;
      })}
    </SectionComponent>
  );
};
