import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button } from 'react-native-paper';

interface IRegisterFormProps {
  page: string;
  control: any;
  handleSubmit: (fieldValues: any) => void;
  onSubmit: (data: any) => void;
  errors: any;
}

const RegisterForm: React.FC<IRegisterFormProps> = (props: IRegisterFormProps) => {
  return (
    <View>
      <Controller
        control={props.control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='Isim'
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            outlineColor='#ff4757'
            activeOutlineColor='#ff4757'
            selectionColor='#ff4757'
          />
        )}
        name='firstName'
      />
      {props.errors.firstName && <Text>İsim zorunludur !</Text>}

      <Controller
        control={props.control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='Soyisim'
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            outlineColor='#ff4757'
            activeOutlineColor='#ff4757'
            selectionColor='#ff4757'
          />
        )}
        name='lastName'
      />
      {props.errors.lastName && <Text>Soyisim zorunludur !</Text>}

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
            outlineColor='#ff4757'
            activeOutlineColor='#ff4757'
            selectionColor='#ff4757'
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
            label='Adres'
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            outlineColor='#ff4757'
            activeOutlineColor='#ff4757'
            selectionColor='#ff4757'
          />
        )}
        name='address'
      />
      {props.errors.address && <Text>Adres zorunludur !</Text>}

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
            outlineColor='#ff4757'
            activeOutlineColor='#ff4757'
            secureTextEntry={true}
            selectionColor='#ff4757'
          />
        )}
        name='password'
      />
      {props.errors.password && <Text>Şifre zorunludur !</Text>}

      <Button
        mode='contained'
        onPress={props.handleSubmit(props.onSubmit)}
        style={{
          marginTop: '10%',
          backgroundColor: '#ff4757',
          padding: 5,
          borderRadius: 20
        }}>
        Uye Ol
      </Button>
    </View>
  );
};

export default RegisterForm;
