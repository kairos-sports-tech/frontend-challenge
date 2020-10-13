import moment from 'moment'
import { groupEventsByDayOffsetToFirstEvent } from "./groupEvents";

describe("groupEventsByDayOffsetToFirstEvent", () => {
  const makeEvent = (startsAt) => {
    return {
      title: `Title`,
      startsAt: startsAt.toISOString(),
      endsAt: moment(startsAt).add(1, "hour").toISOString()
    };
  };

  test("Returns an empty first day when given an empty array", () => {
    expect(groupEventsByDayOffsetToFirstEvent([])).toEqual([[]]);
  });

  test("returns a day with a single event when given a single event", () => {
    const events = [makeEvent(moment().subtract(10, "days").set("hours", 13))];
    const [dayOne] = groupEventsByDayOffsetToFirstEvent(events);
    expect(dayOne.length).toEqual(1);
  });

  test("Fills each array slot with all events that fall on the same day", () => {
    const first = moment().subtract(10, "days").set("hours", 13);
    const events = [
      makeEvent(first),
      makeEvent(moment(first).add(1, "hour")),
      makeEvent(moment(first).add(1, "day")),
      makeEvent(moment(first).add(2, "days"))
    ];
    const [dayOne, dayTwo, dayThree] = groupEventsByDayOffsetToFirstEvent(
      events
    );
    expect(dayOne.length).toEqual(2);
    expect(dayTwo.length).toEqual(1);
    expect(dayThree.length).toEqual(1);
  });

  test("Creates empty days when there is a gap between events", () => {
    const first = moment().subtract(10, "days").set("hours", 13);
    const events = [
      makeEvent(first),
      makeEvent(moment(first).add(1, "hour")),
      makeEvent(moment(first).add(2, "day")),
      makeEvent(moment(first).add(2, "days").add("1 hour"))
    ];
    const [dayOne, dayTwo, dayThree] = groupEventsByDayOffsetToFirstEvent(
      events
    );
    expect(dayOne.length).toEqual(2);
    expect(dayTwo.length).toEqual(0);
    expect(dayThree.length).toEqual(2);
  });
});
