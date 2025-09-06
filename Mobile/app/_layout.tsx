import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { logout } from "./(tabs)/Auth/Auth.services";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const router = useRouter();
  const [rol, setRol] = useState<{ rolId?: string } | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("usuario").then((usuarioStr) => {
      if (usuarioStr) {
        try {
          const usuarioObj = JSON.parse(usuarioStr);
          setRol(usuarioObj);
          console.log('usuario', usuarioObj.rolId);
        } catch (e) {
          console.log('Error parsing usuario:', e);
        }
      } else {
        setRol(null);
        console.log('usuario', null);
      }
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    await AsyncStorage.removeItem("usuario");
    router.replace("/(tabs)"); // Cambia esto por la ruta de tu login
  };

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        drawerContent={(props) => (
          <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Cerrar sesión"
              onPress={handleLogout}
              style={{ marginTop: 'auto', marginBottom: 16, borderColor: '#eee', paddingVertical: 1, paddingHorizontal: "auto", borderWidth: 1 }}
              labelStyle={{ color: '#ffffffff', fontWeight: 'bold', fontSize: 16 }}
              icon={() => (
                <StatusBar style="auto" />
              )}
            />
          </DrawerContentScrollView>
        )}
        screenOptions={{
          headerStyle: { backgroundColor: "#4682B4" },
          headerTintColor: "#fff",
          drawerActiveTintColor: "#4682B4",
          drawerLabelStyle: { fontSize: 16 },
          drawerStyle: { width: 240 },
        }}
      >
        <Drawer.Screen
          name="/home/home"
          options={{ drawerLabel: "Inicio", headerTitle: "Inicio" }}
        />
        <Drawer.Screen
          name="/roles/roles"
          options={{ drawerLabel: "Roles", headerTitle: "Roles" }}
        />
        <Drawer.Screen
          name="/tareas/tareas"
          options={{ drawerLabel: "Tareas", headerTitle: "Tareas" }}
        />
        <Drawer.Screen
          name="/usuarios/usuarios"
          options={{ drawerLabel: "Usuarios", headerTitle: "Usuarios" }}
        />
        <Drawer.Screen
          name="/tipousuario/tipousuario"
          options={{ drawerLabel: "Tipo Usuario", headerTitle: "Tipo Usuario" }}
        />

        {/* Oculto en el Drawer */}
        <Drawer.Screen
          name="(tabs)"
          options={{ drawerItemStyle: { display: "none" }, headerShown: false }}
        />

        <Drawer.Screen name="+not-found" options={{ headerTitle: "Not Found", drawerItemStyle: { display: "none" } }} />
      </Drawer>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
