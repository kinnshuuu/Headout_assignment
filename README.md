# HTTP Server Optimization Solution

## Overview

This project provides an optimized solution for the implementation of a simple HTTP server with specific requirements. The server responds to incoming GET requests on the `/data` endpoint, handling two query parameters, `n` for the file name and `m` for the line number.

## Implementation Details

- Set up an HTTP server using NodeJs(Express).
- Efficiently handle incoming GET requests on the `/data` endpoint.
- Accept two query parameters, `n` for the file name and `m` for the line number.
- Return content based on specified conditions.

## API Endpoints

### 1. Root Endpoint

- **GET /:**
  Returns a simple message indicating that the server is running.

### 2. Data Endpoint

- **GET /data:**
  Returns content from a file based on specified parameters.

   - **Query Parameters:**
      - `n`: Required. Specifies the file identifier.
      - `m`: Optional. Specifies the line number to retrieve.
      - `showAll`: Optional. If present, returns the entire content of the file.
      - `page`: Optional. Specifies the page number when paginating through the file.
      - `pageSize`: Optional. Specifies the number of lines per page.

   - **Examples:**
      - `/data?n=example&showAll=true`: Returns the entire content of the file.
      - `/data?n=example&m=3`: Returns the content of the third line in the file.
      - `/data?n=example&page=2&pageSize=20`: Returns a paginated view of the file.

## Dockerization

- Dockerfile is optimized for compatibility with both ARM architecture and x86.
- Docker container exposes port 8080.

## Running with Docker

```bash
# Build the Docker image
docker build -t my-image .

# Run the Docker container
docker run -p 8080:8080 -d --name my-container my-image
