(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 26,
        columnNumber: 10
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 42,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/dormitoryData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "distanceRegions",
    ()=>distanceRegions,
    "dormitories",
    ()=>dormitories,
    "getDistanceScore",
    ()=>getDistanceScore,
    "getEligibleDormitories",
    ()=>getEligibleDormitories,
    "getGradeScore",
    ()=>getGradeScore,
    "gradeScoreMap",
    ()=>gradeScoreMap,
    "gradeScoreMapFinancial",
    ()=>gradeScoreMapFinancial,
    "studentTypes",
    ()=>studentTypes,
    "tieBreakRules",
    ()=>tieBreakRules
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/dormInfo.ts [app-client] (ecmascript)");
;
const studentTypes = [
    {
        type: "freshman",
        label: "학부 신입생"
    },
    {
        type: "enrolled",
        label: "학부 재학생"
    },
    {
        type: "graduate",
        label: "일반대학원"
    },
    {
        type: "foreigner",
        label: "외국인"
    },
    {
        type: "medical",
        label: "의과대학"
    },
    {
        type: "nursing",
        label: "간호대학"
    },
    {
        type: "law",
        label: "법학전문대학원"
    }
];
const dormitories = [
    {
        id: "namje",
        name: "남제관",
        nameEn: "Namje Hall",
        tags: [
            "#재학생전용",
            "#남성전용",
            "#구축건물"
        ],
        description: "학부 재학생 남학생 및 외국인 남학생이 거주할 수 있는 기숙사입니다.",
        capacity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].namje.capacity,
        capacityNote: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].namje.note,
        roomType: "2인실, 4인실 (4인실 위주)",
        features: [
            "학부 재학생 남학생 전용 (신입생 지원 불가)",
            "외국인 남학생 입주 가능",
            "구축 건물로 시설이 상대적으로 오래됨",
            "4인실 비중 98.8%"
        ],
        notices: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormNotices"].namje
    },
    {
        id: "yongji",
        name: "용지관",
        nameEn: "Yongji Hall",
        tags: [
            "#대학원가능",
            "#남성전용"
        ],
        description: "학부 남학생 및 일반·특수대학원 남학생이 거주할 수 있는 기숙사입니다.",
        capacity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].yongji.capacity,
        capacityNote: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].yongji.note,
        roomType: "2인실, 4인실",
        features: [
            "학부 신입생·재학생 남학생",
            "일반대학원·특수대학원 남학생",
            "캠퍼스 인근"
        ]
    },
    {
        id: "hwahong",
        name: "화홍관",
        nameEn: "Hwahong Hall",
        tags: [
            "#외국인전용",
            "#남녀공용"
        ],
        description: "외국인 학생 전용 기숙사입니다. 남녀 모두 입주 가능합니다.",
        capacity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].hwahong.capacity,
        capacityNote: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].hwahong.note,
        roomType: "1인실, 2인실, 4인실",
        features: [
            "외국인 학생 전용",
            "남녀 모두 입주 가능",
            "국제교류 활성화 환경"
        ]
    },
    {
        id: "gwanggyo",
        name: "광교관",
        nameEn: "Gwanggyo Hall",
        tags: [
            "#여성전용",
            "#신축"
        ],
        description: "여자 학부생, 여자 간호대생, 여자 일반·특수대학원생이 거주할 수 있습니다.",
        capacity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].gwanggyo.capacity,
        capacityNote: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].gwanggyo.note,
        roomType: "2인실, 4인실",
        features: [
            "학부 신입생·재학생 여학생",
            "간호대학 여학생",
            "일반·특수대학원 여학생",
            "신축 건물"
        ]
    },
    {
        id: "international",
        name: "국제학사",
        nameEn: "International House",
        tags: [
            "#남녀공용",
            "#다양한대상"
        ],
        competitionBadge: "경쟁 높음",
        description: "학부생, 외국인 학생, 일반대학원생 모두 지원 가능한 기숙사입니다.",
        capacity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].international.capacity,
        capacityNote: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].international.note,
        roomType: "2인실",
        features: [
            "학부 신입생·재학생 (남/여)",
            "외국인 학생 (남/여)",
            "일반대학원생 (남/여)",
            "지원자 다양해 경쟁률 높을 수 있음"
        ]
    },
    {
        id: "ilsin",
        name: "일신관",
        nameEn: "Ilsin Hall",
        tags: [
            "#남녀공용",
            "#전문대학원"
        ],
        description: "학부생, 법학전문대학원생, 의대생, 간호대생이 거주할 수 있는 기숙사입니다.",
        capacity: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].ilsin.capacity,
        capacityNote: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dormCapacities"].ilsin.note,
        roomType: "1인실, 2인실, 3인실, 4인실",
        features: [
            "학부 신입생·재학생 (남/여)",
            "법학전문대학원생 — 3학년 및 원우회 우선 선발",
            "의과대학생 — 고학년 우선 선발",
            "간호대학생 — 고학년 우선 선발"
        ]
    }
];
function getEligibleDormitories(gender, type) {
    const eligible = [];
    // 남제관: 남자 학부 재학생, 남자 외국인 (신입생 불가)
    if (gender === "male" && (type === "enrolled" || type === "foreigner")) {
        eligible.push("namje");
    }
    // 용지관: 남자 학부 신입생·재학생, 남자 일반대학원
    if (gender === "male" && (type === "freshman" || type === "enrolled" || type === "graduate")) {
        eligible.push("yongji");
    }
    // 화홍관: 외국인 전용 (남/여)
    if (type === "foreigner") {
        eligible.push("hwahong");
    }
    // 광교관: 여자 학부 신입생·재학생, 여자 간호대, 여자 일반대학원
    if (gender === "female" && (type === "freshman" || type === "enrolled" || type === "nursing" || type === "graduate")) {
        eligible.push("gwanggyo");
    }
    // 국제학사: 학부 신입생·재학생(남/여), 외국인(남/여), 일반대학원(남/여)
    if (type === "freshman" || type === "enrolled" || type === "foreigner" || type === "graduate") {
        eligible.push("international");
    }
    // 일신관: 학부 신입생·재학생(남/여), 의대(남/여), 간호대(남/여), 법학전문대학원(남/여)
    if (type === "freshman" || type === "enrolled" || type === "law" || type === "medical" || type === "nursing") {
        eligible.push("ilsin");
    }
    return eligible;
}
const gradeScoreMap = [
    {
        min: 4.21,
        max: 4.5,
        score: 60,
        label: "4.21 이상"
    },
    {
        min: 4.01,
        max: 4.20,
        score: 55,
        label: "4.01 ~ 4.20"
    },
    {
        min: 3.81,
        max: 4.00,
        score: 50,
        label: "3.81 ~ 4.00"
    },
    {
        min: 3.61,
        max: 3.80,
        score: 45,
        label: "3.61 ~ 3.80"
    },
    {
        min: 3.41,
        max: 3.60,
        score: 40,
        label: "3.41 ~ 3.60"
    },
    {
        min: 3.21,
        max: 3.40,
        score: 35,
        label: "3.21 ~ 3.40"
    },
    {
        min: 3.01,
        max: 3.20,
        score: 30,
        label: "3.01 ~ 3.20"
    },
    {
        min: 2.81,
        max: 3.00,
        score: 25,
        label: "2.81 ~ 3.00"
    },
    {
        min: 2.51,
        max: 2.80,
        score: 20,
        label: "2.51 ~ 2.80"
    },
    {
        min: 0,
        max: 2.50,
        score: 10,
        label: "2.50 이하"
    }
];
const gradeScoreMapFinancial = [
    {
        min: 4.21,
        max: 4.5,
        score: 30,
        label: "4.21 이상"
    },
    {
        min: 4.01,
        max: 4.20,
        score: 27,
        label: "4.01 ~ 4.20"
    },
    {
        min: 3.81,
        max: 4.00,
        score: 24,
        label: "3.81 ~ 4.00"
    },
    {
        min: 3.61,
        max: 3.80,
        score: 21,
        label: "3.61 ~ 3.80"
    },
    {
        min: 3.41,
        max: 3.60,
        score: 18,
        label: "3.41 ~ 3.60"
    },
    {
        min: 3.21,
        max: 3.40,
        score: 15,
        label: "3.21 ~ 3.40"
    },
    {
        min: 3.01,
        max: 3.20,
        score: 12,
        label: "3.01 ~ 3.20"
    },
    {
        min: 2.81,
        max: 3.00,
        score: 9,
        label: "2.81 ~ 3.00"
    },
    {
        min: 2.51,
        max: 2.80,
        score: 6,
        label: "2.51 ~ 2.80"
    },
    {
        min: 0,
        max: 2.50,
        score: 3,
        label: "2.50 이하"
    }
];
function getGradeScore(gpa, isFinancial = false) {
    const map = isFinancial ? gradeScoreMapFinancial : gradeScoreMap;
    for (const entry of map){
        if (gpa >= entry.min) return entry.score;
    }
    return isFinancial ? 3 : 10;
}
const distanceRegions = [
    {
        category: "통학거리 3시간 이상 (30점)",
        points: 30,
        description: "제주, 경상, 전라, 강원, 충청, 경기북부",
        regions: [
            "제주",
            "경상남도",
            "경상북도",
            "부산",
            "대구",
            "울산",
            "전라남도",
            "전라북도",
            "광주",
            "강원도(영동)",
            "충청남도",
            "충청북도",
            "대전",
            "세종",
            "경기북부(의정부·구리·남양주·가평·양주·고양·파주·동두천·포천·연천)"
        ]
    },
    {
        category: "통학거리 1~3시간 이내 (15점)",
        points: 15,
        description: "서울북부, 인천, 천안, 경기도 일부",
        regions: [
            "서울북부",
            "인천",
            "천안",
            "경기도 광주",
            "여주",
            "이천",
            "의정부",
            "구리",
            "남양주",
            "광명",
            "양주",
            "부천",
            "고양",
            "가평",
            "안성",
            "시흥"
        ]
    },
    {
        category: "통학거리 1시간 이내 (0점)",
        points: 0,
        description: "서울남부, 수원·용인 등 근거리",
        regions: [
            "서울남부",
            "안양",
            "용인",
            "안산",
            "성남",
            "평택",
            "과천",
            "오산",
            "광주(경기)",
            "화성",
            "군포",
            "의왕",
            "수원"
        ]
    }
];
function getDistanceScore(region) {
    for (const d of distanceRegions){
        if (d.regions.some((r)=>r === region || region.includes(r) || r.includes(region))) return d.points;
    }
    return 0;
}
const tieBreakRules = [
    {
        order: 1,
        label: "평점",
        desc: "학업 성적 평점이 높은 학생 우선"
    },
    {
        order: 2,
        label: "취득학점",
        desc: "이수 취득학점이 높은 학생 우선"
    },
    {
        order: 3,
        label: "생년월일",
        desc: "연소자(나이 어린 학생) 우선"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/DormsView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DormsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * DormsView.tsx — Client Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Migrated from react-router-dom to Next.js App Router:
 *   - useSearchParams() / useRouter() from 'next/navigation'
 *   - <Link href>  replaces <Link to>
 *   - router.push() replaces navigate()
 *
 * Receives `dormitories` as a prop serialised from the RSC parent
 * (src/app/dorms/page.tsx) so the filtering logic stays client-side
 * while the data fetch is server-side.
 *
 * Props:
 *   dormitories    – full list from getDormitories() RSC fetch
 *   initialGender  – pre-populated from URL search param (optional)
 *   initialType    – pre-populated from URL search param (optional)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-client] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/door-open.js [app-client] (ecmascript) <export default as DoorOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormitoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/dormitoryData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/dormInfo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
// ── Dorm colour themes ────────────────────────────────────────────────────────
const DORM_THEMES = {
    namje: {
        gradient: 'bg-gradient-to-br from-orange-400 via-orange-500 to-red-500',
        icon: 'bg-orange-100 dark:bg-orange-950/50',
        accent: 'text-orange-600 dark:text-orange-400'
    },
    yongji: {
        gradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500',
        icon: 'bg-blue-100 dark:bg-blue-950/50',
        accent: 'text-blue-600 dark:text-blue-400'
    },
    hwahong: {
        gradient: 'bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500',
        icon: 'bg-purple-100 dark:bg-purple-950/50',
        accent: 'text-purple-600 dark:text-purple-400'
    },
    gwanggyo: {
        gradient: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500',
        icon: 'bg-emerald-100 dark:bg-emerald-950/50',
        accent: 'text-emerald-600 dark:text-emerald-400'
    },
    international: {
        gradient: 'bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500',
        icon: 'bg-cyan-100 dark:bg-cyan-950/50',
        accent: 'text-cyan-600 dark:text-cyan-400'
    },
    ilsin: {
        gradient: 'bg-gradient-to-br from-primary/80 via-primary to-primary/60',
        icon: 'bg-primary/10',
        accent: 'text-primary'
    }
};
// ── RoomBreakdownBar ──────────────────────────────────────────────────────────
function RoomBreakdownBar({ dormId }) {
    const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormInfo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoomTypePercentage"])(dormId);
    if (!Object.keys(p).length) return null;
    const segments = [
        {
            key: 'single',
            label: '1인',
            color: 'bg-[#002855]/80',
            value: p.single
        },
        {
            key: 'double',
            label: '2인',
            color: 'bg-[#0057B7]/70',
            value: p.double
        },
        {
            key: 'triple',
            label: '3인',
            color: 'bg-[#C5A028]/70',
            value: p.triple
        },
        {
            key: 'quad',
            label: '4인',
            color: 'bg-muted-foreground/40',
            value: p.quad
        }
    ].filter((s)=>s.value !== undefined && s.value > 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground/60 mb-1.5 font-medium",
                children: "방 유형 구성"
            }, void 0, false, {
                fileName: "[project]/src/components/DormsView.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-4 bg-muted/50 rounded-full overflow-hidden flex",
                children: segments.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-center', s.color),
                        style: {
                            width: `${s.value}%`
                        },
                        title: `${s.label}실 ${s.value}%`,
                        children: (s.value ?? 0) >= 12 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] font-bold text-white leading-none",
                            children: [
                                s.label,
                                " ",
                                s.value,
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DormsView.tsx",
                            lineNumber: 74,
                            columnNumber: 15
                        }, this)
                    }, s.key, false, {
                        fileName: "[project]/src/components/DormsView.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/DormsView.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mt-1.5 flex-wrap",
                children: segments.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-2 h-2 rounded-full', s.color)
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground/60",
                                children: [
                                    s.label,
                                    "실 ",
                                    s.value,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.key, true, {
                        fileName: "[project]/src/components/DormsView.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/DormsView.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DormsView.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_c = RoomBreakdownBar;
function DormCard({ dorm, isEligible, index }) {
    const filtered = isEligible !== null;
    const theme = DORM_THEMES[dorm.id] ?? DORM_THEMES.ilsin;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 24
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5,
            delay: index * 0.08,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        className: "h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: `/dorms/${dorm.id}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative rounded-2xl overflow-hidden transition-all duration-300 h-full', 'glass-card-strong hover-lift group cursor-pointer', filtered && !isEligible && 'opacity-40 grayscale pointer-events-none'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-2 w-full', theme.gradient)
                    }, void 0, false, {
                        fileName: "[project]/src/components/DormsView.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-10 h-10 rounded-xl flex items-center justify-center', 'transition-transform group-hover:scale-110', theme.icon),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-5 h-5', theme.accent)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DormsView.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            dorm.competitionBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "destructive",
                                                className: "text-xs",
                                                children: dorm.competitionBadge
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 133,
                                                columnNumber: 19
                                            }, this),
                                            filtered && isEligible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "w-5 h-5 text-success"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 135,
                                                columnNumber: 45
                                            }, this),
                                            filtered && !isEligible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                className: "w-5 h-5 text-muted-foreground/40"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 136,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-foreground mb-0.5 tracking-tight",
                                children: dorm.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground/50 mb-3 font-medium",
                                children: dorm.nameEn
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5 mb-4",
                                children: dorm.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs px-2.5 py-0.5 rounded-full bg-primary/[0.07] text-primary font-medium",
                                        children: tag
                                    }, tag, false, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground mb-4 leading-relaxed",
                                children: dorm.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoomBreakdownBar, {
                                dormId: dorm.id
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this),
                            dorm.notices && dorm.notices.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 p-3 bg-warning/[0.06] rounded-xl border border-warning/20",
                                children: dorm.notices.map((notice, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-2 text-xs mb-1 last:mb-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                className: "w-3.5 h-3.5 mt-0.5 text-warning shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 164,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-foreground/70",
                                                children: notice
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 165,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 163,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 161,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 text-xs text-muted-foreground border-t border-border/40 pt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                className: "w-3.5 h-3.5 text-muted-foreground/50"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    dorm.capacity,
                                                    dorm.capacityNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-1 text-muted-foreground/40 text-xs",
                                                        children: dorm.capacityNote
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DormsView.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__["DoorOpen"], {
                                                className: "w-3.5 h-3.5 text-muted-foreground/50"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: dorm.roomType
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            isEligible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 pt-4 border-t border-border/40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "text-xs text-muted-foreground space-y-1.5",
                                    children: dorm.features.slice(0, 3).map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "w-3 h-3 text-success mt-0.5 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DormsView.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 23
                                                }, this),
                                                f
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/DormsView.tsx",
                                            lineNumber: 193,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DormsView.tsx",
                                    lineNumber: 191,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DormsView.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DormsView.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/DormsView.tsx",
            lineNumber: 111,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/DormsView.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_c1 = DormCard;
function DormsView({ dormitories, initialGender, initialType }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Next.js 15: useSearchParams returns a read-only URLSearchParams
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const setSearchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DormsView.useCallback[setSearchParams]": (params)=>{
            const sp = new URLSearchParams(params);
            router.push(`/dorms?${sp.toString()}`, {
                scroll: false
            });
        }
    }["DormsView.useCallback[setSearchParams]"], [
        router
    ]);
    const clearFilter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DormsView.useCallback[clearFilter]": ()=>router.push('/dorms', {
                scroll: false
            })
    }["DormsView.useCallback[clearFilter]"], [
        router
    ]);
    const paramGender = searchParams.get('gender') ?? initialGender ?? null;
    const paramType = searchParams.get('type') ?? initialType ?? null;
    const hasFilter = Boolean(paramGender && paramType);
    const eligibleIds = hasFilter ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormitoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEligibleDormitories"])(paramGender, paramType) : null;
    const genderLabel = paramGender === 'male' ? '남학생' : paramGender === 'female' ? '여학생' : '';
    const typeLabel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormitoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["studentTypes"].find((s)=>s.type === paramType)?.label ?? '';
    // Filter panel state
    const [showFilterPanel, setShowFilterPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localGender, setLocalGender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(paramGender);
    const [localType, setLocalType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(paramType);
    const applyFilter = ()=>{
        if (localGender && localType) {
            setSearchParams({
                gender: localGender,
                type: localType
            });
            setShowFilterPanel(false);
        }
    };
    const sortedDorms = hasFilter ? [
        ...dormitories
    ].sort((a, b)=>{
        const aE = eligibleIds.includes(a.id) ? 0 : 1;
        const bE = eligibleIds.includes(b.id) ? 0 : 1;
        return aE - bE;
    }) : dormitories;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 pt-10 pb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.5
                        },
                        className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-1",
                                        children: hasFilter ? '지원 가능 기숙사' : '기숙사 한눈에 보기'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 275,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground text-sm",
                                        children: hasFilter ? `${genderLabel} · ${typeLabel} 기준으로 필터링된 결과입니다` : '아주대학교 6개 기숙사의 주요 정보를 비교해 보세요'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 274,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 shrink-0",
                                children: [
                                    hasFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: clearFilter,
                                        className: "gap-1.5 text-xs rounded-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 293,
                                                columnNumber: 17
                                            }, this),
                                            "필터 초기화"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: hasFilter ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setShowFilterPanel((v)=>!v),
                                        className: "gap-1.5 text-xs rounded-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DormsView.tsx",
                                                lineNumber: 303,
                                                columnNumber: 15
                                            }, this),
                                            "조건 필터"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DormsView.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this),
                    hasFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        className: "flex items-center gap-2 mt-3 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground/60",
                                children: "필터:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "filter-pill active text-xs",
                                children: genderLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "filter-pill active text-xs",
                                children: typeLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground/60",
                                children: [
                                    "· ",
                                    eligibleIds?.length ?? 0,
                                    "개 기숙사 지원 가능"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DormsView.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DormsView.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            showFilterPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "container mx-auto px-4 pb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-card-strong rounded-2xl p-5 max-w-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-semibold mb-4 text-foreground",
                            children: "조건 선택"
                        }, void 0, false, {
                            fileName: "[project]/src/components/DormsView.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground/60 mb-2 font-medium",
                                    children: "성별"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DormsView.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        'male',
                                        'female'
                                    ].map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setLocalGender(g),
                                            className: `filter-pill${localGender === g ? ' active' : ''}`,
                                            children: g === 'male' ? '남학생' : '여학생'
                                        }, g, false, {
                                            fileName: "[project]/src/components/DormsView.tsx",
                                            lineNumber: 338,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DormsView.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DormsView.tsx",
                            lineNumber: 334,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground/60 mb-2 font-medium",
                                    children: "신분"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DormsView.tsx",
                                    lineNumber: 350,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$dormitoryData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["studentTypes"].map(({ type, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setLocalType(type),
                                            className: `filter-pill${localType === type ? ' active' : ''}`,
                                            children: label
                                        }, type, false, {
                                            fileName: "[project]/src/components/DormsView.tsx",
                                            lineNumber: 353,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DormsView.tsx",
                                    lineNumber: 351,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DormsView.tsx",
                            lineNumber: 349,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    onClick: applyFilter,
                                    disabled: !localGender || !localType,
                                    className: "rounded-full px-5 text-xs",
                                    children: [
                                        "필터 적용 ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "w-3.5 h-3.5 ml-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DormsView.tsx",
                                            lineNumber: 371,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DormsView.tsx",
                                    lineNumber: 365,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>{
                                        setLocalGender(null);
                                        setLocalType(null);
                                        clearFilter();
                                        setShowFilterPanel(false);
                                    },
                                    className: "text-xs",
                                    children: "초기화"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DormsView.tsx",
                                    lineNumber: 373,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DormsView.tsx",
                            lineNumber: 364,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/DormsView.tsx",
                    lineNumber: 331,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/DormsView.tsx",
                lineNumber: 326,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 pb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto",
                        children: sortedDorms.map((dorm, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DormCard, {
                                dorm: dorm,
                                isEligible: hasFilter ? eligibleIds?.includes(dorm.id) ?? false : null,
                                index: index
                            }, dorm.id, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 394,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/DormsView.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, this),
                    hasFilter && paramType === 'enrolled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.5
                        },
                        className: "text-center mt-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground mb-3",
                                children: "재학생이라면 점수 계산기로 배정 점수를 미리 확인하세요"
                            }, void 0, false, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 410,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>router.push('/calculator'),
                                size: "lg",
                                className: "rounded-full px-8 font-semibold",
                                children: [
                                    "점수 계산기로 이동 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "w-4 h-4 ml-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DormsView.tsx",
                                        lineNumber: 418,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DormsView.tsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DormsView.tsx",
                        lineNumber: 404,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DormsView.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DormsView.tsx",
        lineNumber: 265,
        columnNumber: 5
    }, this);
}
_s(DormsView, "jeLMazbe0zyTmMPR/twcVLti3LM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c2 = DormsView;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RoomBreakdownBar");
__turbopack_context__.k.register(_c1, "DormCard");
__turbopack_context__.k.register(_c2, "DormsView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_110dc556._.js.map