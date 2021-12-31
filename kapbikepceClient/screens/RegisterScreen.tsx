import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { useAtom } from 'jotai';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import { showMessage } from 'react-native-flash-message';
import { userState, isAuthenticated } from '../store';
import Svg, { Path, SvgXml } from 'react-native-svg';
import RegisterForm from '../components/RegisterForm';
import MyStatusBar from '../components/statusbar/StatusBarComp';

interface ILoginProps {
  outlineColor: string;
  selectionColor: string;
  activeOutlineColor: string;
}

const Register: React.FunctionComponent<ILoginProps> = (props) => {
  const [state, setState] = useAtom(userState);
  const [authenticated, setAuthenticated] = useAtom(isAuthenticated);
  const [errorMessage, setErrorMessage] = useState('');
  const windowHeight = useWindowDimensions().height;
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
        // const { data } = await axios.post('/login', {
        //   email: input.email,
        //   password: input.password
        // });
        // if (data.ok) {
        //   showMessage({
        //     message: 'Giris yapiliyor',
        //     type: 'success'
        //   });
        //   await AsyncStorage.setItem('token', JSON.stringify(data.token));
        //   await AsyncStorage.setItem('user', JSON.stringify(data.user));
        //   setState({
        //     user: data.user,
        //     token: data.token
        //   });
        //   setAuthenticated(true);
        // } else {
        //   setErrorMessage(data.message);
        //   showMessage({
        //     message: errorMessage,
        //     type: 'danger'
        //   });
        // }
        console.log(input);
      } catch (error) {
        console.log(error);
        showMessage({
          message: errorMessage,
          type: 'danger'
        });
      }
    }
  };

  const [loaded] = useFonts({
    LobsterRegular: require('../assets/fonts/LobsterRegular.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        style={{
          flex: 1
        }}>
        <View style={[{ minHeight: Math.round(windowHeight) }, styles.container]}>
          <MyStatusBar backgroundColor='#0099ff' barStyle='light-content' />

          <View style={styles.upperContainer}>
            <View
              style={{
                backgroundColor: '#0099ff',
                height: 1000,
                justifyContent: 'center'
              }}>
              <View
                style={{
                  alignItems: 'center'
                }}>
                <Image
                  style={{
                    height: 100,
                    width: 100
                  }}
                  source={{
                    uri: 'https://i.imgur.com/Y95QzOD.png'
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: '5%',
                  minHeight: 300,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                    Kap Bir Kepçe
                  </Text>
                </View>
                <View style={styles.formContainer}>
                  <RegisterForm
                    onSubmit={onSubmit}
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
                    Giriş Yap
                  </Button>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <View
                      style={{
                        paddingVertical: 10,
                        alignItems: 'center'
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                        Zaten hesabın var mı ? Giriş Yap
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upperContainer: {
    flex: 6,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },

  logoName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  formContainer: {
    width: '90%',
    margin: '5%'
  }
});

export default Register;
