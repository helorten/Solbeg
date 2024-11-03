using Solbeg.Data.AuxiliaryModels;
using Solbeg.Data.Models;

namespace Solbeg.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<int> AddNewUser(User user);
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<User?> GetUserById(int id);
        public Task<int> UpdateUser(User newUser);
        public Task<int> DeleteUser(int id);
    }
}
