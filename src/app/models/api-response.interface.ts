export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ProductsResponse {
  products: any[];
  totalPages: number;
  currentPage: number;
  total: number;
}