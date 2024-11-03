using Solbeg.Data.Enums;

namespace Solbeg.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required int Age {  get; set; }
        public SexEnum Sex { get; set; }
    }
}
