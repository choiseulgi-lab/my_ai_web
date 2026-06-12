-- ULSAN BUS 버스 데이터 (노선 / 정류장 / 노선별 정류장)
-- Supabase SQL Editor에서 실행하세요

-- ──────────────────────────────────────────
-- 1. 테이블 생성
-- ──────────────────────────────────────────

-- 노선 마스터
CREATE TABLE IF NOT EXISTS routes (
  id                UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  route_number      TEXT    NOT NULL UNIQUE,
  route_type        TEXT    NOT NULL DEFAULT '일반',
  interval_minutes  INTEGER NOT NULL DEFAULT 30,
  start_point       TEXT    NOT NULL,
  end_point         TEXT    NOT NULL,
  forward_count     INTEGER NOT NULL DEFAULT 0,
  backward_count    INTEGER NOT NULL DEFAULT 0
);

-- 정류장 마스터 (검색용)
CREATE TABLE IF NOT EXISTS stops (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stop_id    TEXT NOT NULL,
  stop_name  TEXT NOT NULL,
  direction  TEXT NOT NULL DEFAULT '',
  UNIQUE(stop_id, stop_name)
);

-- 노선별 정류장 (타임라인 표시용)
CREATE TABLE IF NOT EXISTS route_stops (
  id               UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  route_number     TEXT    NOT NULL,
  sequence         INTEGER NOT NULL,
  stop_id          TEXT    NOT NULL,
  stop_name        TEXT    NOT NULL,
  stop_type        TEXT    NOT NULL DEFAULT 'small',  -- 'bus' | 'small'
  dot_color        TEXT    NOT NULL DEFAULT 'green',  -- 'green' | 'yellow' | 'red'
  line_color_below TEXT,                               -- 'green' | 'yellow' | 'red' | NULL
  UNIQUE(route_number, sequence)
);

-- ──────────────────────────────────────────
-- 2. RLS (읽기 전용, 익명 허용)
-- ──────────────────────────────────────────

ALTER TABLE routes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE stops       ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_stops ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_routes"      ON routes;
DROP POLICY IF EXISTS "read_stops"       ON stops;
DROP POLICY IF EXISTS "read_route_stops" ON route_stops;

CREATE POLICY "read_routes"      ON routes      FOR SELECT USING (true);
CREATE POLICY "read_stops"       ON stops       FOR SELECT USING (true);
CREATE POLICY "read_route_stops" ON route_stops FOR SELECT USING (true);

-- ──────────────────────────────────────────
-- 3. 노선 마스터 데이터
-- ──────────────────────────────────────────

INSERT INTO routes (route_number, route_type, interval_minutes, start_point, end_point, forward_count, backward_count) VALUES
  ('127',  '일반', 15, '울산역(기점)',          '신복로터리(종점)',       8, 6),
  ('492',  '순환', 20, '울산역(기점)',          '울산역(종점)',           6, 0),
  ('512',  '일반', 30, '삼산동(기점)',          '울산역(종점)',           5, 4),
  ('743',  '일반', 45, '명촌차고지(기점)',      '울산과학기술원(종점)',   4, 2),
  ('753',  '일반', 45, '명촌차고지(기점)',      '울산과학기술원(종점)',   5, 3),
  ('1002', '좌석', 60, '언양공용터미널(기점)',  '울산역(종점)',           3, 2)
ON CONFLICT (route_number) DO NOTHING;

-- ──────────────────────────────────────────
-- 4. 정류장 마스터 데이터 (검색용)
-- ──────────────────────────────────────────

INSERT INTO stops (stop_id, stop_name, direction) VALUES
  -- 울산역 권역
  ('10100', '울산역',             '신복로터리 방면'),
  ('10101', '성안동주민센터앞',   '울산공항 방면'),
  ('10102', '울산공항사거리',     '달동 방면'),
  ('10103', '달동사거리',         '삼산동 방면'),
  -- 태화강역 권역
  ('10200', '태화강역',           '공업탑 방면'),
  ('10201', '태화시장앞',         '공업탑 방면'),
  ('10202', '중구청앞',           '병영 방면'),
  -- 공업탑 권역
  ('10300', '공업탑로터리',       '남구청 방면'),
  ('10301', '성남동',             '남구청 방면'),
  -- 시청·신복 권역
  ('10400', '울산시청',           '신복로터리 방면'),
  ('10401', '문화회관앞',         '신복로터리 방면'),
  ('10402', '신복로터리',         '울산역 방면'),
  -- 삼산·달동 권역
  ('20100', '삼산동',             '태화강역 방면'),
  ('20101', '삼산현대아파트앞',   '달동 방면'),
  ('20102', '달동사거리',         '공업탑 방면'),
  ('20103', '현대백화점앞',       '태화강역 방면'),
  ('20104', '염포삼거리',         '울산항역 방면'),
  ('20105', '울산항역앞',         '울산역 방면'),
  -- 명촌·북구 권역
  ('40344', '명촌차고지',         '태화강역 방면'),
  ('40345', '평창리비에르아파트앞', '태화강역 방면'),
  ('40346', '태화강역(2번 정류소)', '이마트 방면'),
  ('40347', '이마트앞, 울산통계청', '공업탑 방면'),
  ('40348', '농수산물도매시장앞', '공업탑 방면'),
  ('40349', '롯데백화점울산점앞', '남구청 방면'),
  ('40350', '남구청앞',           '신정시장 방면'),
  ('40351', '신정시장앞',         '무거 방면'),
  ('40352', '무거교차로',         '울산대 방면'),
  ('40353', '옥동아파트앞',       '울산대 방면'),
  ('40354', '울산대학교정문',     '문수 방면'),
  ('40355', '문수스타디움앞',     'UNIST 방면'),
  ('40356', '울산과학기술원입구', 'UNIST 방면'),
  ('40357', '울산과학기술원',     'UNIST 방면'),
  -- 언양·울주 권역
  ('50100', '언양공용터미널',     '울산역 방면'),
  ('50101', '언양시외버스터미널', '울산역 방면'),
  ('50102', '온산국가산업단지앞', '울산역 방면'),
  ('50103', '울주군청앞',         '울산역 방면'),
  -- 기타
  ('40418', '현대백화점사거리',   '좋은의사들안과병원 방면'),
  ('10506', '병영사거리',         '중구보건소 방면'),
  ('22419', '대공원호반베르디움', '산학융합지구캠퍼스 방면')
ON CONFLICT (stop_id, stop_name) DO NOTHING;

-- ──────────────────────────────────────────
-- 5. 노선별 정류장 (타임라인 색상 포함)
-- ──────────────────────────────────────────

-- 753번: 명촌차고지 → 울산과학기술원
INSERT INTO route_stops (route_number, sequence, stop_id, stop_name, stop_type, dot_color, line_color_below) VALUES
  ('753',  1, '40344', '명촌차고지(기점)',       'bus',   'green',  'green'),
  ('753',  2, '40345', '평창리비에르아파트앞',   'small', 'green',  'green'),
  ('753',  3, '40346', '태화강역(2번 정류소)',   'small', 'green',  'yellow'),
  ('753',  4, '40347', '이마트앞, 울산통계청',  'bus',   'red',    'red'),
  ('753',  5, '40348', '농수산물도매시장앞',     'small', 'red',    'red'),
  ('753',  6, '40349', '롯데백화점울산점앞',     'small', 'red',    'yellow'),
  ('753',  7, '10300', '공업탑로터리',           'bus',   'green',  'green'),
  ('753',  8, '40350', '남구청앞',               'small', 'green',  'green'),
  ('753',  9, '40351', '신정시장앞',             'small', 'green',  'green'),
  ('753', 10, '40352', '무거교차로',             'small', 'green',  'yellow'),
  ('753', 11, '40353', '옥동아파트앞',           'bus',   'green',  'green'),
  ('753', 12, '40354', '울산대학교정문',         'small', 'green',  'green'),
  ('753', 13, '40355', '문수스타디움앞',         'small', 'green',  'green'),
  ('753', 14, '40356', '울산과학기술원입구',     'bus',   'green',  'green'),
  ('753', 15, '40357', '울산과학기술원(종점)',   'small', 'green',  NULL)
ON CONFLICT (route_number, sequence) DO NOTHING;

-- 127번: 울산역 → 신복로터리
INSERT INTO route_stops (route_number, sequence, stop_id, stop_name, stop_type, dot_color, line_color_below) VALUES
  ('127',  1, '10100', '울산역(기점)',       'bus',   'green',  'green'),
  ('127',  2, '10101', '성안동주민센터앞',   'small', 'green',  'green'),
  ('127',  3, '10102', '울산공항사거리',     'bus',   'green',  'green'),
  ('127',  4, '10103', '달동사거리',         'small', 'green',  'yellow'),
  ('127',  5, '20101', '삼산현대아파트앞',   'small', 'yellow', 'red'),
  ('127',  6, '20100', '삼산동',             'bus',   'red',    'red'),
  ('127',  7, '10300', '공업탑로터리',       'small', 'red',    'yellow'),
  ('127',  8, '10301', '성남동',             'small', 'yellow', 'green'),
  ('127',  9, '10401', '신복시장앞',         'bus',   'green',  'green'),
  ('127', 10, '10402', '신복로터리(종점)',   'small', 'green',  NULL)
ON CONFLICT (route_number, sequence) DO NOTHING;

-- 492번: 울산역 순환
INSERT INTO route_stops (route_number, sequence, stop_id, stop_name, stop_type, dot_color, line_color_below) VALUES
  ('492', 1, '10100', '울산역(기점)',   'bus',   'green',  'green'),
  ('492', 2, '10200', '태화강역',       'bus',   'green',  'green'),
  ('492', 3, '10300', '공업탑로터리',   'small', 'green',  'green'),
  ('492', 4, '10301', '성남동',         'small', 'green',  'yellow'),
  ('492', 5, '10400', '울산시청',       'bus',   'yellow', 'red'),
  ('492', 6, '10401', '문화회관앞',     'small', 'red',    'yellow'),
  ('492', 7, '10402', '신복로터리',     'small', 'yellow', 'green'),
  ('492', 8, '10100', '울산역(종점)',   'bus',   'green',  NULL)
ON CONFLICT (route_number, sequence) DO NOTHING;

-- 512번: 삼산동 → 울산역
INSERT INTO route_stops (route_number, sequence, stop_id, stop_name, stop_type, dot_color, line_color_below) VALUES
  ('512', 1, '20100', '삼산동(기점)',       'bus',   'green',  'green'),
  ('512', 2, '20101', '삼산현대아파트앞',   'small', 'green',  'green'),
  ('512', 3, '10103', '달동사거리',         'small', 'green',  'yellow'),
  ('512', 4, '20103', '현대백화점앞',       'bus',   'yellow', 'green'),
  ('512', 5, '10200', '태화강역',           'small', 'green',  'green'),
  ('512', 6, '20104', '염포삼거리',         'bus',   'green',  'red'),
  ('512', 7, '20105', '울산항역앞',         'small', 'red',    'yellow'),
  ('512', 8, '10100', '울산역(종점)',       'bus',   'green',  NULL)
ON CONFLICT (route_number, sequence) DO NOTHING;

-- 743번: 명촌차고지 → 울산과학기술원 (경유지 다름)
INSERT INTO route_stops (route_number, sequence, stop_id, stop_name, stop_type, dot_color, line_color_below) VALUES
  ('743',  1, '40344', '명촌차고지(기점)',       'bus',   'green',  'green'),
  ('743',  2, '40345', '평창리비에르아파트앞',   'small', 'green',  'green'),
  ('743',  3, '40346', '태화강역(2번 정류소)',   'bus',   'green',  'green'),
  ('743',  4, '10202', '중구청앞',               'small', 'green',  'yellow'),
  ('743',  5, '10103', '달동사거리',             'bus',   'yellow', 'red'),
  ('743',  6, '40351', '신정시장앞',             'small', 'red',    'yellow'),
  ('743',  7, '40353', '옥동아파트앞',           'bus',   'green',  'green'),
  ('743',  8, '40354', '울산대학교정문',         'small', 'green',  'green'),
  ('743',  9, '40356', '울산과학기술원입구',     'small', 'green',  'green'),
  ('743', 10, '40357', '울산과학기술원(종점)',   'bus',   'green',  NULL)
ON CONFLICT (route_number, sequence) DO NOTHING;

-- 1002번: 언양 → 울산역 (좌석)
INSERT INTO route_stops (route_number, sequence, stop_id, stop_name, stop_type, dot_color, line_color_below) VALUES
  ('1002', 1, '50100', '언양공용터미널(기점)', 'bus',   'green',  'green'),
  ('1002', 2, '50101', '언양시외버스터미널',   'small', 'green',  'green'),
  ('1002', 3, '50102', '온산국가산업단지앞',   'bus',   'green',  'yellow'),
  ('1002', 4, '50103', '울주군청앞',           'small', 'yellow', 'red'),
  ('1002', 5, '20104', '염포삼거리',           'bus',   'red',    'yellow'),
  ('1002', 6, '20105', '울산항역앞',           'small', 'yellow', 'green'),
  ('1002', 7, '10100', '울산역(종점)',         'bus',   'green',  NULL)
ON CONFLICT (route_number, sequence) DO NOTHING;
