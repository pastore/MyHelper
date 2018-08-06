export enum UserRole {
  Admin = 1,
  User = 2
}

export enum FriendRequestFlag {
  None,
  Approved,
  Rejected,
  Blocked,
  Spam
}

export enum FriendRequestDirection {
  ByMe = 1,
  ToMe = 2
}

export enum CardType {
  Task = 1,
  Note = 2,
  Friend = 3,
  Feed = 4
}

export enum FilterType {
  TagsFilter = 1,
  DateTimeFilter = 2
}

export enum EditCardEventType {
  Save = 1,
  Cancel = 2
}

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Head = 'HEAD',
  Patch = 'PATCH'
}

export enum Icons {
  Note = 'note',
  Schedule = 'schedule',
  People = 'people',
  Domain = 'domain'
}

export enum MhTaskStatus {
  None = 0,
  Done = 1
}

export enum MhTaskVisibleType {
  Public = 1,
  Friend = 2,
  Private = 3
}

export enum ScheduleMhTaskType {
  None = 0,
  Daily = 1,
  Weekly = 7,
  Monthly = 30
}

export enum MhTaskState {
  Current = 1,
  Delete = 2,
  ReSchedule = 3
}

export enum FeedType {
  CreateNote = 1,
  CreateMhTask = 2
}
