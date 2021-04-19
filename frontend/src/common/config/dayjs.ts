import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import Weekday from 'dayjs/plugin/weekday';
import WeekOfYear from 'dayjs/plugin/weekOfYear';
import Timezone from 'dayjs/plugin/timezone';

dayjs.extend(UTC);
dayjs.extend(LocalizedFormat);
dayjs.extend(AdvancedFormat);
dayjs.extend(Weekday);
dayjs.extend(WeekOfYear);
dayjs.extend(Timezone);

export default dayjs;
