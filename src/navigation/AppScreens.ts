import { Task } from "../features/task/types/taskTypes";

export type AppScreens = {
  Login: undefined;
  SignUp: undefined;
  TaskList: undefined;
  AddTask: undefined;
  EditTask: {
    taskItem: Task;
  };
};