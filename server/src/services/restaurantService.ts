const parseTime = (timeString: string): string => {
  const [hourStr, minuteStr] = timeString.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinute = minute.toString().padStart(2, '0');

  return `${formattedHour}:${formattedMinute}`;
};

export const dateTimeToDateString = (dateTime: Date): string => dateTime.toISOString().substring(0, 10);

export const getOpeningHours = (openingHours: string, date: Date = new Date()) => {
  const [startTime, endTime] = openingHours.split('-');

  const selectedDate = dateTimeToDateString(date);

  const start = new Date(`${selectedDate}T${parseTime(startTime)}`);
  const end = new Date(`${selectedDate}T${parseTime(endTime)}`);

  return [start, end];
};

export const validateOpeningHours = (openingHours: string): boolean => {
  const openingHoursRegex = /^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}$/;

  if (!openingHoursRegex.test(openingHours)) {
    return false;
  }

  const [start, end] = getOpeningHours(openingHours.replaceAll(' ', ''));

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return false;
  }

  return start < end;
};
