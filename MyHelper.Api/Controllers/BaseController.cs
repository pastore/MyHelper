using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using MyHelper.Api.Models.Response;

namespace MyHelper.Api.Controllers
{
    public abstract class BaseController: Controller
    {
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
                Errors = aoResult.Errors?.Select(x => Tuple.Create(x.Key, x.Value)).ToList()
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
                Errors = aoResult.Errors?.Select(x => Tuple.Create(x.Key, x.Value)).ToList() 
            };
        }
    }
}
