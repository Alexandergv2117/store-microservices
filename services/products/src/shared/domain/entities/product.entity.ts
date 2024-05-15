import { Category } from './category.entity';

export enum Currency {
  USD = 'USD',
  MXN = 'MXN',
}

export class Product {
  public id: string;
  public name: string;
  public description: string;
  public image: string;
  public currency: Currency;
  public stock: number;
  public published: boolean;
  public category: Category;
  public price: string;

  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    currency: Currency,
    stock: number,
    price: string,
    published: boolean,
    category: Category,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.currency = currency;
    this.stock = stock;
    this.published = published;
    this.category = category;
    this.price = price;
  }
}
