using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace MyHelper.Api.Models.Response
{
    /// <summary>
    /// Base async operation result.
    /// This class calculates how it log
    /// from start async operation (create instance) to finish asyncOperation (SetResult)
    /// </summary>
    public class AOResult
    {
        private readonly DateTime _creationUtcTime;

        public AOResult([CallerMemberName]string callerName = null, [CallerFilePath]string callerFile = null, [CallerLineNumber]int callerLineNumber = 0)
        {
            _creationUtcTime = DateTime.UtcNow;
            CallerName = callerName;
            CallerFile = callerFile;
            CallerLineNumber = callerLineNumber;
        }

        #region -- Public properties --

        public TimeSpan OperationTime { get; private set; }

        public bool IsSuccess { get; private set; }

        public Exception Exception { get; private set; }

        public string ErrorId { get; private set; }

        public string Message { get; private set; }

        public string CallerName { get; private set; }

        public string CallerFile { get; private set; }

        public int CallerLineNumber { get; private set; }

        public bool TrackingResult { get; set; } = true;

        public IEnumerable<(string Key, string Value)> Errors { get; set; }
        #endregion

        #region -- Public methods --

        public void SetSuccess()
        {
            SetResult(true, null, null, null, null);
        }

        public void SetFailure()
        {
            SetResult(false, null, null, null, null);
        }

        public void ArgumentException(string argumentName, string message)
        {
            SetError("ArgumentException", $"argumentName: {argumentName}, message: {message}");
        }

        public void ArgumentNullException(string argumentName)
        {
            SetError("ArgumentNullException", $"argumentName: {argumentName}");
        }

        public void SetError(string errorId, string message, Exception ex = null)
        {
            SetResult(false, errorId, message, null, ex);
        }

        public void SetError(string errorId, string message, IEnumerable<(string key, string value)> erorrs, Exception ex = null)
        {
            SetResult(false, errorId, message, erorrs, ex);
        }

        public void SetResult(bool isSuccess, string errorId, string message, IEnumerable<(string key, string value)> erorrs, Exception ex)
        {
            var finishTime = DateTime.UtcNow;
            OperationTime = finishTime - _creationUtcTime;
            IsSuccess = isSuccess;
            ErrorId = errorId;
            Exception = ex;
            Errors = erorrs;
            Message = message;
            if (TrackingResult)
                TrackResult();
        }

        #endregion

        #region -- Protected helpers --

        protected virtual void TrackResult()
        {
            //var analyticsService = App.Resolve<IAnalyticsService>();
            if (!IsSuccess)
            {
                var param = new Dictionary<string, string>();
                param[nameof(CallerName)] = CallerName;
                param[nameof(CallerFile)] = CallerFile;
                param[nameof(CallerLineNumber)] = CallerLineNumber.ToString();

                if (!string.IsNullOrEmpty(ErrorId))
                    param[nameof(ErrorId)] = ErrorId;
                if (!string.IsNullOrEmpty(Message))
                    param[nameof(Message)] = Message;
                if (Exception != null)
                {
                    param["ExceptionType"] = Exception.GetType().Name;
                }
                param[nameof(OperationTime)] = OperationTime.TotalMilliseconds.ToString();

                //analyticsService.Track("AsyncOperation_Failure", param);
            }
        }

        #endregion
    }

    /// <summary>
    /// Async operation result with result value
    /// </summary>
    public class AOResult<T> : AOResult
    {
        public AOResult([CallerMemberNameAttribute]string callerName = null, [CallerFilePath]string callerFile = null, [CallerLineNumber]int callerLineNumber = 0) : base(callerName, callerFile, callerLineNumber)
        {

        }

        #region -- Public properties --

        public T Result { get; private set; }

        #endregion

        #region -- Public methods --

        public void SetSuccess(T result)
        {
            Result = result;
            SetSuccess();
        }

        public void SetResult(T result, bool isSuccess, string errorId, string message, IEnumerable<(string key, string value)> erorrs, Exception ex = null)
        {
            Result = result;
            SetResult(isSuccess, errorId, message, erorrs, ex);
        }

        #endregion
    }
}
