import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ActionChip({ icon, label, active = false, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.root, active && styles.activeRoot]}
    >
      <View style={[styles.iconPill, active && styles.activeIconPill]}>
        <Text style={[styles.icon, active && styles.activeIcon]}>{icon}</Text>
      </View>
      <Text
        style={[styles.label, active && styles.activeLabel]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#fff8f7',
    borderWidth: 1,
    borderColor: '#f4d7d9',
    marginRight: 12,
  },
  activeRoot: {
    backgroundColor: '#b80035',
    borderColor: '#b80035',
  },
  iconPill: {
    width: 30,
    height: 30,
    borderRadius: 14,
    backgroundColor: '#ffe4e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  activeIconPill: {
    backgroundColor: '#ffffff',
  },
  icon: {
    fontSize: 16,
  },
  activeIcon: {
    color: '#b80035',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5c3f40',
  },
  activeLabel: {
    color: '#ffffff',
  },
});
