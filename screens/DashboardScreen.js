import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockAlerts = [
  { id: '1', title: 'Suspicious Login Blocked', time: 'Just now', type: 'critical', ip: '192.168.1.45', device: 'Unknown Chrome / Windows' },
  { id: '2', title: 'Successful Login', time: '2 hours ago', type: 'info', ip: '145.79.213.88', device: 'Admin PC' },
  { id: '3', title: 'File Changed: index.php', time: 'Yesterday', type: 'warning', ip: 'System', device: 'FIM Scanner' },
];

export default function DashboardScreen() {
  const renderItem = ({ item }) => {
    const isCritical = item.type === 'critical';
    const isWarning = item.type === 'warning';
    
    return (
      <View style={[styles.card, isCritical && styles.cardCritical]}>
        <View style={styles.cardHeader}>
          <Ionicons 
            name={isCritical ? 'warning' : isWarning ? 'alert-circle' : 'checkmark-circle'} 
            size={24} 
            color={isCritical ? '#d32f2f' : isWarning ? '#ed6c02' : '#2e7d32'} 
          />
          <Text style={[styles.cardTitle, isCritical && {color: '#d32f2f'}]}>{item.title}</Text>
          <Text style={styles.cardTime}>{item.time}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardText}>IP: <Text style={styles.bold}>{item.ip}</Text></Text>
          <Text style={styles.cardText}>Device: <Text style={styles.bold}>{item.device}</Text></Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>System Status</Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Monitoring Active</Text>
        </View>
      </View>
      
      <FlatList
        data={mockAlerts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',
    marginRight: 6,
  },
  statusText: {
    color: '#2e7d32',
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eaeaea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardCritical: {
    borderColor: '#ffcdd2',
    backgroundColor: '#fffcfc',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginLeft: 8,
  },
  cardTime: {
    fontSize: 12,
    color: '#888',
  },
  cardBody: {
    marginLeft: 32,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  bold: {
    fontWeight: '600',
    color: '#333',
  }
});
