using Solbeg.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solbeg.Services
{
    public class ServiceResponse<T>
    {
        public T? Data { get; set; }
        public string? Message {  get; set; } 
        public ServiceResponseStatus Status { get; set; }
    }
}
