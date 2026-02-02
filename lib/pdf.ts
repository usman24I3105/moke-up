import { ItineraryFormData } from "./types";

// Simple template engine to replace {{variable}} with values
export function renderTemplate(template: string, data: ItineraryFormData): string {
  let rendered = template;

  // Replace simple variables
  const simpleVars = [
    "brand_name",
    "brand_description",
    "website",
    "phone",
    "email",
    "guest_name",
    "client_name",
    "trip_id",
    "start_date",
    "b_night_a_days",
    "currency",
    "total_amt",
    "pax",
    "inclusions",
    "exclusions",
    "terms_conditions",
    "cancellation_policy",
    "additional_expenses",
    "must_haves",
    "roles_responsibility",
    "payment_details",
  ];

  simpleVars.forEach((varName) => {
    const regex = new RegExp(`{{${varName}}}`, "g");
    rendered = rendered.replace(regex, (data as any)[varName] || "");
  });

  // Add first destination for cover page
  const firstDestination = data.destinations[0]?.destination_name || "";
  rendered = rendered.replace(/{{first_destination}}/g, firstDestination);

  // Handle destinations array ({{#each destinations}})
  const destinationsMatch = rendered.match(/{{#each destinations}}([\s\S]*?){{\/each}}/);
  if (destinationsMatch) {
    const destinationTemplate = destinationsMatch[1];
    let destinationsHtml = "";

    data.destinations.forEach((dest) => {
      let destHtml = destinationTemplate;
      destHtml = destHtml.replace(/{{destination_name}}/g, dest.destination_name);
      destHtml = destHtml.replace(/{{nights}}/g, dest.nights);
      destHtml = destHtml.replace(/{{hotel_name}}/g, dest.hotel_name);
      destHtml = destHtml.replace(/{{room}}/g, dest.room);
      destHtml = destHtml.replace(/{{meal_plan}}/g, dest.meal_plan);
      
      // Handle conditional for extra bed
      if (dest.is_extra_bed) {
        destHtml = destHtml.replace(/{{#if is_extra_bed}}(.*?){{\/if}}/g, "$1");
      } else {
        destHtml = destHtml.replace(/{{#if is_extra_bed}}(.*?){{\/if}}/g, "");
      }

      destinationsHtml += destHtml;
    });

    rendered = rendered.replace(destinationsMatch[0], destinationsHtml);
  }

  // Handle transportation array ({{#each transportation}})
  const transportMatch = rendered.match(/{{#each transportation}}([\s\S]*?){{\/each}}/);
  if (transportMatch) {
    const transportTemplate = transportMatch[1];
    let transportHtml = "";

    data.transportation.forEach((trans) => {
      let transHtml = transportTemplate;
      transHtml = transHtml.replace(/{{day}}/g, trans.day);
      transHtml = transHtml.replace(/{{date}}/g, trans.date);
      transHtml = transHtml.replace(/{{route}}/g, trans.route);
      transHtml = transHtml.replace(/{{vehicle_type}}/g, trans.vehicle_type);
      transportHtml += transHtml;
    });

    rendered = rendered.replace(transportMatch[0], transportHtml);
  }

  // Handle day_itinerary array ({{#each day_itinerary}})
  const dayMatch = rendered.match(/{{#each day_itinerary}}([\s\S]*?){{\/each}}/);
  if (dayMatch) {
    const dayTemplate = dayMatch[1];
    let daysHtml = "";

    data.day_itinerary.forEach((day) => {
      let dayHtml = dayTemplate;
      dayHtml = dayHtml.replace(/{{day_number}}/g, day.day_number);
      dayHtml = dayHtml.replace(/{{day_date}}/g, day.day_date);
      dayHtml = dayHtml.replace(/{{destination}}/g, day.destination);
      dayHtml = dayHtml.replace(/{{activity_description}}/g, day.activity_description);
      
      // Handle parent context variables ({{../variable}})
      dayHtml = dayHtml.replace(/{{\.\.\/b_night_a_days}}/g, data.b_night_a_days);
      dayHtml = dayHtml.replace(/{{\.\.\/brand_name}}/g, data.brand_name);
      dayHtml = dayHtml.replace(/{{\.\.\/phone}}/g, data.phone);
      dayHtml = dayHtml.replace(/{{\.\.\/email}}/g, data.email);
      dayHtml = dayHtml.replace(/{{\.\.\/website}}/g, data.website);
      
      daysHtml += dayHtml;
    });

    rendered = rendered.replace(dayMatch[0], daysHtml);
  }

  return rendered;
}

