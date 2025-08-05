import { Image } from 'expo-image';
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  // Estados para manejar los valores de los campos del formulario
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  // Añadir nuevos estados para el foco
  const [isNombreFocused, setIsNombreFocused] = useState(false);
  const [isClaveFocused, setIsClaveFocused] = useState(false);
  // mensajes de error
  const [errorNombreUsuario, setErrorNombreUsuario] = useState('');
  const [errorClave, setErrorClave] = useState('');

  // Función que se ejecuta al presionar el botón de login
  const handleLogin = () => {
    // Validación básica de campos vacíos
    if (!nombreUsuario.trim() || !clave.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Aquí iría la lógica de autenticación
    Alert.alert('Login', `Usuario: ${nombreUsuario}`);
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView className='container'>
        {/* Contenedor principal del formulario */}
        <View style={styles.loginContainer}>

          {/* Título de la aplicación */}
          <Text style={styles.title}>Registrarse</Text>

          {/* Formulario de registro */}
          <View style={styles.formContainer}>
            {/* Campo de Nombres */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nombres</Text>
              <TextInput
                style={[
                  styles.textInput,
                  isNombreFocused && styles.textInputFocused // aplicar estilo extra si está enfocado
                ]}
                placeholder="Ingresa tus nombres"
                placeholderTextColor="#87CEEB" // Sky Blue pastel para placeholder
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                onFocus={() => setIsNombreFocused(true)}
                onBlur={() => setIsNombreFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Campo de Apellidos */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Apellidos</Text>
              <TextInput
                style={[
                  styles.textInput,
                  isNombreFocused && styles.textInputFocused // aplicar estilo extra si está enfocado
                ]}
                placeholder="Ingresa tus Apellidos"
                placeholderTextColor="#87CEEB" // Sky Blue pastel para placeholder
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                onFocus={() => setIsNombreFocused(true)}
                onBlur={() => setIsNombreFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>


            {/* Campo de nombre de usuario */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nombre de Usuario</Text>
              <TextInput
                style={[
                  styles.textInput,
                  isNombreFocused && styles.textInputFocused // aplicar estilo extra si está enfocado
                ]}
                placeholder="Ingresa tu nombre de usuario"
                placeholderTextColor="#87CEEB" // Sky Blue pastel para placeholder
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                onFocus={() => setIsNombreFocused(true)}
                onBlur={() => setIsNombreFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Campo de correo electrónico */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Correo Electrónico</Text>
              <TextInput
                style={[
                  styles.textInput,
                  isNombreFocused && styles.textInputFocused // aplicar estilo extra si está enfocado
                ]}
                placeholder="Ingresa tu correo"
                placeholderTextColor="#87CEEB" // Sky Blue pastel para placeholder
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                onFocus={() => setIsNombreFocused(true)}
                onBlur={() => setIsNombreFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Campo de celular */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Celular</Text>
              <TextInput
                style={[
                  styles.textInput,
                  isNombreFocused && styles.textInputFocused // aplicar estilo extra si está enfocado
                ]}
                placeholder="Ingresa tu celular"
                placeholderTextColor="#87CEEB" // Sky Blue pastel para placeholder
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                onFocus={() => setIsNombreFocused(true)}
                onBlur={() => setIsNombreFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Campo de contraseña */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <TextInput
                style={[
                  styles.textInput,
                  isClaveFocused && styles.textInputFocused
                ]}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#87CEEB" // Sky Blue pastel para placeholder
                value={clave}
                onChangeText={setClave}
                onFocus={() => setIsClaveFocused(true)}
                onBlur={() => setIsClaveFocused(false)}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Campo de confirmación de contraseña */}

            {/* Campo de genero */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Género</Text>
              <TextInput
                style={[
                  styles.textInput,
                  isNombreFocused && styles.textInputFocused // aplicar estilo extra si está enfocado
                ]}
                placeholder="Ingresa tu género"
                placeholderTextColor="#87CEEB" // Sky Blue pastel para placeholder
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                onFocus={() => setIsNombreFocused(true)}
                onBlur={() => setIsNombreFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Botón de registrarse */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Registrarse</Text>
              </TouchableOpacity>

              {/* Enlaces adicionales */}
              <View style={styles.linksContainer}>
                <TouchableOpacity>
                  <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  // Contenedor principal de la pantalla
  container: {
    flex: 1,
    backgroundColor: '#cad4ddff', // Azul pastel muy suave (Alice Blue)
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  // Contenedor del formulario de login
  loginContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25, // Bordes más redondeados para look moderno
    padding: 30,
    shadowColor: '#086c94ff', // Sombra en azul pastel
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10, // Para Android
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E6F3FF', // Borde sutil azul muy claro
  },

  // Título principal
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#4682B4', // Steel Blue - azul pastel vibrante
    textAlign: 'center',
    marginBottom: 0,
    letterSpacing: 0.1,
  },

  // Subtítulo
  subtitle: {
    fontSize: 14,
    color: '#708090', // Slate Gray - gris azulado pastel
    textAlign: 'center',
    marginTop: -9,
    marginBottom: 26,
    fontWeight: '400',
  },

  // Contenedor del formulario
  formContainer: {
    width: '100%',
  },

  // Contenedor de cada campo de entrada
  inputContainer: {
    marginBottom: 15,
  },

  // Etiqueta de los campos
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5F9EA0', // Cadet Blue - azul verdoso pastel
    marginBottom: 1,
    paddingStart: 12,
    letterSpacing: 0.1,
  },

  // Estilo de los campos de texto
  textInput: {
    height: 40,
    borderWidth: 3,
    borderColor: '#B0E0E6', // Powder Blue - azul polvo pastel
    borderRadius: 25, // Bordes más redondeados
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#F8FDFF', // Fondo azul muy muy claro
    color: '#054b4bff', // Dark Slate Gray - texto en gris oscuro suave
    fontWeight: '400',
  },

  // Efecto de focus mejorado con colores pastel
  textInputFocused: {
    borderColor: '#87CEEB', // Sky Blue - azul cielo pastel vibrante
    backgroundColor: '#F0FFFF', // Azure - fondo azul hielo
    shadowColor: '#87CEEB',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ scale: 1.01 }], // Efecto sutil de agrandamiento
  },

  // Botón principal con gradiente pastel simulado
  loginButton: {
    backgroundColor: '#87CEEB', // Sky Blue - azul cielo pastel
    borderRadius: 16,
    width: '60%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#4682B4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#B0C4DE', // Light Steel Blue - borde sutil
  },

  // Texto del botón con mejor contraste
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: '#4682B4',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Contenedor de enlaces con mejor espaciado
  linksContainer: {
    marginTop: 25,
    alignItems: 'center',
  },

  // Enlaces con color pastel vibrante
  linkText: {
    color: '#2d2d2eff', // Slate Blue - púrpura pastel que complementa
    fontSize: 15,
    fontWeight: '700',
    textDecorationLine: 'none',
    letterSpacing: 0.2,
  },
});
