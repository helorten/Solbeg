using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solbeg.Data.Models
{
    public class Users
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required int Age {  get; set; }
        public SexEnum Sex { get; set; }
    }
}
