import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../services/api';

interface Category { id: number; name: string; description: string; }

export default function HomeScreen({ navigation }: any) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories').then(res => { setCategories(res.data); setLoading(false); });
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2b6cb0" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categorias</Text>
      <FlatList
        data={categories}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}
            onPress={() => navigation.navigate('Subcategories', { category: item })}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#1a365d', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#2d3748' },
  cardDesc: { fontSize: 13, color: '#718096', marginTop: 4 },
});
