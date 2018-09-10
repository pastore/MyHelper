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

            //AppUser
            public const string AppUserNotExists = "App User doesn't exist";

            // MhTask
            public const string TaskNotExists = "Task doesn't exist";
            public const string TaskReShedule = "Re-shedule task can not be updated";

            // Note
            public const string NoteNotExists = "Note doesn't exist";

            // Friend
            public const string FriendNotExists = "Friend doesn't exist";
            public const string FriendNotApproved = "Friend not approved";
            public const string FriendAlreadyApproved = "Friend already approved";
            public const string FriendAlreadyRejected = "Friend already rejected";
            public const string FriendAlreadyBlocked = "Friend already blocked";
            public const string FriendAlreadySpamed = "Friend already spamed";
            public const string RequestsAlreadyExists = "Requests already exists";
        }

        public static class Updates
        {
            public const string CreateMhTask = "Create task";
            public const string CreateChildMhTask = "Create child task";
            public const string UpdateEntireMhTask = "Update entire task";
            public const string UpdateStatusMhTask = "Update status task";
            public const string DeleteMhTask = "Delete task";
        }

        public static class HostEnvironment
        {
            public const string Docker = "Docker";
        }
    }
}
