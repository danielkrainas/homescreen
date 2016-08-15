package server

import (
	"fmt"
	"net/http"

	"github.com/danielkrainas/homescreen/content"
)

func serveContent(w http.ResponseWriter, r *http.Request) bool {
	if blob, blobType, ok := content.Get(r.URL.Path); ok {
		w.Header().Set("Content-Type", blobType)
		w.WriteHeader(http.StatusOK)
		if _, err := w.Write(blob); err != nil {
			fmt.Errorf("error writing response: %v", err)
		}

		return true
	}

	return false
}

func Load() {
	http.HandleFunc("/", http.HandlerFunc(defaultHandler))
	fmt.Println("Homescreen listening at http://localhost:8533")
	http.ListenAndServe(":8533", nil)
}

func defaultHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("%s %s\n", r.Method, r.RequestURI)
	if serveContent(w, r) {
		return
	}

	http.NotFound(w, r)
}
