#!/bin/bash

echo 'Importing OpenAPI definitions...'

rm -r ./src/api
openapi-generator-cli generate \
	-i http://localhost:3000/api-json \
	-g typescript-axios \
	-o ./src/api \
	--additional-properties=typescriptThreePlus=true # Fixes this bug: https://github.com/OpenAPITools/openapi-generator/issues/3869#issuecomment-584152932

echo 'API Import complete.'