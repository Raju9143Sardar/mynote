import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Task } from '../../features/task/types/taskTypes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const TaskItem = ({ item, onEdit, onDelete, }
    : {item: Task; onEdit: () => void; onDelete: () => void;}) => {
    return (
        <View style={[styles.container, {backgroundColor: item.synced ? '#e2ffea' : '#d3d3d3'}]}>
            <TouchableOpacity
                style={styles.checkbox}
            >
                 <MaterialIcons
                    name={item.completed ? 'done' : 'do-disturb'}
                    size={30}
                    color="blue"
                />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <Text
                    style={[
                        styles.title,
                        item.completed && styles.completed,
                    ]}
                >
                    {item.title}
                </Text>

                {item.reminder && (
                    <Text style={styles.reminder}>
                        Reminder:
                        {' '}
                        {new Date(
                            item.reminder,
                        ).toLocaleString()}
                    </Text>
                )}
            </View>

            <TouchableOpacity onPress={onEdit}>
                <MaterialIcons
                    name="create"
                    size={25}
                    style={styles.edit}
                    color="blue"
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons
                    name="delete"
                    size={25}
                    style={styles.delete}
                    color="red"
                />
            </TouchableOpacity>
        </View>
    );
};

export default TaskItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e2ffea',
        padding: 15,
        marginVertical: 6,
        borderRadius: 10,
        shadowColor: '#afacac',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    checkbox: {
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    reminder: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
    },
    edit: {
        color: 'blue',
        fontWeight: 'bold',
        marginRight: 15,
    },
    delete: {
        color: 'red',
        fontWeight: 'bold',
    },
});