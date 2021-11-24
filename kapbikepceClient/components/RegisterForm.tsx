import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button } from 'react-native-paper';

interface IRegisterFormProps {
  email: string;
  password: string;
  name: string;
  page: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
}

const RegisterForm: React.FC<IRegisterFormProps> = (props: IRegisterFormProps) => {
  return (
    <View>
      <TextInput
        label='Isim'
        value={props.name}
        onChangeText={(text) => props.setName(text)}
        mode='outlined'
        outlineColor='#ff4757'
        activeOutlineColor='#ff4757'
        selectionColor='#ff4757'
      />
      <TextInput
        label='Email'
        value={props.email}
        onChangeText={(text) => props.setEmail(text)}
        mode='outlined'
        outlineColor='#ff4757'
        activeOutlineColor='#ff4757'
        selectionColor='#ff4757'
        style={{
          marginTop: '10%'
        }}
      />
      <TextInput
        outlineColor='#ff4757'
        selectionColor='#ff4757'
        activeOutlineColor='#ff4757'
        label='Şifre'
        value={props.password}
        onChangeText={(text) => props.setPassword(text)}
        style={{
          marginTop: '10%'
        }}
        mode='outlined'
      />
    </View>
  );
};

export default RegisterForm;
