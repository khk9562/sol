import { defineConfig, loadEnv } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            naverClientId: env.VITE_NAVER_MAP_CLIENT_ID,
          },
        },
      }),
    ],
    resolve: {
      dedupe: ["react", "react-dom", "react-router-dom"],
      alias: [
        { find: "@", replacement: resolve(__dirname, "src") },
        {
          find: "react",
          replacement: resolve(__dirname, "node_modules/react"),
        },
        {
          find: "react-dom",
          replacement: resolve(__dirname, "node_modules/react-dom"),
        },
        {
          find: "react-router-dom",
          replacement: resolve(__dirname, "node_modules/react-router-dom"),
        },
      ],
    },
  }
}
