# 새 프로젝트 시작하기

`_template_settings` 템플릿을 활용해서 빠르게 새 프로젝트를 시작하는 방법입니다.

---

## 1단계: 템플릿 복사

```powershell
# lecture1 디렉토리에서 실행
# _template_settings를 새 프로젝트명으로 복사
Copy-Item -Recurse "_template_settings" "my-new-project"
cd "my-new-project"
```

또는 탐색기에서 `_template_settings` 폴더를 복사 후 이름 변경

---

## 2단계: 프로젝트 정보 수정

`package.json` 열어서 `name` 필드 수정:

```json
{
  "name": "my-new-project",
  ...
}
```

---

## 3단계: 의존성 설치 및 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 확인

---

## 4단계: 기본 파일 정리

### App.jsx 초기화

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

### 첫 페이지 생성 (`src/pages/HomePage.jsx`)

```jsx
import { Box, Container, Typography } from '@mui/material'

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1">안녕하세요!</Typography>
        <Typography variant="body1" color="text.secondary">
          새 프로젝트가 시작됐습니다.
        </Typography>
      </Box>
    </Container>
  )
}

export default HomePage
```

### index.css 정리

```css
/* 기본 reset만 유지 (CssBaseline이 대부분 처리) */
* {
  box-sizing: border-box;
}
```

### App.css 삭제 또는 비우기

Vite 기본 스타일은 모두 삭제합니다.

---

## 포함된 패키지 목록

| 패키지 | 버전 | 용도 |
|--------|------|------|
| react | ^18.3.1 | UI 라이브러리 |
| react-dom | ^18.3.1 | DOM 렌더링 |
| react-router-dom | ^7.x | 클라이언트 라우팅 |
| @mui/material | ^9.x | UI 컴포넌트 |
| @mui/icons-material | ^9.x | 아이콘 |
| @emotion/react | ^11.x | MUI 스타일 엔진 |
| @emotion/styled | ^11.x | MUI styled 컴포넌트 |
| @fontsource/roboto | ^5.x | Roboto 폰트 |

---

## 폴더 구조 (권장)

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── layout/
│       └── PageLayout.jsx
├── pages/
│   ├── HomePage.jsx
│   └── AboutPage.jsx
├── hooks/
├── utils/
├── constants/
│   └── index.js
├── theme.js          ← MUI 테마 (수정 금지 권장)
├── App.jsx           ← 라우터 설정
├── main.jsx          ← 진입점 (ThemeProvider 포함)
└── index.css
```

---

## 테마 커스터마이징

`src/theme.js`에서 색상, 폰트 등을 수정합니다:

```js
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // ← 브랜드 색상으로 변경
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
})
```

---

## 자주 쓰는 MUI 컴포넌트 임포트

```jsx
// 레이아웃
import { Box, Container, Grid, Stack } from '@mui/material'

// 텍스트
import { Typography } from '@mui/material'

// 입력
import { TextField, Button, Checkbox, Select, MenuItem } from '@mui/material'

// 피드백
import { Alert, Snackbar, CircularProgress, Skeleton } from '@mui/material'

// 네비게이션
import { AppBar, Toolbar, Drawer, Tabs, Tab } from '@mui/material'

// 데이터 표시
import { Card, CardContent, CardActions, Chip, Avatar } from '@mui/material'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

// 아이콘 (예시)
import { Add, Delete, Edit, Search, Menu } from '@mui/icons-material'
```

---

## 새 컴포넌트 추가 체크리스트

- [ ] `src/components/` 또는 `src/pages/` 에 파일 생성
- [ ] 파일명과 함수명이 PascalCase인지 확인
- [ ] `export default` 추가
- [ ] `App.jsx`에 라우트 또는 부모 컴포넌트에 임포트 추가
- [ ] `@docs/design-system.md` 색상 팔레트 참고
- [ ] `@docs/code-convention.md` 네이밍 규칙 준수
