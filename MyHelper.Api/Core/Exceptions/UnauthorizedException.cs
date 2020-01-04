using System;

namespace MyHelper.Api.Core.Exceptions
{
    public class UnauthorizedException: Exception
    {
        public UnauthorizedException() { }

        public UnauthorizedException(string message) : base(message) { }
    }
}
