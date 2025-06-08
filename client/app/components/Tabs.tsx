import { TouchableOpacity, View, Text } from "react-native"
import { MainStyles } from "../style/main"
import { Ionicons } from "@expo/vector-icons"
import { TabsProps } from "../types"

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <View style={MainStyles.bottomNav}>
      <TouchableOpacity
        style={[
          MainStyles.navButton,
          activeTab === "album" && MainStyles.navButtonActive,
        ]}
        onPress={() => setActiveTab("album")}
      >
        <Ionicons
          name='images'
          size={24}
          color={activeTab === "album" ? "#4ECDC4" : "#666"}
        />
        <Text
          style={[
            MainStyles.navText,
            activeTab === "album" && MainStyles.navTextActive,
          ]}
        >
          앨범
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          MainStyles.navButton,
          activeTab === "camera" && MainStyles.navButtonActive,
        ]}
        onPress={() => setActiveTab("camera")}
      >
        <Ionicons
          name='camera'
          size={24}
          color={activeTab === "camera" ? "#4ECDC4" : "#666"}
        />
        <Text
          style={[
            MainStyles.navText,
            activeTab === "camera" && MainStyles.navTextActive,
          ]}
        >
          카메라
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          MainStyles.navButton,
          activeTab === "settings" && MainStyles.navButtonActive,
        ]}
        onPress={() => setActiveTab("settings")}
      >
        <Ionicons
          name='settings'
          size={24}
          color={activeTab === "settings" ? "#4ECDC4" : "#666"}
        />
        <Text
          style={[
            MainStyles.navText,
            activeTab === "settings" && MainStyles.navTextActive,
          ]}
        >
          설정
        </Text>
      </TouchableOpacity>
    </View>
  )
}
