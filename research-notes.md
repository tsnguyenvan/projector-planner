# Ghi chú tham khảo

## Panasonic Throw Distance Calculator

Nguồn tham khảo: https://docs.connect.panasonic.com/projector/calculator/tdc/index.html

Trang hiển thị công cụ “Throw Distance Calculator”, phiên bản 2.78. Nội dung trích xuất tự động khá ít và lần mở trực quan sau đó gặp lỗi kết nối, vì vậy không dùng trang này làm nguồn dữ liệu thông số cụ thể. Ý tưởng luồng được giữ ở mức khái niệm: chọn model, nhập hoặc chọn kích thước màn và đọc khoảng cách throw distance.

## Quy tắc dữ liệu trong ứng dụng

Ứng dụng local dùng dữ liệu model tĩnh có trường nguồn và trạng thái tin cậy. Model không có trong dataset không bị suy đoán; người dùng được chuyển sang chế độ nhập thông số từ datasheet gồm throw ratio min/max, độ sáng và độ phân giải. Kết quả cần gắn nhãn “tham khảo” khi dữ liệu do người dùng nhập.

## Acer Projection Calculator

Nguồn tham khảo: https://www.acer.com/vn-vi/projectors/projection-calculator

Trang dùng tiêu đề tiếng Việt “Máy tính khoảng cách chiếu”, đồng thời tổ chức máy chiếu theo các nhóm như lớp học, không gian rộng, phòng họp, giải trí tại nhà, di động và chơi game. Ứng dụng local giữ cách gọi đơn giản “Máy tính khoảng cách chiếu” và bổ sung bộ lọc theo mục đích sử dụng để người dùng không chuyên chọn nhanh hơn.

## ProjectorCentral Projection Calculator Pro

Nguồn tham khảo: https://www.projectorcentral.com/projection-calculator-pro.cfm

Trang giải thích throw distance là khoảng cách từ thấu kính máy chiếu đến bề mặt màn. Tỷ lệ chiếu được định nghĩa là `D / W` — khoảng cách chiếu chia cho chiều rộng ảnh. Vì vậy, với màn hình 16:9 có chiều rộng `W`, khoảng cách tối thiểu và tối đa có thể tính bằng `W × throwRatioMin` và `W × throwRatioMax`. Ống kính zoom có hai giá trị tỷ lệ chiếu, tạo thành một vùng khoảng cách thay vì một điểm duy nhất.

Ứng dụng local hiển thị rõ “từ thấu kính đến màn”, dùng mét làm đơn vị chính, đồng thời quy đổi kích thước màn theo đường chéo inch và tỷ lệ khung hình. Đây là công cụ ước tính bố trí; khoảng cách lắp đặt cuối cùng cần kiểm tra thêm offset, lens shift, mặt phẳng gắn máy và hướng dẫn của nhà sản xuất.

## Dữ liệu mẫu đã kiểm chứng

* **Panasonic PT-VMZ71:** WUXGA 1920×1200, 7.000 lm ANSI, tỷ lệ khung hình 16:10, throw ratio quang học 1,09–1,77:1. Nguồn: https://docs.connect.panasonic.com/projector/products/vmz71/spec/
* **Acer X1528Ki:** FHD 1920×1080, 5.200 ANSI lm ở chế độ Standard, tỷ lệ khung hình gốc 16:9, throw ratio 1,48–1,62. Nguồn: https://www.acer.com/gb-en/projectors/meeting-room/pdp/MR.JW011.001
* **Epson EB-FH52:** Full HD, 4.000 lm white/color light output, throw ratio 1,32–2,14:1, màn 30–300 inch. Nguồn: https://www.epson.eu/en_EU/products/projector/portable/eb-fh52-projector/p/29753
* **ViewSonic PA503W:** WXGA 1280×800, 4.000 ANSI lm, throw ratio 1,55–1,70, màn 30–300 inch, khoảng cách throw công bố 1–10,98 m. Nguồn: https://www.viewsonic.com/global/products/projectors/PA503W

## Dữ liệu nhập từ file Word người dùng cung cấp

Ba file `PROJECTORPANASONIC_2026_FULLVAT.doc`, `PROJECTORACER-FULLVAT.doc` và `PROJECTOROPTOMA_FULLVAT.doc` được đọc như bảng catalog/giá đại lý. Dataset hiện tại đã chuẩn hóa **25 model thuộc 3 hãng**: 17 Panasonic, 7 Acer và 1 Optoma. Các trường đã lấy gồm model, độ sáng, độ phân giải, tỷ lệ khung hình, dải kích thước chiếu, nguồn sáng và giá khi file có ghi.

Phần lớn model trong ba file không có throw ratio min/max. Ứng dụng giữ giá trị này là “chưa có dữ liệu”, không suy luận từ tỷ lệ khung hình. Vì vậy model vẫn xuất hiện trong catalog và có thể xem thông tin, nhưng kết quả khoảng cách sẽ được cảnh báo cho đến khi bổ sung throw ratio từ datasheet/manual chính thức.

## Panasonic Throw Distance Calculator — kiểm tra khả năng mở rộng

Nguồn người dùng cung cấp: https://docs.connect.panasonic.com/projector/calculator/tdc/index.html

Trang có các control động cho `model_type`, `model_name`, `lenses`, `aspect_ratio`, kích thước màn theo đường chéo/rộng/cao, khoảng cách min/max và mô phỏng phòng. Khi kiểm tra trực tiếp, danh sách `model_name` của Panasonic chứa nhiều model hơn catalog Word hiện tại, gồm các dòng PT-MZ, PT-VMZ, PT-LMZ, PT-VW, PT-VX và nhiều dòng venue khác. Trang cũng có danh sách lens riêng.

Kết luận: có thể dùng trang này để **đối chiếu và bổ sung dữ liệu Panasonic theo model/lens**, nhưng không nên xem nó là API export catalog hoàn chỉnh. Dữ liệu được nạp động và kết quả phụ thuộc model, lens, tỷ lệ khung hình, kích thước màn, khoảng cách phòng và các tùy chọn mô phỏng. Phiên bản hiện tại sẽ giữ cơ chế nguồn theo từng model; model nào chưa xác minh đủ throw ratio vẫn hiển thị “chưa có dữ liệu”, không tự động suy đoán.

## Xác minh Panasonic PT-LB306

Trang Panasonic Connect chính thức của PT-LB306 xác nhận model này là **discontinued**, LCD, 3.100 lm, XGA và thuộc dòng PT-LB426 Series. Trang Downloads tìm được tài liệu `PT-LB306 Spec File (English)` tại https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/PT-LB306G_STM_02%28sec%29.pdf. PDF ghi rõ **Throw ratio 1.47–1.77:1** và bảng Projection distance cho aspect ratio 4:3; giá trị này đã được đưa vào catalog, không suy ra từ kích thước màn.

## Tra cứu batch Panasonic theo trang Downloads chính thức

Trang `https://eu.connect.panasonic.com/gb/en/downloads?search=&type=9611&industry=All&group=All&language=All` cho phép tìm từng model bằng ô Search downloads và trả về link PDF `Spec File`. Batch tra cứu 16 model trong file Word đã tìm được URL spec cho 14 model; PT-DX100EK và PT-MZ882W chưa có tài liệu khớp chính xác theo tên tìm kiếm.

Throw ratio đã trích được từ các PDF: **PT-LB306 1.47–1.77:1**, **PT-LB356 1.48–1.78:1**, **PT-LW376 1.48–1.78:1**, **PT-LB426 1.48–1.78:1**, **PT-VW360 1.2–1.9:1** và **PT-VX430 1.2–1.9:1**. Các PDF còn lại cần xử lý/tải riêng vì dung lượng hoặc thời gian đọc vượt giới hạn batch; không được suy đoán từ model tương tự.

## UI/UX Pro Max — nguồn và nguyên tắc áp dụng

Nguồn người dùng cung cấp: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

README của repository mô tả một design-system generator với 84 UI styles, 192 color palettes, 74 font pairings, 98 UX guidelines và 161 reasoning rules. Skill hướng dẫn phải bắt đầu bằng phân tích product type/audience/stack, sau đó tạo design system gồm pattern, style, màu, typography, effects và anti-patterns; workflow tiếp theo là bổ sung guideline theo domain/stack, implement và chạy pre-delivery checks.

Các nguyên tắc ưu tiên được áp dụng cho app này: contrast tối thiểu WCAG AA; target tương tác tối thiểu 44×44 px và có feedback/loading; mobile-first không tạo horizontal scroll; typography cơ bản 16 px với line-height khoảng 1,5; animation 150–300 ms và tôn trọng reduced motion; form phải có label nhìn thấy, helper text và lỗi gần trường; dùng SVG/Lucide thay emoji; không dùng gradient tím/hồng kiểu AI, không dùng gray-on-gray và không bỏ focus state.

## Phân tích UI mẫu index.html người dùng gửi

UI mẫu dùng mô hình **sidebar điều hướng + main dashboard**. Điểm mạnh là người dùng thấy ngay hai luồng “Tính theo phòng” và “Tính theo model”, form ngắn có các biến thực tế như rộng/dài phòng, loại không gian, số người, ánh sáng và vị trí màn; kết quả có KPI, một dải “Ưu tiên” nền navy và bảng model gọn. Typography là Manrope cho UI và Space Mono cho nhãn/số; màu chủ đạo navy, nền xanh xám nhạt và CTA vàng.

Phương án ghép phù hợp là giữ logic thật của app hiện tại — catalog Panasonic/Acer, throw ratio, 10 preset màn, màn tùy chỉnh, so sánh và xuất PDF — nhưng tái cấu trúc vỏ UI theo mẫu: sidebar cố định ở desktop, topbar gọn, form phòng ở cột trái, dải model ưu tiên ở đầu kết quả và bảng model bên dưới. Sơ đồ mặt cắt hiện tại vẫn cần giữ vì UI mẫu không có cách giải thích vị trí lắp bằng trực quan.

Không nên copy nguyên HTML mẫu vì dữ liệu trong đó đang là tĩnh, nút dùng onclick trực tiếp và không có kết nối với các phép tính thật. Khi ghép cần bind mọi KPI/model/trạng thái vào React state; các trường số người, ánh sáng và loại không gian chỉ nên thêm khi được nối vào logic gợi ý, không hiển thị như dữ liệu giả.

Stack hiện tại của app là React + Tailwind/CSS, nên sẽ áp dụng hướng React và visual system theo kiểu **Swiss technical editorial / data-dense dashboard**: giữ cấu trúc kỹ thuật nhưng đổi cặp font, tăng phân cấp chữ, làm rõ control/result, giảm cảm giác card đồng đều và giữ palette cam tín hiệu + xanh mực làm màu thương hiệu.

Trang Acer X1128H chính thức (MR.JTG11.001) xác nhận **4.800 ANSI lm**, SVGA 800×600, aspect 4:3 native/16:9 supported, image size 23–300 inch, **throw ratio 1.94–2.16**, zoom 1.1x và manual zoom/focus. URL: https://www.acer.com/si-en/projectors/meeting-room/pdp/MR.JTG11.001

Trang Acer X1228H chính thức (MR.JTH11.001) xác nhận **4.800 ANSI lm**, XGA 1024×768, aspect 4:3 native/16:9 supported, image size 23–300 inch, **throw ratio 1.94–2.16**, zoom 1.1x. URL: https://www.acer.com/gb-en/projectors/meeting-room/pdp/MR.JTH11.001

Trang Acer P1257i chính thức (MR.JUR11.001) xác nhận **4.800 ANSI lm**, XGA 1024×768, aspect 4:3 native, image size 25–300 inch, **throw ratio 1.51–1.97**, zoom 1.3x và wireless projection. URL: https://www.acer.com/gb-en/projectors/meeting-room/pdp/MR.JUR11.001

Trang Acer Vero PL2520i chính thức (MR.JWG11.002) xác nhận **4.000 ANSI lm**, Full HD 1920×1080, laser, aspect 16:9 native/4:3 supported, image size 31–300 inch, zoom 1.3x; phần markdown trang spec không hiển thị throw ratio nên chưa ghi throw ratio vào catalog. URL: https://www.acer.com/gb-en/projectors/meeting-room/pdp/MR.JWG11.002

H5386Bdi có nhiều kết quả Acer calculator/manual với giá trị throw ratio khác nhau (1.49–1.93 và 1.54–1.72 tùy nguồn/biến thể), trong khi trang product khu vực trả về captcha/không có nội dung đầy đủ. Vì vậy chưa ghi giá trị vào catalog cho đến khi xác minh đúng datasheet của mã MR.JSE11.002.

Sau khi đối chiếu trực tiếp Projection Calculator chính thức của Acer, model H5386BDi hiển thị **throw ratio 1.49–1.93:1**, zoom 1.29x và aspect ratio 4:3/16:9/16:6. Catalog dùng giá trị này và dẫn về https://www.acer.com/acer-projectorcalculator; cần hiểu đây là dữ liệu từ calculator của hãng, không phải PDF product page.

Trang Panasonic PT-MZ882 chính thức xác nhận model 8.200 lm, WUXGA và hiển thị throw ratio theo dòng lens tiêu chuẩn/tuỳ chọn; giá trị chính của lens tiêu chuẩn trong tài liệu liên quan là 0.330–0.353:1 cho MZ882/MZ882L. Vì file Word dùng model PT-MZ882W nhưng chưa có tài liệu khớp chính xác theo mã hậu tố W, catalog tạm giữ thiếu throw ratio để tránh áp nhầm lens.

Trang Panasonic PT-VMZ51S chính thức xác nhận 5.200 lm, WUXGA, laser diodes và 1.6x zoom. Tài liệu/spec Panasonic được tra cứu cùng dòng VMZ51 xác nhận throw ratio quang học **1.09–1.77:1**; catalog dùng giá trị quang học này, không dùng throw ratio digital tương ứng 1.09–2.21:1.
