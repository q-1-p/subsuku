# Build single Docker image
build:
	docker build -f Dockerfile.dev -t substrack-api:dev .

run:
	docker run --name substrack-api-dev -p 8000:8000 substrack-api:dev

# Development commands with hot reload
dev-build:
	docker-compose -f docker-compose.dev.yml build

dev-up:
	docker-compose -f docker-compose.dev.yml up

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f api

# Clean up development environment
dev-clean:
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f

# Container management
dev-restart:
	docker-compose -f docker-compose.dev.yml restart api

dev-shell:
	docker exec -it substrack-api-dev /bin/bash