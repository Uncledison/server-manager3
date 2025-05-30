import React from 'react';

const InfoPanel = ({ selectedServerId, serverData, addedParts }) => {
  // 선택된 서버가 없는 경우
  if (!selectedServerId) {
    return (
      <div className="info-panel">
        <h2>구성 정보</h2>
        <p className="empty-message">서버를 먼저 선택해주세요</p>
      </div>
    );
  }

  // 선택된 서버 정보 가져오기
  const server = serverData.servers.find(s => s.id === selectedServerId);
  
  if (!server) {
    return (
      <div className="info-panel">
        <h2>구성 정보</h2>
        <p className="error-message">서버 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 프로세서 정보 가져오기 (예시로 첫 번째 프로세서 사용)
  const processor = serverData.processors && serverData.processors.length > 0 ? 
    serverData.processors[0] : null;
  
  // 메모리 정보 가져오기 (예시로 첫 번째 메모리 사용)
  const memory = serverData.memories && serverData.memories.length > 0 ? 
    serverData.memories[0] : null;
  
  // GPU 정보 가져오기 (예시로 첫 번째 GPU 사용)
  const gpu = serverData.gpus && serverData.gpus.length > 0 ? 
    serverData.gpus[0] : null;

  // 총 전력 소모량 계산
  const calculateTotalPower = () => {
    let total = 0;
    
    // 기본 서버 전력
    total += 100; // 서버 기본 전력 (예시)
    
    // 프로세서 전력
    if (processor) {
      total += (processor.tdp * addedParts.cpu);
    }
    
    // GPU 전력
    if (gpu) {
      total += (gpu.tdp * addedParts.gpu);
    }
    
    return total;
  };

  // 총 메모리 용량 계산
  const calculateTotalMemory = () => {
    if (!memory) return 0;
    
    // 메모리 용량 추출 (예: "32GB" -> 32)
    const capacityMatch = memory.capacity.match(/(\d+)/);
    if (!capacityMatch) return 0;
    
    const capacityValue = parseInt(capacityMatch[1], 10);
    return capacityValue * addedParts.memory;
  };

  // 예상 비용 계산
  const calculateTotalCost = () => {
    let total = 0;
    
    // 서버 기본 비용
    total += server.price || 0;
    
    // 프로세서 비용
    if (processor) {
      total += (processor.price * addedParts.cpu);
    }
    
    // 메모리 비용
    if (memory) {
      total += (memory.price * addedParts.memory);
    }
    
    // GPU 비용
    if (gpu) {
      total += (gpu.price * addedParts.gpu);
    }
    
    return total;
  };

  // 호환성 검사
  const checkCompatibility = () => {
    // 프로세서 소켓 수 검사
    if (addedParts.cpu > server.maxCpuSockets) {
      return false;
    }
    
    // 메모리 슬롯 수 검사
    if (addedParts.memory > server.maxMemorySlots) {
      return false;
    }
    
    // GPU 슬롯 수 검사
    if (addedParts.gpu > server.maxGpuSlots) {
      return false;
    }
    
    return true;
  };

  const isCompatible = checkCompatibility();
  const totalPower = calculateTotalPower();
  const totalMemory = calculateTotalMemory();
  const totalCost = calculateTotalCost();

  return (
    <div className="info-panel">
      <h2>구성 정보</h2>
      
      <div className="info-section">
        <h3>서버 구성 요약</h3>
        <p>서버 모델: {server.name}</p>
        <p>프로세서: {addedParts.cpu} / {server.maxCpuSockets} 슬롯</p>
        <p>메모리: {addedParts.memory} / {server.maxMemorySlots} 슬롯</p>
        <p>총 메모리 용량: {totalMemory} GB</p>
        <p>스토리지: 0 / {server.maxStorageSlots || 12} 슬롯</p>
        <p>파워 서플라이: 0 / {server.maxPowerSupplies || 2}</p>
        <p>GPU: {addedParts.gpu} / {server.maxGpuSlots} 슬롯</p>
      </div>
      
      <div className="info-section">
        <h3>호환성 상태</h3>
        <p className={isCompatible ? "compatible" : "incompatible"}>
          {isCompatible ? "호환됨 ✓" : "호환되지 않음 ✗"}
        </p>
      </div>
      
      <div className="info-section">
        <h3>리소스 사용량</h3>
        <p>전력 소모량: {totalPower} W / {server.maxPower || 0} W</p>
        <p>{Math.round((totalPower / (server.maxPower || 1)) * 100)}%</p>
      </div>
      
      <div className="info-section">
        <h3>예상 비용</h3>
        <p>${totalCost}</p>
        <p>기본 서버 가격 포함</p>
      </div>
    </div>
  );
};

export default InfoPanel;
