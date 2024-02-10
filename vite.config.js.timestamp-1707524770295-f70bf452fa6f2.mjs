// vite.config.js
import { defineConfig } from "file:///C:/xampp/htdocs/websites/work/e-commerce-perfumes/node_modules/vite/dist/node/index.js";
import laravel from "file:///C:/xampp/htdocs/websites/work/e-commerce-perfumes/node_modules/laravel-vite-plugin/dist/index.mjs";
import react from "file:///C:/xampp/htdocs/websites/work/e-commerce-perfumes/node_modules/@vitejs/plugin-react/dist/index.mjs";
import i18n from "file:///C:/xampp/htdocs/websites/work/e-commerce-perfumes/node_modules/laravel-react-i18n/vite.js";
import { VitePWA } from "file:///C:/xampp/htdocs/websites/work/e-commerce-perfumes/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.tsx",
      ssr: "resources/js/ssr.tsx",
      refresh: true
    }),
    react(),
    i18n(),
    VitePWA({ registerType: "autoUpdate" })
  ],
  // ADD REACT ICONS  TO SSR AND react-i18next TO CLIENT
  ssr: {
    noExternal: ["react-icons"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcd2Vic2l0ZXNcXFxcd29ya1xcXFxlLWNvbW1lcmNlLXBlcmZ1bWVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcd2Vic2l0ZXNcXFxcd29ya1xcXFxlLWNvbW1lcmNlLXBlcmZ1bWVzXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi94YW1wcC9odGRvY3Mvd2Vic2l0ZXMvd29yay9lLWNvbW1lcmNlLXBlcmZ1bWVzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgbGFyYXZlbCBmcm9tICdsYXJhdmVsLXZpdGUtcGx1Z2luJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgaTE4biBmcm9tICdsYXJhdmVsLXJlYWN0LWkxOG4vdml0ZSc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgbGFyYXZlbCh7XG4gICAgICAgICAgICBpbnB1dDogJ3Jlc291cmNlcy9qcy9hcHAudHN4JyxcbiAgICAgICAgICAgIHNzcjogJ3Jlc291cmNlcy9qcy9zc3IudHN4JyxcbiAgICAgICAgICAgIHJlZnJlc2g6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICByZWFjdCgpLFxuICAgICAgICBpMThuKCksXG4gICAgICAgIFZpdGVQV0EoeyByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyB9KVxuICAgIF0sXG4gICAgLy8gQUREIFJFQUNUIElDT05TICBUTyBTU1IgQU5EIHJlYWN0LWkxOG5leHQgVE8gQ0xJRU5UXG4gICAgc3NyOntcbiAgICAgICAgbm9FeHRlcm5hbDogWydyZWFjdC1pY29ucyddXG4gICAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsb0JBQW9CO0FBQzlXLE9BQU8sYUFBYTtBQUNwQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsZUFBZTtBQUV4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxLQUFLO0FBQUEsTUFDTCxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxRQUFRLEVBQUUsY0FBYyxhQUFhLENBQUM7QUFBQSxFQUMxQztBQUFBO0FBQUEsRUFFQSxLQUFJO0FBQUEsSUFDQSxZQUFZLENBQUMsYUFBYTtBQUFBLEVBQzlCO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
