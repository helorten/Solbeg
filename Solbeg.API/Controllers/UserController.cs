using Microsoft.AspNetCore.Mvc;
using Solbeg.Data.AuxiliaryModels;
using Solbeg.Data.Models;
using Solbeg.Services.Interfaces;

namespace Solbeg.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("add_new_user")]
        public async Task<IActionResult> AddNewUser(User user)
        {
            var serviceResponce = await userService.AddNewUser(user);
            switch (serviceResponce.Status)
            {
                case Data.Enums.ServiceResponseStatus.Success:
                    return Ok(serviceResponce.Message);

                case Data.Enums.ServiceResponseStatus.Failure:
                    return BadRequest(serviceResponce.Message);
                default:
                    return BadRequest("Unknown error");
            }
        }

        [HttpGet("get_all_users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var getUsersResult = await userService.GetAllUsers();
            switch (getUsersResult.Status)
            {
                case Data.Enums.ServiceResponseStatus.Success:
                    return Ok(getUsersResult.Data);
                case Data.Enums.ServiceResponseStatus.Failure:
                    return BadRequest(getUsersResult.Message);
                default:
                    return BadRequest("Unknown error");
            }
        }

        [HttpPut("update_user/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserUpdateDto user)
        {
            var userUpdateResult = await userService.UserUpdate(id, user);
            switch (userUpdateResult.Status)
            {
                case Data.Enums.ServiceResponseStatus.Success:
                    return Ok(userUpdateResult.Message);
                case Data.Enums.ServiceResponseStatus.Failure:
                    return BadRequest(userUpdateResult.Message);
                default:
                    return BadRequest();
            }
        }

        [HttpDelete("delete_user/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var userDeleteResult = await userService.UserDelete(id);
            switch (userDeleteResult.Status)
            {
                case Data.Enums.ServiceResponseStatus.Success:
                    return Ok(userDeleteResult.Message);
                case Data.Enums.ServiceResponseStatus.Failure:
                    return BadRequest(userDeleteResult.Message);
                default:
                    return BadRequest();
            }
        }
    }
}
