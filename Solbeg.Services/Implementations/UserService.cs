using Solbeg.Data.AuxiliaryModels;
using Solbeg.Data.Models;
using Solbeg.Infrastructure.Extensions;
using Solbeg.Infrastructure.Repositories.Interfaces;
using Solbeg.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solbeg.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<ServiceResponse<int>> AddNewUser(User user)
        {
            try
            {
                if (user.IsValid(out var errors))
                {
                    var addResult = await userRepository.AddNewUser(user);
                    if (addResult > 0)
                    {
                        return new ServiceResponse<int>
                        {
                            Data = addResult,
                            Message = "Успешно",
                            Status = Data.Enums.ServiceResponseStatus.Success
                        };
                    }
                    else
                    {
                        return new ServiceResponse<int>
                        {
                            Data = addResult,
                            Message = "Ошибка добавления в базу",
                            Status = Data.Enums.ServiceResponseStatus.Failure
                        };
                    }
                }
                else 
                {
                    return new ServiceResponse<int>
                    {
                        Message = string.Join(Environment.NewLine, errors),
                        Status = Data.Enums.ServiceResponseStatus.Failure
                    };
                }
            }
            catch (Exception e)
            {
                return new ServiceResponse<int>
                {
                    Message = e.Message,
                    Status = Data.Enums.ServiceResponseStatus.Failure
                };
            }            
        }

        public async Task<ServiceResponse<UserCollectionViewModel>> GetAllUsers()
        {
            try
            {
                var users = await userRepository.GetAllUsers();

                var userCollectionViewModel = new UserCollectionViewModel(users, users.Count());

                return new ServiceResponse<UserCollectionViewModel>()
                {
                    Data = userCollectionViewModel,
                    Status = Data.Enums.ServiceResponseStatus.Success
                };
            }
            catch (Exception e) 
            {
                return new ServiceResponse<UserCollectionViewModel>()
                {
                    Message = e.Message,
                    Status = Data.Enums.ServiceResponseStatus.Success
                };
            }
        }

        public async Task<ServiceResponse<int>> UserDelete(int id)
        {
            try
            {
                var userDeleteResult = await userRepository.DeleteUser(id);
                if (userDeleteResult > 0)
                {
                    return new ServiceResponse<int>
                    {
                        Data = userDeleteResult,
                        Message = "Success",
                        Status = Data.Enums.ServiceResponseStatus.Success
                    };
                }
                else
                {
                    return new ServiceResponse<int>
                    {
                        Data = userDeleteResult,
                        Message = "Faild",
                        Status = Data.Enums.ServiceResponseStatus.Success
                    };
                }
            }
            catch (Exception e)
            {
                return new ServiceResponse<int>
                {
                    Message = e.Message,
                    Status = Data.Enums.ServiceResponseStatus.Success
                };
            }
        }

        public async Task<ServiceResponse<int>> UserUpdate(int id, UserUpdateDto dto)
        {
            try
            {
                var user = await userRepository.GetUserById(id);
                if (user == null)
                {
                    return new ServiceResponse<int>()
                    {
                        Message = "User not found",
                        Status = Data.Enums.ServiceResponseStatus.Failure
                    };
                }

                if (!string.IsNullOrWhiteSpace(dto.FirstName))
                    user.FirstName = dto.FirstName;

                if (!string.IsNullOrWhiteSpace(dto.LastName))
                    user.LastName = dto.LastName;

                if (dto.Age.HasValue)
                    user.Age = dto.Age.Value;

                if (dto.Sex.HasValue)
                    user.Sex = dto.Sex.Value;

                if (user.IsValid(out var errors))
                {
                    var updateResult = await userRepository.UpdateUser(user);
                    if (updateResult > 0)
                    {
                        return new ServiceResponse<int>()
                        {
                            Data = updateResult,
                            Message = "Update success",
                            Status = Data.Enums.ServiceResponseStatus.Success
                        };
                    }
                    else
                    {
                        return new ServiceResponse<int>()
                        {
                            Data = updateResult,
                            Message = "Update success",
                            Status = Data.Enums.ServiceResponseStatus.Failure
                        };
                    }


                }
            }
            catch (Exception e) 
            {
                return new ServiceResponse<int>()
                {
                    Message = e.Message,
                    Status = Data.Enums.ServiceResponseStatus.Failure
                };
            }

            return new ServiceResponse<int>()
            {
                Message = "Unknown error",
                Status = Data.Enums.ServiceResponseStatus.Failure
            };

        }
    }
}
