export const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    )
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase(),
    )
    .replace(/\s+/g, '');
};

export const toSnakeCaseFromCamelCase = (str: string): string => {
  return str
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) // Thêm dấu "_" trước ký tự viết hoa và chuyển thành chữ thường
    .replace(/^_/, ''); // Loại bỏ dấu "_" đầu chuỗi nếu có
};
