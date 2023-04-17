import React, { useState } from 'react'

const ModalSubmit = ({setShow, showInput,setShowInput,savedDb,bookerId, setSavedDb,day,timeSlotId, user, setUser,changeId}) => {

    const  toggleInput = async () => {
      console.log('userModal',user)
      setShowInput(!showInput)
      if(user!=='')
      {
        setShow(false)
        await handleUpdateBooking();
      }
      {setUser('')}
    };
    const handleUpdateBooking =  async() => {
      setShowInput(false)
      console.log(showInput)
      const data = { id:bookerId,TimeSlotId:timeSlotId,DayId:day,User:user}
      console.log(data)
      try {
        const response = await fetch(`/booking`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
          
        })
        const responseData = await response.json();
        console.log('Success:', responseData )
        setUser('')
        console.log(showInput)
        setSavedDb(!savedDb)
      } catch (error) {
        console.log(error);
      }
    };


    const handleAddBooking = async (e) => {
        e.preventDefault();
        const data = { timeSlotId:timeSlotId,dayId:day,user:user}
        console.log(data)
        try {
          const response = await fetch('/booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( data)
          })
          const responseData = await response.json();
          console.log('Success:', responseData )
          setUser('')
          setShowInput(false)
          setShow(false)
          setSavedDb(!savedDb)
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className='flex'>
      <button id={changeId} type="button" onClick={toggleInput}>Add booking</button>
      {showInput && (
        <form className='flex' onSubmit={handleAddBooking}>
          <input id={changeId} name='inputName' type='text' value={user} onChange={(e) => setUser(e.target.value)} placeholder='Enter booker name'/>
          <button id={changeId} onClick={handleAddBooking} type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}

export default ModalSubmit