import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import UserAvatar from 'react-native-user-avatar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import Header from '../components/Header';
import UserInfoBottomSheet from '../components/userInfo/UserInfoBottomSheet';
import OldOrdersBottomSheet from '../components/userInfo/OldOrdersBottomSheet';
import { useAtom } from 'jotai';
import { userState, logoutUser, getUserFromStorage } from '../store';

interface IProfileScreenProps {
  user: {
    name: string;
    lastName: string;
  };
}

interface FakeStoreApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const IsCartEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold'
        }}>
        Daha Once Hic Siparis Verilmemis
      </Text>
      <View>
        <Entypo name='emoji-sad' size={44} color='black' />
      </View>
    </View>
  );
};

const ProfileScreen: React.FunctionComponent<IProfileScreenProps> = (props) => {
  const [user, setUser] = useAtom(userState);
  const [getUser, setGetUser] = useAtom(getUserFromStorage);
  const [, setLogoutUser] = useAtom(logoutUser);
  const [address, setAddress] = useState(
    'Örnek köy mahalle şirindere caddesi no;1 Beykoz İstanbul'
  );
  const [isTextArea, setIsTextArea] = useState(false);

  const [orders, setOrders] = useState<FakeStoreApi[]>([]);

  const isFocused = useIsFocused();

  const refRBSheet = React.useRef<any>();
  const oldOrdersRefRBSheet = React.useRef<any>();

  const getProductsFromApi = async () => {
    const data = await fetch('https://fakestoreapi.com/products');
    const res = await data.json();
    setOrders(res);
  };

  React.useEffect(() => {
    if (isFocused) {
      setGetUser();
      console.log('isFocused', getUser);
    }
  }, [props, isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff4757' }}>
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.userAvatar}>
            <UserAvatar size={100} name={user?.name} />
            <Text style={styles.username}>
              {user?.name}
              {user?.lastName}
            </Text>
          </View>
          <View style={styles.userInfos}>
            <View
              style={{
                flex: 1,
                minHeight: 100,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
              <View>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20
                    }}>
                    <AntDesign name='user' size={24} color='black' />
                    <Text
                      style={{
                        marginLeft: 10
                      }}>
                      Kullanıcı Bilgileri
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => oldOrdersRefRBSheet.current.open()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20
                    }}>
                    <MaterialCommunityIcons name='page-previous-outline' size={24} color='black' />
                    <Text
                      style={{
                        marginLeft: 10
                      }}>
                      Siparişlerim
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.accountSettings}>
              <TouchableOpacity onPress={() => setLogoutUser()}>
                <View style={styles.accountSettingsCards}>
                  <MaterialIcons name='logout' size={28} color='black' />
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold'
                    }}>
                    Çıkış Yap
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.accountSettingsCards}>
                  <MaterialCommunityIcons name='key-change' size={24} color='black' />
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold'
                    }}>
                    Şifre Değiştir
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <UserInfoBottomSheet refRBSheet={refRBSheet} />
            </View>
            <View>
              <OldOrdersBottomSheet
                oldOrdersRefRBSheet={oldOrdersRefRBSheet}
                orders={orders.slice(0, 3)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%'
  },
  userAvatar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    paddingTop: 100
  },
  userInfos: {
    flex: 5,
    width: '90%',
    marginHorizontal: '5%'
  },
  username: {
    fontSize: 20
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  addressTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  lastOrdersTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  accountSettings: {
    flex: 4,
    minHeight: 150,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  accountSettingsCards: {
    width: 100,
    height: 100,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ProfileScreen;
