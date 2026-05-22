import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function Button({
  title,
  onPress,
  variant = 'primary',
  children,
  icon = null,
  style,
}) {
  const buttonStyle = [styles.baseButton, style];
  const textStyle = [styles.baseText];

  if (variant === 'primary') {
    buttonStyle.push(styles.primaryButton);
    textStyle.push(styles.primaryText);
  } else if (variant === 'secondary') {
    buttonStyle.push(styles.secondaryButton);
    textStyle.push(styles.secondaryText);
  } else if (variant === 'social') {
    buttonStyle.push(styles.socialButton);
    textStyle.push(styles.socialText);
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.95}
      style={buttonStyle}
    >
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      {children ? <>{children}</> : <Text style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    minHeight: 52,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#e11d48',
    shadowColor: '#b80035',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(225,29,72,0.15)',
    backgroundColor: 'transparent',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(225,29,72,0.15)',
    backgroundColor: 'transparent',
  },
  iconWrapper: {
    marginRight: 8,
  },
  baseText: {
    fontSize: 14,
    fontWeight: '700',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#b80035',
  },
  socialText: {
    color: '#7f5d65',
  },
});

export default Button;
