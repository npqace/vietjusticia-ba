export type Citation = {
  id: string
  label: string
  title: string
  issuer: string
  content: string[]
  flow: { step: string; note: string }[]
}

export type ChatMessage = {
  id: string
  role: "user" | "bot"
  text: string
  citations?: Citation[]
}

export const citations: Record<string, Citation> = {
  "nd-123": {
    id: "nd-123",
    label: "Nghị định 123/2020/NĐ-CP",
    title: "Nghị định 123/2020/NĐ-CP về hóa đơn, chứng từ",
    issuer: "Chính phủ ban hành ngày 19/10/2020",
    content: [
      "Điều 4. Nguyên tắc lập, quản lý, sử dụng hóa đơn, chứng từ",
      "1. Khi bán hàng hóa, cung cấp dịch vụ, người bán phải lập hóa đơn để giao cho người mua, bao gồm cả các trường hợp hàng hóa, dịch vụ dùng để khuyến mại, quảng cáo, hàng mẫu.",
      "2. Hóa đơn điện tử phải được lập theo định dạng chuẩn dữ liệu của cơ quan thuế và phải ghi đầy đủ nội dung theo quy định.",
      "3. Người bán phải thực hiện đăng ký sử dụng hóa đơn điện tử với cơ quan thuế trước khi đưa vào sử dụng.",
    ],
    flow: [
      { step: "Đăng ký", note: "Nộp tờ khai sử dụng HĐĐT" },
      { step: "Phê duyệt", note: "Cơ quan thuế tiếp nhận" },
      { step: "Lập hóa đơn", note: "Theo định dạng chuẩn" },
      { step: "Lưu trữ", note: "Truyền dữ liệu về cơ quan thuế" },
    ],
  },
  "lqd-2013": {
    id: "lqd-2013",
    label: "Luật Đất đai 2013",
    title: "Luật Đất đai số 45/2013/QH13",
    issuer: "Quốc hội ban hành ngày 29/11/2013",
    content: [
      "Điều 188. Điều kiện thực hiện quyền chuyển nhượng quyền sử dụng đất",
      "1. Người sử dụng đất được thực hiện quyền chuyển nhượng khi có đủ các điều kiện sau đây:",
      "a) Có Giấy chứng nhận quyền sử dụng đất;",
      "b) Đất không có tranh chấp;",
      "c) Quyền sử dụng đất không bị kê biên để bảo đảm thi hành án;",
      "d) Trong thời hạn sử dụng đất.",
    ],
    flow: [
      { step: "Hồ sơ", note: "Chuẩn bị giấy tờ đất" },
      { step: "Công chứng", note: "Ký hợp đồng chuyển nhượng" },
      { step: "Nộp thuế", note: "Thuế thu nhập & lệ phí" },
      { step: "Sang tên", note: "Văn phòng đăng ký đất đai" },
    ],
  },
}

export const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "bot",
    text: "Xin chào! Tôi là Trợ lý AI Luật Sư của LawSphere. Bạn có thể hỏi tôi về các quy định pháp luật, thủ tục hành chính hoặc tra cứu văn bản. Tôi sẽ trả lời kèm theo trích dẫn nguồn chính thống.",
  },
  {
    id: "m2",
    role: "user",
    text: "Khi bán hàng online tôi có bắt buộc phải xuất hóa đơn điện tử không?",
  },
  {
    id: "m3",
    role: "bot",
    text: "Có. Theo quy định hiện hành, khi bán hàng hóa hoặc cung cấp dịch vụ, người bán bắt buộc phải lập hóa đơn điện tử giao cho người mua, kể cả với hàng khuyến mại hay hàng mẫu. Bạn cần đăng ký sử dụng hóa đơn điện tử với cơ quan thuế trước khi xuất hóa đơn.",
    citations: [citations["nd-123"]],
  },
  {
    id: "m4",
    role: "user",
    text: "Vậy thủ tục chuyển nhượng quyền sử dụng đất cần điều kiện gì?",
  },
  {
    id: "m5",
    role: "bot",
    text: "Để chuyển nhượng quyền sử dụng đất, bạn cần có Giấy chứng nhận quyền sử dụng đất (sổ đỏ), đất không có tranh chấp, không bị kê biên thi hành án và còn trong thời hạn sử dụng. Đáp ứng đủ các điều kiện này bạn mới được công chứng và sang tên.",
    citations: [citations["lqd-2013"]],
  },
]

export type Thread = {
  id: string
  name: string
  specialty: string
  preview: string
  time: string
  unread: number
  initials: string
  color: string
}

export const threads: Thread[] = [
  {
    id: "t1",
    name: "LS. Trần Minh Khoa",
    specialty: "Luật sư Đất đai",
    preview: "Luật sư đã nhận hồ sơ của bạn, tôi sẽ phản hồi chi tiết...",
    time: "2 giờ trước",
    unread: 2,
    initials: "TK",
    color: "#2854A8",
  },
  {
    id: "t2",
    name: "LS. Nguyễn Thị Hương",
    specialty: "Luật sư Hôn nhân",
    preview: "Bạn vui lòng gửi thêm bản sao giấy đăng ký kết hôn nhé.",
    time: "Hôm qua",
    unread: 0,
    initials: "NH",
    color: "#82ACDB",
  },
  {
    id: "t3",
    name: "LS. Phạm Quốc Đạt",
    specialty: "Luật sư Doanh nghiệp",
    preview: "Hợp đồng đã được rà soát xong, mời bạn xem lại.",
    time: "Hôm qua",
    unread: 5,
    initials: "PĐ",
    color: "#2854A8",
  },
  {
    id: "t4",
    name: "LS. Lê Hoàng Yến",
    specialty: "Luật sư Lao động",
    preview: "Cảm ơn bạn đã tin tưởng dịch vụ tư vấn của chúng tôi.",
    time: "12/06",
    unread: 0,
    initials: "LY",
    color: "#82ACDB",
  },
]

export type LawDoc = {
  id: string
  title: string
  date: string
  active: boolean
}

export const lawDocs: LawDoc[] = [
  { id: "d1", title: "Bộ luật Lao động 2019 (45/2019/QH14)", date: "Ban hành: 20/11/2019", active: true },
  { id: "d2", title: "Luật Doanh nghiệp 2020 (59/2020/QH14)", date: "Ban hành: 17/06/2020", active: true },
  { id: "d3", title: "Nghị định 123/2020/NĐ-CP về hóa đơn", date: "Ban hành: 19/10/2020", active: true },
  { id: "d4", title: "Luật Đầu tư 2014 (67/2014/QH13)", date: "Ban hành: 26/11/2014", active: false },
  { id: "d5", title: "Luật Đất đai 2013 (45/2013/QH13)", date: "Ban hành: 29/11/2013", active: false },
]

export const procedures: LawDoc[] = [
  { id: "p1", title: "Đăng ký thành lập doanh nghiệp tư nhân", date: "Cập nhật: 03/2024", active: true },
  { id: "p2", title: "Cấp đổi Giấy chứng nhận quyền sử dụng đất", date: "Cập nhật: 01/2024", active: true },
  { id: "p3", title: "Đăng ký kết hôn có yếu tố nước ngoài", date: "Cập nhật: 11/2023", active: true },
  { id: "p4", title: "Xin cấp phiếu lý lịch tư pháp số 1", date: "Cập nhật: 09/2023", active: true },
]

export type CaseStatus = "Đang chờ" | "Đã nhận" | "Đang giải quyết" | "Hoàn thành"

export const caseSteps: CaseStatus[] = ["Đang chờ", "Đã nhận", "Đang giải quyết", "Hoàn thành"]

export type CaseRequest = {
  id: string
  title: string
  date: string
  status: CaseStatus
  category: "Dịch vụ" | "Tư vấn" | "Trợ giúp"
}

export const caseRequests: CaseRequest[] = [
  {
    id: "c1",
    title: "Soạn thảo hợp đồng thuê nhà",
    date: "Tạo ngày 18/06/2024",
    status: "Đang giải quyết",
    category: "Dịch vụ",
  },
  {
    id: "c2",
    title: "Tư vấn tranh chấp ranh giới đất",
    date: "Tạo ngày 15/06/2024",
    status: "Đã nhận",
    category: "Tư vấn",
  },
  {
    id: "c3",
    title: "Hỗ trợ thủ tục ly hôn thuận tình",
    date: "Tạo ngày 10/06/2024",
    status: "Hoàn thành",
    category: "Trợ giúp",
  },
  {
    id: "c4",
    title: "Đăng ký bảo hộ nhãn hiệu",
    date: "Tạo ngày 21/06/2024",
    status: "Đang chờ",
    category: "Dịch vụ",
  },
]
