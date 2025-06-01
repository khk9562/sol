import { StyleSheet, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export const MainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },

  // 공통 스타일
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // 카메라 스타일
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#4ECDC4",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4ECDC4",
  },

  // 앨범 스타일
  albumContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    minHeight: height - 200,
  },
  photoItem: {
    width: (width - 30) / 2,
    height: (width - 30) / 2,
    margin: 5,
    position: "relative",
  },
  photoThumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  timestampOverlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 4,
  },
  timestampText: {
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  // 설정 스타일
  settingsContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  settingSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  settingItem: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  formatButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#333",
    marginRight: 10,
    marginBottom: 10,
  },
  formatButtonActive: {
    backgroundColor: "#4ECDC4",
  },
  formatButtonText: {
    color: "#ccc",
    fontSize: 14,
  },
  formatButtonTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  colorPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#333",
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // 에디터 스타일
  editorContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  previewImage: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
  timestampPreview: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 4,
  },
  editorControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#2a2a2a",
  },
  saveButton: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#666",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  // 하단 네비게이션
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
    paddingVertical: 10,
    paddingBottom: 20,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  navButtonActive: {
    opacity: 1,
  },
  navText: {
    color: "#666",
    fontSize: 12,
    marginTop: 2,
  },
  navTextActive: {
    color: "#4ECDC4",
    fontWeight: "bold",
  },
})
