
# Food Supply Chain Management Backend

This is the backend service for the Food Supply Chain Management application with ML prediction capabilities.

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- MySQL database server
- pip (Python package manager)

### Installation

1. Clone this repository
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Create a `.env` file by copying the example:
   ```
   cp .env.example .env
   ```
6. Edit the `.env` file with your MySQL database credentials

### Database Initialization

1. Make sure your MySQL server is running
2. Run the database initialization script:
   ```
   python db_init.py
   ```
   This will create the necessary database tables and populate them with sample data.

### Running the Application

Start the Flask development server:
```
python app.py
```

The API will be available at http://localhost:5000/

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add a new product

### Supply Chain Nodes
- `GET /api/nodes` - Get all supply chain nodes
- `POST /api/nodes` - Add a new node

### Inventory
- `GET /api/inventory` - Get all inventory records
- `POST /api/inventory` - Add a new inventory record

### Shipments
- `GET /api/shipments` - Get all shipments
- `POST /api/shipments` - Create a new shipment
- `PUT /api/update_shipment/<shipment_id>` - Update shipment status

### ML Predictions
- `POST /api/predict/spoilage` - Predict spoilage rate
- `POST /api/predict/demand` - Predict demand

### Metrics
- `GET /api/supply_chain_metrics` - Get supply chain performance metrics

## ML Models

This backend includes two simple machine learning models:

1. **Spoilage Prediction Model**: Uses temperature, humidity, shelf life, transit time, and initial quality to predict the spoilage rate.

2. **Demand Prediction Model**: Forecasts product demand based on month, previous demand, price, marketing spend, and competitor activity.

In a production environment, these would be replaced with more sophisticated models trained on real historical data.
