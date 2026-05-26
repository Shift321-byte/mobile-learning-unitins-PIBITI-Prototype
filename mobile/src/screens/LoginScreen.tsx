import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('@token', res.data.token);
      navigation.replace('Home');
    } catch {
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Learning</Text>
      <Text style={styles.subtitle}>Área da Saúde – UNITINS</Text>
      <TextInput style={styles.input} placeholder="Email" value={email}
        onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" value={password}
        onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f0f4f8' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1a365d', marginBottom: 4 },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#718096', marginBottom: 32 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 12,
    fontSize: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  button: { backgroundColor: '#2b6cb0', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
