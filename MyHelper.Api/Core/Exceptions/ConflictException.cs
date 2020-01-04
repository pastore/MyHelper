using System;

namespace MyHelper.Api.Core.Exceptions
{
    public class ConflictException: Exception
    {
        public ConflictException() { }

        public ConflictException(string message) : base(message) { }
    }
}
