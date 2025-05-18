
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Sample data for initial database population
sample_products = [
    ("Apples", "Fruits", 14),
    ("Bananas", "Fruits", 7),
    ("Carrots", "Vegetables", 21),
    ("Milk", "Dairy", 10),
    ("Chicken", "Meat", 5),
    ("Bread", "Bakery", 7)
]

sample_nodes = [
    ("Farm A", "farm", "California", 5000),
    ("Farm B", "farm", "Oregon", 3000),
    ("Processing Plant 1", "processing", "Washington", 10000),
    ("Central Warehouse", "warehouse", "Nevada", 25000),
    ("Distribution Center East", "warehouse", "Ohio", 15000),
    ("Retail Store North", "retail", "Michigan", 2000),
    ("Retail Store South", "retail", "Texas", 2500)
]

sample_inventory = [
    (1, 1, 500, 4, 70, 4.8),
    (1, 3, 800, 5, 75, 4.5),
    (2, 2, 300, 6, 80, 4.7),
    (3, 4, 2000, 15, 50, 4.6),
    (4, 5, 1500, 12, 55, 4.4),
    (5, 1, 200, 16, 45, 3.9),
    (6, 5, 150, 22, 40, 4.0),
    (7, 2, 175, 23, 38, 4.2)
]

sample_shipments = [
    (1, 1, 3, 200, "2023-05-14 08:30:00", "2023-05-16 09:00:00", "delivered"),
    (2, 2, 3, 150, "2023-05-14 10:15:00", "2023-05-16 11:30:00", "in_transit"),
    (3, 3, 4, 500, "2023-05-15 11:30:00", "2023-05-18 14:00:00", "scheduled"),
    (4, 4, 6, 100, "2023-05-13 09:00:00", "2023-05-15 16:00:00", "delivered"),
    (5, 4, 7, 120, "2023-05-16 09:00:00", "2023-05-18 16:00:00", "scheduled")
]

def initialize_database():
    try:
        # First create the database if it doesn't exist
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD')
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            # Create database
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('DB_NAME')}")
            print(f"Database '{os.getenv('DB_NAME')}' created or already exists.")
            
            # Switch to the database
            cursor.execute(f"USE {os.getenv('DB_NAME')}")
            
            # Create tables (copied from app.py for consistency)
            cursor.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                category VARCHAR(50) NOT NULL,
                shelf_life_days INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            ''')
            
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
            
            # Insert sample data
            
            # Check if products table is empty
            cursor.execute("SELECT COUNT(*) FROM products")
            if cursor.fetchone()[0] == 0:
                cursor.executemany(
                    "INSERT INTO products (name, category, shelf_life_days) VALUES (%s, %s, %s)",
                    sample_products
                )
                print(f"Inserted {cursor.rowcount} products.")
            
            # Check if nodes table is empty
            cursor.execute("SELECT COUNT(*) FROM supply_chain_nodes")
            if cursor.fetchone()[0] == 0:
                cursor.executemany(
                    "INSERT INTO supply_chain_nodes (name, type, location, capacity) VALUES (%s, %s, %s, %s)",
                    sample_nodes
                )
                print(f"Inserted {cursor.rowcount} supply chain nodes.")
            
            # Check if inventory table is empty
            cursor.execute("SELECT COUNT(*) FROM inventory")
            if cursor.fetchone()[0] == 0:
                cursor.executemany(
                    "INSERT INTO inventory (node_id, product_id, quantity, temperature, humidity, quality_score) VALUES (%s, %s, %s, %s, %s, %s)",
                    sample_inventory
                )
                print(f"Inserted {cursor.rowcount} inventory records.")
            
            # Check if shipments table is empty
            cursor.execute("SELECT COUNT(*) FROM shipments")
            if cursor.fetchone()[0] == 0:
                # For shipments we need to handle the timestamps differently
                for product_id, source_id, dest_id, qty, departure, arrival, status in sample_shipments:
                    cursor.execute(
                        """
                        INSERT INTO shipments 
                        (product_id, source_node_id, destination_node_id, quantity, 
                        departure_time, estimated_arrival_time, status, actual_arrival_time) 
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        """,
                        (product_id, source_id, dest_id, qty, departure, arrival, status, 
                         arrival if status == 'delivered' else None)
                    )
                print(f"Inserted {len(sample_shipments)} shipment records.")
            
            connection.commit()
            print("Sample data inserted successfully!")
            
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
    
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed")

if __name__ == "__main__":
    initialize_database()
