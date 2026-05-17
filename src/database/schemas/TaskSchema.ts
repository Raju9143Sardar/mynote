import Realm from "realm";
import { dbName } from "../realm";

export class TaskSchema extends Realm.Object<TaskSchema> {
  _id!: string;
  title!: string;
  reminder!: Date | null;
  completed!: boolean;
  synced!: boolean;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: dbName.task,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      title: 'string',
      reminder: 'date?',
      completed: 'bool',
      synced: 'bool',
      updatedAt: 'date',
    },
  };
}