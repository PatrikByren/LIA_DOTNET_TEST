import React, { useEffect, useState } from "react";
import { groupBy } from "./utils/utils";
import "./custom.css";
import BookingTable from "./components/BookingTable";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function App() {
  const [bookings, setBookings] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [savedDb, setSavedDb] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let [bookings, timeSlots] = await Promise.all([fetch("/booking").then((response) => response.json()), fetch("/booking/timeslots").then((response) => response.json())]);
        setBookings(groupBy(bookings, "day"));
        setTimeSlots(timeSlots);
        console.log("bookings",bookings)
      } catch (error) {
        console.error(error);
      }
    })();
  }, [savedDb]);


  return (
    <div className="booking-table">
      <BookingTable bookings={bookings} setBookings={setBookings} 
      savedDb={savedDb} setSavedDb={setSavedDb}
        timeSlots={timeSlots} setTimeSlots={setTimeSlots} weekDays={weekDays} />
    </div>
  );
}