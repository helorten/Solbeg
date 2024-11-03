using Solbeg.Data.AuxiliaryModels;
using Solbeg.Data.Models;

namespace Solbeg.Services.Interfaces
{
    public interface IUserService
    {
        public Task<ServiceResponse<int>> AddNewUser(User user);
        public Task<ServiceResponse<UserCollectionViewModel>> GetAllUsers();
        public Task<ServiceResponse<int>> UserUpdate(int id, UserUpdateDto userUpdateDto);
        public Task<ServiceResponse<int>> UserDelete(int id);
    }
}
