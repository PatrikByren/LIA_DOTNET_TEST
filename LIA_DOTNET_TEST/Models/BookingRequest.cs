using System.ComponentModel.DataAnnotations;

namespace LIA_DOTNET_TEST.Models;

public class BookingRequest
{
    public int TimeSlotId { get; set; }

    public int DayId { get; set; }
   
    public string User { get; set; } = null!;
}
