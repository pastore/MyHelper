using Microsoft.AspNetCore.Http;
using MyHelper.Api.Core.Exceptions;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Threading.Tasks;

namespace MyHelper.Api.Core.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;
        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError;

            if (ex is NotFoundException) code = HttpStatusCode.NotFound;
            else if (ex is UnauthorizedException) code = HttpStatusCode.Unauthorized;
            else if (ex is BadRequestException) code = HttpStatusCode.BadRequest;
            else if (ex is ConflictException) code = HttpStatusCode.Conflict;

            var result = JsonConvert.SerializeObject(new { message = ex.Message });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}
