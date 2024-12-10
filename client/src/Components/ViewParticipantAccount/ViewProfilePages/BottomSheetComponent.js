import React from "react";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomDrawerActive } from "./BottomDrawerActive";

export const BottomSheetComponent = ({
  bottomSheetRef,
  handleSheetChangesWithAnimation,
  isModalActive,
  participant,
  bottomSheetAnimatedPosition,
}) => {
  return (
    <BottomSheet
      snapPoints={[80, 350, 600]}
      ref={bottomSheetRef}
      onChange={handleSheetChangesWithAnimation}
      animatedPosition={bottomSheetAnimatedPosition}
    >
      <BottomSheetView>
        <BottomDrawerActive participant={participant} />
      </BottomSheetView>
    </BottomSheet>
  );
};
