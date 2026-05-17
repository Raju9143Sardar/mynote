export interface Task {
  _id: string;
  title: string;
  reminder?: Date | null;
  completed: boolean;
  synced: boolean;
  updatedAt: Date;
};


