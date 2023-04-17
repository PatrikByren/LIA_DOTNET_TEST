using LIA_DOTNET_TEST.Data;
using LIA_DOTNET_TEST.Interfaces;
using LIA_DOTNET_TEST.Models;
using LIA_DOTNET_TEST.Repository;
using Microsoft.AspNetCore.Mvc;

namespace LIA_DOTNET_TEST.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {

        readonly IBookingRepository _bookingRepository;

        public BookingController(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        [HttpGet]
        public ActionResult<ICollection<Booking>> GetAll()
        {
            try
            {
                ICollection<Booking> bookings = _bookingRepository.GetAllBookings();

                return Ok(bookings);
            }
            catch (Exception exception)
            {

                return BadRequest(new { exception.Message });
            }

        }


        [HttpGet("timeslots")]
        public ActionResult<ICollection<TimeSlot>> GetTimeSlots()
        {
            try
            {
                ICollection<TimeSlot> timeSlots = _bookingRepository.GetAllTimeSlots();

                return Ok(timeSlots);
            }
            catch (Exception exception)
            {

                return BadRequest(new { exception.Message });
            }

        }
        [HttpPost]
        public ActionResult<Booking> CreateBooking (BookingRequest req)
        {

            try
            {
                var res = BookingRepository.CreateBooking(req);
                return Created("", res);
            }
            catch (Exception exception)
            {

                return BadRequest(new { exception.Message });
            }
        }
        [HttpPut]
        public ActionResult<Booking> UpdateBooking(UpdateRequest req)
        {

            try
            {
                var res = BookingRepository.UpdateBooking(req);
                return Ok(res);
            }
            catch (Exception exception)
            {

                return BadRequest(new { exception.Message });
            }
        }
        [HttpDelete("{id}")]
        public ActionResult DeleteBooking(int id) 
        {
            var res = BookingRepository.DeleteBooking(id);
            if(res != null!) { 
                return Ok(new { message = "Booking successfully deleted" });
            }
            else return BadRequest();
        }

    }
}