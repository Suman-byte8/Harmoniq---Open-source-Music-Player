import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export function Input({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  strength = null,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const iconBorderColor = isFocused ? '#b80035' : 'rgba(33,26,27,0.35)';
  const iconTextColor = isFocused ? '#b80035' : 'rgba(33,26,27,0.35)';

  const renderIcon = () => {
    switch (icon) {
      case 'person':
        return (
          <View
            style={[styles.iconContainer, { borderColor: iconBorderColor }]}
          >
            <View
              style={[styles.personHead, { borderColor: iconBorderColor }]}
            />
            <View
              style={[styles.personShoulders, { borderColor: iconBorderColor }]}
            />
          </View>
        );
      case 'alternate_email':
        return (
          <View style={styles.iconContainer}>
            <Text style={[styles.iconText, { color: iconTextColor }]}>@</Text>
          </View>
        );
      case 'mail':
        return (
          <View style={[styles.iconContainer, styles.mailIconWrapper]}>
            <View style={[styles.envelope, { borderColor: iconBorderColor }]}>
              <View
                style={[styles.envelopeFlap, { borderColor: iconBorderColor }]}
              />
            </View>
          </View>
        );
      case 'lock':
        return (
          <View style={[styles.iconContainer, styles.lockIconWrapper]}>
            <View style={[styles.lockBody, { borderColor: iconBorderColor }]}>
              <View
                style={[styles.lockShackle, { borderColor: iconBorderColor }]}
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.inputBlock}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputRow,
          isFocused ? styles.inputRowFocused : styles.inputRowBlurred,
        ]}
      >
        {icon && <View style={styles.iconAbsolute}>{renderIcon()}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="rgba(33, 26, 27, 0.35)"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            styles.textInput,
            icon ? styles.textInputWithIcon : styles.textInputDefault,
          ]}
        />
      </View>

      {strength !== null && (
        <View style={styles.strengthRow}>
          {[1, 2, 3, 4].map(level => (
            <View
              key={level}
              style={[
                styles.strengthBar,
                strength >= level
                  ? styles.strengthActive
                  : styles.strengthInactive,
              ]}
            />
          ))}
          <Text style={styles.strengthLabel}>
            {strength >= 3 ? 'Strong' : strength >= 2 ? 'Medium' : 'Weak'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputBlock: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(33,26,27,0.35)',
    marginLeft: 4,
    marginBottom: 6,
  },
  inputRow: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#fef0f1',
  },
  inputRowFocused: {
    borderColor: 'rgba(184,0,53,0.3)',
    backgroundColor: '#ffffff',
  },
  inputRowBlurred: {
    borderColor: 'transparent',
  },
  iconAbsolute: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 16,
    fontWeight: '700',
  },
  personHead: {
    width: 10,
    height: 10,
    borderRadius: 999,
    borderWidth: 1.8,
  },
  personShoulders: {
    width: 16,
    height: 6,
    borderTopWidth: 1.8,
    borderLeftWidth: 1.8,
    borderRightWidth: 1.8,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    marginTop: 2,
  },
  mailIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelope: {
    width: 18,
    height: 13,
    borderWidth: 1.8,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  envelopeFlap: {
    position: 'absolute',
    top: -9,
    width: 14,
    height: 14,
    borderTopWidth: 1.8,
    borderRightWidth: 1.8,
    transform: [{ rotate: '45deg' }],
  },
  lockIconWrapper: {
    justifyContent: 'center',
  },
  lockBody: {
    width: 15,
    height: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  lockShackle: {
    position: 'absolute',
    top: 0,
    width: 12,
    height: 14,
    borderWidth: 1.8,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
  },
  textInput: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 16,
    color: '#211a1b',
    fontSize: 14,
  },
  textInputWithIcon: {
    paddingLeft: 44,
  },
  textInputDefault: {
    paddingLeft: 16,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
  },
  strengthBar: {
    height: 4,
    flex: 1,
    borderRadius: 999,
  },
  strengthActive: {
    backgroundColor: '#b80035',
  },
  strengthInactive: {
    backgroundColor: 'rgba(184,0,53,0.2)',
  },
  strengthLabel: {
    marginLeft: 8,
    fontSize: 10,
    fontWeight: '700',
    color: '#b80035',
    textTransform: 'uppercase',
  },
});

export default Input;
