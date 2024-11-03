using Solbeg.Data.Models;

namespace Solbeg.Data.AuxiliaryModels
{
    public class UserCollectionViewModel(IEnumerable<User> users, int count)
    {
        public int UserCount { get; set; } = count;
        public IEnumerable<User>? Users { get; set; } = users;
    }
}
