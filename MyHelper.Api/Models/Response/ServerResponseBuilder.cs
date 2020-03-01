namespace MyHelper.Api.Models.Response
{
    public static class ServerResponseBuilder
    {
        public static ServerResponse<T> Build<T>(T result)
        {
            var serverResponse = new ServerResponse<T> {Result = result};

            return serverResponse;
        }
    }
}
