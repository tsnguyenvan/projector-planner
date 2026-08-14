// Data contract reminder: this file is the single catalog source for the three active brands.
// Never infer throw ratio from aspect ratio. A null throw ratio must remain visible as missing data.

export type Aspect = "16:9" | "16:10" | "4:3";

export type ProjectorModel = {
  id: string;
  brand: string;
  model: string;
  brightness: number;
  resolution: string;
  aspect: Aspect;
  throwMin: number | null;
  throwMax: number | null;
  screenMin: number;
  screenMax: number;
  lightSource: string;
  category: string;
  source: string;
  price: number | null;
  dataOrigin: string;
};

const sourcePanasonicFile = "Dữ liệu từ PROJECTORPANASONIC_2026_FULLVAT.doc";
const sourceAcerFile = "Dữ liệu từ PROJECTORACER-FULLVAT.doc";

export const PROJECTORS: ProjectorModel[] = [
  // Panasonic catalog imported from the supplied Word price list.
  { id: "panasonic-pt-lb306", brand: "Panasonic", model: "PT-LB306", brightness: 3100, resolution: "XGA · 1024 × 768", aspect: "4:3", throwMin: 1.47, throwMax: 1.77, screenMin: 30, screenMax: 300, lightSource: "Đèn UHM", category: "Phòng họp / lớp học", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/PT-LB306G_STM_02%28sec%29.pdf", price: 13600000, dataOrigin: "Panasonic PT-LB306 Spec File (English)" },
  { id: "panasonic-pt-lb356", brand: "Panasonic", model: "PT-LB356", brightness: 3300, resolution: "XGA · 1024 × 768", aspect: "4:3", throwMin: 1.48, throwMax: 1.78, screenMin: 30, screenMax: 300, lightSource: "Đèn UHM", category: "Phòng họp / lớp học", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/PT-LB356G_STR_01%28sec%29.pdf", price: 14700000, dataOrigin: "Panasonic PT-LB356 Spec File (English)" },
  { id: "panasonic-pt-lw376", brand: "Panasonic", model: "PT-LW376", brightness: 3600, resolution: "WXGA · 1280 × 800", aspect: "16:10", throwMin: 1.48, throwMax: 1.78, screenMin: 30, screenMax: 300, lightSource: "Đèn", category: "Phòng họp / lớp học", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/PT-LW376G_STR_01%28sec%29.pdf", price: 17200000, dataOrigin: "Panasonic PT-LW376 Spec File (English)" },
  { id: "panasonic-pt-lb426", brand: "Panasonic", model: "PT-LB426", brightness: 4100, resolution: "XGA · 1024 × 768", aspect: "4:3", throwMin: 1.48, throwMax: 1.78, screenMin: 30, screenMax: 300, lightSource: "Đèn UHM", category: "Phòng họp / lớp học", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/PT-LB426G_STR_01%28sec%29.pdf", price: 17850000, dataOrigin: "Panasonic PT-LB426 Spec File (English)" },
  { id: "panasonic-pt-vw360", brand: "Panasonic", model: "PT-VW360", brightness: 4000, resolution: "WXGA · 1280 × 800", aspect: "16:10", throwMin: 1.2, throwMax: 1.9, screenMin: 30, screenMax: 300, lightSource: "Đèn", category: "Phòng họp / doanh nghiệp", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/vw360_spec_en.pdf", price: 19200000, dataOrigin: "Panasonic PT-VW360 Spec File (English)" },
  { id: "panasonic-pt-vx430", brand: "Panasonic", model: "PT-VX430", brightness: 4500, resolution: "XGA · 1024 × 768", aspect: "4:3", throwMin: 1.2, throwMax: 1.9, screenMin: 40, screenMax: 300, lightSource: "Đèn", category: "Phòng họp / doanh nghiệp", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/vx430_spec_en.pdf", price: 21200000, dataOrigin: "Panasonic PT-VX430 Spec File (English)" },
  { id: "panasonic-pt-vz580", brand: "Panasonic", model: "PT-VZ580", brightness: 5000, resolution: "WUXGA · 1920 × 1200", aspect: "16:10", throwMin: 1.09, throwMax: 1.77, screenMin: 30, screenMax: 300, lightSource: "Đèn", category: "Không gian rộng", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/vz580_spec_en_2.pdf", price: 48800000, dataOrigin: "Panasonic PT-VZ580 Spec File (English)" },
  { id: "panasonic-pt-dx100ek", brand: "Panasonic", model: "PT-DX100EK", brightness: 10000, resolution: "XGA · 1024 × 768", aspect: "4:3", throwMin: null, throwMax: null, screenMin: 50, screenMax: 600, lightSource: "Đèn kép", category: "Hội trường / không gian lớn", source: "https://eu.connect.panasonic.com/pt/en/projectors/pt-dx100", price: null, dataOrigin: "Panasonic PT-DX100 product page · cần đối chiếu hậu tố EK" },
  { id: "panasonic-pt-lmz460", brand: "Panasonic", model: "PT-LMZ460", brightness: 4600, resolution: "WUXGA · 1920 × 1200", aspect: "16:10", throwMin: 1.36, throwMax: 1.64, screenMin: 30, screenMax: 300, lightSource: "Laser", category: "Phòng họp / doanh nghiệp", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/lmz460_spec_en_0.pdf", price: 44300000, dataOrigin: "Panasonic PT-LMZ460 Spec File (English)" },
  { id: "panasonic-pt-vmz51", brand: "Panasonic", model: "PT-VMZ51", brightness: 5200, resolution: "WUXGA · 1920 × 1200", aspect: "16:10", throwMin: 1.09, throwMax: 1.77, screenMin: 30, screenMax: 300, lightSource: "Laser", category: "Phòng họp / doanh nghiệp", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/vmz51_spec_en_0.pdf", price: 56500000, dataOrigin: "Panasonic PT-VMZ51 Spec File (English)" },
  { id: "panasonic-pt-vmz51s", brand: "Panasonic", model: "PT-VMZ51S", brightness: 5200, resolution: "WUXGA · 1920 × 1200", aspect: "16:10", throwMin: 1.09, throwMax: 1.77, screenMin: 30, screenMax: 300, lightSource: "Laser", category: "Phòng họp / doanh nghiệp", source: "https://eu.connect.panasonic.com/gb/en/projectors/pt-vmz71-series/pt-vmz51s", price: 54200000, dataOrigin: "Panasonic PT-VMZ51S product/spec page" },
  { id: "panasonic-pt-vmz62", brand: "Panasonic", model: "PT-VMZ62", brightness: 6500, resolution: "WUXGA · 1920 × 1200", aspect: "16:10", throwMin: 1.09, throwMax: 1.77, screenMin: 30, screenMax: 300, lightSource: "Laser", category: "Hội trường / doanh nghiệp", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-10/PT-VMZ62G_spec_en_0.pdf", price: null, dataOrigin: "Panasonic PT-VMZ62 Spec File (English)" },
  { id: "panasonic-pt-vmz72", brand: "Panasonic", model: "PT-VMZ72", brightness: 7200, resolution: "WUXGA · 1920 × 1200", aspect: "16:10", throwMin: 1.09, throwMax: 1.77, screenMin: 30, screenMax: 300, lightSource: "Laser", category: "Hội trường / doanh nghiệp", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-10/PT-VMZ72G_spec_en_2.pdf", price: null, dataOrigin: "Panasonic PT-VMZ72 Spec File (English)" },
  { id: "panasonic-pt-mz570", brand: "Panasonic", model: "PT-MZ570", brightness: 5500, resolution: "WUXGA · 1920 × 1200", aspect: "16:10", throwMin: 1.6, throwMax: 2.8, screenMin: 40, screenMax: 400, lightSource: "Laser", category: "Hội trường / phòng họp lớn", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/PT-MZ570G_STM_03%28sec%29_0.pdf", price: null, dataOrigin: "Panasonic PT-MZ570 Spec File (English) · lens tiêu chuẩn" },
  { id: "panasonic-pt-mz780", brand: "Panasonic", model: "PT-MZ780", brightness: 7000, resolution: "WUXGA · 1920 × 1200", aspect: "16:10", throwMin: 1.61, throwMax: 2.76, screenMin: 40, screenMax: 400, lightSource: "Laser", category: "Hội trường / phòng họp lớn", source: "https://eu.connect.panasonic.com/sites/default/files/media/document/2024-04/mz780_spec_en.pdf", price: null, dataOrigin: "Panasonic PT-MZ780 Spec File (English) · lens tiêu chuẩn" },
  { id: "panasonic-pt-mz882w", brand: "Panasonic", model: "PT-MZ882W", brightness: 8200, resolution: "WUXGA · 1920 × 1200", aspect: "16:10", throwMin: null, throwMax: null, screenMin: 40, screenMax: 400, lightSource: "Laser", category: "Hội trường / phòng họp lớn", source: "https://eu.connect.panasonic.com/gb/en/projectors/pt-mz882", price: null, dataOrigin: "Panasonic PT-MZ882 product page · cần đối chiếu hậu tố W/lens" },

  // Acer catalog imported from the supplied Word price list.
  { id: "acer-x1128h", brand: "Acer", model: "X1128H", brightness: 4800, resolution: "SVGA · 800 × 600", aspect: "4:3", throwMin: 1.94, throwMax: 2.16, screenMin: 23, screenMax: 300, lightSource: "Đèn 220 W", category: "Phòng họp / lớp học", source: "https://www.acer.com/si-en/projectors/meeting-room/pdp/MR.JTG11.001", price: 8800000, dataOrigin: "Acer X1128H Tech Specs" },
  { id: "acer-x1228h", brand: "Acer", model: "X1228H", brightness: 4800, resolution: "XGA · 1024 × 768", aspect: "4:3", throwMin: 1.94, throwMax: 2.16, screenMin: 23, screenMax: 300, lightSource: "Đèn 220 W", category: "Phòng họp / lớp học", source: "https://www.acer.com/gb-en/projectors/meeting-room/pdp/MR.JTH11.001", price: null, dataOrigin: "Acer X1228H Tech Specs" },
  { id: "acer-x128hp", brand: "Acer", model: "X128HP", brightness: 4000, resolution: "XGA · 1024 × 768", aspect: "4:3", throwMin: 1.94, throwMax: 2.16, screenMin: 23, screenMax: 300, lightSource: "Đèn", category: "Phòng họp / lớp học", source: "https://www.acer.com/gb-en/projectors/meeting-room/x128hp/pdp/MR.JR811.00Z", price: 10300000, dataOrigin: "Acer X128HP Tech Specs" },
  { id: "acer-p1257i", brand: "Acer", model: "P1257i", brightness: 4800, resolution: "XGA · 1024 × 768", aspect: "4:3", throwMin: 1.51, throwMax: 1.97, screenMin: 25, screenMax: 300, lightSource: "Đèn 203 W", category: "Phòng họp / wireless", source: "https://www.acer.com/gb-en/projectors/meeting-room/pdp/MR.JUR11.001", price: 13650000, dataOrigin: "Acer P1257i Tech Specs" },
  { id: "acer-h5386bdi", brand: "Acer", model: "H5386Bdi", brightness: 4500, resolution: "HD · 1280 × 720", aspect: "16:9", throwMin: 1.49, throwMax: 1.93, screenMin: 30, screenMax: 300, lightSource: "Đèn", category: "Home entertainment", source: "https://www.acer.com/acer-projectorcalculator", price: 13500000, dataOrigin: "Acer Projection Calculator · H5386BDi" },
  { id: "acer-pl2520i", brand: "Acer", model: "PL2520i", brightness: 4000, resolution: "Full HD · 1920 × 1080", aspect: "16:9", throwMin: 1.12, throwMax: 1.47, screenMin: 31, screenMax: 300, lightSource: "Laser Diode", category: "Doanh nghiệp / 24-7", source: "https://www.acer.com/gb-en/projectors/meeting-room/pdp/MR.JWG11.002", price: 31500000, dataOrigin: "Acer PL2520i Tech Specs" },
];

export const BRANDS = ["Panasonic", "Acer"];
