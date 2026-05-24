import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const FilterButton = ({ label, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.activeButton]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: '#fef0f1',
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: '#b80035',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5c3f40',
  },
  activeText: {
    color: '#ffffff',
  },
});

export default FilterButton;
