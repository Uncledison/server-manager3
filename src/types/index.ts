export interface Server {
  id: string;
  name: string;
  description: string;
  maxCpuSockets: number;
  maxMemorySlots: number;
  maxStorageSlots: number;
  maxPowerSupplies: number;
  maxGpuSlots: number;
  maxPower: number;
  price: number;
}

export interface Processor {
  id: string;
  name: string;
  description: string;
  cores: number;
  threads: number;
  baseFreq: string;
  tdp: number;
  price: number;
}

export interface Memory {
  id: string;
  name: string;
  capacity: string;
  speed: string;
  price: number;
}

export interface Storage {
  id: string;
  name: string;
  type: string;
  capacity: string;
  price: number;
}

export interface PowerSupply {
  id: string;
  name: string;
  wattage: string;
  efficiency: string;
  price: number;
}

export interface GPU {
  id: string;
  name: string;
  memory: string;
  tdp: number;
  price: number;
}
