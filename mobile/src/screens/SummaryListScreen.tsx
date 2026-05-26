import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../services/api';

export default function SummaryListScreen({ route, navigation }: any) {
  const { subcategory } = route.params;
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/subcategories/${subcategory.id}/summaries`)
      .then(res => { setSummaries(res.data); setLoading(false); });
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2b6cb0" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={summaries}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}
            onPress={() => navigation.navigate('SummaryDetail', { summaryId: item.id })}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, elevation: 2 },
  cardTitle: { fontSize: 16, color: '#2d3748' },
});
