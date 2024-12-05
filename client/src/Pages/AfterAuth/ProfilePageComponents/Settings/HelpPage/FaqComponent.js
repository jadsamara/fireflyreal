import React from "react";

import { SectionComponent } from "../Components";
import { FaqCard } from "./FaqCard";

export const FaqComponent = () => {
  const listOfFaq = [
    "What are Lumins?",
    "Lumin deposit system",
    "Punctuality and Lumins",
    "Earning and losing Lumins",
    "Cancelling Sparks",
    "Cancellation Penalties",
    "When Host Cancels",
    "Grace Periods",
    "What’s with the chat?",
    "Keeping our community safe",
  ];

  return (
    <SectionComponent title="FAQ">
      {listOfFaq.map((res, index) => {
        return <FaqCard res={res} key={index} />;
      })}
    </SectionComponent>
  );
};
