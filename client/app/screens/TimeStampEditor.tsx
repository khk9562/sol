import { Modal, View, Image, Text, TouchableOpacity } from "react-native"
import { MainStyles } from "../style/main"
import { TimeStampEditorProps } from "../types"
import { getTimestampText } from "../utils/date"

export default function TimeStampEditor({
  show,
  onClose,
  currentPhoto,
  timestampSettings,
  weather,
  onSave,
}: TimeStampEditorProps) {
  return (
    <Modal visible={show} animationType='slide'>
      <View style={MainStyles.editorContainer}>
        {currentPhoto && (
          <Image
            source={{ uri: currentPhoto.uri }}
            style={MainStyles.previewImage}
          />
        )}
        <View
          style={[
            MainStyles.timestampPreview,
            {
              left: timestampSettings.position.x,
              top: timestampSettings.position.y,
            },
          ]}
        >
          <Text
            style={[
              MainStyles.timestampText,
              {
                color: timestampSettings.color,
                fontSize: timestampSettings.fontSize,
              },
            ]}
          >
            {getTimestampText({ timestampSettings, weather })}
          </Text>
        </View>

        <View style={MainStyles.editorControls}>
          <TouchableOpacity
            style={MainStyles.saveButton}
            onPress={() =>
              onSave({
                timestampSettings,
                weather,
              })
            }
          >
            <Text style={MainStyles.saveButtonText}>저장</Text>
          </TouchableOpacity>
          <TouchableOpacity style={MainStyles.cancelButton} onPress={onClose}>
            <Text style={MainStyles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
