import EventItem from "./EventItem";

import classes from './event-list.module.css';

function EventList(props) {
 const {items} = props;
  return (
    <div className={classes.list}>
        <ul>
            {items.map(event => <EventItem key={event.id} event={event}/>)}
        </ul>
    </div>
  )
}

export default EventList