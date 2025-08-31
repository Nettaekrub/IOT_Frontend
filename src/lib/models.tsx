export interface Book {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
  summary: string;
  detail: string;
  category: string;
}

export interface Order {
  id: number;
  customer_name: string;
  menu_name: string;
  order_amount: number;
  comment: string;
}



