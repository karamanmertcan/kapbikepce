import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAtom } from 'jotai';
import { userState } from '../../store';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

declare module 'axios' {
  export interface AxiosRequestConfig {
    name?: string;
    lastName?: string;
    address?: string;
  }
}

interface User {
  user: {
    user: {
      name: string;
    };
  };
}

const UserInfos: React.FC<User> = (props) => {
  const [user, setUser] = useAtom(userState);
  const [userForm, setUserForm] = React.useState<{
    name: string;
    email: string;
    surname: string;
    address: string;
    phoneNumber: string;
  }>({
    email: user?.user?.email,
    name: user?.user?.name,
    surname: user?.user?.lastName,
    address: user?.user?.address,
    phoneNumber: ''
  });

  const handleUpdateUserForm = async () => {
    try {
      const { data } = await axios.put(
        '/user-update',
        {
          name: userForm.name,
          lastName: userForm.surname,
          address: userForm.address
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!data) return;

      showMessage({
        message: 'Bilgileriniz guncellendi',
        type: 'success'
      });

      setUser({ token: user.token, user: data.user });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Kullanıcı Bilgilerim</Text>
      <View style={styles.userForm}>
        <TextInput
          label='Email'
          value={userForm.email}
          onChangeText={(text) => setUserForm({ ...userForm, email: text })}
          style={styles.textInputStyle}
          disabled={true}
        />
        <TextInput
          label='İsim'
          value={userForm.name}
          onChangeText={(text) => setUserForm({ ...userForm, name: text })}
          style={styles.textInputStyle}
        />
        <TextInput
          label='Soyisim'
          value={userForm.surname}
          onChangeText={(text) => setUserForm({ ...userForm, surname: text })}
          style={styles.textInputStyle}
        />
        <TextInput
          label='Telefon Numarası'
          value={userForm.phoneNumber}
          onChangeText={(text) => setUserForm({ ...userForm, phoneNumber: text })}
          style={styles.textInputStyle}
        />
        <TextInput
          label='Adres'
          value={userForm.address}
          onChangeText={(text) => setUserForm({ ...userForm, address: text })}
          style={[styles.textInputStyle]}
          multiline={true}
          numberOfLines={4}
        />
        <Button
          mode='contained'
          onPress={handleUpdateUserForm}
          style={{
            marginTop: 10
          }}>
          Guncelle
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 100
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  userForm: {
    flex: 1
  },
  textInputStyle: {
    marginTop: 20
  },
  addressInput: {
    height: 200,
    justifyContent: 'center'
  }
});

export default UserInfos;
