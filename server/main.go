package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/coder-abod/golang-react-app/routes"
)

func main() {
	r := routes.Router()
	fmt.Println("starting the server on port 9000")
	log.Fatal(http.ListenAndServe(":9000", r))
}
