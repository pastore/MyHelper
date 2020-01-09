export class TagAdminModel  {
  constructor(
    public id: number,
    public name: string,
    public notes: string[],
    public tasks: string[]
  ) {}
}
