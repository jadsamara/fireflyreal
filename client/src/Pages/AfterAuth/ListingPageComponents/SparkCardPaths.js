import { View, Text } from "react-native";
import React, { useContext } from "react";
import { SparkCardRequested } from "./AllSparkCards/Participant/SparkCardRequested";
import { SparkCardPreConfirmed } from "./AllSparkCards/Host/SparkCardPreConfirmed";
import { auth } from "../../../Config/firebase";

import { ListingPageContext } from "../../../Context/ListingPageContext";
import { SparkCardActive } from "./AllSparkCards/ActiveCard/SparkCardActive";
import { SparkCardJoined } from "./AllSparkCards/Participant/SparkCardJoined";
import { PastSparkCard } from "./AllSparkCards/PastSpark/PastSparkCard";
import { CancelledSparkCard } from "./AllSparkCards/Cancelled/CancelledSparkCard";
import { NoshowSparkCard } from "./AllSparkCards/Noshow/NoshowSparkCard";

export const SparkCardPaths = ({ spark, navigation }) => {
  const userNumber = auth.currentUser.phoneNumber;
  const { currentFilter } = useContext(ListingPageContext);

  const isRequested = spark.allRequesters.some(
    (requester) => requester.user === userNumber
  );

  const isJoined = spark.currentlyJoinedProfileParticipants.some(
    (user) => user === userNumber
  );

  const didUserCompleteSpark = spark.isCompleted.some(
    (user) => user === userNumber
  );

  const isNoShow = spark?.neverShownUsers?.some((user) => user === userNumber);

  const cancelledUsers = spark?.canceledUsers?.some(
    (user) => user === userNumber
  );

  const isHost = spark.host === userNumber;

  if (currentFilter === 0 && !didUserCompleteSpark && !isNoShow) {
    if (isHost) {
      if (!spark.isSparkActive && !didUserCompleteSpark) {
        return (
          <View>
            <SparkCardPreConfirmed spark={spark} navigation={navigation} />
          </View>
        );
      } else if (!didUserCompleteSpark && spark.isSparkActive) {
        return (
          <View>
            <SparkCardActive spark={spark} navigation={navigation} />
          </View>
        );
      }
    } else if (!isHost) {
      if (isRequested) {
        return (
          <View>
            <SparkCardRequested
              spark={spark}
              navigation={navigation}
              userNumber={userNumber}
            />
          </View>
        );
      } else if (isJoined && !spark.isSparkActive) {
        return (
          <View>
            <SparkCardJoined spark={spark} navigation={navigation} />
          </View>
        );
      } else if (isJoined && spark.isSparkActive) {
        return (
          <View>
            <SparkCardActive spark={spark} navigation={navigation} />
          </View>
        );
      }
    }
  } else if (currentFilter === 2 && !didUserCompleteSpark && !isNoShow) {
    if (isHost) {
      if (!spark.isSparkActive && !didUserCompleteSpark) {
        return (
          <View>
            <SparkCardPreConfirmed spark={spark} navigation={navigation} />
          </View>
        );
      } else if (!didUserCompleteSpark && spark.isSparkActive) {
        return (
          <View>
            <SparkCardActive spark={spark} navigation={navigation} />
          </View>
        );
      }
    }
  } else if (currentFilter === 1 && !didUserCompleteSpark && !isNoShow) {
    if (isHost && spark.currentlyJoinedProfileParticipants.length > 1) {
      if (!didUserCompleteSpark && spark.isSparkActive) {
        return (
          <View>
            <SparkCardActive spark={spark} navigation={navigation} />
          </View>
        );
      } else if (!didUserCompleteSpark && !spark.isSparkActive) {
        return (
          <View>
            <SparkCardPreConfirmed spark={spark} navigation={navigation} />
          </View>
        );
      }
    } else if (isJoined && !isHost) {
      if (!spark.isSparkActive) {
        return (
          <View>
            <SparkCardJoined spark={spark} navigation={navigation} />
          </View>
        );
      } else if (spark.isSparkActive) {
        return (
          <View>
            <SparkCardActive spark={spark} navigation={navigation} />
          </View>
        );
      }
    }
  } else if (currentFilter === 3 && !didUserCompleteSpark && !isNoShow) {
    if (isRequested) {
      return (
        <View>
          <SparkCardRequested spark={spark} navigation={navigation} />
        </View>
      );
    }
  } else if (currentFilter === 5 && (isNoShow || cancelledUsers)) {
    if (isNoShow) {
      return (
        <NoshowSparkCard
          spark={spark}
          navigation={navigation}
          userNumber={userNumber}
        />
      );
    } else if (cancelledUsers) {
      return (
        <View>
          <CancelledSparkCard
            spark={spark}
            navigation={navigation}
            userNumber={userNumber}
          />
        </View>
      );
    }
  } else if (currentFilter === 4 && didUserCompleteSpark && !isNoShow) {
    return (
      <View>
        <PastSparkCard
          spark={spark}
          navigation={navigation}
          userNumber={userNumber}
        />
      </View>
    );
  }
};
