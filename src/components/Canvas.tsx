import React from 'react';
import { useDrop } from 'react-dnd';

interface CanvasProps {
  selectedServerId: string | null;
  serverData: any;
  addedParts: {
    cpu: number;
    gpu: number;
    memory: number;
  };
  onRemovePart: (type: string) => void;
  onAddPart: (type: string) => void;
}

interface DragItem {
  id: string;
  type: string;
}

const Canvas: React.FC<CanvasProps> = ({ selectedServerId, serverData, addedParts, onRemovePart, onAddPart }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['SERVER', 'PROCESSOR', 'MEMORY', 'STORAGE', 'POWER', 'GPU'],
    drop: (item: DragItem, monitor) => {
      if (item.type === 'server') {
        // 서버 선택 로직은 상위 컴포넌트에서 처리
      } else {
        // 부품 추가 로직은 상위 컴포넌트에서 처리
        onAddPart && onAddPart(item.type);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  // 선택된 서버가 없는 경우
  if (!selectedServerId) {
    return (
      <div 
        ref={drop} 
        className={`canvas empty ${isOver ? 'drop-hover' : ''}`}
      >
        <div className="canvas-placeholder">
          <p>서버를 이 영역으로 드래그하여 선택하세요</p>
        </div>
      </div>
    );
  }

  // 선택된 서버 정보 가져오기
  const server = serverData.servers.find((s: any) => s.id === selectedServerId);
  
  if (!server) {
    return <div className="canvas">서버 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div 
      ref={drop} 
      className={`canvas ${isOver ? 'drop-hover' : ''}`}
    >
      <h2>서버 구성</h2>
      <div className="server-details">
        <h3>{server.name}</h3>
        <p>{server.description}</p>
      </div>
      
      <div className="added-parts">
        <div className="part-section">
          <h4>프로세서</h4>
          {Array.from({ length: addedParts.cpu }).map((_, index) => (
            <div key={`cpu-${index}`} className="added-part">
              <span>Intel Xeon 4th Gen Platinum</span>
              <button onClick={() => onRemovePart('cpu')}>제거</button>
            </div>
          ))}
          {addedParts.cpu === 0 && (
            <p className="empty-message">추가된 프로세서 없음</p>
          )}
        </div>
        
        <div className="part-section">
          <h4>메모리</h4>
          {Array.from({ length: addedParts.memory }).map((_, index) => (
            <div key={`memory-${index}`} className="added-part">
              <span>32GB DDR5 RDIMM</span>
              <button onClick={() => onRemovePart('memory')}>제거</button>
            </div>
          ))}
          {addedParts.memory === 0 && (
            <p className="empty-message">추가된 메모리 없음</p>
          )}
        </div>
        
        <div className="part-section">
          <h4>GPU</h4>
          {Array.from({ length: addedParts.gpu }).map((_, index) => (
            <div key={`gpu-${index}`} className="added-part">
              <span>NVIDIA A100</span>
              <button onClick={() => onRemovePart('gpu')}>제거</button>
            </div>
          ))}
          {addedParts.gpu === 0 && (
            <p className="empty-message">추가된 GPU 없음</p>
          )}
        </div>
      </div>
      
      <div className="canvas-instructions">
        <p>부품을 이 영역으로 드래그하여 서버에 추가하세요</p>
      </div>
    </div>
  );
};

export default Canvas;
