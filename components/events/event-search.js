
import Button from "../ui/Button";
import classes from "./event-search.module.css";
import { useRef } from 'react';

export default function EventSearch(props) {
    const yearRef = useRef();
    const monthRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        props.onSearch(yearRef.current.value, monthRef.current.value);

    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="event-year">Event Year</label>
                    <select id="event-year" ref={yearRef}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="event-year">Event Month</label>
                    <select id="event-year" ref={monthRef}>
                        <option value="1">january</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            </div>
            <Button>Find Events</Button >
        </form>
    )
}
