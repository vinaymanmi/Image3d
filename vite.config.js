import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Force Vite reload for Tailwind setup 
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
})
