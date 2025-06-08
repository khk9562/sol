import { DateFormat, SettingProps } from "../types"
import { ScrollView, View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { MainStyles } from "../style/main"

export default function Setting({
  timestampSettings,
  setTimestampSettings,
}: SettingProps) {
  const dateFormats: DateFormat[] = ["YYYY.MM.DD", "YYYY/MM/DD", "MM.DD.YYYY"]
  const colors: string[] = [
    "#FFFFFF",
    "#000000",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
  ]

  return (
    <ScrollView style={MainStyles.settingsContainer}>
      <View style={MainStyles.settingSection}>
        <Text style={MainStyles.sectionTitle}>타임스탬프 설정</Text>

        <View style={MainStyles.settingItem}>
          <Text style={MainStyles.settingLabel}>날짜 형식</Text>
          <View style={MainStyles.buttonGroup}>
            {dateFormats.map((format: DateFormat) => (
              <TouchableOpacity
                key={format}
                style={[
                  MainStyles.formatButton,
                  timestampSettings.dateFormat === format &&
                    MainStyles.formatButtonActive,
                ]}
                onPress={() =>
                  setTimestampSettings((prev) => ({
                    ...prev,
                    dateFormat: format,
                  }))
                }
              >
                <Text
                  style={[
                    MainStyles.formatButtonText,
                    timestampSettings.dateFormat === format &&
                      MainStyles.formatButtonTextActive,
                  ]}
                >
                  {format}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={MainStyles.settingItem}>
          <Text style={MainStyles.settingLabel}>색상</Text>
          <View style={MainStyles.colorPicker}>
            {colors.map((color: string) => (
              <TouchableOpacity
                key={color}
                style={[MainStyles.colorOption, { backgroundColor: color }]}
                onPress={() =>
                  setTimestampSettings((prev) => ({ ...prev, color }))
                }
              >
                {timestampSettings.color === color && (
                  <Ionicons
                    name='checkmark'
                    size={16}
                    color={color === "#FFFFFF" ? "#000" : "#FFF"}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={MainStyles.settingItem}>
          <TouchableOpacity
            style={MainStyles.toggleButton}
            onPress={() =>
              setTimestampSettings((prev) => ({
                ...prev,
                showWeather: !prev.showWeather,
              }))
            }
          >
            <Text style={MainStyles.settingLabel}>날씨 정보 표시</Text>
            <Ionicons
              name={timestampSettings.showWeather ? "toggle" : "toggle-outline"}
              size={24}
              color={timestampSettings.showWeather ? "#4ECDC4" : "#ccc"}
            />
          </TouchableOpacity>
        </View>

        <View style={MainStyles.settingItem}>
          <TouchableOpacity
            style={MainStyles.toggleButton}
            onPress={() =>
              setTimestampSettings((prev) => ({
                ...prev,
                showSeason: !prev.showSeason,
              }))
            }
          >
            <Text style={MainStyles.settingLabel}>계절 태그 표시</Text>
            <Ionicons
              name={timestampSettings.showSeason ? "toggle" : "toggle-outline"}
              size={24}
              color={timestampSettings.showSeason ? "#4ECDC4" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
