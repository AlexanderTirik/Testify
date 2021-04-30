import dayjs from 'dayjs';

export const isTestAvailable = ({ start, end }: { start?: Date; end?: Date }) => start
  && end && dayjs().isAfter(start) && dayjs().isBefore(end);
