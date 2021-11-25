import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface ISeacrhBarProps {}

const SeacrhBarComp: React.FunctionComponent<ISeacrhBarProps> = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);
  return <Searchbar placeholder='Search' onChangeText={onChangeSearch} value={searchQuery} />;
};

export default SeacrhBarComp;
