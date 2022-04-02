import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ListItem = ({title, subTitle, rightComponent}) => {
  return (
    <View style={styles.mainCardView}>
      <View style={styles.leftCardView}>
        <Text style={styles.titleText}>{title}</Text>
        <Text>{subTitle}</Text>
      </View>
      <View style={styles.righCardView}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ListItem;
