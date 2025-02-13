# Use Python 3.11 as the base image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy only requirements first for better Docker caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project files into the container
COPY . .

# Ensure entrypoint script is executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use entrypoint.sh to handle migrations and server startup
ENTRYPOINT ["/entrypoint.sh"]