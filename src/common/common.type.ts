import { UserDto } from 'src/dto/user.dto';

export interface BaseFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

interface DataReponse {
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationResponse {
  total: number; // Tổng số bản ghi
  currentPage: number; // Trang hiện tại
  nextPage: number | null; // Trang tiếp theo (có thể null)
  prevPage: number | null; // Trang trước (có thể null)
  lastPage: number; // Trang cuối cùng
}

// /ánh xạ các key  thành kiểu boolean
export type Relations<T extends string> = Record<T, boolean>;

// /chỉ định nghĩa kiểu boolean cho các trường
export interface SelectFields {
  [key: string]: boolean;
}

//ánh xạ các entity với các field cụ thể
export type Select<T extends string> = Record<T, SelectFields>;

export type SearchField<T extends string> = {
  [key in T]: string;
};

// Định nghĩa kiểu cho một mảng chứa các đối tượng tìm kiếm
// export type ObjectSearch<T extends string> = Array<SearchField<T>>;

//Department
export interface DepartmentDataResponse extends DataReponse {
  departmentId: string;
  departmentName: string;
  users: UserDto[];
}
export interface DepartmentResponse extends PaginationResponse {
  data: DepartmentDataResponse[];
}
