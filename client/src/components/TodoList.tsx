import axios from "axios";
import React from "react";
import { Button, Form, Header, Input, List, Message } from "semantic-ui-react";
import { api } from "../api/api";
import { config } from "../config/config";
import { ITask } from "../interfaces";

export const TodoList = () => {
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const [error, setError] = React.useState("");
  const [task, setTask] = React.useState("");
  const getAllTasks = async () => {
    try {
      const { data } = await axios.get(`${config.serverUrl}/tasks`);
      setTasks(data ?? []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTask(e.target.value);
    },
    []
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.createTask(task).then(() => {
      getAllTasks();
    });
    setTask("");
  };
  React.useEffect(() => {
    getAllTasks();
  }, [tasks.length]);
  const handleToggleTask = (id: string) => {
    api.toggleTask(id).then(() => {
      getAllTasks();
    });
  };
  const handleUndoTask = (id: string) => {
    api.undoTask(id).then(() => {
      getAllTasks();
    });
  };
  const handleDeleteTask = (id: string) => {
    api.deleteTask(id).then(() => {
      getAllTasks();
    });
  };
  return (
    <div className="list-container">
      <div className="row">
        {error && <Message color="red">{error}</Message>}
        <Header
          textAlign="center"
          style={{ marginBottom: "20px" }}
          as="h2"
          color="yellow"
        >
          To DO List
        </Header>
      </div>
      <div className="row">
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="task"
            onChange={handleChange}
            value={task}
            fluid
            placeholder="Create Task"
          />
          <Button type="submit" color="green" style={{ margin: "10px 0" }}>
            Create Task
          </Button>
        </Form>
      </div>
      <div className="row">
        {tasks && tasks.length > 0 ? (
          <List divided relaxed>
            {tasks.map((task: ITask) => (
              <div className="row" key={task._id}>
                <List.Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px 0",
                  }}
                >
                  <List.Header
                    style={{
                      textDecoration: `${
                        task.status ? "line-through" : "none"
                      }`,
                    }}
                  >
                    <h3 className="list-title">{task.task}</h3>
                  </List.Header>
                  <List.Description floated="right">
                    <span
                      className="icon"
                      onClick={() => handleToggleTask(task._id as string)}
                    >
                      <List.Icon name="check circle" color="green" />
                    </span>
                    <span
                      className="icon"
                      onClick={() => handleUndoTask(task._id as string)}
                    >
                      <List.Icon name="undo" color="yellow" />
                    </span>
                    <span
                      className="icon"
                      onClick={() => handleDeleteTask(task._id as string)}
                    >
                      <List.Icon name="delete" color="red" />
                    </span>
                  </List.Description>
                </List.Item>
              </div>
            ))}
          </List>
        ) : (
          <Header className="header" as="h2" color="olive">
            no tasks yet
          </Header>
        )}
      </div>
    </div>
  );
};
