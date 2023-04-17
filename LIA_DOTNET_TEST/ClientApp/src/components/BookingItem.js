import React, { useState, useEffect } from 'react'
import ModalSubmit from './ModalSubmit';
import ChangeBooking from './ChangeBooking';

const BookingItem = ({setBookerId, bookerId, savedDb, setSavedDb, timeSlotId,dayName,day,startTime,endTime,booker,setBookings,bookings,user,setUser}) => {
  const [showInput, setShowInput] = useState(false)
  const changeId = 'changeBooking';
  const [show, setShow] = useState(false);

  const [changeBtn, setChangeBtn] = useState('Change booking')

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (event.target.id !== changeId) {
            setShowInput(false)
            setShow(false)
            setChangeBtn('Change booking')
            
        }
    };
    document.addEventListener('mouseup', handleClickOutside);
}, []);
    return (
        <div key={`${dayName}_${startTime}_${endTime}`} className="booking-item">
          <span className="time-slot">
            {startTime} - {endTime}
          </span>
            {booker ? 
            <div className='changebooking'><ChangeBooking booker={booker}
            show={show}
            setShow={setShow}
            user={user} setUser={setUser}
            savedDb={savedDb} 
            setSavedDb={setSavedDb}
            bookerId={booker.id}
            setBookerId={setBookerId}
            changeBtn={changeBtn} setChangeBtn={setChangeBtn}
            showInput={showInput} setShowInput={setShowInput}changeId={changeId}
            /></div>  
            :
            <div className='submitbooking'><ModalSubmit 
             dayName={dayName}
             bookerId={bookerId}
             user={user} setUser={setUser}
             timeSlotId={timeSlotId}
             day={day}
             changeId={changeId}
             savedDb={savedDb} 
             setSavedDb={setSavedDb}
             startTime={startTime}
             endTime={endTime}
             bookings={bookings}
             setBookings={setBookings}
             setShowInput={setShowInput}
             showInput={showInput}
             setShow={setShow}
             booker={booker}/></div>}

            

        </div>
  )
}

export default BookingItem