import { first, groupBy } from "lodash";
import moment from "moment";

type ISOTimestamp = string

export type TemplateEvent = {
  startsAt: ISOTimestamp
  endsAt: ISOTimestamp
}

export const groupEventsByDayOffsetToFirstEvent = (
  events: Array<TemplateEvent>
): Array<Array<TemplateEvent>> => {
  const offsetFrom = moment(first(events)?.startsAt);
  const offsetDaysToEvents = groupBy(events, (event) =>
    moment(event.startsAt).diff(offsetFrom, "days")
  );
  return Object.values(offsetDaysToEvents);
};
