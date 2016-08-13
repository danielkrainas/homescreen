

build:
	grunt build
	go clean github.com/danielkrainas/homescreen
	#if [ ! -f $GOPATH/bin/go-bindata ]; then
	#	echo "go-bindata not found. installing...."
	#	go get github.com/jteeuwen/go-bindata/go-bindata
	#fi

	echo "generating templates..."
	rm -rf content
	go-bindata -o content/content.go -ignore=".*\.go" -pkg="content" client/
	go build github.com/danielkrainas/homescreen
