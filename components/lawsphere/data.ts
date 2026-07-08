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

/* ----------------------------- Conversation detail ----------------------------- */

export type LawyerMessage = {
  id: string
  from: "user" | "lawyer"
  text: string
  time: string
}

export type LawyerInfo = {
  online: boolean
  rating: number
  cases: number
  responseTime: string
}

export const lawyerInfo: Record<string, LawyerInfo> = {
  t1: { online: true, rating: 4.9, cases: 128, responseTime: "~15 phút" },
  t2: { online: false, rating: 4.8, cases: 96, responseTime: "~1 giờ" },
  t3: { online: true, rating: 5.0, cases: 210, responseTime: "~10 phút" },
  t4: { online: false, rating: 4.7, cases: 74, responseTime: "~2 giờ" },
}

export const threadMessages: Record<string, LawyerMessage[]> = {
  t1: [
    { id: "tm1", from: "lawyer", text: "Chào bạn, tôi là luật sư Trần Minh Khoa. Tôi đã nhận được yêu cầu tư vấn tranh chấp ranh giới đất của bạn.", time: "09:30" },
    { id: "tm2", from: "user", text: "Dạ chào luật sư, em cảm ơn ạ. Nhà em và hàng xóm đang tranh chấp phần đất khoảng 2 mét.", time: "09:32" },
    { id: "tm3", from: "lawyer", text: "Bạn cho tôi hỏi, hai bên đã có Giấy chứng nhận quyền sử dụng đất (sổ đỏ) chưa? Và ranh giới trên sổ có rõ ràng không?", time: "09:33" },
    { id: "tm4", from: "user", text: "Dạ nhà em có sổ đỏ rồi ạ, nhưng bên hàng xóm nói phần đất đó là của họ từ trước.", time: "09:35" },
    { id: "tm5", from: "lawyer", text: "Tôi hiểu rồi. Bạn vui lòng gửi cho tôi bản chụp sổ đỏ và sơ đồ thửa đất để tôi xem xét chi tiết nhé. Sau đó tôi sẽ tư vấn hướng giải quyết cụ thể.", time: "09:36" },
    { id: "tm6", from: "lawyer", text: "Luật sư đã nhận hồ sơ của bạn, tôi sẽ phản hồi chi tiết trong hôm nay.", time: "09:37" },
  ],
  t2: [
    { id: "tm1", from: "lawyer", text: "Chào bạn, về thủ tục ly hôn thuận tình, bạn cần chuẩn bị một số giấy tờ.", time: "Hôm qua" },
    { id: "tm2", from: "user", text: "Dạ luật sư cho em hỏi cần những gì ạ?", time: "Hôm qua" },
    { id: "tm3", from: "lawyer", text: "Bạn vui lòng gửi thêm bản sao giấy đăng ký kết hôn nhé.", time: "Hôm qua" },
  ],
  t3: [
    { id: "tm1", from: "user", text: "Chào luật sư, em cần rà soát hợp đồng hợp tác kinh doanh ạ.", time: "08:10" },
    { id: "tm2", from: "lawyer", text: "Chào bạn, bạn gửi file hợp đồng qua đây giúp tôi nhé.", time: "08:12" },
    { id: "tm3", from: "lawyer", text: "Hợp đồng đã được rà soát xong, mời bạn xem lại. Tôi có ghi chú một số điều khoản rủi ro ở mục 5 và 7.", time: "08:45" },
  ],
  t4: [
    { id: "tm1", from: "lawyer", text: "Cảm ơn bạn đã tin tưởng dịch vụ tư vấn của chúng tôi.", time: "12/06" },
  ],
}

/* ----------------------------- Library document detail ----------------------------- */

export type DocArticle = { heading: string; body: string[] }

export type DocDetail = {
  id: string
  number: string
  issuer: string
  effectiveDate: string
  field: string
  summary: string
  articles: DocArticle[]
  related: { id: string; title: string }[]
}

export const docDetails: Record<string, DocDetail> = {
  d1: {
    id: "d1",
    number: "45/2019/QH14",
    issuer: "Quốc hội",
    effectiveDate: "01/01/2021",
    field: "Lao động",
    summary:
      "Bộ luật Lao động 2019 quy định tiêu chuẩn lao động; quyền, nghĩa vụ, trách nhiệm của người lao động, người sử dụng lao động trong quan hệ lao động.",
    articles: [
      {
        heading: "Điều 1. Phạm vi điều chỉnh",
        body: [
          "Bộ luật Lao động quy định tiêu chuẩn lao động; quyền, nghĩa vụ, trách nhiệm của người lao động, người sử dụng lao động, tổ chức đại diện người lao động tại cơ sở, tổ chức đại diện người sử dụng lao động trong quan hệ lao động và các quan hệ khác liên quan trực tiếp đến quan hệ lao động.",
        ],
      },
      {
        heading: "Điều 5. Quyền và nghĩa vụ của người lao động",
        body: [
          "1. Người lao động có các quyền sau đây: làm việc; tự do lựa chọn việc làm, nơi làm việc, nghề nghiệp; không bị phân biệt đối xử, cưỡng bức lao động, quấy rối tình dục tại nơi làm việc.",
          "2. Người lao động có các nghĩa vụ sau đây: thực hiện hợp đồng lao động, thỏa ước lao động tập thể và thỏa thuận hợp pháp khác; chấp hành kỷ luật lao động, nội quy lao động.",
        ],
      },
      {
        heading: "Điều 90. Tiền lương",
        body: [
          "1. Tiền lương là số tiền mà người sử dụng lao động trả cho người lao động theo thỏa thuận để thực hiện công việc, bao gồm mức lương theo công việc hoặc chức danh, phụ cấp lương và các khoản bổ sung khác.",
          "2. Mức lương theo công việc hoặc chức danh không được thấp hơn mức lương tối thiểu.",
        ],
      },
    ],
    related: [
      { id: "d2", title: "Luật Doanh nghiệp 2020 (59/2020/QH14)" },
      { id: "d3", title: "Nghị định 123/2020/NĐ-CP về hóa đơn" },
    ],
  },
  d2: {
    id: "d2",
    number: "59/2020/QH14",
    issuer: "Quốc hội",
    effectiveDate: "01/01/2021",
    field: "Doanh nghiệp",
    summary:
      "Luật Doanh nghiệp 2020 quy định về việc thành lập, tổ chức quản lý, tổ chức lại, giải thể và hoạt động có liên quan của doanh nghiệp.",
    articles: [
      {
        heading: "Điều 1. Phạm vi điều chỉnh",
        body: [
          "Luật này quy định về việc thành lập, tổ chức quản lý, tổ chức lại, giải thể và hoạt động có liên quan của doanh nghiệp, bao gồm công ty trách nhiệm hữu hạn, công ty cổ phần, công ty hợp danh và doanh nghiệp tư nhân.",
        ],
      },
      {
        heading: "Điều 17. Quyền thành lập, góp vốn, mua cổ phần",
        body: [
          "1. Tổ chức, cá nhân có quyền thành lập và quản lý doanh nghiệp tại Việt Nam theo quy định của Luật này, trừ trường hợp quy định tại khoản 2 Điều này.",
        ],
      },
    ],
    related: [{ id: "d1", title: "Bộ luật Lao động 2019 (45/2019/QH14)" }],
  },
}

export const fallbackDoc: DocDetail = {
  id: "unknown",
  number: "—",
  issuer: "Cơ quan ban hành",
  effectiveDate: "—",
  field: "Pháp luật",
  summary: "Nội dung chi tiết của văn bản đang được cập nhật vào hệ thống thư viện pháp luật.",
  articles: [
    {
      heading: "Điều 1. Phạm vi điều chỉnh",
      body: ["Nội dung điều khoản đang được số hóa và sẽ sớm hiển thị đầy đủ trong thư viện."],
    },
  ],
  related: [],
}

/* ----------------------------- Activity case detail ----------------------------- */

export type CaseEvent = { title: string; date: string; done: boolean }

export type CaseDetail = {
  id: string
  description: string
  lawyer: { name: string; specialty: string; initials: string; color: string } | null
  documents: { name: string; size: string }[]
  timeline: CaseEvent[]
}

export const caseDetails: Record<string, CaseDetail> = {
  c1: {
    id: "c1",
    description:
      "Yêu cầu soạn thảo hợp đồng thuê nhà ở dài hạn giữa bên cho thuê và bên thuê, đảm bảo đầy đủ điều khoản về giá thuê, thời hạn, đặt cọc và quyền chấm dứt hợp đồng.",
    lawyer: { name: "LS. Trần Minh Khoa", specialty: "Luật sư Đất đai", initials: "TK", color: "#2854A8" },
    documents: [
      { name: "Yeu-cau-thue-nha.pdf", size: "240 KB" },
      { name: "CMND-ben-thue.jpg", size: "1.2 MB" },
    ],
    timeline: [
      { title: "Gửi yêu cầu dịch vụ", date: "18/06/2024 · 09:00", done: true },
      { title: "Luật sư tiếp nhận hồ sơ", date: "18/06/2024 · 11:30", done: true },
      { title: "Đang soạn thảo & rà soát hợp đồng", date: "Đang thực hiện", done: false },
      { title: "Bàn giao bản hoàn chỉnh", date: "Dự kiến 22/06/2024", done: false },
    ],
  },
  c2: {
    id: "c2",
    description:
      "Tư vấn hướng giải quyết tranh chấp ranh giới đất với hộ liền kề, bao gồm phân tích hồ sơ pháp lý và đề xuất phương án hòa giải hoặc khởi kiện.",
    lawyer: { name: "LS. Trần Minh Khoa", specialty: "Luật sư Đất đai", initials: "TK", color: "#2854A8" },
    documents: [{ name: "So-do-thua-dat.pdf", size: "560 KB" }],
    timeline: [
      { title: "Gửi yêu cầu tư vấn", date: "15/06/2024 · 14:00", done: true },
      { title: "Luật sư tiếp nhận", date: "15/06/2024 · 16:20", done: true },
      { title: "Đang phân tích hồ sơ", date: "Đang thực hiện", done: false },
      { title: "Gửi kết luận tư vấn", date: "Chưa bắt đầu", done: false },
    ],
  },
  c3: {
    id: "c3",
    description:
      "Hỗ trợ hoàn thiện thủ tục ly hôn thuận tình, chuẩn bị đơn và các giấy tờ cần thiết để nộp tòa án nhân dân có thẩm quyền.",
    lawyer: { name: "LS. Nguyễn Thị Hương", specialty: "Luật sư Hôn nhân", initials: "NH", color: "#82ACDB" },
    documents: [
      { name: "Don-ly-hon-thuan-tinh.pdf", size: "180 KB" },
      { name: "Giay-dang-ky-ket-hon.jpg", size: "980 KB" },
    ],
    timeline: [
      { title: "Gửi yêu cầu trợ giúp", date: "10/06/2024 · 08:00", done: true },
      { title: "Luật sư tiếp nhận", date: "10/06/2024 · 10:00", done: true },
      { title: "Hoàn thiện & nộp hồ sơ", date: "12/06/2024", done: true },
      { title: "Hoàn thành", date: "14/06/2024", done: true },
    ],
  },
  c4: {
    id: "c4",
    description:
      "Đăng ký bảo hộ nhãn hiệu cho sản phẩm kinh doanh, bao gồm tra cứu khả năng bảo hộ và nộp đơn tại Cục Sở hữu trí tuệ.",
    lawyer: null,
    documents: [{ name: "Mau-nhan-hieu.png", size: "420 KB" }],
    timeline: [
      { title: "Gửi yêu cầu dịch vụ", date: "21/06/2024 · 15:30", done: true },
      { title: "Đang chờ luật sư tiếp nhận", date: "Chưa bắt đầu", done: false },
      { title: "Tra cứu & nộp đơn", date: "Chưa bắt đầu", done: false },
      { title: "Hoàn thành", date: "Chưa bắt đầu", done: false },
    ],
  },
}

/* ----------------------------- User profile ----------------------------- */

export type UserProfile = {
  name: string
  email: string
  phone: string
  address: string
  dob: string
}

export const userProfile: UserProfile = {
  name: "Ace Nguyen",
  email: "ace.nguyen@lawsphere.vn",
  phone: "0901 234 567",
  address: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  dob: "12/08/1995",
}
