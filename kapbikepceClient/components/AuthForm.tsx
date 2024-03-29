import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button } from 'react-native-paper';

interface IAuthFormProps {
  page: string;
  control: any;
  handleSubmit: (fieldValues: any) => void;
  errors: any;
}

const AuthForm: React.FC<IAuthFormProps> = (props: IAuthFormProps) => {
  return (
    <View>
      <Controller
        control={props.control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='Email'
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            outlineColor='#2c3e50'
            activeOutlineColor='#2c3e50'
            selectionColor='#2c3e50'
          />
        )}
        name='email'
      />
      {props.errors.email && <Text>Email zorunludur !</Text>}

      <Controller
        control={props.control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='Şifre'
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            secureTextEntry={true}
            outlineColor='#2c3e50'
            activeOutlineColor='#2c3e50'
            selectionColor='#2c3e50'
          />
        )}
        name='password'
      />
      {props.errors.password && <Text>Şifre zorunludur !</Text>}
    </View>
  );
};

export default AuthForm;
