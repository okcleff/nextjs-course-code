import React from "react";
import { useRouter } from "next/router";

import { getEventById } from "../../dummy-data";
import EventSummmary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailPage = () => {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  console.log(event);

  if (!event) {
    return <p>No Event found!</p>;
  }

  const { id, title, description, location, date, image } = event;

  return (
    <React.Fragment>
      <EventSummmary title={title} />

      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />

      <EventContent>
        <p>{description}</p>
      </EventContent>
    </React.Fragment>
  );
};

export default EventDetailPage;
