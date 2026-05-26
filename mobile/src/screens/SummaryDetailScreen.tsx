import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import api from '../services/api';

export default function SummaryDetailScreen({ route }: any) {
  const { summaryId } = route.params;
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    api.get(`/summaries/${summaryId}`).then(res => setSummary(res.data));
  }, []);

  if (!summary) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2b6cb0" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{summary.title}</Text>
      <WebView
        originWhitelist={['*']}
        source={{ html: `<html><body style="font-size:16px;font-family:sans-serif;padding:8px;color:#2d3748">${summary.content}</body></html>` }}
        style={{ minHeight: 400 }}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1a365d', marginBottom: 16 },
});
