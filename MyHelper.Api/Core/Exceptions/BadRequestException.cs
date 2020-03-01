using System;

namespace MyHelper.Api.Core.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException() { }

        public BadRequestException(string message): base(message) { }
    }
}
