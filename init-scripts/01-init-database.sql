-- Initialization script for MySQL database
-- This script runs automatically when the container is first created

-- Create additional databases if needed
-- CREATE DATABASE IF NOT EXISTS another_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the default database (created via MYSQL_DATABASE env var)
USE mydatabase;

-- Create a sample table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create another sample table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data into users table
INSERT INTO users (username, email) VALUES
    ('john_doe', 'john@example.com'),
    ('jane_smith', 'jane@example.com'),
    ('bob_wilson', 'bob@example.com')
ON DUPLICATE KEY UPDATE username=username;

-- Insert sample data into products table
INSERT INTO products (name, description, price, stock) VALUES
    ('Product A', 'This is product A', 29.99, 100),
    ('Product B', 'This is product B', 49.99, 50),
    ('Product C', 'This is product C', 19.99, 200)
ON DUPLICATE KEY UPDATE name=name;

-- Grant privileges to the MySQL user
-- Note: Root user already has all privileges. The myuser is created with limited access by default.
GRANT ALL PRIVILEGES ON mydatabase.* TO 'myuser'@'%';
FLUSH PRIVILEGES;