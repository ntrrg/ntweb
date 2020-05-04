hugo_version := 0.69.0
hugo_port := 1313

.PHONY: all
all: build

.PHONY: build
build:
	hugo

.PHONY: clean
clean:
	rm -rf public resources

.PHONY: run
run:
	hugo server -DEF --noHTTPCache --i18n-warnings --disableFastRender \
		--bind 0.0.0.0 --port $(hugo_port) --baseUrl / --appendPort=false

# Docker

.PHONY: docker-build
docker-build:
	@docker run --rm -it \
		-u $$(id -u $$USER) \
		-v "$${TMPDIR:-/tmp}":/tmp/ \
		-v "$$PWD":/site/ \
		ntrrg/hugo:$(hugo_version)

.PHONY: docker-run
docker-run:
	@docker run --rm -it \
		-e PORT=$(hugo_port) \
		-p $(hugo_port):$(hugo_port) \
		-u $$(id -u $$USER) \
		-v "$${TMPDIR:-/tmp}":/tmp/ \
		-v "$$PWD":/site/ \
		ntrrg/hugo:$(hugo_version) server -DEF --noHTTPCache --i18n-warnings \
			--disableFastRender \
			--bind 0.0.0.0 --port $(hugo_port) --baseUrl / --appendPort=false

.PHONY: docker-shell
docker-shell:
	@docker run --rm -it \
		-u $$(id -u $$USER) \
		-v "$${TMPDIR:-/tmp}":/tmp/ \
		-v "$$PWD":/site/ \
		--entrypoint sh \
		ntrrg/hugo:$(hugo_version)

