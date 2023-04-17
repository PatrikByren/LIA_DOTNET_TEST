import React, { useState } from 'react'
import BookingRow from './BookingRow';


const BookingTable = ({savedDb, setSavedDb, bookings, setBookings, timeSlots, weekDays}) => {
    const [user, setUser] = useState('')
  const [bookerId, setBookerId] = useState();
  return (
        <div className="booking-table">
          {weekDays.map((dayName, i, day) => {
            day = i + 1;
            const booking = bookings[day] || [];
            return(
                <BookingRow 
                key={day}
                user={user}
                setUser={setUser}
                bookerId={bookerId}
                setBookerId={setBookerId}
                dayName={dayName}
                day={day}
                savedDb={savedDb} 
                setSavedDb={setSavedDb}
                timeSlots={timeSlots} 
                booking={booking}
                setBookings={setBookings}
                bookings={bookings}/>
            )
          })}
        </div>
      );
    }
  


export default BookingTable