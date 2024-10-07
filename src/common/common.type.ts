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
