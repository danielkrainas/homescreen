package main

import (
	//"fmt"
	//"time"

	"github.com/miketheprogrammer/go-thrust/thrust"

	"github.com/danielkrainas/homescreen/server"
)

func main() {
	thrust.InitLogger()

	thrust.Start()

	window := thrust.NewWindow(thrust.WindowOptions{
		RootUrl: "http://localhost:8533/",
	})

	window.Show()
	window.Maximize()
	window.Focus()

	/*go func() {
		<-time.After(time.Second * 5)
		window.Close()
		thrust.Exit()
	}()*/

	server.Load()
	//thrust.LockThread()
}
