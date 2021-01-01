# Set environment variables
OS_TYPE 			   	:=unix

# Check if OS is Windows
ifeq ($(OS),Windows_NT)
    OS_TYPE=windows
endif

define ensure_unix_program_exists
command -v ${1} >/dev/null 2>&1 || { echo >&2 "Program '${1}' is not installed!"; exit 1; }
endef

define ensure_windows_program_exists
where /q ${1} || ECHO "Program '${1}' is not installed!" && exit /F
endef

define ensure_program_exists
$(call ensure_$(OS_TYPE)_program_exists,${1})
endef

define env_var_check
	@echo "Verifying $1 var is set..."
	@: $(if $(value $1),,$(error $1 is not set. The task cannot continue))
endef

.PHONY = help
.DEFAULT_GOAL = help

help: ## Describe all make tasks (default task)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

all-env-var-check:
	@echo "Ensure env vars are set in the environment"
	$(call env_var_check,PG_CONNECTION_STRING)

prereqs:
	$(call ensure_program_exists,yarn)

install: prereqs all-env-var-check
	@yarn install

api-build:
	@echo "Building Feast API"
	@yarn workspace @ddubson/feast-api build

api-clean:
	@echo "Cleaning Feast API artifacts"
	@yarn workspace @ddubson/feast-api clean

api-start: domain-clean domain-build all-env-var-check
	@echo "Starting Feast API"
	@yarn workspace @ddubson/feast-api clean
	@yarn workspace @ddubson/feast-api start:watch

api-start-debug: all-env-var-check
	@echo "Starting Feast API in Debug Mode"
	@yarn workspace @ddubson/feast-api start:debug

domain-clean:
	@echo "Cleaning Feast Domain artifacts"
	@yarn workspace @ddubson/feast-domain clean

domain-build: domain-clean
	@echo "Building Feast Domain..."
	@yarn workspace @ddubson/feast-domain build

web-start: domain-clean domain-build
	@echo "Starting Feast Web"
	@yarn workspace @ddubson/feast-web start

web-build:
	@echo "Building Feast Web"
	@yarn workspace @ddubson/feast-web build

web-test-watch: ## Run web tests in watch mode
	@yarn workspace @ddubson/feast-web test:watch

lint: ## Lint all projects
	@yarn lint-all

lint-fix:
	@yarn lint-all-fix

test:
	@echo "Run all test cases"
	@yarn test-all

build:
	@yarn build-all

clean:
	@yarn clean-all

compile:
	@yarn compile-all

ship-it: install clean build compile lint test
	@echo "Ready to ship!"

open-webapp:
	@open https://feast-web.netlify.app

domain-publish:
	lerna publish minor

start-win: ## Start local development on Windows (Powershell)
	@powershell -NoProfile -new_console:sV "pg_ctl start" &
	@powershell -NoProfile -new_console:sH "make web-start" &
	@timeout 10 && powershell -NoProfile -new_console:sH "make api-start" &
