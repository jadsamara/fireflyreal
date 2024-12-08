import React, { useEffect } from "react";
import { Canvas, Path, Paint, Skia } from "@shopify/react-native-skia";
import { useSharedValue, useDerivedValue } from "react-native-reanimated";

export const WaveComponent = ({ amplitudeData }) => {
  const canvasWidth = 300; // Canvas width
  const canvasHeight = 100; // Canvas height
  const waveFrequency = 0.02; // Wave frequency for smoother oscillation
  const resolution = 2; // Point resolution for wave smoothness

  const waveOffset = useSharedValue(0); // Horizontal phase shift
  const waveAmplitude = useSharedValue(20); // Real-time wave amplitude

  // Simulate wave animation
  useEffect(() => {
    const interval = setInterval(() => {
      waveOffset.value += 2; // Increment offset for wave movement
      waveAmplitude.value = amplitudeData || 20; // Update amplitude based on real-time data
    }, 16); // ~60 FPS
    return () => clearInterval(interval);
  }, [amplitudeData, waveOffset, waveAmplitude]);

  // Create the wave path dynamically
  const wavePath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    path.moveTo(0, canvasHeight / 2);

    for (let x = 0; x <= canvasWidth; x += resolution) {
      const y =
        canvasHeight / 2 +
        waveAmplitude.value * Math.sin(waveFrequency * (x + waveOffset.value));
      path.lineTo(x, y);
    }

    path.lineTo(canvasWidth, canvasHeight); // Bottom-right corner
    path.lineTo(0, canvasHeight); // Bottom-left corner
    path.close();
    return path;
  }, [waveOffset, waveAmplitude]);

  return (
    <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
      <Path path={wavePath} style="fill" color="#79d17c">
        <Paint color="#79d17c" />
      </Path>
    </Canvas>
  );
};
