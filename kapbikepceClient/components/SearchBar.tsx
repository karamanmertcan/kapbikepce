import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface ISeacrhBarProps {
  getProductsFromSearchBar: (search: string) => void;
  searchBarText: string;
  setSearchBarText: (text: string) => void;
}

const SeacrhBarComp: React.FunctionComponent<ISeacrhBarProps> = (props) => {
  const [searchQuery, setSearchQuery] = React.useState<any>('');

  const onChangeSearch = async (query: string) => {
    setSearchQuery(query);
    // console.log(searchQuery);
    // const res = await fetch(`https://fakestoreapi.com/products/category/${searchQuery}`);
    // const data = await res.json();
    // console.log(data);
  };

  const getProducts = async () => {
    console.log(searchQuery);
    const res = await fetch(`https://fakestoreapi.com/products/category/${searchQuery}`);
    const data = await res.json();
    console.log(data);
  };

  return (
    <Searchbar
      placeholder='Search'
      onChangeText={onChangeSearch}
      value={searchQuery}
      onIconPress={() => getProducts()}
    />
  );
};

export default SeacrhBarComp;
