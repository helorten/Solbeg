using Solbeg.Data.Enums;

namespace Solbeg.Data.AuxiliaryModels
{
    public class UserUpdateDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? Age { get; set; }
        public SexEnum? Sex { get; set; }
    }
}
