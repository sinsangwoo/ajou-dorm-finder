/**
 * DormGallery.tsx — Phase 1: 기숙사 사진 갤러리
 *
 * - 아주대 생활관 공식 이미지 URL 적용 (https://dorm.ajou.ac.kr/...)
 * - 로컬 /public/images/dorms/{id}/ 에 추가 사진이 있으면 자동 로드
 * - 이미지 로드 실패 시 placeholder 표시
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

// 아주대 생활관 공식 이미지 URL
export const DORM_GALLERY: Record<string, GalleryImage[]> = {
  namje: [
    {
      src: "https://dorm.ajou.ac.kr/_res/ajou/dorm/img/sketch/img-building-sketch01-01.png",
      alt: "남제관 외관",
      caption: "남제관 외관 스케치",
    },
  ],
  yongji: [
    {
      src: "https://dorm.ajou.ac.kr/_res/ajou/dorm/img/sketch/img-building-sketch02-04.png",
      alt: "용지관 외관",
      caption: "용지관 외관 스케치",
    },
  ],
  hwahong: [
    {
      src: "https://dorm.ajou.ac.kr/_res/ajou/dorm/img/sketch/img-building-sketch03-01.png",
      alt: "화홍관 외관",
      caption: "화홍관 외관 스케치",
    },
  ],
  gwanggyo: [
    {
      src: "https://dorm.ajou.ac.kr/_res/ajou/dorm/img/sketch/img-building-sketch04-02.png",
      alt: "광교관 외관",
      caption: "광교관 외관 스케치",
    },
  ],
  international: [
    {
      src: "https://dorm.ajou.ac.kr/_res/ajou/dorm/img/sketch/img-building-sketch05-02.jpg",
      alt: "국제학사 외관",
      caption: "국제학사 외관 스케치",
    },
  ],
  ilsin: [
    {
      src: "https://dorm.ajou.ac.kr/_res/ajou/dorm/img/sketch/img-building-sketch06-01.png",
      alt: "일신관 외관",
      caption: "일신관 외관 스케치",
    },
  ],
};

// placeholder 컴포넌트
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
  const handleImgError = (idx: number) =>
    setImgErrors((prev) => ({ ...prev, [idx]: true }));

  return (
    <>
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
              className="w-full h-full object-contain bg-muted/20 transition-transform duration-300 group-hover:scale-105"
              onError={() => handleImgError(current)}
              crossOrigin="anonymous"
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <span className="text-white text-xs font-medium bg-black/40 px-3 py-1.5 rounded-full">
              클릭하여 확대
            </span>
          </div>

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

          {images[current].caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
              <p className="text-white text-xs font-medium">{images[current].caption}</p>
            </div>
          )}
        </div>

        {/* 썸네일 */}
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
                    crossOrigin="anonymous"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* 코멘트: 공식 자료 이미지 */}
        <p className="text-[10px] text-muted-foreground/40 mt-2 text-right">
          이미지 출의: 아주대학교 생활관
        </p>
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

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black">
              {imgErrors[current] ? (
                <ImagePlaceholder index={current} caption={images[current].caption} />
              ) : (
                <img
                  src={images[current].src}
                  alt={images[current].alt}
                  className="w-full h-full object-contain"
                  onError={() => handleImgError(current)}
                  crossOrigin="anonymous"
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
