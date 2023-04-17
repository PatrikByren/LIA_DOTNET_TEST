using LIA_DOTNET_TEST.Database;
using LIA_DOTNET_TEST.Interfaces;
using LIA_DOTNET_TEST.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics;

namespace LIA_DOTNET_TEST.Repository
{
    public class BookingRepository : IBookingRepository
    {
        public void Seed()
        {
            using Context context = new();

            ICollection<TimeSlot> timeSlots = ProduceTimeSlots();

            TimeSlot timeSlot = timeSlots.FirstOrDefault();

            ICollection<Booking> bookings = ProduceBookings(timeSlot);


            context.TimeSlots.AddRange(timeSlots);
            context.Bookings.AddRange(bookings);

            context.SaveChanges();
        }


        public ICollection<Booking> GetAllBookings()
        {
            using Context context = new();
            return context.Bookings.Include(ts => ts.User).Include(ts => ts.TimeSlot).ToList();
        }

        public ICollection<TimeSlot> GetAllTimeSlots()
        {
            using Context context = new();
            return context.TimeSlots.ToList();
        }


        private static ICollection<TimeSlot> ProduceTimeSlots()
        {
            return new List<TimeSlot>()
                {
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(9, 0,0),
                         EndTime = new TimeSpan(12, 0,0),
                    },
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(12, 0,0),
                         EndTime = new TimeSpan(14, 0,0),
                    },
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(14, 0,0),
                         EndTime = new TimeSpan(16, 0,0),
                    },
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(16, 0,0),
                         EndTime = new TimeSpan(20, 0,0),
                    },
                   
                };
        }
        public static ActionResult UpdateBooking(UpdateRequest req)
        {
            using Context context = new();
            var entity = context.Bookings.Find(req.Id);
            if (entity != null) {
                entity.TimeSlot = context.TimeSlots.FirstOrDefault(x => x.Id == req.TimeSlotId);
                entity.Day = req.DayId;
                entity.User = context.User.FirstOrDefault(x => x.Name == req.User);
            try
            {
                context.Entry(entity!).State = EntityState.Modified;
                context.SaveChanges();
                return new OkResult();
            }
            catch { }
            }
            return null!;
        }
        public static ActionResult DeleteBooking(int id)
        {
            try
            {
                using Context context = new();
                var entity = context.Bookings.Include(x=>x.TimeSlot).Include(x=>x.User).FirstOrDefault(x => x.Id==id);
                context.Bookings.Remove(entity!);
                context.SaveChanges();
                return new OkResult();
            }
            catch (Exception ex) { }
            return null!;
        }
        public static Booking CreateBooking(BookingRequest req)
        {
            using Context context = new();
            var entity = new Booking()
            {
                Day = req.DayId,
                TimeSlot = context.TimeSlots.FirstOrDefault(x => x.Id == req.TimeSlotId),
                User = context.User.FirstOrDefault(x => x.Name == req.User)
            };
            if (entity.User == null)
                entity.User = new User()
                {
                    Name = req.User
                };
            try
            {
            context.Bookings.Add(entity);
            context.SaveChanges();
            return entity;
            }
            catch { }
            
            return null!;
        }
        private static ICollection<Booking> ProduceBookings(TimeSlot timeSlot)
        {
            return new List<Booking>()
            {
                new Booking()
                {
                    Day= 1,
                    User = new User()
                    {
                        Name = "Sean Connery"
                    },
                    TimeSlot = timeSlot
                }
            };
        }
    }
}
