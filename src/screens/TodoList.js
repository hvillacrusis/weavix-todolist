import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {ListItem} from '../components';
import users from '../users';

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
      <ListItem
        title={item.title}
        subTitle={`${currentUser.firstName} ${currentUser.lastName}`}
        rightComponent={
          <Icon
            name={item.completed ? 'check' : 'dash'}
            size={30}
            color={item.completed ? '#27bd2f' : '#ea3301'}
          />
        }
      />
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

export default TodoListScreen;
