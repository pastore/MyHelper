using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Token;

namespace MyHelper.Api.Controllers
{
    public abstract class BaseController: Controller
    {
        /// <summary>
        /// Gets the account identifier.
        /// </summary>
        /// <value>The account identifier.</value>
        protected long AccountId
        {
            get
            {
                //find claim for account Id
                Claim accountClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

                //parse
                if (accountClaim == null || !long.TryParse(accountClaim.Value, out long accountId))
                    return 0;

                return accountId;
            }
        }

        /// <summary>
        /// AOResult to server response.
        /// </summary>
        /// <returns>The result to server response.</returns>
        /// <param name="aoResult">Ao result.</param>
        /// <typeparam name="T">The 1st type parameter.</typeparam>
        protected ServerResponse<T> AOResultToServerResponse<T>(AOResult<T> aoResult)
        {
            return new ServerResponse<T>()
            {
                IsSuccess = aoResult.IsSuccess,
                Message = aoResult.Message,
                ErrorId = aoResult.ErrorId,
                Result = aoResult.Result,
                Errors = aoResult.Errors?.ToDictionary(x => x.Key, x => x.Value)
            };
        }

        /// <summary>
        /// AOResult to server response.
        /// </summary>
        /// <returns>Ther esult to server response.</returns>
        /// <param name="aoResult">Ao result.</param>
        protected ServerResponse AOResultToServerResponse(AOResult aoResult)
        {
            return new ServerResponse()
            {
                IsSuccess = aoResult.IsSuccess,
                Message = aoResult.Message,
                ErrorId = aoResult.ErrorId,
                Errors = aoResult.Errors?.ToDictionary(x => x.Key, x => x.Value)
            };
        }
    }
}
