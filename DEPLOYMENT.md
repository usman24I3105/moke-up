# Deployment Guide

## Deploying to Vercel

This application is optimized for Vercel deployment with zero configuration.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Configuration**
   - No environment variables needed
   - No build configuration changes needed
   - Default settings work perfectly

### What Happens on Vercel

- **Automatic Optimization**: Next.js is automatically optimized
- **Serverless Functions**: The PDF generation API runs as a serverless function
- **Edge Network**: Static assets are served via Vercel's global CDN
- **Chromium Support**: @sparticuz/chromium is automatically configured

### Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Performance Notes

- PDF generation typically takes 3-5 seconds
- Function timeout is set to 30 seconds (via vercel.json)
- Cold starts may add 1-2 seconds on first request
- Subsequent requests are faster due to function warming

### Monitoring

Access logs and analytics in your Vercel dashboard:
- **Analytics**: Traffic and performance metrics
- **Logs**: Real-time function logs
- **Speed Insights**: Core Web Vitals tracking

### Troubleshooting

**PDF Generation Fails**
- Check Vercel function logs
- Ensure function timeout is set correctly in vercel.json
- Verify @sparticuz/chromium is in dependencies

**Build Errors**
- Run `npm run build` locally first
- Fix any TypeScript errors
- Ensure all dependencies are in package.json

**Slow Performance**
- Consider upgrading Vercel plan for better function performance
- Optimize HTML template size
- Reduce image sizes if added

## Alternative Deployments

### Railway

1. Push code to GitHub
2. Create new project on Railway
3. Connect GitHub repository
4. Deploy automatically

### Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set build command: `npm run build`
5. Set start command: `npm start`

### Docker (Self-hosted)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t travel-itinerary-generator .
docker run -p 3000:3000 travel-itinerary-generator
```

## Environment Considerations

### Development
- Chrome/Chromium required locally
- Hot reload enabled
- Error details displayed

### Production
- Uses @sparticuz/chromium (lighter, optimized for serverless)
- Error messages sanitized
- Performance optimized

## Post-Deployment Checklist

- [ ] Test PDF generation with sample data
- [ ] Verify all form fields work correctly
- [ ] Check PDF styling and layout
- [ ] Test on mobile devices
- [ ] Monitor initial performance
- [ ] Set up error tracking (optional)
- [ ] Configure custom domain (optional)

## Cost Estimates

**Vercel Hobby Plan (Free)**
- 100 GB bandwidth/month
- Unlimited projects
- Sufficient for most small agencies

**Vercel Pro Plan ($20/month)**
- 1 TB bandwidth/month
- Better function performance
- Team collaboration features

For high-volume usage (1000+ PDFs/day), consider Pro plan or self-hosting.

