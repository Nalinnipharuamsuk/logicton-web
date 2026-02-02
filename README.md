# MySQL Docker Setup

This project provides a complete Docker setup for running MySQL 8.0 with optional phpMyAdmin for database management.

## 📋 Prerequisites

- Docker installed on your system
- Docker Compose installed (usually comes with Docker)

## 🚀 Quick Start

1. **Clone or download this project**

2. **Configure environment variables (optional):**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file to set your preferred database credentials.

3. **Start MySQL using Docker Compose:**
   ```bash
   docker-compose up -d
   ```

4. **Check if containers are running:**
   ```bash
   docker-compose ps
   ```

## 🔧 Configuration

### Default Connection Settings

- **Host:** `localhost`
- **Port:** `3306`
- **Root Password:** `rootpassword` (change this in `.env`!)
- **Database:** `mydatabase`
- **User:** `myuser`
- **Password:** `mypassword` (change this in `.env`!)

### phpMyAdmin Access

- **URL:** http://localhost:8080
- **Username:** `myuser` (from `.env`)
- **Password:** `mypassword` (from `.env`)

## 📁 Project Structure

```
.
├── Dockerfile                      # MySQL Docker image configuration
├── docker-compose.yml              # Docker Compose configuration
├── my.cnf                          # MySQL configuration file
├── init-scripts/
│   └── 01-init-database.sql       # Database initialization script
├── .env.example                    # Environment variables template
└── README.md                       # This file
```

## 💻 Usage Commands

### Start MySQL
```bash
docker-compose up -d
```

### Stop MySQL
```bash
docker-compose down
```

### Stop MySQL and remove volumes (WARNING: Deletes all data!)
```bash
docker-compose down -v
```

### View MySQL logs
```bash
docker-compose logs mysql
```

### Access MySQL CLI
```bash
docker-compose exec mysql mysql -u root -p
```

### Access MySQL CLI as regular user
```bash
docker-compose exec mysql mysql -u myuser -p mydatabase
```

### Restart MySQL
```bash
docker-compose restart mysql
```

## 🔌 Connecting to MySQL

### From Command Line

```bash
mysql -h localhost -P 3306 -u myuser -p mydatabase
```

### From Applications

Example connection strings:

**Node.js:**
```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'myuser',
  password: 'mypassword',
  database: 'mydatabase'
});
```

**Python:**
```python
import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    port=3306,
    user='myuser',
    password='mypassword',
    database='mydatabase'
)
```

**PHP:**
```php
$conn = new mysqli('localhost', 'myuser', 'mypassword', 'mydatabase');
```

### Connection URL Format

```
mysql://myuser:mypassword@localhost:3306/mydatabase
```

## 📊 Database Initialization

The database is automatically initialized on first run using the SQL script in `init-scripts/01-init-database.sql`. This script:

- Creates sample tables (`users` and `products`)
- Inserts sample data
- Sets up proper character encoding (utf8mb4)

To add more initialization scripts, create new `.sql` files in the `init-scripts/` directory with numbered prefixes (e.g., `02-add-more-tables.sql`, `03-seed-data.sql`). They execute in alphabetical order.

## 🔒 Security Recommendations

1. **Change default passwords** in `.env` before deploying to production
2. **Don't commit `.env` file** to version control
3. **Use strong passwords** with a mix of letters, numbers, and symbols
4. **Limit database access** by creating users with only necessary privileges
5. **Regularly update** the MySQL image: `docker-compose pull mysql`

## 💾 Data Persistence

MySQL data is stored in Docker volumes:

- `mysql-data`: Contains all database files
- `mysql-logs`: Contains MySQL log files

Data persists even after containers are stopped or restarted. To completely remove data, use:
```bash
docker-compose down -v
```

## 🔧 Customization

### Changing MySQL Version

Edit `docker-compose.yml`:
```yaml
services:
  mysql:
    image: mysql:8.0  # Change to desired version
```

### Adjusting Performance Settings

Edit `my.cnf` to modify MySQL configuration:
- `max_connections`: Maximum simultaneous connections
- `innodb_buffer_pool_size`: Memory allocated for InnoDB buffer
- `slow_query_log`: Enable/disable slow query logging

### Adding More Services

Edit `docker-compose.yml` to add additional services (e.g., backup tools, monitoring).

## 🐛 Troubleshooting

### Container won't start

Check logs:
```bash
docker-compose logs mysql
```

### Can't connect to MySQL

1. Verify MySQL is running: `docker-compose ps`
2. Check port 3306 is not in use: `netstat -ano | findstr :3306` (Windows) or `lsof -i :3306` (Mac/Linux)
3. Check firewall settings

### Password authentication error

If you encounter authentication issues, try:
```bash
docker-compose exec mysql mysql -u root -p
```
Then update user privileges:
```sql
ALTER USER 'myuser'@'%' IDENTIFIED BY 'newpassword';
FLUSH PRIVILEGES;
```

### Reset MySQL completely

⚠️ **WARNING: This deletes all data!**

```bash
docker-compose down -v
docker-compose up -d
```

## 📚 Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Docker MySQL Image](https://hub.docker.com/_/mysql)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [phpMyAdmin Documentation](https://www.phpmyadmin.net/docs/)

## 📝 License

This setup is provided as-is for development and testing purposes.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Docker and MySQL logs
3. Consult official documentation

---

**Happy Coding! 🎉**