import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Logo from '../../components/ui/Logo';

export function SignUpScreen({ onNavigateToLogin = () => {} }) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const calculatePasswordStrength = pass => {
    if (!pass) return null;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.max(1, Math.min(4, score));
  };

  const strength = calculatePasswordStrength(password);

  const handleSignUp = () => {
    console.log('Registering user:', {
      displayName,
      username,
      email,
      password,
    });
    alert(`Success!\nRegistered account: ${username}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff8f7" />

      <View
        style={[styles.backgroundBubble, styles.backgroundBubbleTop]}
        pointerEvents="none"
      />
      <View
        style={[styles.backgroundBubble, styles.backgroundBubbleBottom]}
        pointerEvents="none"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Logo />
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.formCard}>
            <View style={styles.heroTitle}>
              <Text style={styles.heading}>Create Account</Text>
              <Text style={styles.subheading}>
                Join the next generation of sound creation.
              </Text>
            </View>

            <View style={styles.cardBody}>
              <Input
                label="Display Name"
                icon="person"
                placeholder="Alex Rivera"
                value={displayName}
                onChangeText={setDisplayName}
              />
              <Input
                label="Username"
                icon="alternate_email"
                placeholder="arivera_audio"
                value={username}
                onChangeText={setUsername}
              />
              <Input
                label="Email Address"
                icon="mail"
                placeholder="alex@harmoniq.ai"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                label="Password"
                icon="lock"
                placeholder="••••••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                strength={strength}
              />

              <Button
                title="Sign Up"
                onPress={handleSignUp}
                variant="primary"
                style={styles.submitButton}
              />

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialRow}>
                <Button
                  variant="social"
                  onPress={() => console.log('Google Auth initiated')}
                  icon={
                    <Image
                      source={{
                        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqTVPyeqhS9b3R7o3s5OYCkRhyW6NFbmSFhpNlRsd3mr_WwT_M4tmMaWkoQz-kvR2A-B-8-GTQ7tF51M0FEEE08txK2nxIJpsu8osN69svfH-AyfXSXdo8MnW8KEQZ4rvRV0em8MOAkpGnhIe_1qvUaLhVjpQCZqYyZMLjW5gbGWht7mRqCsqfB5-pcin2_EW7-ZCXTZVxRTeZtOeGILkzUWaPfIOP-Xzr_QwYufSo0VMUO4D_SvSbT36bdoZ7zUx2cOkuafE3',
                      }}
                      style={styles.socialIcon}
                      resizeMode="contain"
                    />
                  }
                  title="Google"
                />
                <Button
                  variant="social"
                  onPress={() => console.log('GitHub Auth initiated')}
                  icon={
                    <Image
                      source={{
                        uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
                      }}
                      style={styles.socialIcon}
                      resizeMode="contain"
                    />
                  }
                  title="GitHub"
                />
              </View>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={onNavigateToLogin} activeOpacity={0.7}>
                <Text style={styles.footerLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f7',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  backgroundBubble: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.36,
  },
  backgroundBubbleTop: {
    width: 600,
    height: 600,
    right: -200,
    top: -200,
    backgroundColor: 'rgba(184,0,53,0.05)',
  },
  backgroundBubbleBottom: {
    width: 500,
    height: 500,
    left: -150,
    bottom: -150,
    backgroundColor: 'rgba(225,29,72,0.05)',
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'flex-start',
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  formCard: {
    width: '100%',
    maxWidth: 440,
    padding: 24,
    borderRadius: 48,
    backgroundColor: '#ffffff',
    shadowColor: '#e11d48',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 6,
  },
  heroTitle: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heading: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: '700',
    color: '#211a1b',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    color: '#7f5d65',
    textAlign: 'center',
    marginTop: 8,
  },
  cardBody: {
    marginTop: 0,
  },
  submitButton: {
    marginTop: 24,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(225,29,72,0.15)',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(33,26,27,0.4)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialIcon: {
    width: 20,
    height: 20,
    borderRadius: 999,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(33,26,27,0.5)',
  },
  footerLink: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#b80035',
  },
});

export default SignUpScreen;
