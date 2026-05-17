import { useEffect, useState } from 'react';
import { addTask, deleteTask, getTasks, updateTask } from '../api/taskLocalStoreApi';
import { Task } from '../types/taskTypes';





const useTaskViewModel = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    //================ load tasks =================
    const loadTasks = async () => {
        try {
            setLoading(true);

            const data = await getTasks();

            // Convert Realm objects -> plain JS objects
            const formatted: Task[] = data.map(
                (item: any) => ({
                    _id: item._id,
                    title: item.title,
                    reminder: item.reminder,
                    completed: item.completed,
                    synced: item.synced,
                    updatedAt: item.updatedAt,
                }),
            );

            // sort latest first
            formatted.sort(
                (a, b) =>
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
            );

            setTasks(formatted);
        } catch (error) {
            console.log('loadTasks error', error);
        } finally {
            setLoading(false);
        }
    };

    //================ add task =================
    const onAddTask = async (title: string, reminderDate: Date | null) => {
        if (!title.trim()) return;

        await addTask(title, reminderDate);

        loadTasks();
    };


    // ====================== # Update Task # ======================
  const onUpdateTask = async ({id, title, reminder }
    : {id: string; title: string; reminder?: Date | null; }) => {
    try {
      await updateTask(id, {
        title,
        reminder: reminder || null,
      });

      await loadTasks();
    } catch (error) {
      console.log('Update Task Error:', error);
      throw error;
    }
  };

    //================ remove task =================
    const removeTask = async (id: string) => {
        await deleteTask(id);

        loadTasks();
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return {
        tasks,
        loading,
        onAddTask,
        onUpdateTask,
        removeTask,
        loadTasks,
    };
};

export default useTaskViewModel;