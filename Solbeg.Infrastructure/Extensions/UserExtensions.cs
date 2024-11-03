using Solbeg.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solbeg.Infrastructure.Extensions
{
    public static class UserExtensions
    {
        private const int MaxAge = 100;
        private const int MinAge = 18;

        public static bool IsValid(this User user, out List<string> errors)
        {
            errors = new List<string>();

            if (string.IsNullOrWhiteSpace(user.FirstName))
                errors.Add("Поле 'Имя' обязательно для заполнения.");

            if (string.IsNullOrWhiteSpace(user.LastName))
                errors.Add("Поле 'Фамилия' обязательно для заполнения.");

            if (user.Sex == null)
                errors.Add("Поле 'Пол' обязательно для заполнения.");

            if (user.Age < 18 || user.Age > 100)
                errors.Add($"Возраст должен быть в диапазоне от {MinAge} до {MaxAge} лет.");

            return errors.Count == 0;
        }
    }
}
