import { State, TapGestureHandler } from "react-native-gesture-handler";
import React, { useRef } from "react";

export const DoubleTap = ({ children, onPressOnce, onPressTwice }) => {
  const doubleTapRef = useRef(null);

  const onSingleTapEvent = (event) => {
    if (event.nativeEvent.state === State.END) {
      onPressOnce();
    }
  };

  const onDoubleTapEvent = (event) => {
    if (event.nativeEvent.state === State.END) {
      onPressTwice();
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={onSingleTapEvent}
      waitFor={doubleTapRef}
    >
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTapEvent}
        numberOfTaps={2}
      >
        {children}
      </TapGestureHandler>
    </TapGestureHandler>
  );
};
