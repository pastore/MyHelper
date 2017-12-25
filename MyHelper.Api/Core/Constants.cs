namespace MyHelper.Api.Core
{
    public static class Constants
    {
        public static class Errors
        {
            // Autorization
            public const string TokenIsBroken = "Token is broken.";
            public const string TokenIsExpired = "Token is expired.";
            public const string UserAlreadyRegistered = "User with this email already registered.";
            public const string EmailsAreNotEqual = "Token in email and in request are no equal.";
            public const string WrongRoleType = "Role type is wrong.";

            // MhTask
            public const string TaskNotExists = "Task doesn't exists";

            // Note
            public const string NoteNotExists = "Note doesn't exists";
        }

        public static class Updates
        {
            public const string UpdateEntireMhTask = "Update entire task";
            public const string UpdateStatusMhTask = "Update status task";
            public const string DeleteMhTask = "Delete task";
        }
    }
}
