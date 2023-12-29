import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5'
const index = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: String(prevTasks.length + 1), text: newTask },
      ]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleFloatButtonClick = () => {
      // Navigate to the MapScreen when the button is pressed
      navigation.navigate('UserProfileScreen');
    };


  return (
    <View style={styles.container}>
      <Image source={require('../../assets/SocialMediaIcons/Clock.png')} style={styles.clockImage} />
      <Text style={styles.heading}>Never forget what matters</Text>

      {/* New Task Input Field */}
      <View style={styles.newTaskContainer}>
        <TextInput
          style={styles.newTaskInput}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.newTaskContainer}>
              <TextInput
                style={styles.newTaskInput}
                placeholder="Add a new task"
                value={newTask}
                onChangeText={(text) => setNewTask(text)}
              />
              <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>

              <View style={styles.newTaskContainer}>
                          <TextInput
                            style={styles.newTaskInput}
                            placeholder="Add a new task"
                            value={newTask}
                            onChangeText={(text) => setNewTask(text)}
                          />
                          <TouchableOpacity style={styles.addButton} onPress={addTask}>
                            <Text style={styles.addButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Settings Button */}
      <TouchableOpacity
                                                 onPress={handleFloatButtonClick}
                                                 style={{
                                                   position: 'absolute',
                                                   bottom: 10,
                                                   right: 15,
                                                   backgroundColor: 'white',
                                                   elevation: 10,
                                                   width: 80,
                                                   height: 80,
                                                   borderRadius: 30,
                                                   alignItems: 'center',
                                                 }}>
                                                 <Icon name="place" type="material" size={30} color={'#E11584'} />
                                                 <Text style={{ color: '#F9629F', textAlign: 'center' }}>Setting</Text>
                                               </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   backgroundColor: '#6499ED',
  },
  clockImage: {
    width: 100,
    height: 100,
    marginBottom: 30,
    marginTop: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '80%',
  },
  taskText: {
    fontSize: 16,
  },
  newTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  newTaskInput: {
    flex: 1,
    borderColor: '#2C443DD6',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#2C443DD6',
    borderRadius: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
  settingsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    elevation: 10,
  },
});

export default index;
