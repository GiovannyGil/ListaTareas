import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

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

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
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

        <Drawer.Screen name="+not-found" options={{ headerTitle: "Not Found" }} />
      </Drawer>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
