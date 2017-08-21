NODE_ENV ?= development
DOCKER_COMPOSE ?= docker-compose
DOCKER_RUN ?= ${DOCKER_COMPOSE} run --rm
DOCKER_BASE_IMAGE = node
NPM ?= ${DOCKER_RUN} -e NODE_ENV=${NODE_ENV} ${DOCKER_BASE_IMAGE} npm

#--------------------------Build Tools----------------------------------------

all: clean-up install lint unit-test integration-test

install:
	${MAKEFILE_SUDO_COMMAND} ${NPM} install tap-xunit
	${MAKEFILE_SUDO_COMMAND} ${NPM} install
.PHONY: install

lint:
	${MAKEFILE_SUDO_COMMAND} ${NPM} run lint
.PHONY: lint

unit-test:
	${MAKEFILE_SUDO_COMMAND} ${DOCKER_RUN} unit-test
.PHONY: unit-test

integration-test:
	${MAKEFILE_SUDO_COMMAND} ${DOCKER_RUN} integration-test
.PHONY: integration-test

release:
	@npm version patch
.PHONY: release

dependency-check:
	./node_modules/.bin/nsp check
.PHONY: dependency-check

clean-up:
	${MAKEFILE_SUDO_COMMAND} ${NPM} prune
.PHONY: clean-up

#--------------------------Developer Tools------------------------------------

dev:
	${MAKEFILE_SUDO_COMMAND} ${DOCKER_COMPOSE} up mongodb dev
.PHONY: dev
