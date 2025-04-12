import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Content-Type": "application/javascript",
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@supabase/supabase-js": path.resolve(__dirname, "node_modules/@supabase/supabase-js/dist/module/index.js")
    },
  },
  build: {
    rollupOptions: {
      external: ['@supabase/supabase-js'],
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        globals: {
          '@supabase/supabase-js': 'supabase'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js']
  }
}));
