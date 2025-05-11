import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name='index' options={{ title: "홈" }} />
      <Stack.Screen name='about' options={{ title: "about" }} /> */}
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='+not-found' />
    </Stack>
  )
}
