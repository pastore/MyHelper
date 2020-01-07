import { TagViewModel } from "./tag-view.model";

export class TagAdminModel  {
  constructor(
    public name: string,
    public notes: string[],
    public tasks: string[]
  ) {}
}
