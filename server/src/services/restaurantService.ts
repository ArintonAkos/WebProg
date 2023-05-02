export const validateOpeningHours = (openingHours: string): boolean => {
  const openingHoursRegex = /^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}$/;

  if (!openingHoursRegex.test(openingHours)) {
    return false;
  }

  const [start, end] = getOpeningHours(openingHours);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return false;
  }

  return start < end;
};

export const getOpeningHours = (openingHours: string) => {
  const [startTime, endTime] = openingHours.split(' - ');

  const currentDate = new Date().toISOString().substring(0, 10);
  const start = new Date(`${currentDate}T${startTime}`);
  const end = new Date(`${currentDate}T${endTime}`);

  return [start, end];
};
