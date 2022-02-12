package routes

import (
	"github.com/coder-abod/golang-react-app/controllers"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/tasks", controllers.GetAllTasks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task", controllers.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/tasks/toggle/{id}", controllers.TaskComplete).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/tasks/undo/{id}", controllers.UndoTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/tasks/{id}", controllers.DeleteTask).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/tasks", controllers.DeleteAllTasks).Methods("DELETE", "OPTIONS")
	return router
}
