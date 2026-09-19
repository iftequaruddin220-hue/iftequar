import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'save-avatar-middleware',
        configureServer(server) {
          server.middlewares.use('/api/upload-photo', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            if (req.method === 'OPTIONS') {
              res.writeHead(204);
              res.end();
              return;
            }

            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const { dataUrl, filename } = JSON.parse(body);
                  if (dataUrl && typeof dataUrl === 'string' && dataUrl.startsWith('data:image')) {
                    const base64Data = dataUrl.replace(/^data:image\/[^;]+;base64,/, '');
                    const buffer = Buffer.from(base64Data, 'base64');
                    const publicDir = path.resolve(process.cwd(), 'public');
                    if (!fs.existsSync(publicDir)) {
                      fs.mkdirSync(publicDir, { recursive: true });
                    }
                    const targetName = (filename && typeof filename === 'string' && /^[a-zA-Z0-9_.-]+$/.test(filename))
                      ? filename
                      : 'me-working.png';
                    fs.writeFileSync(path.join(publicDir, targetName), buffer);
                    const distDir = path.resolve(process.cwd(), 'dist');
                    if (fs.existsSync(distDir)) {
                      fs.writeFileSync(path.join(distDir, targetName), buffer);
                    }
                    console.log(`[Upload] Successfully saved ${targetName} (${buffer.length} bytes)`);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                      success: true, 
                      filename: targetName,
                      url: `/${targetName}?t=${Date.now()}`
                    }));
                    return;
                  }
                } catch (err) {
                  console.error('[Upload] Error processing image:', err);
                }
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid image data' }));
              });
            } else {
              res.writeHead(405);
              res.end();
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
