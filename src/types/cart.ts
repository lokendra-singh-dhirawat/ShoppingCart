export type ID = string | number;

export interface CartItem {
  id: ID;
  title: string;
  image: string;
  price: number;
  quantity: number;
  description?: string;
}
