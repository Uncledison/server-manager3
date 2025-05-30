import { Server, Processor, Memory, Storage, PowerSupply, GPU } from '../types';

// 서버 데이터
const serverData = {
  servers: [
    {
      id: 'dl380-gen11',
      name: 'HPE ProLiant DL380 Gen11',
      description: 'Adaptable for diverse workloads and environments, the secure 2P 2U HPE ProLiant DL380 Gen11 Servers delivers world-class performance with the right balance of expandability and scalability.',
      maxCpuSockets: 2,
      maxMemorySlots: 32,
      maxStorageSlots: 12,
      maxPowerSupplies: 2,
      maxGpuSlots: 4,
      maxPower: 1600,
      price: 2500
    }
  ],
  
  processors: [
    {
      id: 'xeon-bronze',
      name: 'Intel Xeon 4th Gen Bronze',
      description: '4th Generation Intel Xeon Scalable Processor (Bronze)',
      cores: 8,
      threads: 16,
      baseFreq: '2.1 GHz',
      tdp: 120,
      price: 800
    },
    {
      id: 'xeon-silver',
      name: 'Intel Xeon 4th Gen Silver',
      description: '4th Generation Intel Xeon Scalable Processor (Silver)',
      cores: 12,
      threads: 24,
      baseFreq: '2.4 GHz',
      tdp: 150,
      price: 1200
    },
    {
      id: 'xeon-gold',
      name: 'Intel Xeon 4th Gen Gold',
      description: '4th Generation Intel Xeon Scalable Processor (Gold)',
      cores: 24,
      threads: 48,
      baseFreq: '2.7 GHz',
      tdp: 205,
      price: 2500
    },
    {
      id: 'xeon-platinum',
      name: 'Intel Xeon 4th Gen Platinum',
      description: '4th Generation Intel Xeon Scalable Processor (Platinum)',
      cores: 32,
      threads: 64,
      baseFreq: '3 GHz',
      tdp: 350,
      price: 4000
    }
  ],
  
  memories: [
    {
      id: 'ddr5-16gb',
      name: '16GB DDR5 RDIMM',
      capacity: '16GB',
      speed: '4800 MHz',
      price: 120
    },
    {
      id: 'ddr5-32gb',
      name: '32GB DDR5 RDIMM',
      capacity: '32GB',
      speed: '4800 MHz',
      price: 220
    },
    {
      id: 'ddr5-64gb',
      name: '64GB DDR5 RDIMM',
      capacity: '64GB',
      speed: '4800 MHz',
      price: 450
    }
  ],
  
  storages: [
    {
      id: 'ssd-480gb',
      name: '480GB SATA SSD',
      type: 'SSD',
      capacity: '480GB',
      price: 150
    },
    {
      id: 'ssd-960gb',
      name: '960GB SATA SSD',
      type: 'SSD',
      capacity: '960GB',
      price: 250
    },
    {
      id: 'nvme-1tb',
      name: '1TB NVMe SSD',
      type: 'NVMe',
      capacity: '1TB',
      price: 350
    }
  ],
  
  powerSupplies: [
    {
      id: 'power-800w',
      name: '800W Power Supply',
      wattage: '800W',
      efficiency: '80+ Platinum',
      price: 180
    },
    {
      id: 'power-1600w',
      name: '1600W Power Supply',
      wattage: '1600W',
      efficiency: '80+ Titanium',
      price: 320
    }
  ],
  
  gpus: [
    {
      id: 'nvidia-a30',
      name: 'NVIDIA A30',
      memory: '24GB',
      tdp: 165,
      price: 3500
    },
    {
      id: 'nvidia-a100',
      name: 'NVIDIA A100',
      memory: '80GB',
      tdp: 300,
      price: 10000
    }
  ]
};

export default serverData;
