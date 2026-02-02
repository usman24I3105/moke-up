import { z } from "zod";

export const DestinationSchema = z.object({
  destination_name: z.string().min(1, "Destination name is required"),
  nights: z.string().min(1, "Number of nights is required"),
  hotel_name: z.string().min(1, "Hotel name is required"),
  room: z.string().min(1, "Room type is required"),
  meal_plan: z.string().min(1, "Meal plan is required"),
  is_extra_bed: z.boolean().default(false),
});

export const TransportationSchema = z.object({
  day: z.string().min(1, "Day is required"),
  date: z.string().min(1, "Date is required"),
  route: z.string().min(1, "Route is required"),
  vehicle_type: z.string().min(1, "Vehicle type is required"),
});

export const DayItinerarySchema = z.object({
  day_number: z.string().min(1, "Day number is required"),
  day_date: z.string().min(1, "Date is required"),
  destination: z.string().min(1, "Destination is required"),
  activity_description: z.string().min(1, "Activity description is required"),
});

export const ItineraryFormSchema = z.object({
  // Brand Info
  brand_name: z.string().min(1, "Brand name is required"),
  brand_description: z.string().min(1, "Brand description is required"),
  website: z.string().url("Must be a valid URL"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Must be a valid email"),
  
  // Guest/Client Info
  guest_name: z.string().min(1, "Guest name is required"),
  client_name: z.string().min(1, "Client name is required"),
  
  // Trip Summary
  trip_id: z.string().min(1, "Trip ID is required"),
  start_date: z.string().min(1, "Start date is required"),
  b_night_a_days: z.string().min(1, "Duration is required (e.g., '6 Night 7 Days')"),
  currency: z.string().min(1, "Currency is required"),
  total_amt: z.string().min(1, "Total amount is required"),
  pax: z.string().min(1, "Number of passengers is required"),
  
  // Destinations & Hotels
  destinations: z.array(DestinationSchema).min(1, "At least one destination is required"),
  
  // Transportation
  transportation: z.array(TransportationSchema).min(1, "At least one transportation entry is required"),
  
  // Day-wise Itinerary
  day_itinerary: z.array(DayItinerarySchema).min(1, "At least one day itinerary is required"),
  
  // Inclusions/Exclusions
  inclusions: z.string().min(1, "Inclusions are required"),
  exclusions: z.string().min(1, "Exclusions are required"),
  
  // Terms & Conditions
  terms_conditions: z.string().min(1, "Terms and conditions are required"),
  cancellation_policy: z.string().min(1, "Cancellation policy is required"),
  additional_expenses: z.string().min(1, "Additional expenses information is required"),
  
  // Must Haves / Roles
  must_haves: z.string().min(1, "Must haves are required"),
  roles_responsibility: z.string().min(1, "Roles and responsibilities are required"),
  
  // Payment Details
  payment_details: z.string().min(1, "Payment details are required"),
});

export type ItineraryFormData = z.infer<typeof ItineraryFormSchema>;
export type Destination = z.infer<typeof DestinationSchema>;
export type Transportation = z.infer<typeof TransportationSchema>;
export type DayItinerary = z.infer<typeof DayItinerarySchema>;

