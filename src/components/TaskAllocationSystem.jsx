import React, { useState } from 'react';
import {
  Box,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const TaskAllocationSystem = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleTaskRemove = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Container maxW="800px" py="20px">
      <Heading as="h1" mb="20px">
        General Task Allocation System
      </Heading>
      <form onSubmit={handleTaskSubmit}>
        <FormControl>
          <FormLabel>New Task</FormLabel>
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </FormControl>
        <Button type="submit" mt="10px">
          Add Task
        </Button>
      </form>
      <hr />
      <Heading as="h2" mb="10px">
        Tasks:
      </Heading>
      {tasks.length > 0 ? (
        <UnorderedList>
          {tasks.map((task, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <Text flexGrow="1">{task}</Text>
              <Button onClick={() => handleTaskRemove(index)} colorScheme="red" size="sm">
                Remove
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text>No tasks available.</Text>
      )}
    </Container>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <TaskAllocationSystem />
    </ChakraProvider>
  );
};

export default App;
