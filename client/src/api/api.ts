import axios from "axios";
import { config } from "../config/config";

const createTask = async (task: string) => {
  try {
    const { data } = await axios.post(
      `${config.serverUrl}/task`,
      {
        task,
        status: false,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
const undoTask = async (id: string) => {
  try {
    const { data } = await axios.put(`${config.serverUrl}/tasks/undo/${id}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
const toggleTask = async (id: string) => {
  try {
    const { data } = await axios.put(`${config.serverUrl}/tasks/toggle/${id}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
const deleteTask = async (id: string) => {
  try {
    const { data } = await axios.delete(`${config.serverUrl}/tasks/${id}`);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
export const api = {
  createTask,
  undoTask,
  deleteTask,
  toggleTask,
} as const;
