# SERVER MANAGER

서버 스펙에 따라 호환 가능한 CPU, GPU, Memory 부품들을 시각적으로 구성하는 웹 시스템입니다.

## 주요 기능

- React + TypeScript + Vite 기반 프로젝트
- 드래그 앤 드롭 방식의 서버 구성 UI
- 좌측 부품 라이브러리, 중앙 캔버스, 우측 InfoPanel 레이아웃
- 부품별 최대 허용 개수 제한 및 경고 메시지
- 호환성 상태, 리소스 사용량, 예상 비용 표시
- PDF 내보내기 기능 (영문)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 프로젝트 구조

```
src/
  ├── components/     # 컴포넌트 파일
  ├── data/           # 데이터 파일
  ├── types/          # 타입 정의
  ├── App.css         # 스타일
  └── main.tsx        # 진입점
```

## 기술 스택

- React
- TypeScript
- Vite
- React DnD (드래그 앤 드롭)
- jsPDF (PDF 생성)
- Tailwind CSS

© 2025 SERVER MANAGER
