# Travel Itinerary Generator

A professional travel itinerary generator built with Next.js that creates print-ready PDF documents. Inspired by Sembark's design, this tool allows travel agencies to quickly generate beautiful, structured itineraries for their clients.

## Features

- ✨ Professional, print-ready PDF generation
- 📝 Comprehensive form with validation
- 🎨 Beautiful, modern UI with Tailwind CSS + shadcn/ui
- 🚀 Serverless deployment on Vercel
- 📱 Fully responsive design
- 🔄 Real-time form validation with Zod
- 📄 PDF structure matching professional travel documents

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **PDF Generation**: Puppeteer Core + @sparticuz/chromium
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd travel-itinerary-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Fill in Brand Information**: Add your travel agency details
2. **Enter Guest & Client Information**: Provide traveler details
3. **Add Trip Summary**: Include trip ID, dates, and pricing
4. **Add Destinations**: Use the "Add Destination" button to add multiple stays
5. **Add Transportation**: Document each day's transportation
6. **Create Day-wise Itinerary**: Detail activities for each day
7. **Complete Additional Sections**: Add inclusions, exclusions, terms, etc.
8. **Generate PDF**: Click "Generate PDF" to download the itinerary

## PDF Template Structure

The generated PDF includes the following sections in order:

1. **Cover Page**: Brand info, trip summary, and pricing
2. **Accommodations**: Hotel details for each destination
3. **Transportation**: Daily transportation schedule
4. **Day-wise Itinerary**: Detailed daily activities
5. **Inclusions/Exclusions**: What's included and excluded
6. **Terms & Conditions**: Policies and additional information
7. **Must Haves & Responsibilities**: Essential items and traveler duties
8. **Thank You Page**: Contact information

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy (no environment variables needed)

The app is optimized for Vercel's serverless functions and uses @sparticuz/chromium for PDF generation in production.

## Project Structure

```
travel-itinerary-generator/
├── app/
│   ├── api/
│   │   └── generate-pdf/
│   │       └── route.ts          # PDF generation API
│   ├── templates/
│   │   └── itinerary.html        # PDF HTML template
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                   # Main page
├── components/
│   ├── ui/                        # shadcn/ui components
│   └── ItineraryForm.tsx          # Main form component
├── lib/
│   ├── types.ts                   # TypeScript types & Zod schemas
│   ├── pdf.ts                     # Template rendering logic
│   └── utils.ts
└── public/                        # Static assets
```

## Customization

### Modifying the PDF Template

Edit `app/templates/itinerary.html` to customize the PDF layout, styling, and structure.

### Adding Form Fields

1. Update the Zod schema in `lib/types.ts`
2. Add form fields in `components/ItineraryForm.tsx`
3. Update the HTML template to use the new fields

### Styling

The project uses Tailwind CSS. Modify `tailwind.config.ts` for theme changes and `app/globals.css` for global styles.

## Important Notes

- **No Authentication**: This is a stateless tool with no user accounts
- **No Database**: All data is client-side only
- **Privacy**: Form data is never stored, only used for PDF generation
- **Chrome Required (Local Dev)**: For local development, Chrome must be installed

## License

MIT License - feel free to use this for your projects!

## Support

For issues or questions, please open an issue on GitHub.

