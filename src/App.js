import React, { useState } from 'react';
import { ChakraProvider, Container, Heading, Text, Box, Button, Flex, Input, Stack, Checkbox, Grid, GridItem } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const QualityManagementSystem = () => {
  const [qualityItems, setQualityItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleNewItem = () => {
    if (newItem.trim() !== '') {
      setQualityItems([...qualityItems, { description: newItem, completed: false, date: selectedDate }]);
      setNewItem('');
      setSelectedDate(new Date());
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...qualityItems];
    updatedItems.splice(index, 1);
    setQualityItems(updatedItems);
  };

  const handleItemCompletion = (index) => {
    const updatedItems = [...qualityItems];
    updatedItems[index].completed = !updatedItems[index].completed;
    setQualityItems(updatedItems);
  };

  const calculateCompletedPercentage = () => {
    const completedItems = qualityItems.filter((item) => item.completed);
    return ((completedItems.length / qualityItems.length) * 100).toFixed(2);
  };

  return (
    <Box
      bgImage="url('https://cdn.pixabay.com/photo/2020/02/17/07/39/pen-4855775_1280.jpg')"
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      p="20px"
    >
      <Container maxW="800px" py="20px">
        <Heading as="h1" mb="20px" color={'rebeccapurple'} style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
        }}>
          Task Allocation System
        </Heading>
        <Stack spacing="20px">
          <Flex justifyContent="space-between" alignItems="center">
            <Input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter your task"
              size="lg"
              focusBorderColor="blue.400"
              boxShadow="lg"
              borderRadius="md"
              w="70%"
            />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MM/dd/yyyy h:mm aa"
              customInput={<Input />}
            />
            <Button colorScheme="blue" size="lg" onClick={handleNewItem}>
              Add
            </Button>
          </Flex>
          {qualityItems.length > 0 ? (
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
              {qualityItems.map((item, index) => (
                <GridItem key={index}>
                  <Box
                    p="10px"
                    borderWidth="1px"
                    borderRadius="md"
                    bg={item.completed ? 'green.200' : 'white'}
                    transform={item.completed ? 'rotate(-2deg) scale(1.02)' : 'none'}
                    transition="transform 0.3s ease-in-out"
                    _hover={{
                     boxShadow: 'md',
                      transform: 'rotate(-2deg) scale(1.02)',
                    }}
                  >
                    <Flex justifyContent="space-between" alignItems="center">
                      <Checkbox isChecked={item.completed} onChange={() => handleItemCompletion(index)} />
                      <Text
                        textDecoration={item.completed ? 'line-through' : 'none'}
                        fontWeight={item.completed ? 'bold' : 'normal'}
                      >
                        {item.description}
                      </Text>
                      <Text>{item.date ? item.date.toLocaleString() : ''}</Text>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDeleteItem(index)}
                        disabled={item.completed}
                        _hover={{ bg: 'red.500' }}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Text>No quality items available.</Text>
          )}
        <Box>
        <Text
  fontWeight="bold"
  color={'lavenderblush'}
  size={'1rem'}
  style={{
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
  }}
>Completion 
          Progress: {calculateCompletedPercentage()}%
        </Text>
        <Box w="100%" h="10px" bg="gray.200" borderRadius="md" mt="5px">
          <Box
            w={`${calculateCompletedPercentage()}%`}
            h="10px"
            bg="green.400"
            borderRadius="md"
            transition="width 0.3s ease-in-out"
          />
        </Box>
        </Box>
      </Stack>
    </Container>
    </Box>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <QualityManagementSystem />
    </ChakraProvider>
  );
};

export default App;
