package server

import (
	"fmt"
	"net/http"
	"os"
)

func Load() {
	http.HandleFunc("/", http.HandlerFunc(defaultHandler))
	http.HandleFunc("/", http.FileServer(http.Dir()))
	fmt.Println("Homescreen listening at http://localhost:8533")
	http.ListenAndServe(":8533", nil)
}

func defaultHandler(w http.ResponseWriter, r *http.Request) {
	assetHandler(w, r)
}

func assetHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/style.css" {
		http.ServeFile(w, r, "./assets/style.css")
		return
	} else if r.URL.Path == "/app.js" {
		http.ServeFile(w, r, "./assets/app.js")
		return
	} else if r.URL.Path == "/" {
		http.ServeFile(w, r, "./assets/index.html")
		return
	} else if r.URL.Path == "/cisco-logo-white.png" {
		http.ServeFile(w, r, "./assets/cisco-logo-white.png")
		return
	}

	w.WriteHeader(http.StatusNotFound)
}
