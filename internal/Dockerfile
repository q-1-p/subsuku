# Build stage
FROM rust:latest as builder

WORKDIR /app

# Copy workspace files
COPY Cargo.toml Cargo.lock ./
COPY api ./api
COPY domain ./domain
COPY infrastructure ./infrastructure

# Build the application
RUN cargo build --release --bin api

# Runtime stage
FROM debian:bookworm-slim

# Install necessary runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the binary from builder stage
COPY --from=builder /app/target/release/api ./api

# Expose port
EXPOSE 8000

# Run the application
CMD ["./api"]