# Distance Projector

Ứng dụng web tiếng Việt giúp tính khoảng cách lắp đặt máy chiếu, chọn màn chiếu và gợi ý model phù hợp theo kích thước phòng. Dữ liệu catalog hiện gồm Panasonic và Acer; công thức dùng chiều ngang thực tế của màn cùng throw ratio của model, không tự suy đoán khi thiếu dữ liệu.

## Chạy local

```bash
pnpm install
pnpm run dev
```

Ngoài bản React/Vite, file `index.html` ở thư mục gốc là bản standalone có thể mở trực tiếp bằng trình duyệt.

## Build production

```bash
pnpm run build:web
```

Lệnh này tạo site tĩnh tại `dist/public`, phù hợp để triển khai bằng GitHub Pages. Workflow trong `.github/workflows/deploy-pages.yml` sẽ tự build và deploy mỗi khi có commit mới lên nhánh `main`.

## GitHub Pages

Sau khi bật Pages với nguồn **GitHub Actions**, site sẽ có địa chỉ:

```text
https://tsnguyenvan.github.io/Distance-Projector/
```

Logo và ảnh sơ đồ phòng dùng asset public ổn định từ site đã triển khai, còn toàn bộ logic tính toán vẫn chạy ở trình duyệt, không cần backend.

## Mô tả repository

Ứng dụng web tiếng Việt tính khoảng cách lắp đặt máy chiếu, gợi ý màn chiếu và đề xuất model phù hợp theo kích thước phòng.
