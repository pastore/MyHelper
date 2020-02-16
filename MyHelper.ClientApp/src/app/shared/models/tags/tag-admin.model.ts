export class TagAdminModel  {
  constructor(
    public id: number,
    public name: string
  ) { }

  notes: string[];
  tasks: string[];
}
