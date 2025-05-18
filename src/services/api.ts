
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface Product {
  id: number;
  name: string;
  category: string;
  shelf_life_days: number;
  created_at: string;
}

export interface SupplyChainNode {
  id: number;
  name: string;
  type: 'farm' | 'processing' | 'warehouse' | 'retail';
  location: string;
  capacity: number;
  created_at: string;
}

export interface Inventory {
  id: number;
  node_id: number;
  product_id: number;
  quantity: number;
  temperature: number | null;
  humidity: number | null;
  quality_score: number | null;
  timestamp: string;
  product_name?: string;
  node_name?: string;
}

export interface Shipment {
  id: number;
  product_id: number;
  source_node_id: number;
  destination_node_id: number;
  quantity: number;
  departure_time: string;
  estimated_arrival_time: string;
  actual_arrival_time: string | null;
  status: 'scheduled' | 'in_transit' | 'delivered' | 'delayed';
  product_name?: string;
  source_name?: string;
  destination_name?: string;
}

export interface SpoilageParams {
  temperature: number;
  humidity: number;
  shelf_life_days: number;
  days_in_transit: number;
  initial_quality: number;
}

export interface SpoilageResult {
  predicted_spoilage_percentage: number;
  risk_level: 'low' | 'medium' | 'high';
}

export interface DemandParams {
  month: number;
  previous_demand: number;
  price: number;
  marketing_spend: number;
  competitor_activity: number;
}

export interface DemandResult {
  predicted_demand: number;
  confidence: 'low' | 'medium' | 'high';
  suggested_inventory_level: number;
}

export interface SupplyChainMetrics {
  inventory_by_node_type: Array<{
    type: string;
    total_inventory: number;
  }>;
  average_lead_times: Array<{
    source_id: number;
    destination_id: number;
    avg_lead_time: number;
  }>;
  quality_metrics: {
    average_quality_score: number;
    spoilage_rate: number;
  };
}

// Products API
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const addProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<{ id: number }> => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

// Supply Chain Nodes API
export const getNodes = async (): Promise<SupplyChainNode[]> => {
  const response = await axios.get(`${API_URL}/nodes`);
  return response.data;
};

export const addNode = async (node: Omit<SupplyChainNode, 'id' | 'created_at'>): Promise<{ id: number }> => {
  const response = await axios.post(`${API_URL}/nodes`, node);
  return response.data;
};

// Inventory API
export const getInventory = async (): Promise<Inventory[]> => {
  const response = await axios.get(`${API_URL}/inventory`);
  return response.data;
};

export const addInventory = async (
  inventory: Omit<Inventory, 'id' | 'timestamp' | 'product_name' | 'node_name'>
): Promise<{ id: number }> => {
  const response = await axios.post(`${API_URL}/inventory`, inventory);
  return response.data;
};

// Shipments API
export const getShipments = async (): Promise<Shipment[]> => {
  const response = await axios.get(`${API_URL}/shipments`);
  return response.data;
};

export const addShipment = async (
  shipment: Omit<Shipment, 'id' | 'actual_arrival_time' | 'product_name' | 'source_name' | 'destination_name'>
): Promise<{ id: number }> => {
  const response = await axios.post(`${API_URL}/shipments`, shipment);
  return response.data;
};

export const updateShipment = async (
  id: number,
  update: { status: Shipment['status']; actual_arrival_time?: string }
): Promise<void> => {
  await axios.put(`${API_URL}/update_shipment/${id}`, update);
};

// ML Prediction APIs
export const predictSpoilage = async (params: SpoilageParams): Promise<SpoilageResult> => {
  const response = await axios.post(`${API_URL}/predict/spoilage`, params);
  return response.data;
};

export const predictDemand = async (params: DemandParams): Promise<DemandResult> => {
  const response = await axios.post(`${API_URL}/predict/demand`, params);
  return response.data;
};

// Metrics API
export const getSupplyChainMetrics = async (): Promise<SupplyChainMetrics> => {
  const response = await axios.get(`${API_URL}/supply_chain_metrics`);
  return response.data;
};

export default {
  getProducts,
  addProduct,
  getNodes,
  addNode,
  getInventory,
  addInventory,
  getShipments,
  addShipment,
  updateShipment,
  predictSpoilage,
  predictDemand,
  getSupplyChainMetrics
};
