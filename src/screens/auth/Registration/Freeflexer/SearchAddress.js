import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SearchAddress = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
  ]);

  const handleInputChange = (text) => {
    setQuery(text);
    if (text) {
      const filtered = data.filter(item =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleSelectItem = (item) => {
    setQuery(item);
    setFilteredData([]);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Search"
        value={query}
        onChangeText={handleInputChange}
        style={{
          marginBottom: 10,
          backgroundColor: theme.colors.background,
          caretColor: 'black'
        }}
        theme={{ colors: { text: theme.colors.placeholder, primary: theme.colors.placeholder } }}
      />
      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectItem(item)} style={{ padding: 10 }}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            maxHeight: 150
          }}
        />
      )}
    </View>
  );
};

export default SearchAddress;
