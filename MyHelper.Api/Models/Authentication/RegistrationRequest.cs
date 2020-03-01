using System.ComponentModel.DataAnnotations;

namespace MyHelper.Api.Models.Authentication
{
    public class RegistrationRequest
    {
        [Required(ErrorMessage = "Name cannot be empty")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email cannot be empty")]
        [EmailAddress(ErrorMessage = "Incorrect email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password cannot be empty")]
        public string Password { get; set; }
    }
}
