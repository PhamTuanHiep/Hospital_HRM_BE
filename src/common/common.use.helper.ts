import { extname } from 'path';
import { Like } from 'typeorm';
import { BaseFile, Relations, Select } from './common.type';
import { FilterDto } from 'src/dto/common.filter.dto';

interface FilterGetAllProps<T extends string> {
  query: FilterDto;
  repository: any;
  relations?: Relations<T>;
  select?: Select<T>;
  arrSearch?: string[];
  order?: any;
}
export const filterGetAll = async ({
  query,
  repository,
  relations,
  select,
  arrSearch = [],
  order,
}: FilterGetAllProps<string>): Promise<any> => {
  const items_per_page = Number(query.items_per_page) || 4;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * items_per_page;
  const keyword = query.search || '';

  //phương thức của TypeORM repository
  //Tìm kiếm các bản ghi dựa trên điều kiện được cung cấp
  //Đếm tổng số bản ghi phù hợp với điều kiện, không phụ thuộc vào pagination
  //res: Một mảng chứa danh sách các bản ghi phù hợp với điều kiện tìm kiếm.
  //total: Tổng số bản ghi phù hợp với điều kiện (số lượng toàn bộ bản ghi không phụ thuộc vào take và skip)
  const [res, total] = await repository.findAndCount({
    //Like tìm kiếm dựa trên mẫu chuỗi.
    //%: Là ký tự đại diện trong SQL.
    //'%keyword%' có nghĩa là tìm kiếm bất kỳ chuỗi nào có chứa keyword ở bất kỳ vị trí nào trong chuỗi.
    where: arrSearch.map((elSearch) => ({
      [elSearch]: Like('%' + keyword + '%'),
    })),
    // [
    //   { first_name: Like('%' + keyword + '%') },
    //   { last_name: Like('%' + keyword + '%') },
    //   { email: Like('%' + keyword + '%') },
    // ],
    order: order ?? { createdAt: 'ASC' },
    take: items_per_page, //số lượng bản ghi tối đa sẽ được trả về cho mỗi lần truy vấn
    skip: skip, //số lượng bản ghi sẽ bỏ qua khi truy vấn
    relations,
    // relations: {
    //   user: true,
    // },
    select,
    // select: [
    //     'id',
    //     'first_name',
    //     'last_name',
    //     'email',
    //     'status',
    //     'created_at',
    //     'updated_at',
    //   ],
  });
  const lastPage = Math.ceil(total / items_per_page);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  console.log('total:', total);

  return {
    data: res,
    total,
    currentPage: page,
    perPage: items_per_page,
    nextPage,
    prevPage,
    lastPage,
  };
};

export const fileFilterInterceptor = (
  req: any,
  file: BaseFile,
  cb: Function,
) => {
  //lấy ra phần  phần mở rộng của tệp
  const ext = extname(file.originalname);

  const allowedExtArr = ['.jpg', '.png', '.jpeg'];
  if (!allowedExtArr.includes(ext)) {
    req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()} `;
    cb(null, false);
  } else {
    // Lấy kích thước tệp
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1024 * 1024 * 5) {
      req.fileValidationError =
        'File size is too large. Accept file size is less than 5MB';
      cb(null, false);
    } else {
      cb(null, true);
    }
  }
};

export const extractFilePathFromUrl = (fileUrl: string): string => {
  // Lấy phần sau 'o/' và trước '?alt=' từ URL
  const match = fileUrl.match(/\/o\/(.*?)\?alt/);
  if (match && match[1]) {
    return decodeURIComponent(match[1]); // Giải mã URL và trả về đường dẫn nội bộ
  }
  throw new Error('Invalid file URL.');
};
