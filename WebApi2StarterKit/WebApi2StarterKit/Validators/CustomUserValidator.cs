using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using WebApi2StarterKit.Models;

namespace WebApi2StarterKit.Validators
{
    public class CustomUserValidator<TUser> : UserValidator<TUser, string> where TUser : ApplicationUser
    {
        public CustomUserValidator(UserManager<TUser, string> manager) : base(manager)
        {
            this.Manager = manager;
        }

        private UserManager<TUser, string> Manager { get; set; }

        public override async Task<IdentityResult> ValidateAsync(TUser item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            var errors = new List<string>();

            await ValidateUserName(item, errors);

            await ValidateEmail(item, errors);

            if (errors.Count > 0)
            {
                return IdentityResult.Failed(errors.ToArray());
            }
            return IdentityResult.Success;
        }

        private async Task ValidateUserName(TUser user, List<string> errors)
        {
            if (string.IsNullOrWhiteSpace(user.UserName))
            {
                errors.Add("The UserName is required.");
            }
            else if (AllowOnlyAlphanumericUserNames && !Regex.IsMatch(user.UserName, @"^[A-Za-z0-9@_\.]+$"))
            {
                // If any characters are not letters or digits, its an illegal user name
                errors.Add("Invalid UserName.");
            }

            await Task.FromResult<object>(null);
        }

        private async Task ValidateEmail(TUser user, List<string> errors)
        {
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                errors.Add("The Email is required.");
            }

            await Task.FromResult<object>(null);
        }
    }
}