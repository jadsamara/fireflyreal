// Function to calculate age based on birthdate string
export const calculateAge = (birthdate) => {
  // Split birthdate into day, month, and year
  const birthdateParts = birthdate.split("/");
  const birthDay = parseInt(birthdateParts[0]);
  const birthMonth = parseInt(birthdateParts[1]);
  const birthYear = parseInt(birthdateParts[2]);

  // Get current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based
  const currentDay = currentDate.getDate();

  // Calculate age
  let age = currentYear - birthYear;

  // Adjust age based on current month and day
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  return age;
};
