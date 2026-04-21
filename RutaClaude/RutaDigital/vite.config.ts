import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
      exclude: [
        /node_modules\/remotion/,
        /node_modules\/@remotion/,
        /node_modules\/motion/,
        /VideoIntro\.tsx/,
        /IntroPlayer\.tsx/,
        /App\.tsx/,
      ],
    }),
  ],
  build: {
    // Sin source maps en producción — el código queda ilegible en DevTools.
    sourcemap: false,
    // Minificador más agresivo que esbuild (default).
    minify: 'terser',
    terserOptions: {
      compress: {
        // Elimina console.log y friends del bundle final.
        drop_console: ['log', 'info', 'debug', 'trace'],
        drop_debugger: true,
        // Varias pasadas para mejor compresión.
        passes: 2,
      },
      mangle: {
        // Acorta nombres de variables/funciones (no props de objetos → no rompe React/motion).
        toplevel: true,
      },
      format: {
        // Quita todos los comentarios del output.
        comments: false,
      },
    },
    // Chunks más chicos para mejor cache; a más chunks, más difícil reconstruir el bundle entero.
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/motion')) return 'motion'
          if (id.includes('node_modules/remotion') || id.includes('node_modules/@remotion')) {
            return 'remotion'
          }
        },
      },
    },
    // Desactiva el aviso de "chunk grande" — tenemos remotion que pesa.
    chunkSizeWarningLimit: 1200,
  },
})
