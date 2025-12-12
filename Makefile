HUGO_VERSION ?= 0.82.0
HUGO_PORT ?= 1313
HUGO_OUTPUT ?= public

.PHONY: all
all: build

.PHONY: build
build:
	hugo -d "$(HUGO_OUTPUT)"

.PHONY: bump-version-hugo
bump-version-hugo:
	@echo "CONTRIBUTING.md"
	@echo "content/projects/ntweb/index.es.md"
	@echo "content/projects/ntweb/index.es.md"
	@grep -lR "$(HUGO_VERSION)" . | \
		grep -v "^\./\.git/" | \
		grep -v "^\./\.mage/vendor/" | \
		grep -v "^\./archetypes/" | \
		grep -v "^\./assets/" | \
		grep -v "^\./content/" | \
		grep -v "^\./data/" | \
		grep -v "^\./i18n/" | \
		grep -v "^\./layouts/" | \
		grep -v "^\./node_modules/" | \
		grep -v "^\./themes/" | \
		grep -v "^\./public/" | \
		grep -v "^\./resources/" | \
		grep -v "\.swp\$$"

.PHONY: clean
clean:
	rm -rf public

.PHONY: run
run:
	hugo server -DEF --noHTTPCache --i18n-warnings --disableFastRender \
		--bind 0.0.0.0 --port $(HUGO_PORT) --baseUrl / --appendPort=false

#############
# Container #
#############

CONTAINER_RUNTIME ?= podman
CONTAINER_TAG := $(HUGO_VERSION)-extended
CONTAINER_IMG := ntrrg/hugo:$(CONTAINER_TAG)
CONTAINER_USER ?= $(shell id -u $$USER)

CONTAINER_CMD := $(CONTAINER_RUNTIME) run --rm -it \
	-e PORT=$(HUGO_PORT) \
	-p $(HUGO_PORT):$(HUGO_PORT) \
	-v "$${TMPDIR:-/tmp}":/tmp/ \
	-v "$$PWD":/site/

ifeq "$(shell $(CONTAINER_RUNTIME) --version | cut -F 1)" "Docker"
	CONTAINER_CMD := $(CONTAINER_CMD) -u $(CONTAINER_USER)
endif

.PHONY: container-build
container-build:
	$(CONTAINER_CMD) $(CONTAINER_IMG) -d "$(HUGO_OUTPUT)"

.PHONY: container-run
container-run:
	$(CONTAINER_CMD) $(CONTAINER_IMG) server \
			-DEF --noHTTPCache --i18n-warnings \
			--disableFastRender \
			--bind 0.0.0.0 --port $(HUGO_PORT) --baseUrl / --appendPort=false

.PHONY: container-shell
container-shell:
	$(CONTAINER_CMD) --entrypoint sh $(CONTAINER_IMG)

########
# Make #
########

# Disable parallelism
.NOTPARALLEL:
