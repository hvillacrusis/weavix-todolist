import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View, FlatList, Button, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Octicons';
import users from './users';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Todo List"
        onPress={() => navigation.navigate('TodoList')}
      />
    </View>
  );
};

const TodoListScreen = () => {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [page, setPage] = useState(0);

  const addToList = nextPage => {
    const newTodoLists = [];
    for (var i = nextPage * 10, il = i + 10; i < il && i < data.length; i++) {
      newTodoLists.push(data[i]);
    }
    setDisplayedData(currentDisplayedData => [
      ...currentDisplayedData,
      ...newTodoLists,
    ]);
  };

  const onEndReach = () => {
    setPage(currentPage => {
      if (data.length !== displayedData.length) {
        addToList(currentPage + 1);
      }
      return currentPage + 1;
    });
  };

  useEffect(() => {
    const fetchList = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
      );
      const sortByCompleted = response.data.sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? -1 : 1,
      );
      setData(() => {
        setDisplayedData([...sortByCompleted.slice(0, 10)]);
        return [...sortByCompleted];
      });
    };
    fetchList();
  }, []);

  const renderItem = ({item}) => {
    const currentUser = users?.find(user => user.userId === item.userId) || {};
    return (
      <View style={styles.mainCardView}>
        <View style={styles.leftCardView}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text>{`${currentUser.firstName} ${currentUser.lastName}`}</Text>
        </View>
        <View style={styles.righCardView}>
          <Icon
            name={item.completed ? 'check' : 'dash'}
            size={30}
            color={item.completed ? '#27bd2f' : '#ea3301'}
          />
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={displayedData}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      initialNumToRender={10}
      onEndReached={onEndReach}
      onEndThreshold={0}
    />
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TodoList" component={TodoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#444',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  leftCardView: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
    marginRight: 'auto',
  },
  righCardView: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 30,
    justifyContent: 'center',
  },
  titleText: {
    textTransform: 'capitalize',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default App;
