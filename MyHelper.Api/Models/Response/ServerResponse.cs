using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Models.Response
{
    public class ServerResponse
    {
        public bool IsSuccess { get; set; }
        public string ErrorId { get; set; }
        public string Message { get; set; }
        public List<Tuple<string, string>> Errors { get; set; } //Tuple allow you to store value with the same key

        public void SetResult(bool isSuccess, string errorId, string message, List<Tuple<string, string>> errors)
        {
            IsSuccess = isSuccess;
            ErrorId = errorId;
            Message = message;
            Errors = errors;
        }

        public void SetSuccess()
        {
            SetResult(true, null, null, null);
        }

        public void SetFailure()
        {
            SetResult(false, null, null, null);
        }

        public void SetError(string errorId, string message, List<Tuple<string, string>> errors)
        {
            SetResult(false, errorId, message, errors);
        }

        public void SetError(string errorId, string message)
        {
            SetResult(false, errorId, message, null);
        }
    }

    public class ServerResponse<T> : ServerResponse
    {
        public T Result { get; set; }

        public void SetSuccess(T result)
        {
            Result = result;
            SetSuccess();
        }

        public void SetSuccess(AOResult<T> result)
        {
            if (result.IsSuccess)
            {
                Result = result.Result;
                SetSuccess();
            }
            else
            {
                SetError(result.ErrorId, result.Message);
            }
        }
    }
}
