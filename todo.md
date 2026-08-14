# Việc cần làm — Hai luồng tính toán chính

- [x] Tách rõ chế độ “Tính từ máy chiếu” và “Gợi ý từ kích thước phòng”.
- [x] Giữ luồng chọn hãng, chọn model, nhập phòng và màn để trả về vùng khoảng cách lắp đặt.
- [x] Cho phép luồng chỉ nhập dài/ngang phòng tự chọn kích thước màn đề xuất.
- [x] Cho phép luồng chỉ nhập dài/ngang phòng tự xếp hạng model theo throw distance, độ sáng và kích thước màn.
- [x] Hiển thị lý do model được đề xuất và cảnh báo khi dữ liệu không đủ hoặc không vừa chiều sâu phòng.
- [x] Kiểm thử desktop/mobile, build production và lưu checkpoint cập nhật.

## Phiên bản dữ liệu Panasonic · Acer · Optoma

- [x] Đọc ba file Word và thống kê số model, tên trường, thông số còn thiếu.
- [x] Chuẩn hóa dữ liệu thành cấu trúc dùng chung cho bộ tính throw distance.
- [x] Chỉ giữ Panasonic, Acer và Optoma trong bộ chọn hãng của phiên bản này.
- [x] Thiết kế lại UI theo hướng “chọn thiết bị → thông tin model → tính toán phòng”.
- [x] Sửa hiển thị vùng khoảng cách thành dạng rõ ràng “X m – Y m”.
- [x] Kiểm thử model từ cả ba file và lưu checkpoint mới.

## So sánh model và mở rộng dữ liệu Panasonic

- [x] Kiểm tra trang Panasonic calculator và các trang spec liên quan để xác định danh sách model, trường dữ liệu và giới hạn truy cập.
- [x] Thêm chế độ chọn Model A và Model B từ catalog hiện tại.
- [x] Hiển thị bảng so sánh chi tiết với trạng thái chênh lệch và dữ liệu thiếu.
- [x] Cho phép đổi model A/B mà không làm mất thông tin phòng và kết quả tính toán.
- [x] Ghi rõ nguồn dữ liệu từng model và không suy đoán throw ratio khi thiếu.
- [x] Kiểm thử desktop/mobile, build production và lưu checkpoint mới.

## Panasonic Downloads / Specifications

- [x] Kiểm tra trang Downloads chính thức và bộ lọc tài liệu spec/manual.
- [x] Đối chiếu PT-LB306 với tài liệu Panasonic chính thức và lưu URL nguồn.
- [x] Cập nhật catalog để mỗi model có liên kết spec khi xác minh được.
- [x] Kiểm thử lại kết quả khoảng cách của PT-LB306 và cảnh báo model còn thiếu throw ratio.

## Đợt chuẩn hóa Panasonic và Acer theo spec chính thức

- [x] Lập danh sách model duy nhất từ hai file Word Panasonic và Acer.
- [x] Tra URL spec chính thức và throw ratio/khoảng cách cho từng model có tài liệu.
- [x] Giữ nguyên model thiếu dữ liệu nhưng gắn nhãn chưa xác minh, không suy đoán.
- [x] Loại Optoma và các model ví dụ ban đầu khỏi catalog, bộ chọn hãng và phần so sánh.
- [x] Cập nhật số lượng catalog, nguồn dữ liệu và logic gợi ý theo catalog mới.
- [x] Kiểm thử chọn model, so sánh, hai luồng tính toán, build và checkpoint.

## Preset màn chiếu theo danh sách người dùng

- [x] Thêm nguyên 10 dòng kích thước màn chiếu, không tự sửa nhãn hoặc số đo.
- [x] Giữ riêng các preset trùng đường chéo nhưng khác ngang × cao.
- [x] Dùng chiều rộng thực tế của từng preset trong công thức throw distance.
- [x] Hiển thị nguyên văn kích thước inch và mét trong lựa chọn màn chiếu.
- [x] Kiểm thử khoảng cách lắp đặt và lưu checkpoint cập nhật.

## Màn chiếu tùy chỉnh

- [x] Thêm lựa chọn “Màn tùy chỉnh” bên cạnh 10 preset hiện có.
- [x] Cho phép nhập ngang/cao và chọn đơn vị mét hoặc inch.
- [x] Tính đường chéo tham khảo nhưng dùng chiều rộng thực tế trong throw distance.
- [x] Hiển thị kích thước tùy chỉnh trong kết quả, sơ đồ và gợi ý.
- [x] Kiểm tra dữ liệu rỗng, số âm, đơn vị và lưu checkpoint cập nhật.

## Xuất báo cáo PDF

- [x] Thêm nút xuất PDF trong khu vực kết quả tính toán.
- [x] Đưa thông tin phòng, màn, model, throw ratio và khoảng cách lắp vào báo cáo.
- [x] Đưa sơ đồ mặt cắt/sơ đồ lắp đặt vào PDF.
- [x] Tạo tên file dễ nhận biết và xử lý trạng thái thiếu dữ liệu.
- [x] Kiểm thử bản PDF trên desktop/mobile và lưu checkpoint cập nhật.

## UI/UX Pro Max redesign

- [x] Đọc repository UI/UX Pro Max và ghi lại các nguyên tắc áp dụng được.
- [x] Chọn cặp font mới và cập nhật typography system tiếng Việt.
- [x] Làm mới palette, card, form, header, hero và khu vực kết quả.
- [x] Giữ nguyên tính toán, so sánh, màn tùy chỉnh và xuất PDF.
- [x] Kiểm thử responsive, accessibility cơ bản, build và lưu checkpoint.

## Bỏ khoảng trống phía sau

- [x] Xóa metric “Khoảng trống phía sau” khỏi khu vực kết quả.
- [x] Xóa nội dung liên quan khỏi báo cáo PDF và các nhãn phụ.
- [x] Giữ lại khoảng cách lắp, vùng lắp, màn chiếu và các kiểm tra phòng còn lại.
- [x] Kiểm thử responsive, build và checkpoint mới.

## Đánh giá UI mẫu người dùng gửi

- [x] Đọc cấu trúc HTML/CSS và nhận diện layout, màu, typography, interaction.
- [x] Đối chiếu với luồng máy tính, catalog, so sánh, màn tùy chỉnh và PDF hiện tại.
- [x] Đề xuất phần UI nên giữ, phần nên ghép và phần cần viết lại trong React.

## Ghép UI dashboard mẫu vào app

- [x] Tái cấu trúc giao diện React theo sidebar/form/KPI/recommendation/table của file mẫu.
- [x] Nối mọi KPI, model, throw ratio và trạng thái với catalog/tính toán thật.
- [x] Giữ sơ đồ lắp đặt, màn tùy chỉnh, so sánh hai model và xuất PDF.
- [x] Tạo file index.html standalone hoàn chỉnh, nhúng catalog Panasonic/Acer và logic động.
- [x] Kiểm thử desktop/mobile, TypeScript, production build và kiểm tra cú pháp standalone.
- [x] Để trống mặc định các ô Rộng phòng/Dài phòng; chỉ tính khi người dùng nhập đủ dữ liệu.
- [x] Thêm mục Hướng dẫn sử dụng tiếng Việt trong React và standalone, gồm hai luồng tính, màn tùy chỉnh, so sánh và xuất PDF.
- [x] Sao chép file index.html standalone vào thư mục bàn giao.
- [x] Đóng gói toàn bộ mã nguồn dự án thành file ZIP và kiểm tra nội dung archive.
- [ ] Mở khóa bộ chọn màn chiếu trong luồng Tính theo phòng.
- [x] Đồng bộ bộ chọn màn, gợi ý tự động và màn tùy chỉnh giữa React và standalone.
- [ ] Khôi phục ảnh sơ đồ phòng trong khu vực kết quả và kiểm tra đường dẫn asset.
- [ ] Thêm fallback hiển thị sơ đồ nếu ảnh remote/storage không tải được.
- [x] Tăng nhẹ cỡ chữ ở các khu vực chính trên desktop và mobile.
- [x] Rút gọn PDF còn thông tin phòng, màn, model, throw ratio, khoảng lắp, sơ đồ và cảnh báo cần thiết.
- [x] Đổi nhãn Rộng phòng/Dài phòng thành Chiều rộng/Chiều dài.
- [x] Sửa thứ tự thông tin màn chiếu và máy chiếu trong kết quả.
- [x] Đặt marker máy chiếu trong vùng lắp đặt trên sơ đồ.
- [x] Loại bỏ bàn và ghế khỏi ảnh sơ đồ lắp đặt.
- [x] Thay vùng nội thất bằng hình máy chiếu hiển thị trong vùng lắp và đồng bộ React/standalone.
- [x] Tăng cỡ chữ và đổi màu cho nhãn vùng lắp đặt cùng khoảng cách.
- [x] Tạo chuyển động nhẹ cho marker máy chiếu trong vùng lắp đặt và hỗ trợ reduced motion.
- [x] Tạo ảnh sơ đồ phòng sáng sủa, hiện đại hơn, vẫn có máy chiếu và màn chiếu.
- [x] Hiển thị kích thước màn theo inch trước, mét trong ngoặc ở toàn bộ giao diện.
- [x] Xóa preset 135" · 96" × 70" khỏi React và standalone, giữ preset 135" · 96" × 96".
- [x] Kiểm tra và hoàn thiện chuyển động máy chiếu trong vùng lắp đặt.
- [x] Chuẩn hóa nhãn màn thành `MÀN đường chéo (kích thước mét)` ở React và standalone.
- [x] Đổi nhãn số khoảng cách thành “Khoảng cách lý tưởng” để không nhầm với kích thước màn.
- [x] Thêm biểu tượng máy chiếu riêng hiển thị rõ và chuyển động qua lại trong vùng lắp đặt.
- [x] Đồng bộ animation nhìn thấy được giữa React và standalone, có reduced motion.
- [x] Gỡ animation và biểu tượng máy chiếu chuyển động, khôi phục marker tĩnh.
- [x] Giữ nguyên ảnh phòng, format nhãn màn và chú thích khoảng cách lý tưởng sau khi hoàn tác.
- [x] Sắp xếp danh sách đáng xem theo giá tăng dần, ưu tiên model phù hợp trước.
- [x] Không hiển thị giá tiền trong danh sách tham khảo hoặc PDF.
- [x] Hiển thị trọn ảnh sơ đồ, không crop mất phần sàn, chân màn và vùng đo.
- [x] Đồng bộ tỷ lệ ảnh sơ đồ giữa React, standalone và PDF.
- [x] Căn lại nhãn màn, vùng lắp đặt và marker máy chiếu nằm bên trong ảnh 4:3.
- [x] Kiểm tra overlay không tràn ra ngoài trên desktop/mobile và PDF.
- [x] Đưa nhãn màn, marker máy chiếu và vùng lắp đặt vào trong vùng nội thất của căn phòng.
- [x] Đồng bộ tọa độ overlay nội thất giữa React và standalone.
- [x] Đổi tab Hướng dẫn thành bố cục danh sách bước ở cột trái và nội dung chi tiết ở cột phải.
- [x] Thêm minh họa trực quan thay đổi theo bước 01, 02, 03 và các bước tiếp theo.
- [x] Sửa minh họa vùng lắp đặt thành mặt cắt phòng liền mạch, không tách dải đo khỏi căn phòng.
- [x] Đồng bộ minh họa khoảng cách trong React và standalone.
- [x] Ẩn nhóm danh mục Panasonic/Acer khỏi sidebar, giữ nguyên catalog trong bộ chọn model.
- [x] Chuyển mục Hướng dẫn xuống ngay dưới Thêm model ở sidebar.
- [x] Thêm bước hướng dẫn cách thêm model mới và thông tin spec cần chuẩn bị.
- [x] Làm lại minh họa Hướng dẫn theo giao diện thật để người dùng dễ hiểu.
- [x] Để trống mặc định bộ chọn màn chiếu, hãng và model trong React.
- [x] Chặn tính toán và hiển thị trạng thái chờ khi chưa chọn đủ dữ liệu.
- [x] Đồng bộ trạng thái trống trong standalone.
- [ ] Đổi font nội dung tiếng Việt sang kiểu mềm và dễ đọc hơn.
- [ ] Giữ font monospace riêng cho số đo, mã model và nhãn kỹ thuật.
- [ ] Đổi wordmark sidebar thành tên tiếng Việt dễ nhận diện hơn.
- [ ] Đổi dòng mô tả dưới logo thành chức năng ngắn gọn, đồng bộ React và standalone.
- [x] Tích hợp logo chính thức Office Machines vào sidebar React và standalone.
- [x] Giữ wordmark Bố Trí Máy Chiếu và mô tả chức năng cạnh logo chính thức.
- [x] Hiển thị tên công ty THANH HÀ cạnh logo chính thức.
- [x] Đổi wordmark thành “THIẾT BỊ VĂN PHÒNG THANH HÀ” trong React và standalone.
- [x] Bỏ hoàn toàn dòng “BỐ TRÍ MÁY CHIẾU” khỏi sidebar/nhận diện.
- [x] Đổi nền sidebar sang màu sáng và tăng tương phản chữ/nút.
- [x] Tách tên công ty, tên công cụ và nhãn chức năng thành các khối dễ nhận diện.
- [x] Bỏ metadata “Dữ liệu local · 22 model” và “Không thay thế manual lắp đặt”.
- [x] Chọn lại nền sidebar sáng có sắc xanh nhạt hài hòa hơn.
- [x] Tạo khối nhận diện nổi bật riêng cho “THIẾT BỊ VĂN PHÒNG THANH HÀ”.
- [x] Bỏ hẳn nhãn vàng “TÍNH KHOẢNG CÁCH · CHỌN MÀN” khỏi React và standalone.
- [x] Căn cụm “THIẾT BỊ VĂN PHÒNG” nằm trên một dòng trong thẻ nhận diện ở React và standalone.
- [x] Điều chỉnh nền sidebar sang xanh xám nhạt tối hơn một mức, đồng bộ React và standalone.
- [x] Tối thêm nền sidebar sang xanh xám đậm hơn, vẫn giữ tương phản chữ và menu.
- [x] Cho luồng Tính theo phòng tự hiển thị kết quả từ kích thước phòng, không bắt chọn thủ công màn/hãng/model.
- [x] Cho luồng Tính theo model tính khoảng cách chỉ từ màn, hãng và model; phòng là kiểm tra tùy chọn.
- [x] Đối chiếu PT-LB306 và màn 100 inch với công cụ Panasonic chính thức.
- [x] Xác định và sửa chênh lệch do throw ratio, tỷ lệ khung hình hoặc preset màn.
- [x] Ghi rõ tỷ lệ ngang:cao và kích thước vật lý cho từng preset màn.
- [x] Hiển thị cảnh báo tư vấn: khoảng cách được tính theo chiều ngang màn thực tế, không chỉ theo đường chéo.
- [x] Đồng bộ quy tắc và nhãn màn giữa React, standalone và báo cáo PDF.
- [ ] Nhúng logo và ảnh sơ đồ phòng vào standalone để mở file local không lỗi asset.
- [ ] Đồng bộ font dự phòng và bố cục standalone với bản React đang test trực tiếp.
- [x] Bỏ hiển thị tỷ lệ khỏi danh sách và ô chọn màn chiếu, giữ nguyên tỷ lệ trong logic tính.
- [x] Thêm accessibility cơ bản: skip link, nhãn input, mô tả hint và vùng thông báo động.
- [x] Giới hạn kích thước phòng từ 0,5 đến 100 m với thông báo lỗi rõ ràng, không đổi ô trống mặc định.
- [x] Giữ favicon theo logo chính thức Thanh Hà ở React và standalone.
- [x] Tách trạng thái kích thước phòng giữa Tính theo phòng và Tính theo model.
- [ ] Chuẩn bị repository GitHub `Distance Projector` cho tài khoản `tsnguyenvan`.
- [ ] Cấu hình bản static để có thể chạy public trên GitHub Pages.
- [ ] Thử tạo repository public `tsnguyenvan/Distance-Projector` trực tiếp bằng quyền GitHub hiện tại.
- [ ] Đẩy mã nguồn vào repository hiện có `tsnguyenvan/projector-planner`.
- [ ] Kiểm tra và bật GitHub Pages cho repository `projector-planner`.
- [ ] Đóng gói mã nguồn hiện tại để người dùng tải về và push từ máy cá nhân.
- [ ] Bàn giao lệnh đăng nhập, push và kiểm tra GitHub Pages không dùng token trong chat.
