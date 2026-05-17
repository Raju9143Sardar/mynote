import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Task } from '../types/taskTypes';


interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export const {setTasks} = taskSlice.actions;
export default taskSlice.reducer;