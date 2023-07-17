
import { getEventById, getAllEvents, getFeaturedEvents } from '@/helper/api-util';
// import { useRouter } from 'next/router'
import { Fragment } from 'react';
import EventLogistics from 'components/event-detail/event-logistics';
import EventContent from 'components/event-detail/event-content';
import EventSummary from '@/components/event-detail/event-summary';
import Head from 'next/head';

function EventDetailPage(props) {
  // const router = useRouter();

  // const  eventId = router.query.eventId;

  const loadedEvent = props.event;

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     const response = await fetch(`http://localhost:5000/events/${eventId}`);
  //     const data = await response.json();
  //     setLoadedEvent(data);
  //   }
  //   fetchEvent();
  // }, [eventId]);

  if (!loadedEvent) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <Head>
        <title>{loadedEvent.title} - Events</title>
        <meta name="description" content="A list of filtered events" />
      </Head>
      <EventSummary title={loadedEvent.title} />
      <EventLogistics date={loadedEvent.date} address={loadedEvent.location} image={loadedEvent.image} imageAlt={loadedEvent.title}></EventLogistics>
      <EventContent>
        <p>{loadedEvent.description}</p>
      </EventContent>
    </Fragment>
  )
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  if(!event){
    return {
      notFound: true
    }
  }

  return {
    props: {
      event
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: 'blocking'
  }
}