using System.Collections.Generic;

namespace MyHelper.Api.Models.Response
{
    public static class AOBuilder
    {
        public static AOResult SetSuccess()
        {
            var aoResult = new AOResult();
            aoResult.SetSuccess();
            return aoResult;
        }

        public static AOResult SetError(string message)
        {
            var aoResult = new AOResult();
            aoResult.SetError(null, message);
            return aoResult;
        }

        public static AOResult SetError(string message, IEnumerable<(string key, string value)> errors)
        {
            var aoResult = new AOResult();
            aoResult.SetError(null, message, errors);
            return aoResult;
        }

        public static AOResult SetError(string errorId, string message, IEnumerable<(string key, string value)> errors)
        {
            var aoResult = new AOResult();
            aoResult.SetError(errorId, message, errors);
            return aoResult;
        }

        public static AOResult<T> SetSuccess<T>()
        {
            var aoResult = new AOResult<T>();
            aoResult.SetSuccess();
            return aoResult;
        }

        public static AOResult<T> SetSuccess<T>(T result)
        {
            var aoResult = new AOResult<T>();
            aoResult.SetSuccess(result);
            return aoResult;
        }

        public static AOResult<T> SetError<T>(string errorId, string message)
        {
            var aoResult = new AOResult<T>();
            aoResult.SetError(errorId, message);
            return aoResult;
        }

        public static AOResult<T> SetError<T>(string errorId, string message, IEnumerable<(string key, string value)> errors)
        {
            var aoResult = new AOResult<T>();
            aoResult.SetError(errorId, message, errors);
            return aoResult;
        }

        public static AOResult<T> SetError<T>(string message)
        {
            return SetError<T>(null, message);
        }
    }
}
