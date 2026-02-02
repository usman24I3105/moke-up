# Getting Started Guide

## Quick Start (3 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Next.js & React
- TypeScript
- Tailwind CSS & shadcn/ui components
- React Hook Form & Zod validation
- Puppeteer Core & Chromium (for PDF generation)

### Step 2: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Test the Application

Fill in the form with sample data or use the test data below.

## Sample Test Data

Use this data to quickly test the PDF generation:

### Brand Information
- **Brand Name**: Paradise Travel Co.
- **Website**: https://paradisetravelco.com
- **Phone**: +1 (555) 123-4567
- **Email**: hello@paradisetravelco.com
- **Brand Description**: Your trusted partner for unforgettable journeys around the world. We specialize in creating personalized travel experiences that exceed expectations.

### Guest & Client Information
- **Guest Name**: John Smith
- **Client Name**: Mr. & Mrs. Smith

### Trip Summary
- **Trip ID**: TRP-2026-0215
- **Start Date**: 15 March 2026
- **Duration**: 6 Night 7 Days
- **Currency**: USD
- **Total Amount**: 5,500
- **Passengers**: 2

### Destination 1
- **Destination Name**: Paris
- **Nights**: 3
- **Hotel Name**: Hotel Le Marais
- **Room**: Deluxe Double Room
- **Meal Plan**: Breakfast Included
- **Extra Bed**: No

### Destination 2
- **Destination Name**: Nice
- **Nights**: 3
- **Hotel Name**: Promenade Hotel
- **Room**: Sea View Suite
- **Meal Plan**: Half Board (Breakfast & Dinner)
- **Extra Bed**: No

### Transportation Schedule

**Day 1**
- Day: 1st Day
- Date: Sun, 15 Mar
- Route: Paris - Arrival
- Vehicle: Private Transfer

**Day 2-3**
- Day: 2nd-3rd Day
- Date: Mon-Tue, 16-17 Mar
- Route: Paris - City Tours
- Vehicle: Private Car with Driver

**Day 4**
- Day: 4th Day
- Date: Wed, 18 Mar
- Route: Paris to Nice
- Vehicle: High-Speed Train (TGV)

**Day 5-6**
- Day: 5th-6th Day
- Date: Thu-Fri, 19-20 Mar
- Route: Nice - French Riviera Tours
- Vehicle: Private Car with Driver

**Day 7**
- Day: 7th Day
- Date: Sat, 21 Mar
- Route: Nice - Departure
- Vehicle: Private Transfer

### Day-wise Itinerary

**Day 1**
- Day Number: 1st Day
- Date: Sun, 15 Mar
- Destination: Paris - Arrival
- Activities:
```
Arrival at Paris Charles de Gaulle Airport. Our representative will meet you at the airport and transfer you to your hotel. Check-in and rest. Evening free for leisure. You may explore the nearby cafes and restaurants. Overnight stay in Paris.
```

**Day 2**
- Day Number: 2nd Day
- Date: Mon, 16 Mar
- Destination: Paris - City Tour
- Activities:
```
After breakfast, enjoy a full-day city tour of Paris. Visit the iconic Eiffel Tower, Arc de Triomphe, Champs-Élysées, and Notre-Dame Cathedral. Take a scenic cruise on the Seine River. Evening visit to the illuminated Eiffel Tower. Return to hotel. Overnight stay in Paris.
```

**Day 3**
- Day Number: 3rd Day
- Date: Tue, 17 Mar
- Destination: Paris - Louvre & Versailles
- Activities:
```
Morning visit to the world-famous Louvre Museum. See the Mona Lisa, Venus de Milo, and thousands of artistic masterpieces. Afternoon excursion to the Palace of Versailles. Explore the magnificent palace, Hall of Mirrors, and stunning gardens. Return to Paris for overnight stay.
```

**Day 4**
- Day Number: 4th Day
- Date: Wed, 18 Mar
- Destination: Paris to Nice
- Activities:
```
After breakfast, check out from hotel. Transfer to Paris train station for high-speed TGV train to Nice. Enjoy the scenic journey through the French countryside. Arrival in Nice, transfer to hotel and check-in. Evening free to explore the Promenade des Anglais. Overnight in Nice.
```

**Day 5**
- Day Number: 5th Day
- Date: Thu, 19 Mar
- Destination: Nice - French Riviera Tour
- Activities:
```
Full-day excursion along the stunning French Riviera. Visit Monaco, Monte Carlo Casino, and the Prince's Palace. Continue to the charming village of Èze with panoramic Mediterranean views. Stop at Villefranche-sur-Mer. Return to Nice for overnight stay.
```

**Day 6**
- Day Number: 6th Day
- Date: Fri, 20 Mar
- Destination: Nice - Cannes & Antibes
- Activities:
```
Day trip to Cannes, walk along La Croisette and see the Palais des Festivals. Visit the old town of Antibes with its charming streets and Picasso Museum. Return to Nice. Evening free for shopping at the Old Town or relaxing at the beach. Overnight in Nice.
```

**Day 7**
- Day Number: 7th Day
- Date: Sat, 21 Mar
- Destination: Nice - Departure
- Activities:
```
After breakfast, check out from hotel. Transfer to Nice Côte d'Azur Airport for your departure flight. Take home wonderful memories of your French adventure.
```

### Inclusions
```
• Accommodation for 6 nights (3 nights in Paris + 3 nights in Nice)
• Daily breakfast as per hotel meal plan
• All transfers and sightseeing by private air-conditioned vehicle
• High-speed train tickets from Paris to Nice
• Professional English-speaking driver
• Seine River cruise in Paris
• All currently applicable taxes
```

### Exclusions
```
• International and domestic airfare
• Travel insurance
• Visa fees and processing
• Entry fees to monuments and museums
• Lunch and dinner (unless specified)
• Tips and gratuities
• Personal expenses (laundry, telephone, shopping, etc.)
• Any services not mentioned in inclusions
• GST 5% extra (if applicable)
```

### Terms & Conditions
```
1. Full payment required 30 days before departure
2. Prices are subject to availability at the time of booking
3. Hotel check-in time is 2:00 PM and check-out time is 11:00 AM
4. Any changes in itinerary due to unavoidable circumstances will be at additional cost
5. We reserve the right to modify the itinerary due to weather or other conditions
6. Passengers are responsible for valid passports and required visas
7. All disputes are subject to jurisdiction of local courts only
```

### Cancellation Policy
```
• 45+ days before departure: 25% of total tour cost
• 30-44 days before departure: 50% of total tour cost
• 15-29 days before departure: 75% of total tour cost
• Less than 15 days: 100% of total tour cost (no refund)
• No refund for any unused services during the tour
• Airline cancellation charges will apply as per airline policy
```

### Additional Expenses (Indicative)
```
• Eiffel Tower Entry: €25-€28 per person
• Louvre Museum: €17 per person
• Versailles Palace: €20 per person
• Monaco & Monte Carlo guided tour: €15 per person
• Meals (lunch/dinner): €20-€50 per person per meal
• Travel insurance: €30-€50 per person
```

### Must Haves
```
• Valid passport with at least 6 months validity
• Schengen visa for France
• Comprehensive travel insurance
• Comfortable walking shoes
• Light jacket (weather can change)
• Universal power adapter (Type C/E)
• Credit card and some Euros cash
• Photocopies of important documents
```

### Roles & Responsibilities
```
Travelers are responsible for:
• Carrying valid travel documents at all times
• Following local laws and regulations
• Being punctual for all scheduled activities
• Respecting cultural norms and local customs
• Taking care of personal belongings
• Following guide/driver instructions
• Informing us of any medical conditions or dietary restrictions
• Maintaining travel insurance throughout the trip
```

### Payment Details
```
Bank Transfer Details:
Bank Name: Paradise Bank
Account Name: Paradise Travel Co.
Account Number: 1234567890
SWIFT Code: PBANKUS33
IBAN: US12 3456 7890 1234 5678 90

Payment Methods Accepted:
• Bank wire transfer
• Credit/Debit card (3% processing fee applies)
• PayPal (available on request)

Payment Schedule:
• 30% advance at time of booking
• 70% balance 30 days before departure

Please send payment confirmation to: payments@paradisetravelco.com
```

## Building for Production

Test the production build locally:

```bash
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000)

## Next Steps

1. ✅ Test PDF generation with sample data
2. ✅ Customize the PDF template styling in `app/templates/itinerary.html`
3. ✅ Modify form fields if needed in `components/ItineraryForm.tsx`
4. ✅ Deploy to Vercel (see DEPLOYMENT.md)
5. ✅ Add your agency logo (replace "LOGO" placeholder in template)

## Troubleshooting

### Chrome Not Found (Local Development)

If you get an error about Chrome not being found:

**Windows**: Install Chrome to default location or update path in `app/api/generate-pdf/route.ts`

**Mac**: Install Chrome to Applications or update the path

**Linux**:
```bash
sudo apt-get update
sudo apt-get install -y chromium-browser
```

### Port Already in Use

If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### Module Not Found Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Need Help?

- Check the [README.md](README.md) for overview
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
- Review the code comments in `app/api/generate-pdf/route.ts`
- Open an issue on GitHub

Happy traveling! ✈️

