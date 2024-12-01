export const getDistance = (location, spark) => {
  const earthRadius = 6371; // Earth's radius in kilometers

  // Convert latitude and longitude from degrees to radians
  const startLatRad = (Math.PI / 180) * location.latitude;
  const startLonRad = (Math.PI / 180) * location.longitude;
  const endLatRad = (Math.PI / 180) * spark.hangoutCoordinates.latitude;
  const endLonRad = (Math.PI / 180) * spark.hangoutCoordinates.longitude;

  // Calculate the differences between the coordinates
  const latDiff = endLatRad - startLatRad;
  const lonDiff = endLonRad - startLonRad;

  // Use the Haversine formula to calculate the distance
  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(startLatRad) * Math.cos(endLatRad) * Math.sin(lonDiff / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance in kilometers
  const distanceVal = earthRadius * c;
  const roundedVal = parseFloat(distanceVal).toFixed(1);
  const distance = roundedVal;

  return distance;
};
