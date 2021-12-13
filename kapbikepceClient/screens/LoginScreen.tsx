import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button } from 'react-native-paper';
import { useAtom } from 'jotai';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import { showMessage } from 'react-native-flash-message';
import { userState, isAuthenticated } from '../store';

interface ILoginProps {
  outlineColor: string;
  selectionColor: string;
  activeOutlineColor: string;
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [state, setState] = useAtom(userState);
  const [authenticated, setAuthenticated] = useAtom(isAuthenticated);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (input: any) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(input.email) === false) {
      showMessage({
        message: 'Dogru bir email adresi giriniz',
        type: 'danger'
      });
    } else {
      try {
        const { data } = await axios.post('http://192.168.1.6:8000/api/login', {
          email: input.email,
          password: input.password
        });

        if (data.ok) {
          showMessage({
            message: 'Giris yapiliyor',
            type: 'success'
          });
          await AsyncStorage.setItem('token', JSON.stringify(data.token));
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
          setState({
            user: data.user,
            token: data.token
          });
          setAuthenticated(true);
        } else {
          setErrorMessage(data.message);
          showMessage({
            message: errorMessage,
            type: 'danger'
          });
        }

        console.log(data);
      } catch (error) {
        console.log(error);
        showMessage({
          message: errorMessage,
          type: 'danger'
        });
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.logoName}>KAP BI KEPCE</Text>
        </View>
        <View style={styles.lowerContainer}>
          <KeyboardAwareScrollView>
            <View style={styles.formContainer}>
              <AuthForm
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                page='login'
              />
              <Button
                mode='contained'
                onPress={handleSubmit(onSubmit)}
                style={{
                  marginTop: '10%',
                  backgroundColor: '#ff4757',
                  padding: 5,
                  borderRadius: 20
                }}>
                Giris Yap
              </Button>

              <Text
                onPress={() => navigation.navigate('Register')}
                style={{
                  marginTop: '10%',
                  backgroundColor: '#fff',
                  padding: 5,
                  borderRadius: 20,
                  textAlign: 'center'
                }}>
                Hesabin Yok Mu ?
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

export default Login;
