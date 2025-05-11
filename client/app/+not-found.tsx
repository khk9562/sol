import { Text, View, StyleSheet } from "react-native"
import { Link } from "expo-router"

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>이 페이지를 찾을 수 없습니다.</Text>
      <Link href={"/"}>홈으로 이동</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: 600,
  },
})
