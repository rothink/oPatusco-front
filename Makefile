CONTAINER_NAME=front.primeit

# Instala a aplicação e sobe o sistema
install:
	make build
	make up

build:
	docker compose build
# Sobe o sistema
up:
	docker compose up -d

# Entra no bash do container
bash:
	docker exec -it $(CONTAINER_NAME) bash

test:
	docker exec -it ${CONTAINER_NAME} npx vitest

