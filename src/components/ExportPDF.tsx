import jsPDF from 'jspdf';

const exportToPDF = async ({ selectedServerId, addedParts, serverData }) => {
  try {
    // 선택된 서버가 없는 경우
    if (!selectedServerId) {
      alert('서버를 먼저 선택해주세요.');
      return false;
    }

    // 선택된 서버 정보 가져오기
    const server = serverData.servers.find(s => s.id === selectedServerId);
    
    if (!server) {
      alert('서버 정보를 찾을 수 없습니다.');
      return false;
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

    // PDF 생성
    const pdf = new jsPDF();
    
    // 제목
    pdf.setFontSize(20);
    pdf.text('Server Configuration Report', 20, 20);
    
    // 날짜
    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // 서버 정보
    pdf.setFontSize(16);
    pdf.text('Server Information', 20, 40);
    
    pdf.setFontSize(12);
    pdf.text(`Model: ${server.name}`, 20, 50);
    pdf.text(`Description: ${server.description}`, 20, 60);
    
    // 구성 요약
    pdf.setFontSize(16);
    pdf.text('Configuration Summary', 20, 80);
    
    pdf.setFontSize(12);
    pdf.text(`Processors: ${addedParts.cpu} x ${processor ? processor.name : 'Unknown'}`, 20, 90);
    pdf.text(`Memory Modules: ${addedParts.memory} x ${memory ? memory.capacity : 'Unknown'}`, 20, 100);
    pdf.text(`GPUs: ${addedParts.gpu} x ${gpu ? gpu.name : 'Unknown'}`, 20, 110);
    
    // 성능 및 전력
    pdf.setFontSize(16);
    pdf.text('Performance & Power', 20, 130);
    
    // 총 코어 수 계산
    const totalCores = processor ? processor.cores * addedParts.cpu : 0;
    // 총 메모리 용량 계산
    const memoryCapacity = memory ? memory.capacity : 'Unknown';
    // 총 전력 소모량 계산
    const processorPower = processor ? processor.tdp * addedParts.cpu : 0;
    const gpuPower = gpu ? gpu.tdp * addedParts.gpu : 0;
    const totalPower = 100 + processorPower + gpuPower; // 기본 서버 전력 + 부품 전력
    
    pdf.setFontSize(12);
    pdf.text(`Total CPU Cores: ${totalCores}`, 20, 140);
    pdf.text(`Total Memory: ${addedParts.memory} x ${memoryCapacity}`, 20, 150);
    pdf.text(`Total Power Consumption: ${totalPower}W`, 20, 160);
    
    // 비용 계산
    const serverCost = server.price || 0;
    const processorCost = processor ? processor.price * addedParts.cpu : 0;
    const memoryCost = memory ? memory.price * addedParts.memory : 0;
    const gpuCost = gpu ? gpu.price * addedParts.gpu : 0;
    const totalCost = serverCost + processorCost + memoryCost + gpuCost;
    
    pdf.setFontSize(16);
    pdf.text('Cost Estimation', 20, 180);
    
    pdf.setFontSize(12);
    pdf.text(`Server Base Cost: $${serverCost}`, 20, 190);
    pdf.text(`Processors Cost: $${processorCost}`, 20, 200);
    pdf.text(`Memory Cost: $${memoryCost}`, 20, 210);
    pdf.text(`GPUs Cost: $${gpuCost}`, 20, 220);
    pdf.text(`Total Estimated Cost: $${totalCost}`, 20, 230);
    
    // 바닥글
    pdf.setFontSize(10);
    pdf.text('© 2025 SERVER MANAGER', pdf.internal.pageSize.getWidth() / 2, 280, { align: 'center' });
    
    // PDF 저장
    pdf.save('server-configuration.pdf');
    
    return true;
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    alert('PDF 생성 중 오류가 발생했습니다.');
    return false;
  }
};

export default exportToPDF;
