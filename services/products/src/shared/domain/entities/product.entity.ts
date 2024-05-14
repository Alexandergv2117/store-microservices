import { Category } from './category.entity';

export class Product {
  public id: string;
  public name: string;
  public description: string;
  public image: string;
  public currency: string;
  public stock: number;
  public published: boolean;
  public categories: Category[];

  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    currency: string,
    stock: number,
    published: boolean,
    categories: Category[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.currency = currency;
    this.stock = stock;
    this.published = published;
    this.categories = categories;
  }
}
