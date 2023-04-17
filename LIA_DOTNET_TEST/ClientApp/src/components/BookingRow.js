import React, { useState } from 'react'
import BookingItem from './BookingItem';


const BookingRow = ({user, setUser, bookerId, setBookerId,savedDb, setSavedDb, dayName, day, timeSlots, booking, bookings}) => {
  // const [user, setUser] = useState('')
  // const [bookerId, setBookerId] = useState();
  

  return (
        <div key={day} className="booking-row">
          <div className="booking-title">{dayName}</div>
          <div className="timeslot-list">
            {timeSlots?.map(({ id, startTime, endTime,}) => {
                
              const booker = booking?.find(({ timeSlot }) => timeSlot.startTime === startTime && timeSlot.endTime === endTime);
              return(              
                  <BookingItem 
                  key={id}

                  user={user} setUser={setUser}
                  timeSlotId={id}
                  dayName={dayName}
                  savedDb={savedDb} 
                  setSavedDb={setSavedDb}
                  startTime={startTime}
                  endTime={endTime}
                  day={day}
                  booker={booker}
                  bookerId={bookerId}
                  setBookerId={setBookerId}
                  bookings={bookings}/>
                )
            })}
          </div>
        </div>
  )
}

export default BookingRow