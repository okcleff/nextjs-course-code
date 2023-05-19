import React from 'react';
import { useRouter } from 'next/router';

import { getEventById } from '../../dummy-data';
import EventSummmary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

const EventDetailPage = () => {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event found!</p>
      </ErrorAlert>
    );
  }

  const { title, description, location, date, image } = event;

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
