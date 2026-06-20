export const CASE_ID = "CF-2026-0147";
export const CASE_TITLE = "The Riverside Incident";

export type MonitorAppId =
  | "case-files"
  | "police-database"
  | "cctv-archive"
  | "email"
  | "timeline";

export type PhoneAppId = "messages" | "photos" | "calls";

export type DocumentCategory =
  | "police-reports"
  | "witness-statements"
  | "medical-reports"
  | "notes";

export type BoardCardType = "suspect" | "evidence" | "location" | "question";

export type BoardCard = {
  id: string;
  type: BoardCardType;
  title: string;
  subtitle: string;
  x: number;
  y: number;
};

export type ValidConnection = {
  a: string;
  b: string;
  clueId: string;
  clueTitle: string;
};

export const MONITOR_APPS: {
  id: MonitorAppId;
  name: string;
  color: string;
}[] = [
  { id: "case-files", name: "Case Files", color: "#4fc3f7" },
  { id: "police-database", name: "Police Database", color: "#81c784" },
  { id: "cctv-archive", name: "CCTV Archive", color: "#ffb74d" },
  { id: "email", name: "Email", color: "#ce93d8" },
  { id: "timeline", name: "Timeline", color: "#ef5350" },
];

export const SUSPECTS = [
  { id: "s1", name: "Elena Voss", status: "Person of Interest", notes: "Last seen near warehouse district." },
  { id: "s2", name: "Marcus Hale", status: "Witness", notes: "Alibi unverified for 22:00–23:30." },
  { id: "s3", name: "Unknown Caller", status: "Unidentified", notes: "Burner phone linked to scene." },
];

export const CCTV_CAMERAS = [
  { id: "c1", label: "CAM-04 Warehouse Gate", locked: false },
  { id: "c2", label: "CAM-07 Riverside Walk", locked: true },
  { id: "c3", label: "CAM-12 Parking Structure", locked: true },
  { id: "c4", label: "CAM-19 Alley Exit", locked: true },
];

export const EMAILS = [
  { id: "e1", from: "Det. Walsh", subject: "Preliminary findings", preview: "Review attached incident summary...", unread: true },
  { id: "e2", from: "Forensics Lab", subject: "Sample analysis pending", preview: "Results expected within 48hrs.", unread: true },
  { id: "e3", from: "Dispatch", subject: "Night shift log", preview: "Unit 14 responded at 22:41.", unread: false },
];

export const TIMELINE_EVENTS = [
  { time: "21:15", event: "Victim last confirmed sighting — Riverside Café" },
  { time: "22:41", event: "Emergency call logged — warehouse district" },
  { time: "23:05", event: "First responder on scene" },
  { time: "—", event: "Awaiting additional entries..." },
];

export const CONVERSATIONS = [
  {
    id: "conv1",
    name: "Det. Walsh",
    preview: "Check the warehouse footage",
    unread: 2,
    messages: [
      { id: "m1", from: "them", text: "Check the warehouse footage when you get in.", time: "21:02" },
      { id: "m2", from: "me", text: "On it. Anything else from forensics?", time: "21:04" },
      { id: "m3", from: "them", text: "Not yet. Keep the phone on silent — press is circling.", time: "21:06" },
    ],
  },
  {
    id: "conv2",
    name: "Unknown",
    preview: "You shouldn't have gone there",
    unread: 1,
    locked: true,
    messages: [
      { id: "m4", from: "them", text: "You shouldn't have gone there.", time: "23:18" },
    ],
  },
  {
    id: "conv3",
    name: "Lab — Forensics",
    preview: "Sample tagged and queued",
    unread: 0,
    messages: [
      { id: "m5", from: "them", text: "Sample tagged and queued for analysis.", time: "20:30" },
      { id: "m6", from: "me", text: "Thanks. Priority flag on this one.", time: "20:32" },
    ],
  },
];

export const PHOTOS = [
  { id: "p1", label: "Scene — Entry Point", color: "#1a3a4a" },
  { id: "p2", label: "Evidence Tag #A12", color: "#2a4a3a" },
  { id: "p3", label: "Warehouse Exterior", color: "#3a3a2a" },
  { id: "p4", label: "Footprint Cast", color: "#4a2a3a" },
  { id: "p5", label: "Street Camera Still", color: "#2a3a4a" },
  { id: "p6", label: "Personal Effects", color: "#3a4a3a" },
];

export const CALLS = [
  { id: "call1", name: "Det. Walsh", type: "outgoing" as const, time: "21:01", duration: "4:22" },
  { id: "call2", name: "Unknown Number", type: "missed" as const, time: "23:17", duration: "—" },
  { id: "call3", name: "Forensics Lab", type: "incoming" as const, time: "20:28", duration: "1:45" },
  { id: "call4", name: "Blocked ID", type: "missed" as const, time: "00:04", duration: "—" },
];

export type CaseDocument = {
  id: string;
  category: DocumentCategory;
  title: string;
  caseNumber: string;
  date: string;
  body: string[];
  stamp?: string;
};

export const DOCUMENTS: CaseDocument[] = [
  {
    id: "doc-pr-1",
    category: "police-reports",
    title: "Incident Report #8821",
    caseNumber: CASE_ID,
    date: "2026-06-18",
    stamp: "RECEIVED",
    body: [
      "Officer: Det. Walsh | Unit 14",
      "Location: Warehouse District, Block 7",
      "Summary: Responding officers found forced entry at rear loading bay.",
      "Status: Open — pending forensic review.",
    ],
  },
  {
    id: "doc-pr-2",
    category: "police-reports",
    title: "Scene Processing Log",
    caseNumber: CASE_ID,
    date: "2026-06-18",
    body: [
      "Evidence items catalogued: 12",
      "Photography complete: 22:55 hrs",
      "Perimeter secured until 01:30 hrs.",
    ],
  },
  {
    id: "doc-ws-1",
    category: "witness-statements",
    title: "Statement — J. Morrison",
    caseNumber: CASE_ID,
    date: "2026-06-19",
    stamp: "VERIFIED",
    body: [
      "Witness reports hearing raised voices near the river walk.",
      "Approximate time: 22:30–22:45.",
      "Could not identify speakers. Rain obscured visibility.",
    ],
  },
  {
    id: "doc-ws-2",
    category: "witness-statements",
    title: "Statement — Night Guard",
    caseNumber: CASE_ID,
    date: "2026-06-19",
    body: [
      "Security guard observed vehicle leaving alley at high speed.",
      "Partial plate recorded: [REDACTED]",
    ],
  },
  {
    id: "doc-mr-1",
    category: "medical-reports",
    title: "Preliminary Medical Summary",
    caseNumber: CASE_ID,
    date: "2026-06-19",
    stamp: "CONFIDENTIAL",
    body: [
      "Coroner: Dr. Hayes",
      "Classification: Pending full autopsy.",
      "Preliminary time of incident estimated: 22:00–23:00.",
    ],
  },
  {
    id: "doc-n-1",
    category: "notes",
    title: "Field Notes — Night Shift",
    caseNumber: CASE_ID,
    date: "2026-06-20",
    body: [
      "Follow up on warehouse CCTV access.",
      "Cross-reference unknown burner number.",
      "Re-interview Morrison re: timeline discrepancy.",
    ],
  },
];

export const BOARD_CARDS: BoardCard[] = [
  { id: "card-s1", type: "suspect", title: "Elena Voss", subtitle: "POI", x: 12, y: 18 },
  { id: "card-s2", type: "suspect", title: "Marcus Hale", subtitle: "Witness", x: 68, y: 14 },
  { id: "card-e1", type: "evidence", title: "Footprint", subtitle: "Size 11", x: 38, y: 38 },
  { id: "card-e2", type: "evidence", title: "Burner Phone", subtitle: "Unknown SIM", x: 14, y: 58 },
  { id: "card-l1", type: "location", title: "Warehouse", subtitle: "Block 7", x: 58, y: 52 },
  { id: "card-l2", type: "location", title: "River Walk", subtitle: "CAM-07", x: 42, y: 72 },
  { id: "card-q1", type: "question", title: "Who called?", subtitle: "23:17", x: 72, y: 68 },
  { id: "card-q2", type: "question", title: "Alibi gap?", subtitle: "22:00–23:30", x: 28, y: 78 },
];

export const VALID_CONNECTIONS: ValidConnection[] = [
  { a: "card-e2", b: "card-q1", clueId: "clue-caller", clueTitle: "Burner linked to unknown caller" },
  { a: "card-e1", b: "card-s1", clueId: "clue-footprint", clueTitle: "Footprint matches Voss shoe size" },
  { a: "card-l1", b: "card-e2", clueId: "clue-warehouse", clueTitle: "Phone signal traced near warehouse" },
  { a: "card-l2", b: "card-s2", clueId: "clue-river", clueTitle: "Hale seen on river walk camera" },
  { a: "card-q2", b: "card-s2", clueId: "clue-alibi", clueTitle: "Alibi gap confirmed for Hale" },
];

export const DOCUMENT_CATEGORIES: { id: DocumentCategory; label: string }[] = [
  { id: "police-reports", label: "Police Reports" },
  { id: "witness-statements", label: "Witness Statements" },
  { id: "medical-reports", label: "Medical Reports" },
  { id: "notes", label: "Notes" },
];

export function connectionKey(a: string, b: string): string {
  return [a, b].sort().join(":");
}
