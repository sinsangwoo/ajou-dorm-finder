/**
 * DormGallery.tsx — Phase 1: 기숙사 사진 갤러리
 *
 * 실제 이미지가 없는 상태에서도 동작하도록 placeholder 시스템을 구현.
 * 실제 사진을 /public/images/dorms/{id}/ 에 넣으면 자동으로 표시됨.
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

// 각 기숙사별 갤러리 이미지 데이터
// 실제 이미지 파일을 /public/images/dorms/{dormId}/*.jpg 에 추가하면 여기 경로만 업데이트하면 됩니다
const DORM_GALLERY: Record<string, GalleryImage[]> = {
  namje: [
    { src: "/images/dorms/namje/exterior.jpg", alt: "남제관 외관", caption: "남제관 외관" },
    { src: "/images/dorms/namje/room.jpg", alt: "남제관 4인실", caption: "4인실 내부" },
    { src: "/images/dorms/namje/corridor.jpg", alt: "남제관 복도", caption: "복도" },
  ],
  yongji: [
    { src: "/images/dorms/yongji/exterior.jpg", alt: "용지관 외관", caption: "용지관 외관" },
    { src: "/images/dorms/yongji/room.jpg", alt: "용지관 2인실", caption: "2인실 내부" },
    { src: "/images/dorms/yongji/laundry.jpg", alt: "용지관 세탁실", caption: "공용 세탁실" },
  ],
  hwahong: [
    { src: "/images/dorms/hwahong/exterior.jpg", alt: "화홍관 외관", caption: "화홍관 외관" },
    { src: "/images/dorms/hwahong/room.jpg", alt: "화홍관 룸", caption: "객실 내부" },
    { src: "/images/dorms/hwahong/kitchen.jpg", alt: "화홍관 공용 주방", caption: "공용 주방" },
  ],
  gwanggyo: [
    { src: "/images/dorms/gwanggyo/exterior.jpg", alt: "광교관 외관", caption: "광교관 외관 (신축)" },
    { src: "/images/dorms/gwanggyo/room.jpg", alt: "광교관 2인실", caption: "2인실 내부" },
    { src: "/images/dorms/gwanggyo/lounge.jpg", alt: "광교관 라운지", caption: "공용 라운지" },
  ],
  international: [
    { src: "/images/dorms/international/exterior.jpg", alt: "국제학사 외관", caption: "국제학사 외관" },
    { src: "/images/dorms/international/room.jpg", alt: "국제학사 2인실", caption: "2인실 내부" },
    { src: "/images/dorms/international/gym.jpg", alt: "국제학사 헬스장", caption: "헬스장" },
    { src: "/images/dorms/international/kitchen.jpg", alt: "국제학사 공용 주방", caption: "공용 주방" },
  ],
  ilsin: [
    { src: "/images/dorms/ilsin/exterior.jpg", alt: "일신관 외관", caption: "일신관 외관 (신축)" },
    { src: "/images/dorms/ilsin/single.jpg", alt: "일신관 1인실", caption: "1인실 내부" },
    { src: "/images/dorms/ilsin/double.jpg", alt: "일신관 2인실", caption: "2인실 내부" },
    { src: "/images/dorms/ilsin/gym.jpg", alt: "일신관 헬스장", caption: "헬스장" },
    { src: "/images/dorms/ilsin/kitchen.jpg", alt: "일신관 공용 주방", caption: "공용 주방" },
  ],
};

// 이미지 로드 실패 시 보여줄 Placeholder 컴포넌트
function ImagePlaceholder({ index, caption }: { index: number; caption?: string }) {
  const gradients = [
    "from-blue-900 to-blue-700",
    "from-slate-800 to-slate-600",
    "from-indigo-900 to-indigo-700",
    "from-gray-800 to-gray-600",
    "from-zinc-800 to-zinc-600",
  ];
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center",
        "bg-gradient-to-br",
        gradients[index % gradients.length]
      )}
    >
      <Camera className="w-10 h-10 text-white/30 mb-2" />
      <p className="text-white/40 text-xs text-center px-4">
        {caption || "사진 준비 중"}
        <br />
        <span className="text-[10px] opacity-60">이미지를 /public/images/dorms/ 에 추가해주세요</span>
      </p>
    </div>
  );
}

interface DormGalleryProps {
  dormId: string;
}

export default function DormGallery({ dormId }: DormGalleryProps) {
  const images = DORM_GALLERY[dormId] ?? [];
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  if (images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const handleImgError = (idx: number) => {
    setImgErrors((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <>
      {/* 메인 갤러리 */}
      <div className="glass-card-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg tracking-tight">사진</h2>
          <span className="text-xs text-muted-foreground/60">
            {current + 1} / {images.length}
          </span>
        </div>

        {/* 메인 이미지 */}
        <div
          className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden bg-muted/30 mb-3 cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          {imgErrors[current] ? (
            <ImagePlaceholder index={current} caption={images[current].caption} />
          ) : (
            <img
              src={images[current].src}
              alt={images[current].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => handleImgError(current)}
            />
          )}

          {/* 확대 힌트 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <span className="text-white text-xs font-medium bg-black/40 px-3 py-1.5 rounded-full">
              클릭하여 확대
            </span>
          </div>

          {/* 이전/다음 버튼 */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all"
                aria-label="이전 사진"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all"
                aria-label="다음 사진"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* 캡션 */}
          {images[current].caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
              <p className="text-white text-xs font-medium">{images[current].caption}</p>
            </div>
          )}
        </div>

        {/* 썸네일 스트립 */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all",
                  idx === current ? "border-primary" : "border-transparent opacity-60 hover:opacity-90"
                )}
                aria-label={`사진 ${idx + 1}: ${img.alt}`}
              >
                {imgErrors[idx] ? (
                  <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                    <Camera className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </div>
                ) : (
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    onError={() => handleImgError(idx)}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 라이트박스 */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {imgErrors[current] ? (
                <ImagePlaceholder index={current} caption={images[current].caption} />
              ) : (
                <img
                  src={images[current].src}
                  alt={images[current].alt}
                  className="w-full h-full object-contain bg-black"
                  onError={() => handleImgError(current)}
                />
              )}
            </div>

            {images[current].caption && (
              <p className="text-white/70 text-sm text-center mt-3">{images[current].caption}</p>
            )}

            {images.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                  aria-label="이전"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white/50 text-sm">{current + 1} / {images.length}</span>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                  aria-label="다음"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
