
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection function
def create_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# Initialize database tables
def init_db():
    connection = create_db_connection()
    if connection:
        cursor = connection.cursor()
        
        # Create products table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            category VARCHAR(50) NOT NULL,
            shelf_life_days INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        # Create supply_chain_nodes table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS supply_chain_nodes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            type ENUM('farm', 'processing', 'warehouse', 'retail') NOT NULL,
            location VARCHAR(100) NOT NULL,
            capacity FLOAT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        # Create inventory table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            node_id INT NOT NULL,
            product_id INT NOT NULL,
            quantity FLOAT NOT NULL,
            temperature FLOAT,
            humidity FLOAT,
            quality_score FLOAT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (node_id) REFERENCES supply_chain_nodes(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
        ''')
        
        # Create shipments table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS shipments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            source_node_id INT NOT NULL,
            destination_node_id INT NOT NULL,
            quantity FLOAT NOT NULL,
            departure_time TIMESTAMP,
            estimated_arrival_time TIMESTAMP,
            actual_arrival_time TIMESTAMP NULL,
            status ENUM('scheduled', 'in_transit', 'delivered', 'delayed') NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (source_node_id) REFERENCES supply_chain_nodes(id),
            FOREIGN KEY (destination_node_id) REFERENCES supply_chain_nodes(id)
        )
        ''')
        
        connection.commit()
        cursor.close()
        connection.close()

# Initialize database on startup
init_db()

# API Routes
@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    connection = create_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    if request.method == 'GET':
        cursor.execute("SELECT * FROM products")
        products = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(products)
    
    elif request.method == 'POST':
        data = request.json
        query = "INSERT INTO products (name, category, shelf_life_days) VALUES (%s, %s, %s)"
        values = (data['name'], data['category'], data['shelf_life_days'])
        
        cursor.execute(query, values)
        connection.commit()
        
        new_id = cursor.lastrowid
        cursor.close()
        connection.close()
        
        return jsonify({"id": new_id, "message": "Product added successfully"}), 201

@app.route('/api/nodes', methods=['GET', 'POST'])
def handle_nodes():
    connection = create_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    if request.method == 'GET':
        cursor.execute("SELECT * FROM supply_chain_nodes")
        nodes = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(nodes)
    
    elif request.method == 'POST':
        data = request.json
        query = "INSERT INTO supply_chain_nodes (name, type, location, capacity) VALUES (%s, %s, %s, %s)"
        values = (data['name'], data['type'], data['location'], data['capacity'])
        
        cursor.execute(query, values)
        connection.commit()
        
        new_id = cursor.lastrowid
        cursor.close()
        connection.close()
        
        return jsonify({"id": new_id, "message": "Node added successfully"}), 201

@app.route('/api/inventory', methods=['GET', 'POST'])
def handle_inventory():
    connection = create_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    if request.method == 'GET':
        cursor.execute('''
            SELECT i.*, p.name as product_name, n.name as node_name 
            FROM inventory i
            JOIN products p ON i.product_id = p.id
            JOIN supply_chain_nodes n ON i.node_id = n.id
        ''')
        inventory = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(inventory)
    
    elif request.method == 'POST':
        data = request.json
        query = '''
            INSERT INTO inventory 
            (node_id, product_id, quantity, temperature, humidity, quality_score) 
            VALUES (%s, %s, %s, %s, %s, %s)
        '''
        values = (
            data['node_id'], 
            data['product_id'], 
            data['quantity'],
            data.get('temperature'),
            data.get('humidity'),
            data.get('quality_score')
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        new_id = cursor.lastrowid
        cursor.close()
        connection.close()
        
        return jsonify({"id": new_id, "message": "Inventory record added successfully"}), 201

@app.route('/api/shipments', methods=['GET', 'POST'])
def handle_shipments():
    connection = create_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    if request.method == 'GET':
        cursor.execute('''
            SELECT s.*, p.name as product_name, 
            src.name as source_name, dst.name as destination_name 
            FROM shipments s
            JOIN products p ON s.product_id = p.id
            JOIN supply_chain_nodes src ON s.source_node_id = src.id
            JOIN supply_chain_nodes dst ON s.destination_node_id = dst.id
        ''')
        shipments = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(shipments)
    
    elif request.method == 'POST':
        data = request.json
        query = '''
            INSERT INTO shipments 
            (product_id, source_node_id, destination_node_id, quantity, 
            departure_time, estimated_arrival_time, status) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        '''
        values = (
            data['product_id'],
            data['source_node_id'],
            data['destination_node_id'],
            data['quantity'],
            data['departure_time'],
            data['estimated_arrival_time'],
            data['status']
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        new_id = cursor.lastrowid
        cursor.close()
        connection.close()
        
        return jsonify({"id": new_id, "message": "Shipment added successfully"}), 201

@app.route('/api/update_shipment/<int:shipment_id>', methods=['PUT'])
def update_shipment(shipment_id):
    connection = create_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = connection.cursor(dictionary=True)
    data = request.json
    
    query = "UPDATE shipments SET status = %s WHERE id = %s"
    values = (data['status'], shipment_id)
    
    if data['status'] == 'delivered' and 'actual_arrival_time' in data:
        query = "UPDATE shipments SET status = %s, actual_arrival_time = %s WHERE id = %s"
        values = (data['status'], data['actual_arrival_time'], shipment_id)
    
    cursor.execute(query, values)
    connection.commit()
    
    affected_rows = cursor.rowcount
    cursor.close()
    connection.close()
    
    if affected_rows:
        return jsonify({"message": "Shipment updated successfully"})
    else:
        return jsonify({"error": "Shipment not found"}), 404

# ML Prediction endpoints
@app.route('/api/predict/spoilage', methods=['POST'])
def predict_spoilage():
    data = request.json
    
    # In a real application, you would load a pre-trained model
    # For this example, we'll create a simple model with sample data
    
    # Sample training data (in a real app, this would come from your database)
    # Format: [temperature, humidity, shelf_life_days, days_in_transit, initial_quality]
    X_sample = np.array([
        [2, 65, 14, 2, 9.5],
        [4, 70, 14, 3, 9.0],
        [8, 75, 7, 2, 8.5],
        [12, 80, 7, 4, 8.0],
        [15, 85, 3, 1, 7.5],
        [18, 90, 3, 2, 7.0],
    ])
    
    # Target: spoilage rate as percentage
    y_sample = np.array([0.5, 1.2, 2.0, 4.5, 7.0, 12.0])
    
    # Train a simple Random Forest model
    model = RandomForestRegressor(n_estimators=50, random_state=42)
    model.fit(X_sample, y_sample)
    
    # Process input data for prediction
    input_features = np.array([[
        data['temperature'],
        data['humidity'],
        data['shelf_life_days'],
        data['days_in_transit'],
        data['initial_quality']
    ]])
    
    # Make prediction
    predicted_spoilage = model.predict(input_features)[0]
    
    return jsonify({
        "predicted_spoilage_percentage": round(predicted_spoilage, 2),
        "risk_level": "high" if predicted_spoilage > 5 else "medium" if predicted_spoilage > 2 else "low"
    })

@app.route('/api/predict/demand', methods=['POST'])
def predict_demand():
    data = request.json
    
    # Sample training data for demand prediction
    # Format: [month, previous_demand, price, marketing_spend, competitor_activity]
    X_sample = np.array([
        [1, 1000, 5.99, 500, 2],
        [2, 1200, 5.99, 600, 3],
        [3, 1100, 5.49, 700, 2],
        [4, 1300, 5.49, 800, 1],
        [5, 1500, 4.99, 1000, 1],
        [6, 1400, 4.99, 900, 2],
        [7, 1300, 5.29, 800, 3],
        [8, 1200, 5.29, 700, 3],
        [9, 1400, 5.49, 900, 2],
        [10, 1600, 5.99, 1100, 1],
        [11, 1800, 5.99, 1200, 1],
        [12, 2000, 6.49, 1500, 2],
    ])
    
    # Target: predicted demand in units
    y_sample = np.array([1100, 1250, 1150, 1400, 1600, 1450, 1350, 1200, 1500, 1700, 1900, 2200])
    
    # Train model
    model = RandomForestRegressor(n_estimators=50, random_state=42)
    model.fit(X_sample, y_sample)
    
    # Make prediction
    input_features = np.array([[
        data['month'],
        data['previous_demand'],
        data['price'],
        data['marketing_spend'],
        data['competitor_activity']
    ]])
    
    predicted_demand = model.predict(input_features)[0]
    
    return jsonify({
        "predicted_demand": round(predicted_demand),
        "confidence": "medium",  # In a real app, this would be calculated based on model metrics
        "suggested_inventory_level": round(predicted_demand * 1.2)  # Simple buffer calculation
    })

@app.route('/api/supply_chain_metrics', methods=['GET'])
def get_supply_chain_metrics():
    connection = create_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    # Get inventory levels by node type
    cursor.execute('''
        SELECT n.type, SUM(i.quantity) as total_inventory
        FROM inventory i
        JOIN supply_chain_nodes n ON i.node_id = n.id
        GROUP BY n.type
    ''')
    inventory_by_node = cursor.fetchall()
    
    # Get average lead times
    cursor.execute('''
        SELECT 
            TIMESTAMPDIFF(DAY, departure_time, actual_arrival_time) as lead_time,
            source_node_id, destination_node_id
        FROM shipments
        WHERE status = 'delivered' AND actual_arrival_time IS NOT NULL
    ''')
    lead_times = cursor.fetchall()
    
    # Calculate average by source-destination pairs
    lead_time_mapping = {}
    for lt in lead_times:
        key = f"{lt['source_node_id']}_{lt['destination_node_id']}"
        if key not in lead_time_mapping:
            lead_time_mapping[key] = []
        lead_time_mapping[key].append(lt['lead_time'])
    
    avg_lead_times = []
    for key, times in lead_time_mapping.items():
        src, dst = key.split('_')
        avg_lead_times.append({
            "source_id": int(src),
            "destination_id": int(dst),
            "avg_lead_time": sum(times) / len(times)
        })
    
    cursor.close()
    connection.close()
    
    return jsonify({
        "inventory_by_node_type": inventory_by_node,
        "average_lead_times": avg_lead_times,
        "quality_metrics": {
            "average_quality_score": 4.2,  # Placeholder data
            "spoilage_rate": 2.8  # Placeholder data
        }
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
