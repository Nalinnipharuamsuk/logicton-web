# Use official MySQL image as base
FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

# Set working directory
WORKDIR /docker-entrypoint-initdb.d

# Add custom configuration file
COPY my.cnf /etc/mysql/conf.d/

# Copy initialization scripts
COPY init-scripts/ /docker-entrypoint-initdb.d/

# Expose MySQL default port
EXPOSE 3306

# MySQL will start automatically
CMD ["mysqld"]