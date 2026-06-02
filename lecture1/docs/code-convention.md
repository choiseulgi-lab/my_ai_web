# Code Convention

Claude Code 기반 React + MUI 프로젝트의 코드 작성 규칙입니다.

---

## 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase | `UserCard.jsx`, `LoginForm.jsx` |
| 컴포넌트 함수 | PascalCase | `function UserCard()` |
| 일반 함수 | camelCase | `handleSubmit`, `fetchUserData` |
| 변수 | camelCase | `userName`, `isLoading` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| CSS 클래스 | kebab-case | `user-card`, `nav-item` |
| 이벤트 핸들러 | `handle` + 동사 | `handleClick`, `handleChange` |
| boolean 변수 | `is/has/can` + 명사 | `isOpen`, `hasError`, `canEdit` |

---

## 파일 및 디렉토리 구조

```
src/
├── components/        # 재사용 가능한 UI 컴포넌트
│   ├── common/        # 범용 컴포넌트 (Button, Input 등)
│   └── layout/        # 레이아웃 컴포넌트 (Header, Footer 등)
├── pages/             # 라우트별 페이지 컴포넌트
├── hooks/             # 커스텀 훅
├── utils/             # 유틸리티 함수
├── constants/         # 상수 정의
├── styles/            # 글로벌 스타일
├── theme.js           # MUI 테마 설정
├── App.jsx            # 라우터 설정
└── main.jsx           # 진입점
```

---

## 임포트 순서

다음 순서를 지켜서 임포트합니다:

```jsx
// 1. React 및 외부 라이브러리
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. MUI 컴포넌트
import { Box, Button, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

// 3. 로컬 컴포넌트
import UserCard from '../components/UserCard'
import { useAuth } from '../hooks/useAuth'

// 4. 유틸리티 / 상수
import { formatDate } from '../utils/date'
import { API_BASE_URL } from '../constants'

// 5. 스타일 / 에셋
import './styles.css'
```

---

## 컴포넌트 작성 규칙

### 기본 구조

```jsx
import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'

function UserCard({ name, email, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2" color="text.secondary">{email}</Typography>
      <Button onClick={handleToggle}>
        {isExpanded ? '접기' : '펼치기'}
      </Button>
    </Box>
  )
}

export default UserCard
```

### Props 규칙
- Props는 구조 분해 할당으로 받기
- 이벤트 핸들러 Props는 `on` + 동사 형태 (`onSubmit`, `onChange`, `onDelete`)
- Boolean Props는 명시적으로 `={true}` 작성 생략 가능 (`<Button disabled />`)

---

## 상태(State) 관리

```jsx
// useState: 단순 로컬 상태
const [count, setCount] = useState(0)

// 관련 상태는 객체로 묶기
const [form, setForm] = useState({
  name: '',
  email: '',
  password: ''
})

// 상태 업데이트: 함수형 업데이트 권장
setCount(prev => prev + 1)
setForm(prev => ({ ...prev, name: '홍길동' }))
```

---

## 이벤트 핸들러

```jsx
// 인라인 핸들러 지양 (렌더링마다 새 함수 생성)
// Bad
<Button onClick={() => setCount(count + 1)}>

// Good: 별도 함수로 분리
const handleIncrement = () => setCount(prev => prev + 1)
<Button onClick={handleIncrement}>
```

---

## MUI sx prop 사용

```jsx
// theme 값 사용 권장
<Box sx={{ mt: 2, p: 3 }}>  // spacing(2), spacing(3)

// color는 theme 참조
<Typography color="text.secondary">
<Box sx={{ bgcolor: 'primary.main' }}>

// 직접 값은 px로
<Box sx={{ width: '100%', maxWidth: 600, minHeight: '100vh' }}>
```

---

## 주석 작성 기준

```jsx
// 좋은 주석: 왜(Why)를 설명
// MUI v5 이상에서 sx prop이 className보다 성능상 유리
const sx = { color: 'primary.main' }

// 나쁜 주석: 무엇(What)을 설명 — 코드가 이미 말해줌
// count를 1 증가시킴
setCount(prev => prev + 1)
```

---

## ESLint / 코드 품질

- 미사용 변수 금지 (`no-unused-vars`)
- `useEffect` 의존성 배열 누락 금지 (`exhaustive-deps`)
- `key` prop 누락 금지 (리스트 렌더링 시 필수)
- `console.log` 개발 중만 허용, 커밋 전 제거

---

## 파일 저장 시 체크리스트

- [ ] 컴포넌트 이름이 PascalCase인지 확인
- [ ] 이벤트 핸들러가 `handle` 접두사를 가지는지 확인
- [ ] `key` prop이 리스트에 있는지 확인
- [ ] 불필요한 `console.log` 제거
- [ ] import 순서가 맞는지 확인
