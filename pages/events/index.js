import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helper/api-util";
import Head from "next/head";
import { useRouter } from 'next/router'

export default function EventPage(props) {
  const router = useRouter();
  const events = props.events;

  function findEventsHandler(year, month) {
    console.log(year, month);
    const fullPath = `/events/${year}/${month}`;
    console.log(fullPath);
    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="description" content="Events" />
      </Head>
      <main>
        <h1>All Events</h1>
        <div>
          <EventSearch onSearch={findEventsHandler} />
          <EventList items={events} />
        </div>
      </main></>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}