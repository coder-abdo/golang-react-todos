package services

import (
	"context"
	"fmt"
	"log"

	"github.com/coder-abod/golang-react-app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func RetrieveAllTasks(collection *mongo.Collection) []primitive.M {
	cur, err := collection.Find(context.Background(), bson.D{{}})

	if err != nil {
		log.Fatal(err)
	}
	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		e := cur.Decode(&result)
		if e != nil {
			log.Fatal(e)
		}
		results = append(results, result)
	}
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	cur.Close(context.Background())
	return results
}

func InsertIntoTask(collection *mongo.Collection, task models.Task) {
	result, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("task inserted: ", result.InsertedID)
}

func ToggleCompletedTasks(collection *mongo.Collection, task string) {
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": true}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("modified count:", result.ModifiedCount)
}

func UndoTask(collection *mongo.Collection, task string) {
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": false}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("modified count:", result.ModifiedCount)
}
func DeleteTask(collection *mongo.Collection, task string) {
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	result, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("deleted one task ", result.DeletedCount)
}

func DeleteAllTasks(collection *mongo.Collection) int64 {
	count, err := collection.DeleteMany(context.Background(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("deleted all tasks ", count.DeletedCount)
	return count.DeletedCount
}
