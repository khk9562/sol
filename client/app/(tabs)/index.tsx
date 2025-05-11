import { Text, View, StyleSheet } from "react-native"
import { Link } from "expo-router"

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>메인</Text>
      <Link href='/about' style={styles.button}>
        Go to About
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#333",
  },
})
