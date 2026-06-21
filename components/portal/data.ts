export type VettingStatus = "active" | "pending" | "locked"

export type Lawyer = {
  id: string
  name: string
  email: string
  license: string
  status: VettingStatus
}

export const lawyers: Lawyer[] = [
  { id: "LS-2041", name: "Trần Minh Quân", email: "quan.tran@lawsphere.vn", license: "HCM-08821", status: "pending" },
  { id: "LS-2040", name: "Nguyễn Thị Hồng", email: "hong.nguyen@lawsphere.vn", license: "HN-04510", status: "pending" },
  { id: "LS-2039", name: "Lê Hoàng Phúc", email: "phuc.le@lawsphere.vn", license: "DN-01277", status: "active" },
  { id: "LS-2038", name: "Phạm Anh Tuấn", email: "tuan.pham@lawsphere.vn", license: "HCM-08134", status: "active" },
  { id: "LS-2037", name: "Vũ Thùy Linh", email: "linh.vu@lawsphere.vn", license: "HN-04388", status: "pending" },
  { id: "LS-2036", name: "Đỗ Quốc Việt", email: "viet.do@lawsphere.vn", license: "CT-00921", status: "locked" },
  { id: "LS-2035", name: "Bùi Khánh Vân", email: "van.bui@lawsphere.vn", license: "HCM-07765", status: "active" },
]

export const vettingStatusMeta: Record<VettingStatus, { label: string; className: string }> = {
  active: { label: "Hoạt động", className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" },
  pending: { label: "Chờ duyệt", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
  locked: { label: "Tạm khóa", className: "bg-red-50 text-red-700 ring-1 ring-red-200" },
}

// System metrics time series
export const requestSeries = [
  { time: "08:00", requests: 320, latency: 410 },
  { time: "10:00", requests: 540, latency: 380 },
  { time: "12:00", requests: 760, latency: 520 },
  { time: "14:00", requests: 690, latency: 460 },
  { time: "16:00", requests: 880, latency: 610 },
  { time: "18:00", requests: 640, latency: 430 },
  { time: "20:00", requests: 410, latency: 390 },
]

export const indexingLoadSeries = [
  { day: "T2", load: 42 },
  { day: "T3", load: 65 },
  { day: "T4", load: 58 },
  { day: "T5", load: 81 },
  { day: "T6", load: 74 },
  { day: "T7", load: 36 },
  { day: "CN", load: 24 },
]

export type DocStatus = "valid" | "expired"

export type LawDoc = {
  id: string
  title: string
  category: string
  uploadedAt: string
  status: DocStatus
  indexing: { mongo: boolean; qdrant: boolean; bm25: boolean }
  meta: {
    number: string
    issuer: string
    signatory: string
    issuedDate: string
    effectiveDate: string
  }
  chunks: { id: string; content: string; chars: number; qdrant: boolean; bm25: boolean }[]
  stats: { totalQueries: number; weeklyQueries: number; retrievals: number; avgLatency: number; folderPath: string; processSpeed: string }
  ascii: string
}

export const documents: LawDoc[] = [
  {
    id: "VB-1042",
    title: "Nghị định 81/2021/NĐ-CP về học phí",
    category: "Giáo dục",
    uploadedAt: "12/06/2026",
    status: "valid",
    indexing: { mongo: true, qdrant: true, bm25: true },
    meta: {
      number: "81/2021/NĐ-CP",
      issuer: "Chính phủ",
      signatory: "Phạm Minh Chính",
      issuedDate: "27/08/2021",
      effectiveDate: "15/10/2021",
    },
    chunks: [
      { id: "vec_8a21f", content: "Điều 9. Mức trần học phí đối với cơ sở giáo dục đại học công lập chưa tự bảo đảm chi thường xuyên...", chars: 612, qdrant: true, bm25: true },
      { id: "vec_8a22c", content: "Điều 10. Lộ trình tăng học phí được quy định theo từng năm học, không vượt quá tỷ lệ trần...", chars: 548, qdrant: true, bm25: true },
      { id: "vec_8a23d", content: "Điều 11. Chính sách miễn, giảm học phí áp dụng cho các đối tượng thuộc diện ưu tiên...", chars: 503, qdrant: true, bm25: false },
    ],
    stats: { totalQueries: 1840, weeklyQueries: 214, retrievals: 962, avgLatency: 438, folderPath: "/corpus/giao-duc/nd-81-2021", processSpeed: "1420 chunks/4.2s" },
    ascii: [
      "┌─────────────────────┐",
      "│  Nộp hồ sơ học phí  │",
      "└──────────┬──────────┘",
      "           ▼",
      "┌─────────────────────┐",
      "│  Xác định mức trần  │",
      "└──────────┬──────────┘",
      "           ▼",
      "┌─────────────────────┐",
      "│  Áp lộ trình tăng   │",
      "└─────────────────────┘",
    ].join("\n"),
  },
  {
    id: "VB-1039",
    title: "Luật Doanh nghiệp 2020",
    category: "Doanh nghiệp",
    uploadedAt: "09/06/2026",
    status: "valid",
    indexing: { mongo: true, qdrant: true, bm25: false },
    meta: {
      number: "59/2020/QH14",
      issuer: "Quốc hội",
      signatory: "Nguyễn Thị Kim Ngân",
      issuedDate: "17/06/2020",
      effectiveDate: "01/01/2021",
    },
    chunks: [
      { id: "vec_5c01a", content: "Điều 17. Quyền thành lập, góp vốn, mua cổ phần và quản lý doanh nghiệp...", chars: 489, qdrant: true, bm25: false },
      { id: "vec_5c02b", content: "Điều 24. Nội dung Điều lệ công ty bao gồm tên, địa chỉ trụ sở chính...", chars: 521, qdrant: true, bm25: false },
    ],
    stats: { totalQueries: 3120, weeklyQueries: 402, retrievals: 1788, avgLatency: 392, folderPath: "/corpus/doanh-nghiep/luat-dn-2020", processSpeed: "2210 chunks/6.8s" },
    ascii: [
      "┌──────────────────┐",
      "│  Đăng ký DN      │",
      "└────────┬─────────┘",
      "         ▼",
      "┌──────────────────┐",
      "│  Cấp GCN ĐKDN    │",
      "└──────────────────┘",
    ].join("\n"),
  },
  {
    id: "VB-1021",
    title: "Thông tư 40/2021/TT-BTC (hết hiệu lực)",
    category: "Thuế",
    uploadedAt: "01/06/2026",
    status: "expired",
    indexing: { mongo: true, qdrant: false, bm25: false },
    meta: {
      number: "40/2021/TT-BTC",
      issuer: "Bộ Tài chính",
      signatory: "Trần Xuân Hà",
      issuedDate: "01/06/2021",
      effectiveDate: "01/08/2021",
    },
    chunks: [
      { id: "vec_3b11a", content: "Điều 4. Nguyên tắc tính thuế đối với hộ kinh doanh, cá nhân kinh doanh...", chars: 467, qdrant: false, bm25: false },
    ],
    stats: { totalQueries: 980, weeklyQueries: 41, retrievals: 320, avgLatency: 510, folderPath: "/corpus/thue/tt-40-2021", processSpeed: "640 chunks/2.1s" },
    ascii: [
      "┌──────────────────┐",
      "│  Khai thuế hộ KD │",
      "└──────────────────┘",
    ].join("\n"),
  },
]

export const categories = ["Tất cả", "Giáo dục", "Doanh nghiệp", "Thuế", "Đất đai", "Lao động"]
export const validityFilters = ["Tất cả", "Còn hiệu lực", "Hết hiệu lực"]

// RAG test citations
export const ragCitations = [
  { docId: "VB-1042", title: "Nghị định 81/2021/NĐ-CP về học phí", score: 0.92, chunkId: "vec_8a21f" },
  { docId: "VB-1042", title: "Nghị định 81/2021/NĐ-CP về học phí", score: 0.87, chunkId: "vec_8a22c" },
  { docId: "VB-1039", title: "Luật Doanh nghiệp 2020", score: 0.71, chunkId: "vec_5c01a" },
]

// Lawyer desk data
export type Urgent = {
  id: string
  client: string
  subject: string
  status: "Mới" | "Khẩn cấp" | "Chờ phản hồi"
  expiresIn: string
}

export const urgentRequests: Urgent[] = [
  { id: "REQ-5521", client: "Hoàng Văn Nam", subject: "Tranh chấp hợp đồng thuê nhà", status: "Khẩn cấp", expiresIn: "Còn 2 giờ" },
  { id: "REQ-5519", client: "Lý Thị Mai", subject: "Tư vấn ly hôn & quyền nuôi con", status: "Mới", expiresIn: "Còn 6 giờ" },
  { id: "REQ-5517", client: "Công ty TNHH An Phát", subject: "Soạn thảo hợp đồng lao động", status: "Chờ phản hồi", expiresIn: "Còn 1 ngày" },
]

export type ChatMsg = { id: string; from: "lawyer" | "client"; text: string; time: string }

export const conversation: ChatMsg[] = [
  { id: "m1", from: "client", text: "Chào luật sư, tôi đang gặp tranh chấp với chủ nhà về tiền cọc.", time: "09:12" },
  { id: "m2", from: "lawyer", text: "Chào anh Nam. Anh có thể cho tôi biết hợp đồng thuê có điều khoản về hoàn cọc không?", time: "09:14" },
  { id: "m3", from: "client", text: "Có ạ, hợp đồng ghi hoàn cọc sau 7 ngày nhưng chủ nhà không trả.", time: "09:15" },
  { id: "m4", from: "lawyer", text: "Anh vui lòng gửi bản scan hợp đồng để tôi xem chi tiết điều khoản nhé.", time: "09:16" },
]

export const activeCase = {
  requestId: "REQ-5521",
  client: { name: "Hoàng Văn Nam", email: "nam.hoang@email.vn", phone: "0901 234 567", location: "Quận 3, TP.HCM" },
  documents: [
    { name: "Hop-dong-thue-nha.pdf", size: "1.2 MB" },
    { name: "Bien-ban-ban-giao.pdf", size: "640 KB" },
  ],
  milestones: [
    { label: "Yêu cầu đã gửi", done: true },
    { label: "Luật sư chấp nhận", done: true },
    { label: "Đang tư vấn", done: true },
    { label: "Hoàn thành", done: false },
  ],
}
