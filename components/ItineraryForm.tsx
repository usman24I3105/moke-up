"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ItineraryFormSchema, type ItineraryFormData } from "@/lib/types";

export default function ItineraryForm() {
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ItineraryFormData>({
    resolver: zodResolver(ItineraryFormSchema),
    defaultValues: {
      destinations: [{ destination_name: "", nights: "", hotel_name: "", room: "", meal_plan: "", is_extra_bed: false }],
      transportation: [{ day: "", date: "", route: "", vehicle_type: "" }],
      day_itinerary: [{ day_number: "", day_date: "", destination: "", activity_description: "" }],
    },
  });

  const { fields: destinationFields, append: appendDestination, remove: removeDestination } = useFieldArray({
    control,
    name: "destinations",
  });

  const { fields: transportFields, append: appendTransport, remove: removeTransport } = useFieldArray({
    control,
    name: "transportation",
  });

  const { fields: dayFields, append: appendDay, remove: removeDay } = useFieldArray({
    control,
    name: "day_itinerary",
  });

  const onSubmit = async (data: ItineraryFormData) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `travel-itinerary-${data.client_name.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-6xl mx-auto p-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold">Travel Itinerary Generator</h1>
        <p className="text-muted-foreground">Create professional travel itineraries in seconds</p>
      </div>

      {/* Brand Information */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Information</CardTitle>
          <CardDescription>Your travel agency details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand_name">Brand Name *</Label>
              <Input {...register("brand_name")} placeholder="Your Travel Agency" />
              {errors.brand_name && <p className="text-sm text-red-500 mt-1">{errors.brand_name.message}</p>}
            </div>
            <div>
              <Label htmlFor="website">Website *</Label>
              <Input {...register("website")} placeholder="https://example.com" />
              {errors.website && <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input {...register("phone")} placeholder="+1 234 567 8900" />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input {...register("email")} type="email" placeholder="contact@example.com" />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="brand_description">Brand Description *</Label>
            <Textarea {...register("brand_description")} placeholder="Your brand's unique value proposition..." rows={3} />
            {errors.brand_description && <p className="text-sm text-red-500 mt-1">{errors.brand_description.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Guest & Client Information */}
      <Card>
        <CardHeader>
          <CardTitle>Guest & Client Information</CardTitle>
          <CardDescription>Traveler details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guest_name">Guest Name *</Label>
              <Input {...register("guest_name")} placeholder="John Doe" />
              {errors.guest_name && <p className="text-sm text-red-500 mt-1">{errors.guest_name.message}</p>}
            </div>
            <div>
              <Label htmlFor="client_name">Client Name *</Label>
              <Input {...register("client_name")} placeholder="Mr. & Mrs. Doe" />
              {errors.client_name && <p className="text-sm text-red-500 mt-1">{errors.client_name.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trip Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Trip Summary</CardTitle>
          <CardDescription>Basic trip information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="trip_id">Trip ID *</Label>
              <Input {...register("trip_id")} placeholder="TRP-2026-001" />
              {errors.trip_id && <p className="text-sm text-red-500 mt-1">{errors.trip_id.message}</p>}
            </div>
            <div>
              <Label htmlFor="start_date">Start Date *</Label>
              <Input {...register("start_date")} placeholder="15 Mar 2026" />
              {errors.start_date && <p className="text-sm text-red-500 mt-1">{errors.start_date.message}</p>}
            </div>
            <div>
              <Label htmlFor="b_night_a_days">Duration *</Label>
              <Input {...register("b_night_a_days")} placeholder="6 Night 7 Days" />
              {errors.b_night_a_days && <p className="text-sm text-red-500 mt-1">{errors.b_night_a_days.message}</p>}
            </div>
            <div>
              <Label htmlFor="currency">Currency *</Label>
              <Input {...register("currency")} placeholder="USD" />
              {errors.currency && <p className="text-sm text-red-500 mt-1">{errors.currency.message}</p>}
            </div>
            <div>
              <Label htmlFor="total_amt">Total Amount *</Label>
              <Input {...register("total_amt")} placeholder="5,500" />
              {errors.total_amt && <p className="text-sm text-red-500 mt-1">{errors.total_amt.message}</p>}
            </div>
            <div>
              <Label htmlFor="pax">Number of Passengers *</Label>
              <Input {...register("pax")} placeholder="2" />
              {errors.pax && <p className="text-sm text-red-500 mt-1">{errors.pax.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destinations & Hotels */}
      <Card>
        <CardHeader>
          <CardTitle>Destinations & Accommodations</CardTitle>
          <CardDescription>Add all destinations and hotel stays</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {destinationFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4 relative">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Destination {index + 1}</h4>
                {destinationFields.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeDestination(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Destination Name *</Label>
                  <Input {...register(`destinations.${index}.destination_name`)} placeholder="Paris" />
                  {errors.destinations?.[index]?.destination_name && (
                    <p className="text-sm text-red-500 mt-1">{errors.destinations[index]?.destination_name?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Number of Nights *</Label>
                  <Input {...register(`destinations.${index}.nights`)} placeholder="3" />
                  {errors.destinations?.[index]?.nights && (
                    <p className="text-sm text-red-500 mt-1">{errors.destinations[index]?.nights?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Hotel Name *</Label>
                  <Input {...register(`destinations.${index}.hotel_name`)} placeholder="Grand Hotel" />
                  {errors.destinations?.[index]?.hotel_name && (
                    <p className="text-sm text-red-500 mt-1">{errors.destinations[index]?.hotel_name?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Room Type *</Label>
                  <Input {...register(`destinations.${index}.room`)} placeholder="Deluxe Double" />
                  {errors.destinations?.[index]?.room && (
                    <p className="text-sm text-red-500 mt-1">{errors.destinations[index]?.room?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Meal Plan *</Label>
                  <Input {...register(`destinations.${index}.meal_plan`)} placeholder="Breakfast Included" />
                  {errors.destinations?.[index]?.meal_plan && (
                    <p className="text-sm text-red-500 mt-1">{errors.destinations[index]?.meal_plan?.message}</p>
                  )}
                </div>
                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <Checkbox {...register(`destinations.${index}.is_extra_bed`)} />
                    <span className="text-sm">Extra Bed</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendDestination({ destination_name: "", nights: "", hotel_name: "", room: "", meal_plan: "", is_extra_bed: false })}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Destination
          </Button>
        </CardContent>
      </Card>

      {/* Transportation */}
      <Card>
        <CardHeader>
          <CardTitle>Transportation Schedule</CardTitle>
          <CardDescription>Daily transportation details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {transportFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Transport {index + 1}</h4>
                {transportFields.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeTransport(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Day *</Label>
                  <Input {...register(`transportation.${index}.day`)} placeholder="1st Day" />
                  {errors.transportation?.[index]?.day && (
                    <p className="text-sm text-red-500 mt-1">{errors.transportation[index]?.day?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Date *</Label>
                  <Input {...register(`transportation.${index}.date`)} placeholder="Sun, 15 Mar" />
                  {errors.transportation?.[index]?.date && (
                    <p className="text-sm text-red-500 mt-1">{errors.transportation[index]?.date?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Route/Service *</Label>
                  <Input {...register(`transportation.${index}.route`)} placeholder="Paris - Arrival" />
                  {errors.transportation?.[index]?.route && (
                    <p className="text-sm text-red-500 mt-1">{errors.transportation[index]?.route?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Vehicle Type *</Label>
                  <Input {...register(`transportation.${index}.vehicle_type`)} placeholder="Private Car" />
                  {errors.transportation?.[index]?.vehicle_type && (
                    <p className="text-sm text-red-500 mt-1">{errors.transportation[index]?.vehicle_type?.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendTransport({ day: "", date: "", route: "", vehicle_type: "" })}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Transportation
          </Button>
        </CardContent>
      </Card>

      {/* Day-wise Itinerary */}
      <Card>
        <CardHeader>
          <CardTitle>Day-wise Itinerary</CardTitle>
          <CardDescription>Detailed daily activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {dayFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Day {index + 1}</h4>
                {dayFields.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeDay(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Day Number *</Label>
                  <Input {...register(`day_itinerary.${index}.day_number`)} placeholder="1st Day" />
                  {errors.day_itinerary?.[index]?.day_number && (
                    <p className="text-sm text-red-500 mt-1">{errors.day_itinerary[index]?.day_number?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Date *</Label>
                  <Input {...register(`day_itinerary.${index}.day_date`)} placeholder="Sun, 15 Mar" />
                  {errors.day_itinerary?.[index]?.day_date && (
                    <p className="text-sm text-red-500 mt-1">{errors.day_itinerary[index]?.day_date?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Destination *</Label>
                  <Input {...register(`day_itinerary.${index}.destination`)} placeholder="Paris" />
                  {errors.day_itinerary?.[index]?.destination && (
                    <p className="text-sm text-red-500 mt-1">{errors.day_itinerary[index]?.destination?.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label>Activity Description *</Label>
                <Textarea {...register(`day_itinerary.${index}.activity_description`)} placeholder="Arrival at Paris Charles de Gaulle Airport. Transfer to hotel. Evening free for leisure." rows={4} />
                {errors.day_itinerary?.[index]?.activity_description && (
                  <p className="text-sm text-red-500 mt-1">{errors.day_itinerary[index]?.activity_description?.message}</p>
                )}
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendDay({ day_number: "", day_date: "", destination: "", activity_description: "" })}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Day
          </Button>
        </CardContent>
      </Card>

      {/* Inclusions & Exclusions */}
      <Card>
        <CardHeader>
          <CardTitle>Inclusions & Exclusions</CardTitle>
          <CardDescription>What's included and excluded in the package</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="inclusions">Inclusions *</Label>
            <Textarea {...register("inclusions")} placeholder="• Accommodation as mentioned&#10;• Daily breakfast&#10;• Private transfers" rows={6} />
            {errors.inclusions && <p className="text-sm text-red-500 mt-1">{errors.inclusions.message}</p>}
          </div>
          <div>
            <Label htmlFor="exclusions">Exclusions *</Label>
            <Textarea {...register("exclusions")} placeholder="• International flights&#10;• Travel insurance&#10;• Personal expenses" rows={6} />
            {errors.exclusions && <p className="text-sm text-red-500 mt-1">{errors.exclusions.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
          <CardDescription>Policies and additional information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="terms_conditions">Terms & Conditions *</Label>
            <Textarea {...register("terms_conditions")} placeholder="Full payment required 30 days before departure..." rows={5} />
            {errors.terms_conditions && <p className="text-sm text-red-500 mt-1">{errors.terms_conditions.message}</p>}
          </div>
          <div>
            <Label htmlFor="cancellation_policy">Cancellation Policy *</Label>
            <Textarea {...register("cancellation_policy")} placeholder="Cancellation charges apply as per policy..." rows={5} />
            {errors.cancellation_policy && <p className="text-sm text-red-500 mt-1">{errors.cancellation_policy.message}</p>}
          </div>
          <div>
            <Label htmlFor="additional_expenses">Additional Expenses (Indicative) *</Label>
            <Textarea {...register("additional_expenses")} placeholder="Entry fees, optional activities..." rows={5} />
            {errors.additional_expenses && <p className="text-sm text-red-500 mt-1">{errors.additional_expenses.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Must Haves & Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Must Haves & Responsibilities</CardTitle>
          <CardDescription>Essential items and traveler responsibilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="must_haves">Must Haves *</Label>
            <Textarea {...register("must_haves")} placeholder="• Valid passport&#10;• Travel insurance&#10;• Comfortable walking shoes" rows={5} />
            {errors.must_haves && <p className="text-sm text-red-500 mt-1">{errors.must_haves.message}</p>}
          </div>
          <div>
            <Label htmlFor="roles_responsibility">Your Roles & Responsibilities *</Label>
            <Textarea {...register("roles_responsibility")} placeholder="Travelers are responsible for..." rows={5} />
            {errors.roles_responsibility && <p className="text-sm text-red-500 mt-1">{errors.roles_responsibility.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Payment information and instructions</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="payment_details">Payment Details *</Label>
            <Textarea {...register("payment_details")} placeholder="Bank details, payment methods, installment options..." rows={5} />
            {errors.payment_details && <p className="text-sm text-red-500 mt-1">{errors.payment_details.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex justify-center pt-6">
        <Button type="submit" size="lg" disabled={isGenerating} className="min-w-[200px]">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <FileDown className="mr-2 h-5 w-5" />
              Generate PDF
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

