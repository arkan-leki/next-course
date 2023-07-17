import classes from './event-item.module.css';
import Button from "../ui/Button";

import DateIcon from "../icons/date-icon";
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import Image from 'next/image';

function EventItem(props) {
    const { event } = props;

    const humanReadableDate = new Date(event.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        year: 'numeric',
    });

    const formattedAddress = event.location.replace(', ', '\n');

    const exploreLink = `/events/${event.id}`;

    return (
        <li className={classes.item}>
            <Image src={'/' + event.image} alt={event.title} width={250} height={160} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <div className={classes.title}>
                        <h2>{event.title}</h2>
                    </div>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}><ArrowRightIcon /></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem