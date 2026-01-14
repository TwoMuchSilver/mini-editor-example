// features/wedding/blocks/MapBlock/types.ts
/**
 * 카카오맵 API 타입 정의
 */

// 카카오맵 좌표 타입
export interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

// 카카오맵 옵션 타입
export interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

// 카카오맵 인스턴스 타입
export interface KakaoMap {
  setCenter(latlng: KakaoLatLng): void;
  setLevel(level: number): void;
  getCenter(): KakaoLatLng;
  getLevel(): number;
}

// 마커 옵션 타입
export interface KakaoMarkerOptions {
  position: KakaoLatLng;
  image?: {
    src: string;
    size: { width: number; height: number };
    options?: {
      offset?: { x: number; y: number };
    };
  };
  title?: string;
  draggable?: boolean;
  clickable?: boolean;
  zIndex?: number;
}

// 마커 인스턴스 타입
export interface KakaoMarker {
  setMap(map: KakaoMap | null): void;
  setPosition(position: KakaoLatLng): void;
  getPosition(): KakaoLatLng;
}

// 주소 검색 결과 타입
export interface GeocoderResult {
  address_name: string;
  y: string; // 위도
  x: string; // 경도
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_3depth_h_name: string;
    h_code: string;
    b_code: string;
    mountain_yn: 'Y' | 'N';
    main_address_no: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
  road_address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: 'Y' | 'N';
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
    x: string;
    y: string;
  };
}

// 장소 검색 결과 타입
export interface PlaceSearchResult {
  places: Array<{
    id: string;
    place_name: string;
    category_name: string;
    category_group_code: string;
    category_group_name: string;
    phone: string;
    address_name: string;
    road_address_name: string;
    x: string; // 경도
    y: string; // 위도
    place_url: string;
    distance: string;
  }>;
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

// 카카오맵 서비스 상태 타입
export interface KakaoMapServicesStatus {
  OK: string;
  ZERO_RESULT: string;
  ERROR: string;
}

// 카카오맵 API 전역 타입
export interface KakaoMapsAPI {
  Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  load: (callback: () => void) => void;
  services: {
    Geocoder: new () => {
      addressSearch: (
        address: string,
        callback: (result: GeocoderResult[], status: string) => void
      ) => void;
    };
    Places: new () => {
      keywordSearch: (
        keyword: string,
        callback: (data: PlaceSearchResult, status: string, pagination?: unknown) => void,
        options?: {
          x?: number;
          y?: number;
          radius?: number;
          category_group_code?: string;
          page?: number;
          size?: number;
          sort?: 'accuracy' | 'distance';
        }
      ) => void;
    };
    Status: KakaoMapServicesStatus;
  };
  Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
}
