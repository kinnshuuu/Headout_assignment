# HTTP Server Optimization Solution

## Overview

This project provides an optimized solution for the implementation of a simple HTTP server with specific requirements. The server responds to incoming GET requests on the `/data` endpoint, handling two query parameters, `n` for the file name and `m` for the line number.

## Implementation Details

- Set up an HTTP server using NodeJs(Express).
- Efficiently handle incoming GET requests on the `/data` endpoint.
- Accept two query parameters, `n` for the file name and `m` for the line number.
- Return content based on specified conditions.

## Dockerization

- Dockerfile is optimized for compatibility with both ARM architecture and x86.
- Docker container exposes port 8080.

## Running with Docker

```bash
# Build the Docker image
docker build -t my-image .

# Run the Docker container
docker run -p 8080:8080 -d --name my-container my-image
