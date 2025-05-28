import React from 'react';
import { ViroARScene, ViroText, ViroTrackingState, ViroTrackingReason } from '@viro-community/react-viro';

// Define tracking states manually (from ViroConstants docs)
const TrackingState = {
  Tracking: 3,
  None: 1,
};

const ARScene = () => {
  const onTrackingUpdated = (state: ViroTrackingState, reason: ViroTrackingReason) => {
    if (state === TrackingState.Tracking) {
      // tracking is good
    } else if (state === TrackingState.None) {
      // lost tracking
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onTrackingUpdated}>
      <ViroText
        text="🥕 Carrot"
        position={[0, 0, -1]}
        style={{ fontSize: 30, color: '#fff', textAlign: 'center' }}
      />
    </ViroARScene>
  );
};


export default ARScene;