export class Category {
  public id: string;
  public category: string;
  public description: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  constructor(id: string, category: string, description: string) {
    this.id = id;
    this.category = category;
    this.description = description;
  }
}
