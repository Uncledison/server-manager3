import React from 'react';
import { useState, useEffect } from 'react';
import serverData from '../data/serverData';
import PartLibrary from './PartLibrary';
import Canvas from './Canvas';
import InfoPanel from './InfoPanel';
import exportToPDF from './ExportPDF';
import '../App.css';

function App() {
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const [addedParts, setAddedParts] = useState({
    cpu: 0,
    gpu: 0,
    memory: 0
  });
  const [activeTab, setActiveTab] = useState('server');

  // 부품 추가 함수
  const addPart = (type: string) => {
    if (selectedServerId === null) {
      alert('서버를 먼저 선택해주세요.');
      return;
    }

    const server = serverData.servers[0]; // 첫 번째 서버 사용
    
    // 부품 타입별 제한 검사
    if (type === 'cpu' && addedParts.cpu >= server.maxCpuSockets) {
      alert(`CPU는 최대 ${server.maxCpuSockets}개까지 추가할 수 있습니다.`);
      return;
    }
    
    if (type === 'gpu' && addedParts.gpu >= server.maxGpuSlots) {
      alert(`GPU는 최대 ${server.maxGpuSlots}개까지 추가할 수 있습니다.`);
      return;
    }
    
    if (type === 'memory' && addedParts.memory >= server.maxMemorySlots) {
      alert(`메모리는 최대 ${server.maxMemorySlots}개까지 추가할 수 있습니다.`);
      return;
    }

    setAddedParts(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  // 부품 제거 함수
  const removePart = (type: string) => {
    if (addedParts[type as keyof typeof addedParts] > 0) {
      setAddedParts(prev => ({
        ...prev,
        [type]: prev[type as keyof typeof addedParts] - 1
      }));
    }
  };

  // 서버 선택 함수
  const selectServer = (id: string) => {
    setSelectedServerId(id);
    // 서버 변경 시 부품 초기화
    setAddedParts({
      cpu: 0,
      gpu: 0,
      memory: 0
    });
  };

  // PDF 내보내기 함수
  const handleExportPDF = async () => {
    try {
      // 클라이언트 측에서 PDF 생성 (서버 사이드 PDF 생성 API가 없는 경우)
      const result = await exportToPDF({
        selectedServerId,
        addedParts,
        serverData
      });
      
      if (result) {
        console.log('PDF 내보내기 성공');
      }
    } catch (error) {
      console.error('PDF 내보내기 오류:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="icon">💻</span> SERVER MANAGER
        </div>
      </header>
      
      <main className="main-content">
        <div className="action-buttons">
          <button className="action-button" onClick={handleExportPDF}>내보내기 (PDF)</button>
        </div>
        
        <div className="workspace">
          <div className="left-panel">
            <h2>부품 라이브러리</h2>
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'server' ? 'active' : ''}`}
                onClick={() => setActiveTab('server')}
              >
                서버
              </button>
              <button 
                className={`tab ${activeTab === 'cpu' ? 'active' : ''}`}
                onClick={() => setActiveTab('cpu')}
              >
                프로세서
              </button>
              <button 
                className={`tab ${activeTab === 'memory' ? 'active' : ''}`}
                onClick={() => setActiveTab('memory')}
              >
                메모리
              </button>
              <button 
                className={`tab ${activeTab === 'storage' ? 'active' : ''}`}
                onClick={() => setActiveTab('storage')}
              >
                스토리지
              </button>
              <button 
                className={`tab ${activeTab === 'power' ? 'active' : ''}`}
                onClick={() => setActiveTab('power')}
              >
                파워 서플라이
              </button>
              <button 
                className={`tab ${activeTab === 'gpu' ? 'active' : ''}`}
                onClick={() => setActiveTab('gpu')}
              >
                GPU
              </button>
            </div>
            
            <PartLibrary 
              activeTab={activeTab} 
              serverData={serverData} 
              onSelectServer={selectServer}
              onAddPart={addPart}
              selectedServerId={selectedServerId}
            />
          </div>
          
          <div className="center-panel">
            <Canvas 
              selectedServerId={selectedServerId}
              serverData={serverData}
              addedParts={addedParts}
              onRemovePart={removePart}
              onAddPart={addPart}
            />
          </div>
          
          <div className="right-panel">
            <InfoPanel 
              selectedServerId={selectedServerId}
              serverData={serverData}
              addedParts={addedParts}
            />
          </div>
        </div>
      </main>
      
      <footer className="footer">
        © 2025 SERVER MANAGER
      </footer>
    </div>
  );
}

export default App;
