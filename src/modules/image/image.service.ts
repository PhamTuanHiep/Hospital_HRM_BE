import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ImageService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async uploadImage(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<string> {
    //Lấy instance của Firebase Storage từ một service firebaseService
    const storage = this.firebaseService.getStorageInstance();
    //Lấy bucket mặc định của Firebase Storage, nơi các file sẽ được lưu trữ.
    const bucket = storage.bucket();
    //tên gốc của file (file.originalname).
    const imagesFolder = folder ?? 'avatars';
    const fileName = `${imagesFolder}/${Date.now()}_${file.originalname}`;

    //Tạo một đối tượng đại diện cho file trong bucket Firebase với tên là fileName.
    const fileUpload = bucket.file(fileName);

    //Create a stream ghi (write stream) để tải dữ liệu file lên Firebase Storage.
    const stream = fileUpload.createWriteStream({
      // Thiết lập metadata của file
      metadata: {
        contentType: file.mimetype, //kiểu file
      },
    });
    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });
      stream.on('finish', () => {
        //encodeURIComponent chuyển đổi chuỗi URI thành format an toàn trong URL-> gửi qua HTTP mà ko gây lỗi
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
        resolve(imageUrl);
      });
      //Kết thúc stream bằng cách ghi nội dung của file (dưới dạng buffer) vào Firebase Storage.
      stream.end(file.buffer);
    });
  }
}
