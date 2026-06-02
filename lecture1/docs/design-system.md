# Design System

Claude Code 기반 React + MUI 프로젝트의 디자인 시스템 가이드입니다.

---

## 색상 팔레트

### Primary (주 색상)
| 역할 | 값 | 사용처 |
|------|-----|--------|
| main | `#1976d2` | 버튼, 링크, 강조 요소 |
| light | `#42a5f5` | hover 상태, 배경 강조 |
| dark | `#1565c0` | active 상태, 진한 강조 |
| contrastText | `#ffffff` | primary 배경 위 텍스트 |

### Secondary (보조 색상)
| 역할 | 값 | 사용처 |
|------|-----|--------|
| main | `#dc004e` | 삭제, 경고, 보조 액션 |
| light | `#ff4081` | hover 상태 |
| dark | `#9a0036` | active 상태 |

### 시스템 색상
| 역할 | 값 |
|------|-----|
| success | `#2e7d32` |
| warning | `#ed6c02` |
| error | `#d32f2f` |
| info | `#0288d1` |

### 배경 / 텍스트
| 역할 | 값 |
|------|-----|
| background.default | `#ffffff` |
| background.paper | `#f5f5f5` |
| text.primary | `rgba(0, 0, 0, 0.87)` |
| text.secondary | `rgba(0, 0, 0, 0.6)` |
| divider | `rgba(0, 0, 0, 0.12)` |

---

## 타이포그래피

**기본 폰트:** `"Roboto", "Helvetica", "Arial", sans-serif`

| 변형 | 크기 | 굵기 | 사용처 |
|------|------|------|--------|
| h1 | 2.125rem (34px) | 500 | 페이지 제목 |
| h2 | 1.5rem (24px) | 500 | 섹션 제목 |
| h3 | 1.25rem (20px) | 500 | 서브 섹션 |
| h4 | 1.125rem (18px) | 500 | 카드 제목 |
| h5 | 1rem (16px) | 500 | 소제목 |
| h6 | 0.875rem (14px) | 500 | 레이블 |
| body1 | 1rem (16px) | 400 | 본문 |
| body2 | 0.875rem (14px) | 400 | 보조 텍스트 |
| caption | 0.75rem (12px) | 400 | 캡션, 주석 |
| button | 0.875rem (14px) | 500 | 버튼 텍스트 |

---

## 간격 (Spacing)

기본 단위: **8px** (`theme.spacing(1) = 8px`)

| 값 | px | 사용처 |
|----|-----|--------|
| spacing(0.5) | 4px | 아이콘-텍스트 간격 |
| spacing(1) | 8px | 컴포넌트 내부 여백 |
| spacing(2) | 16px | 카드 padding |
| spacing(3) | 24px | 섹션 간격 |
| spacing(4) | 32px | 페이지 섹션 |
| spacing(6) | 48px | 대형 섹션 |

---

## 컴포넌트 가이드

### Button

```jsx
// 주요 액션
<Button variant="contained" color="primary">저장</Button>

// 보조 액션
<Button variant="outlined" color="primary">취소</Button>

// 위험 액션
<Button variant="contained" color="error">삭제</Button>

// 텍스트 버튼
<Button variant="text">더보기</Button>
```

### TextField

```jsx
<TextField
  label="이름"
  variant="outlined"
  fullWidth
  size="medium"  // 'small' | 'medium'
/>
```

### Card

```jsx
<Card sx={{ p: 2, borderRadius: 2 }}>
  <CardContent>
    <Typography variant="h5">제목</Typography>
    <Typography variant="body2" color="text.secondary">내용</Typography>
  </CardContent>
  <CardActions>
    <Button size="small">더보기</Button>
  </CardActions>
</Card>
```

### 레이아웃 (Grid)

```jsx
<Container maxWidth="lg">
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      {/* 모바일: 전체 / 데스크탑: 절반 */}
    </Grid>
  </Grid>
</Container>
```

---

## 반응형 브레이크포인트

| 이름 | 범위 | 대상 |
|------|------|------|
| xs | 0px~ | 모바일 (세로) |
| sm | 600px~ | 모바일 (가로), 소형 태블릿 |
| md | 900px~ | 태블릿 |
| lg | 1200px~ | 데스크탑 |
| xl | 1536px~ | 대형 화면 |

```jsx
// sx prop으로 반응형
<Box sx={{
  width: { xs: '100%', md: '50%' },
  p: { xs: 1, md: 3 }
}} />
```

---

## sx prop 자주 쓰는 패턴

```jsx
// Flexbox 중앙 정렬
sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}

// 카드 스타일
sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}

// hover 효과
sx={{ '&:hover': { backgroundColor: 'action.hover' } }}

// 텍스트 말줄임
sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
```
