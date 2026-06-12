-- ULSAN BUS 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요

-- 즐겨찾기 정류장
CREATE TABLE IF NOT EXISTS favorite_stops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stop_id TEXT NOT NULL,
  stop_name TEXT NOT NULL,
  direction TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 즐겨찾기 노선
CREATE TABLE IF NOT EXISTS favorite_routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  route_number TEXT NOT NULL,
  route_type TEXT NOT NULL DEFAULT '일반',
  interval_minutes INTEGER NOT NULL DEFAULT 45,
  start_point TEXT NOT NULL,
  end_point TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 자주 가는 목적지
CREATE TABLE IF NOT EXISTS favorite_destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon_type TEXT NOT NULL DEFAULT 'home',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 목적지별 버스 정보
CREATE TABLE IF NOT EXISTS destination_buses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  destination_id UUID REFERENCES favorite_destinations(id) ON DELETE CASCADE,
  bus_number TEXT NOT NULL,
  bus_type TEXT NOT NULL DEFAULT '일반',
  arrival_minutes INTEGER,
  remaining_stops INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 모든 테이블 RLS 활성화
ALTER TABLE favorite_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_buses ENABLE ROW LEVEL SECURITY;

-- 익명 사용자도 읽기/쓰기 허용 (데모용)
CREATE POLICY "allow_all_stops" ON favorite_stops FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_routes" ON favorite_routes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_destinations" ON favorite_destinations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_dest_buses" ON destination_buses FOR ALL USING (true) WITH CHECK (true);

-- 샘플 데이터 삽입
INSERT INTO favorite_stops (stop_id, stop_name, direction) VALUES
  ('40418', '현대백화점사거리', '좋은의사들안과병원 방면'),
  ('10506', '병영사거리', '중구보건소 방면'),
  ('22419', '대공원호반베르디움', '산학융합지구캠퍼스 방면')
ON CONFLICT DO NOTHING;

INSERT INTO favorite_routes (route_number, route_type, interval_minutes, start_point, end_point) VALUES
  ('753', '일반', 45, '명촌차고지(기점)', '울산과학기술원(종점)'),
  ('743', '일반', 45, '명촌차고지(기점)', '울산과학기술원(종점)'),
  ('492', '순환', 20, '울산역(기점)', '울산역(종점)')
ON CONFLICT DO NOTHING;
