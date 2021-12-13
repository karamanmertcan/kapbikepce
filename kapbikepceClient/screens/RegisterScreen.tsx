import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage, hideMessage } from 'react-native-flash-message';
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
        const { data } = await axios.post('http://192.168.1.6:8000/api/register', {
          name: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: input.password,
          address: input.address
        });

        if (data.ok) {
          showMessage({
            message: 'Kayit basariyla tamamlandi',
            type: 'success'
          });
          navigation.navigate('Login');
        }

        console.log(data);
      } catch (error) {
        console.log(error);
        showMessage({
          message: 'Kayit basarisiz',
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
              <RegisterForm
                page='register'
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
              />

              <Text
                onPress={() => navigation.navigate('Login')}
                style={{
                  marginTop: '10%',
                  backgroundColor: '#fff',
                  padding: 5,
                  borderRadius: 20,
                  textAlign: 'center'
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
