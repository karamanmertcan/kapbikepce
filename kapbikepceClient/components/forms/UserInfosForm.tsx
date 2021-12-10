import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface IUserInfosProps {}

const UserInfos: React.FunctionComponent<IUserInfosProps> = (props) => {
  const [userForm, setUserForm] = React.useState({
    email: 'mertcankaraman2000@gmail.com',
    name: '',
    surname: '',
    address: '',
    phoneNumber: ''
  });
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
          onPress={() => console.log(userForm)}
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
