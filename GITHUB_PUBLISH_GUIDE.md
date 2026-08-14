# Đưa Distance Projector lên GitHub Pages

Repository đích: `https://github.com/tsnguyenvan/projector-planner`

## 1. Cài công cụ cần thiết

Cài Node.js 22 trở lên và Git trên máy cá nhân. Có thể kiểm tra bằng:

```bash
node --version
git --version
```

## 2. Đăng nhập GitHub an toàn

Đăng nhập GitHub bằng phương thức xác thực của GitHub trên máy cá nhân. Không dán Personal Access Token vào cuộc trò chuyện, file dự án hoặc câu lệnh được lưu lại.

## 3. Giải nén và đẩy mã nguồn

Mở Terminal trong thư mục dự án sau khi giải nén, sau đó chạy:

```bash
git init
git branch -M main
git remote add origin https://github.com/tsnguyenvan/projector-planner.git
git add .
git commit -m "Publish Distance Projector"
git push -u origin main
```

Nếu thư mục đã có Git remote hoặc đã commit từ trước, dùng:

```bash
git remote set-url origin https://github.com/tsnguyenvan/projector-planner.git
git push -u origin main
```

## 4. Kiểm tra GitHub Pages

Sau khi push, mở tab **Actions** của repository. Workflow `Deploy Distance Projector to GitHub Pages` sẽ build site và triển khai tự động. Khi workflow hoàn tất, vào **Settings → Pages** để xem địa chỉ public. Địa chỉ dự kiến là:

```text
https://tsnguyenvan.github.io/projector-planner/
```

Nếu Pages yêu cầu chọn nguồn, chọn **GitHub Actions**.

## 5. Chạy thử local

Để chạy bản React trên máy:

```bash
pnpm install
pnpm run dev
```

File `index.html` ở thư mục gốc là bản standalone, có thể mở trực tiếp bằng trình duyệt.
