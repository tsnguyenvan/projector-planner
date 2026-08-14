# Ý tưởng thiết kế — Bố Trí Máy Chiếu

## Ba hướng thẩm mỹ

### Hướng 1 — Phòng Điều Khiển Ánh Sáng
Giao diện kiểu technical editorial: nền trắng ấm, mực xanh đen, đường đo màu cam tín hiệu và các thẻ thông số như một tờ biên bản kỹ thuật được làm tinh. Cảm giác chính xác, đáng tin và dễ đọc trong môi trường thi công.

**Probability:** 0.067

### Hướng 2 — Bản Đồ Phòng Chiếu
Một hệ thống trực quan thiên về sơ đồ mặt bằng, dùng các mảng màu phấn và chú thích như bản vẽ kiến trúc hiện đại. Cảm giác thân thiện, giải thích tốt cho người không chuyên.

**Probability:** 0.031

### Hướng 3 — Tín Hiệu Trong Bóng Tối
Một dashboard tối với các dải sáng mô phỏng đường chiếu, điểm nhấn xanh điện và chuyển động nhẹ theo trục quang học. Cảm giác giàu công nghệ, phù hợp khi thao tác trong phòng trình chiếu thiếu sáng.

**Probability:** 0.089

## Hướng được chọn: Phòng Điều Khiển Ánh Sáng

### Design Movement
Technical editorial kết hợp Swiss grid bất đối xứng và ngôn ngữ của bản vẽ thi công. Giao diện không giả lập máy móc; nó tổ chức thông tin theo thứ tự mà kỹ thuật viên thực sự cần quyết định.

### Core Principles
1. **Đọc trước, trang trí sau:** mọi kết quả quan trọng phải nổi bật hơn phần giải thích.
2. **Đo được bằng mắt:** khoảng cách, kích thước màn và vùng phù hợp được trình bày bằng thanh đo, marker và nhãn đơn vị rõ ràng.
3. **Khoảng thở có chủ đích:** dùng nền sáng rộng và các mảng trắng để giảm lỗi nhập liệu.
4. **Cảnh báo trung thực:** dữ liệu model chưa có phải được nói rõ, không được suy đoán thông số.

### Color Philosophy
Nền **ivory công nghiệp** tạo cảm giác như giấy kỹ thuật sạch; **ink navy** giữ độ tương phản và độ tin cậy; **signal orange** dành riêng cho điểm đo, khoảng cách và hành động chính; **teal sâu** dùng cho trạng thái đạt và xác nhận. Màu không chỉ để phân loại: cam là nơi cần lắp đặt hoặc hành động, teal là nơi có thể tin dùng, đỏ gạch là nơi cần kiểm tra lại.

### Layout Paradigm
Một cột điều khiển hẹp bên trái dẫn dắt nhập liệu, bên phải là canvas kết quả rộng với sơ đồ phòng chiếu và panel kết luận. Các khối không xếp thành lưới card đồng đều; chúng bám theo dòng suy luận “phòng → màn → máy → khoảng cách → kiểm tra”.

### Signature Elements
* Thước đo ngang có vạch chia, marker cam và nhãn khoảng cách.
* Nhãn trạng thái dạng “biên bản” với số thứ tự và chữ in hoa nhỏ.
* Nét gạch chéo mảnh mô phỏng tia sáng chiếu lên màn, dùng tiết chế ở khu vực sơ đồ.

### Interaction Philosophy
Tương tác phải giúp người dùng hiểu hệ quả của mỗi lựa chọn. Khi đổi kích thước phòng, kết quả cập nhật tức thì nhưng vẫn giữ nhịp chuyển động ngắn; khi chọn model, thông số quang học mở ra ngay cạnh trường chọn để tránh phải nhớ dữ liệu.

### Animation
Trang mở bằng việc các nhãn kỹ thuật xuất hiện theo nhịp 40–60ms, không dùng hiệu ứng phóng to từ 0. Kết quả khoảng cách trượt theo trục ngang 180ms với easing snappy; sơ đồ tia sáng chỉ animating opacity/transform khi giá trị thay đổi. Nút có phản hồi scale 0.97 trong 160ms. Tôn trọng `prefers-reduced-motion` và tắt các chuyển động không cần thiết.

### Typography System
Theo truy vấn typography của UI/UX Pro Max, hệ thống chuyển sang cặp **Fira Sans + Fira Code**: Fira Sans 400–800 cho nội dung, tiêu đề và thao tác tiếng Việt; Fira Code 400–700 chỉ dành cho số đo, mã model, nhãn kỹ thuật, ngày xuất và trạng thái. Cách này tạo cảm giác dashboard dữ liệu chính xác mà vẫn giữ khả năng đọc tiếng Việt.

### Brand Essence
**Bố Trí Máy Chiếu** là trợ lý tính toán tiếng Việt cho kỹ thuật viên, nhà thầu AV và người chuẩn bị phòng trình chiếu — biến kích thước phòng và thông số máy thành một quyết định lắp đặt có thể kiểm tra. **Chính xác · Thẳng thắn · Thực dụng**.

### Brand Voice
Tiêu đề nói ngắn, có tính kết luận. CTA dùng động từ cụ thể, không dùng lời quảng cáo chung chung. Microcopy giải thích giới hạn dữ liệu bằng thái độ bình tĩnh, không làm người dùng thấy mình nhập sai.

> “Đặt máy trong vùng 3,8–4,6 m để phủ đầy màn 120 inch.”

> “Chưa có model này? Nhập tỷ lệ chiếu và độ sáng từ datasheet để tính tiếp.”

### Wordmark & Logo
Logo là một biểu tượng hình chữ nhật màn chiếu bị cắt bởi một tia cam xiên, tạo thành chữ “P” trừu tượng khi nhìn tổng thể. Wordmark dùng chữ Space Grotesk viết thường có một nét gạch ngang cam kéo dài từ chữ cuối, không dùng tên thương hiệu trong font mặc định không chỉnh sửa.

### Signature Brand Color
**Signal Orange — #F0642C**. Đây là màu của điểm đo và quyết định lắp đặt: nổi bật trên nền ivory, đủ khác biệt với teal trạng thái và không bị nhầm với màu cảnh báo đỏ.

## Quy ước khi triển khai

Mọi file CSS/component/page cần giữ tinh thần technical editorial: ưu tiên bố cục bất đối xứng, tránh gradient tím, tránh card bo tròn đồng loạt, tránh font Inter và luôn đặt tương phản chữ theo nền thực tế. Nếu một lựa chọn giao diện không giúp người dùng đọc hoặc kiểm tra phép tính tốt hơn, lựa chọn đó đang làm loãng thiết kế.

## Style Decisions

* Hero imagery phải được đọc như một bản vẽ kỹ thuật: giữ đường tia, callout và thước màu cam để không trượt sang dashboard tối kiểu cinematic.
* Khoảng cách lắp đặt là kết luận chính; màn, khoảng trống và kiểm tra độ sáng là các xác nhận phụ.
* Kết quả không dùng nhịp card SaaS đồng đều; các khối kết quả dùng đường kẻ, thước chia, nhãn đóng dấu và chú thích đo lường.
* Theo UI/UX Pro Max: ưu tiên contrast rõ, target thao tác đủ lớn, focus state nhìn thấy, mobile-first và chuyển động 150–300ms; không dùng gradient tím/hồng kiểu AI hoặc emoji làm icon.
* Hero imagery phải đọc như một technical catalog plate: đường lưới, thước đo, throw axis và screen plane phải rõ hơn cảm giác ảnh cinematic.
* Beam device ở wordmark và các ruler/callout cam là ngôn ngữ thương hiệu lặp lại trong header, hero, report meta và recommendation list.
