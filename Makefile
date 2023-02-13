NAME ?= SLS-Web-admin_react
DATA = /data
NODE_IMAGE ?= nodejs-14
YARN_INSTALL_COMMAND ?= yarn install
YARN_BUILD_COMMAND ?= yarn build
YARN_DEV_BUILD_COMMAND ?= yarn build --mode=development
DROP ?= rm -rf ./node_modules

.PHONY: build
build:
	docker run \
        -e NODE_OPTIONS:"--max_old_space_size=8192" \
	-v `pwd`:${DATA} \
	-w ${DATA} \
	-i ${NODE_IMAGE} \
	/bin/sh -c "${YARN_INSTALL_COMMAND}" \
    && \
    docker run \
        -e NODE_OPTIONS:"--max_old_space_size=8192" \
        -v `pwd`:${DATA} \
        -w ${DATA} \
        -i ${NODE_IMAGE} \
        /bin/sh -c "${YARN_BUILD_COMMAND}" \
    && \
    docker run \
        -v `pwd`:${DATA} \
        -w ${DATA} \
        -i ${NODE_IMAGE} \
        /bin/sh -c "${DROP}"

.PHONY: dev
dev:
	docker run \
	-v `pwd`:${DATA} \
	-w ${DATA} \
	-i ${NODE_IMAGE} \
	/bin/sh -c "${YARN_INSTALL_COMMAND}" \
    && \
    docker run \
        -v `pwd`:${DATA} \
        -w ${DATA} \
        -i ${NODE_IMAGE} \
        /bin/sh -c "${YARN_DEV_BUILD_COMMAND}" \
    && \
    docker run \
        -v `pwd`:${DATA} \
        -w ${DATA} \
        -i ${NODE_IMAGE} \
        /bin/sh -c "${DROP}"

.PHONY: clear
clear:
	docker rm `docker ps -a -q`
