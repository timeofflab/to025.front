#!/bin/bash

# 指定のブランチのPUSHならデプロイ処理
ARRAY=("main" "stage")

echo "VERCEL_GIT_COMMIT_REF = ${VERCEL_GIT_COMMIT_REF}"
for IS in ${ARRAY[@]}; do
    if [ "${VERCEL_GIT_COMMIT_REF}" = "${IS}" ]; then
        exit 1
    fi
done

echo "Cancel"
exit 0
