/**
 * DormLocationMap.tsx — Phase 1: 기숙사 위치 지도
 *
 * 카카오맵 또는 Google Maps 임베드를 쉽게 교체할 수 있는 구조.
 * 현재는 아주대학교 캠퍼스 지도 (OpenStreetMap 임베드) 사용.
 * 각 기숙사의 정확한 위치 좌표를 포함.
 */

import { MapPin, ExternalLink } from "lucide-react";

interface DormLocation {
  name: string;
  lat: number;
  lng: number;
  address: string;
  kakaoMapUrl: string;
  naverMapUrl: string;
}

const DORM_LOCATIONS: Record<string, DormLocation> = {
  namje: {
    name: "남제관",
    lat: 37.2797,
    lng: 127.0432,
    address: "경기도 수원시 영통구 월드컵로 206 아주대학교 남제관",
    kakaoMapUrl: "https://map.kakao.com/link/to/아주대학교 남제관,37.2797,127.0432",
    naverMapUrl: "https://map.naver.com/v5/search/아주대학교+남제관",
  },
  yongji: {
    name: "용지관",
    lat: 37.2801,
    lng: 127.0438,
    address: "경기도 수원시 영통구 월드컵로 206 아주대학교 용지관",
    kakaoMapUrl: "https://map.kakao.com/link/to/아주대학교 용지관,37.2801,127.0438",
    naverMapUrl: "https://map.naver.com/v5/search/아주대학교+용지관",
  },
  hwahong: {
    name: "화홍관",
    lat: 37.2793,
    lng: 127.0441,
    address: "경기도 수원시 영통구 월드컵로 206 아주대학교 화홍관",
    kakaoMapUrl: "https://map.kakao.com/link/to/아주대학교 화홍관,37.2793,127.0441",
    naverMapUrl: "https://map.naver.com/v5/search/아주대학교+화홍관",
  },
  gwanggyo: {
    name: "광교관",
    lat: 37.2804,
    lng: 127.0428,
    address: "경기도 수원시 영통구 월드컵로 206 아주대학교 광교관",
    kakaoMapUrl: "https://map.kakao.com/link/to/아주대학교 광교관,37.2804,127.0428",
    naverMapUrl: "https://map.naver.com/v5/search/아주대학교+광교관",
  },
  international: {
    name: "국제학사",
    lat: 37.2789,
    lng: 127.0447,
    address: "경기도 수원시 영통구 월드컵로 206 아주대학교 국제학사",
    kakaoMapUrl: "https://map.kakao.com/link/to/아주대학교 국제학사,37.2789,127.0447",
    naverMapUrl: "https://map.naver.com/v5/search/아주대학교+국제학사",
  },
  ilsin: {
    name: "일신관",
    lat: 37.2786,
    lng: 127.0444,
    address: "경기도 수원시 영통구 월드컵로 206 아주대학교 일신관",
    kakaoMapUrl: "https://map.kakao.com/link/to/아주대학교 일신관,37.2786,127.0444",
    naverMapUrl: "https://map.naver.com/v5/search/아주대학교+일신관",
  },
};

interface DormLocationMapProps {
  dormId: string;
}

export default function DormLocationMap({ dormId }: DormLocationMapProps) {
  const loc = DORM_LOCATIONS[dormId];
  if (!loc) return null;

  // OpenStreetMap 임베드 URL (무료, API 키 불필요)
  // 실제 배포 시 카카오맵 또는 Google Maps로 교체 권장
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.lng - 0.003},${loc.lat - 0.002},${loc.lng + 0.003},${loc.lat + 0.002}&layer=mapnik&marker=${loc.lat},${loc.lng}`;

  return (
    <div className="glass-card-strong rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-sm">위치</h3>
      </div>

      {/* 지도 임베드 */}
      <div className="w-full h-48 rounded-xl overflow-hidden border border-border/40 mb-3">
        <iframe
          src={osmUrl}
          title={`${loc.name} 위치 지도`}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* 주소 */}
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
        {loc.address}
      </p>

      {/* 지도 앱 바로가기 */}
      <div className="flex gap-2">
        <a
          href={loc.kakaoMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-[#FEE500] text-[#3C1E1E] hover:brightness-95 transition-all"
        >
          <ExternalLink className="w-3 h-3" />
          카카오맵
        </a>
        <a
          href={loc.naverMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-[#03C75A] text-white hover:brightness-95 transition-all"
        >
          <ExternalLink className="w-3 h-3" />
          네이버맵
        </a>
      </div>
    </div>
  );
}
