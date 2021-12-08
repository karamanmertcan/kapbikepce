import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import LastOrderCard from '../components/orderCard/LastOrderCard';
import { Entypo } from '@expo/vector-icons';

interface IProfileScreenProps {}

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
  const [address, setAddress] = useState(
    'Örnek köy mahalle şirindere caddesi no;1 Beykoz İstanbul'
  );
  const [isTextArea, setIsTextArea] = useState(false);

  const [orders, setOrders] = useState<FakeStoreApi[]>([]);

  const getProductsFromApi = async () => {
    const data = await fetch('https://fakestoreapi.com/products');
    const res = await data.json();
    setOrders(res);
  };

  React.useEffect(() => {
    getProductsFromApi();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff4757' }}>
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.userAvatar}>
            <UserAvatar size={100} name='Mertcan Karaman' />
            <Text style={styles.username}>Mertcan Karaman</Text>
          </View>
          <View style={styles.userInfos}>
            <View style={styles.addressContainer}>
              <Text style={styles.addressTitle}>Adresim</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                onFocus={() => setIsTextArea(!isTextArea)}
                placeholder='Adresinizi giriniz'
                style={{
                  minHeight: 50,
                  textAlignVertical: 'top',
                  borderColor: 'grey',
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 10
                }}
                onChangeText={(text) => setAddress(text)}
                value={address}
              />
            </View>
            <View style={styles.lastOrders}>
              <Text style={styles.lastOrdersTitle}>Son Siparislerim</Text>

              <ScrollView>
                {orders && orders.length > 0 ? (
                  orders.splice(0, 3).map((order) => <LastOrderCard key={order.id} order={order} />)
                ) : (
                  <IsCartEmpty />
                )}
              </ScrollView>
            </View>
            <View style={styles.accountSettings}>
              <TouchableOpacity>
                <View style={styles.accountSettingsCards}>
                  <View>
                    <MaterialIcons name='logout' size={28} color='black' />
                  </View>
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
                  <View>
                    <MaterialCommunityIcons name='key-change' size={24} color='black' />
                  </View>
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  lastOrders: {
    flex: 3,
    marginTop: 50,
    minHeight: 200
  },
  lastOrdersTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  accountSettings: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
    minHeight: 150
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
