import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button } from 'react-native-paper';
import AuthForm from '../components/AuthForm';
import RegisterForm from '../components/RegisterForm';

interface IRegisterProps {
  outlineColor: string;
  selectionColor: string;
  activeOutlineColor: string;
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.logoName}>KAP BI KEPCE</Text>
        </View>
        <View style={styles.lowerContainer}>
          <KeyboardAwareScrollView>
            <View style={styles.formContainer}>
              <RegisterForm
                email={email}
                password={password}
                name={name}
                setName={setName}
                setPassword={setPassword}
                setEmail={setEmail}
                page='register'
              />
              <Button
                mode='contained'
                onPress={() => console.log('Pressed')}
                style={{
                  marginTop: '10%',
                  backgroundColor: '#ff4757',
                  padding: 5,
                  borderRadius: 20
                }}>
                Uye Ol
              </Button>
              <Text
                onPress={() => navigation.navigate('Login')}
                style={{
                  marginTop: '10%',
                  backgroundColor: '#fff',
                  padding: 5,
                  borderRadius: 20
                }}>
                Zaten Hesabin Varsa
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upperContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4757',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  lowerContainer: {
    flex: 4,
    backgroundColor: '#fff'
  },
  logoName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  formContainer: {
    marginTop: '15%',
    width: '90%',
    margin: '5%'
  }
});

export default Register;
