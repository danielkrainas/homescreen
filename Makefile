
all: clean build

build-client:
	grunt build

build-server:
	go build github.com/danielkrainas/homescreen

convert-content:
	echo "generating templates..."
	rm content/content.go
	go-bindata -o content/content.go -ignore=".*\.go" -pkg="content" client/

clean-server:
	go clean github.com/danielkrainas/homescreen

clean-client:
	rm -rf .tmp

clean: clean-client clean-server

build: build-client convert-content build-server
