export class PaginatedResponse<T> {
  data: T[];
  limit: number;
  offset: number;
  total: number;

  constructor(data: T[], limit: number, offset: number, total: number) {
    this.data = data;
    this.limit = limit;
    this.offset = offset;
    this.total = total;
  }
}
