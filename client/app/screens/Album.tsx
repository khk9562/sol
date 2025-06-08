import { ScrollView, View, Text, Image } from "react-native"
import { MainStyles } from "../style/main"
import { PhotoData } from "../types"

export default function Album({ photos }: { photos: PhotoData[] }) {
  return (
    <ScrollView style={MainStyles.albumContainer}>
      <View style={MainStyles.photoGrid}>
        {photos.length === 0 ? (
          <View style={MainStyles.centerContainer}>
            <Text style={MainStyles.messageText}>
              아직 촬영한 사진이 없습니다
            </Text>
          </View>
        ) : (
          photos.map((photo: PhotoData) => (
            <View key={photo.id} style={MainStyles.photoItem}>
              <Image
                source={{ uri: photo.uri }}
                style={MainStyles.photoThumbnail}
              />
              <View
                style={[
                  MainStyles.timestampOverlay,
                  {
                    left: photo.settings.position.x,
                    top: photo.settings.position.y,
                  },
                ]}
              >
                <Text
                  style={[
                    MainStyles.timestampText,
                    {
                      color: photo.settings.color,
                      fontSize: photo.settings.fontSize,
                    },
                  ]}
                >
                  {photo.timestampText}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  )
}
