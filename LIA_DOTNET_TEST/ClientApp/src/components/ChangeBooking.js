import React, { useEffect } from 'react'

const ChangeBooking = ({ setShow, show, changeBtn, setChangeBtn, setBookerId, bookerId, savedDb, setSavedDb, booker, user, setUser, showInput, setShowInput, changeId }) => {

    useEffect(() => {
        if (show && booker?.user?.name) {
            setUser(booker.user.name)
        }
        else setUser('')
    }, [show])
    const ChangeBookingHandler =  () => {
        setBookerId(bookerId)
        setShow(!show)
        if(changeBtn==='Change booking'){setChangeBtn('Undo changes')}
        else{setChangeBtn('Change booking')}
        if (!showInput) {
            setBookerId(bookerId)
        }
    }
    const deleteBookingHandler = async () => {
        try {
            console.log(bookerId)
            const response = await fetch(`/booking/${bookerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookerId)
            });
            var responseData = await response.json();
            if (response.ok)
                console.log('Success:', responseData);
            console.log(response.ok)
            setUser('')
            setSavedDb(!savedDb);
        } catch (error) {
            console.log(error, responseData);
        }
    };
    return (
        
            <div id={changeId} className='changebookingcontainer'>
                <div className='updatebooking'>
                    <div className='flex'>
                    <button id={changeId} onClick={ChangeBookingHandler} className='btn-warning'>{changeBtn}</button>
                     <div className='username' id={changeId}>{booker?.user?.name}</div> {show ? <div className='username' id={changeId}>Choose an open spot to move booking</div> : <div></div>}
                    </div> 
                    <div className='flex'>
                        {show && (<button id={changeId} onClick={deleteBookingHandler} className='btn-danger'>Cancel booking</button>)}
                    </div>
                </div>
            </div>
    )
}

export default ChangeBooking