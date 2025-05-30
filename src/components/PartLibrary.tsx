import React from 'react';
import { useDrag } from 'react-dnd';

const PartLibrary = ({ activeTab, serverData, onSelectServer, onAddPart, selectedServerId }) => {
  // 서버 아이템 컴포넌트
  const ServerItem = ({ server }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'SERVER',
      item: { id: server.id, type: 'server' },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }));

    return (
      <div 
        ref={drag}
        className={`part-item ${isDragging ? 'dragging' : ''} ${selectedServerId === server.id ? 'selected' : ''}`}
        onClick={() => onSelectServer(server.id)}
      >
        <img src="/server.png" alt={server.name} className="part-icon" />
        <div className="part-info">
          <h3>{server.name}</h3>
          <p>{server.description}</p>
        </div>
      </div>
    );
  };

  // 프로세서 아이템 컴포넌트
  const ProcessorItem = ({ processor }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'PROCESSOR',
      item: { id: processor.id, type: 'cpu' },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }));

    return (
      <div 
        ref={drag}
        className={`part-item ${isDragging ? 'dragging' : ''}`}
        onClick={() => onAddPart('cpu')}
      >
        <img src="/processor.png" alt={processor.name} className="part-icon" />
        <div className="part-info">
          <h3>{processor.name}</h3>
          <p>Cores: {processor.cores}</p>
          <p>Threads: {processor.threads}</p>
          <p>Base Freq: {processor.baseFreq}</p>
          <p>TDP: {processor.tdp}</p>
          <p>Price: ${processor.price}</p>
        </div>
      </div>
    );
  };

  // 메모리 아이템 컴포넌트
  const MemoryItem = ({ memory }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'MEMORY',
      item: { id: memory.id, type: 'memory' },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }));

    return (
      <div 
        ref={drag}
        className={`part-item ${isDragging ? 'dragging' : ''}`}
        onClick={() => onAddPart('memory')}
      >
        <img src="/memory.png" alt={memory.name} className="part-icon" />
        <div className="part-info">
          <h3>{memory.name}</h3>
          <p>Capacity: {memory.capacity}</p>
          <p>Speed: {memory.speed}</p>
          <p>Price: ${memory.price}</p>
        </div>
      </div>
    );
  };

  // 스토리지 아이템 컴포넌트
  const StorageItem = ({ storage }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'STORAGE',
      item: { id: storage.id, type: 'storage' },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }));

    return (
      <div 
        ref={drag}
        className={`part-item ${isDragging ? 'dragging' : ''}`}
        onClick={() => onAddPart('storage')}
      >
        <img src="/storage.png" alt={storage.name} className="part-icon" />
        <div className="part-info">
          <h3>{storage.name}</h3>
          <p>Type: {storage.type}</p>
          <p>Capacity: {storage.capacity}</p>
          <p>Price: ${storage.price}</p>
        </div>
      </div>
    );
  };

  // 파워 서플라이 아이템 컴포넌트
  const PowerSupplyItem = ({ power }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'POWER',
      item: { id: power.id, type: 'power' },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }));

    return (
      <div 
        ref={drag}
        className={`part-item ${isDragging ? 'dragging' : ''}`}
        onClick={() => onAddPart('power')}
      >
        <img src="/power.png" alt={power.name} className="part-icon" />
        <div className="part-info">
          <h3>{power.name}</h3>
          <p>Wattage: {power.wattage}</p>
          <p>Efficiency: {power.efficiency}</p>
          <p>Price: ${power.price}</p>
        </div>
      </div>
    );
  };

  // GPU 아이템 컴포넌트
  const GPUItem = ({ gpu }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'GPU',
      item: { id: gpu.id, type: 'gpu' },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }));

    return (
      <div 
        ref={drag}
        className={`part-item ${isDragging ? 'dragging' : ''}`}
        onClick={() => onAddPart('gpu')}
      >
        <img src="/gpu.png" alt={gpu.name} className="part-icon" />
        <div className="part-info">
          <h3>{gpu.name}</h3>
          <p>Memory: {gpu.memory}</p>
          <p>TDP: {gpu.tdp}</p>
          <p>Price: ${gpu.price}</p>
        </div>
      </div>
    );
  };

  // 활성화된 탭에 따라 다른 컴포넌트 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case 'server':
        return (
          <div className="part-list">
            {serverData.servers && serverData.servers.map(server => (
              <ServerItem key={server.id} server={server} />
            ))}
          </div>
        );
      case 'cpu':
        return (
          <div className="part-list">
            {serverData.processors && serverData.processors.map(processor => (
              <ProcessorItem key={processor.id} processor={processor} />
            ))}
          </div>
        );
      case 'memory':
        return (
          <div className="part-list">
            {serverData.memories && serverData.memories.map(memory => (
              <MemoryItem key={memory.id} memory={memory} />
            ))}
          </div>
        );
      case 'storage':
        return (
          <div className="part-list">
            {serverData.storages && serverData.storages.map(storage => (
              <StorageItem key={storage.id} storage={storage} />
            ))}
          </div>
        );
      case 'power':
        return (
          <div className="part-list">
            {serverData.powerSupplies && serverData.powerSupplies.map(power => (
              <PowerSupplyItem key={power.id} power={power} />
            ))}
          </div>
        );
      case 'gpu':
        return (
          <div className="part-list">
            {serverData.gpus && serverData.gpus.map(gpu => (
              <GPUItem key={gpu.id} gpu={gpu} />
            ))}
          </div>
        );
      default:
        return <div>탭을 선택해주세요</div>;
    }
  };

  return (
    <div className="part-library">
      {renderContent()}
    </div>
  );
};

export default PartLibrary;
