## 예제 프로젝트 목표: "블록 조립"
### 핵심 기능:
- Block System: JSON 데이터([텍스트, 이미지, 지도])를 화면에 그린다.
- Editor: dnd-kit으로 순서를 바꾸고, input으로 내용을 수정한다.
- Viewer: 편집 기능이 제거된 "완성된 화면"을 별도 URL로 본다.
- Save: (백엔드 없이) localStorage를 이용해 "저장"과 "공유"를 흉내 낸다.

---

### 구현 로드맵
#### 1단계: 렌더링 엔진 만들기 (The Renderer)
- 목표: "JSON 데이터를 주면 화면을 그려내는 컴포넌트 만들기"
- 할 일:  
Block 타입 정의 (TS Interface),  
더미 데이터(JSON) 생성 (initialBlocks),  
BlockRenderer 컴포넌트 구현 (Switch-Case문으로 TextBlock, ImageBlock 분기 처리)  
- 학습 포인트:  
Block-based Architecture의 기본 구조 이해,  
리액트에서 배열(Array.map)을 렌더링하는 패턴,  

#### 2단계: 에디터 만들기 (The Editor - State & DnD)
- 목표: "화면의 블록을 수정하고 위치를 바꾸기" 정적인 화면을 동적으로 만든다. (Zustand와 dnd-kit 학습)
- 할 일:  
Zustand 스토어 생성 (blocks 배열 관리, updateBlock, moveBlock 액션),  
input을 연결하여 텍스트 수정 시 실시간 반영 (Preview),  
dnd-kit을 설치하고 블록 리스트에 적용 (드래그 앤 드롭 구현)
- 학습 포인트:  
Zustand: 전역 상태 관리 및 불변성 유지 업데이트,  
dnd-kit: SortableContext, useSortable 훅 사용법,  
Controlled Component: 입력값과 상태의 동기화.

#### 3단계: 뷰어 분리 및 저장 (Separation & Storage)
- 목표: "편집 모드와 보기 모드를 분리하고 데이터 저장 및 공유하기"  
- 할 일:  
  - 라우트 분리:  
/editor: 편집 화면 (Input, 드래그 핸들 보임),    
/view/[id]: 완성 화면 (Input 없고 텍스트만 보임, 드래그 불가),    
Mock Save: '저장' 버튼을 누르면 localStorage에 JSON 저장,  
Mock Load: 뷰어 페이지 접속 시 localStorage에서 데이터 꺼내와서 그리기.
- 학습 포인트:  
Headless UI: 같은 데이터(blocks)를 쓰지만, 에디터에서는 Input으로, 뷰어에서는 div로 렌더링하는 "로직 재사용" 경험,  
Next.js의 Dynamic Routing.