using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Core;

namespace MyHelper.Api.Models.User
{
    public class AppUserViewModel
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Avatar { get; set; }

        public EUserRole UserRole { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
