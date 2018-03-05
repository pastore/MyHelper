export enum UserRole {
  Admin = 1,
  User = 2
}

export enum CardType {
  Task = 1,
  Note = 2,
  Friend = 3
}

export enum FilterType {
  TagsFilter = 1,
  DateTimeFilter = 2
}

export enum DetailsEventType {
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
