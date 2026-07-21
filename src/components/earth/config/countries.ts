export type CountryMarker = {
  id: string;
  name: string;
  shortName: string;
  latitude: number;
  longitude: number;
  services: string[];
  serviceDetails: {
    title: string;
    description: string;
  }[];
  reference: string;
  flag: string;
  timeline: string;
  ipOffice: string;
};

export const countryMarkers: CountryMarker[] = [
  {
    id: "uk",
    name: "United Kingdom",
    shortName: "UK",
    latitude: 55.3781,
    longitude: -3.436,
    services: ["Patent Registration", "Trademark Strategy", "Technology Transfer"],
    serviceDetails: [
      {
        title: "Design Patent (Registered Design)",
        description: "Get an official UK Government Registered Design Certificate for your product.",
      },
    ],
    reference: "uk-patent-trademark-filing",
    flag: "🇬🇧",
    timeline: "6-18 months",
    ipOffice: "UK Intellectual Property Office",
  },
  {
    id: "canada",
    name: "Canada",
    shortName: "CA",
    latitude: 56.1304,
    longitude: -106.3468,
    services: ["Patent Filing", "Industrial Design", "Research Commercialization"],
    serviceDetails: [
      {
        title: "Copyright",
        description: "Secures legal ownership of your original creative works, including books, software, and artistic content.",
      },
    ],
    reference: "canada-ip-commercialization",
    flag: "🇨🇦",
    timeline: "8-20 months",
    ipOffice: "Canadian Intellectual Property Office",
  },
  {
    id: "india",
    name: "India",
    shortName: "IN",
    latitude: 20.5937,
    longitude: 78.9629,
    services: ["Patent Registration", "Trademark Registration", "Copyright"],
    serviceDetails: [
      {
        title: "Design Patent",
        description: "Protects the unique visual appearance and aesthetic features of your product.",
      },
      {
        title: "Utility Patent",
        description: "Protects new and innovative inventions with functional or technical advancements.",
      },
      {
        title: "Copyright",
        description: "Protects original literary, artistic, software, and creative works from unauthorized use.",
      },
    ],
    reference: "india-patent-trademark-copyright",
    flag: "🇮🇳",
    timeline: "6-24 months",
    ipOffice: "Controller General of Patents, Designs & Trade Marks",
  },
  {
    id: "usa",
    name: "United States",
    shortName: "USA",
    latitude: 37.0902,
    longitude: -95.7129,
    services: ["Global Patent Filing", "IP Strategy", "Technology Transfer"],
    serviceDetails: [
      {
        title: "Design Patent",
        description: "Services coming soon.",
      },
    ],
    reference: "us-global-patent-filing",
    flag: "🇺🇸",
    timeline: "8-22 months",
    ipOffice: "United States Patent and Trademark Office",
  },
  {
    id: "south-africa",
    name: "South Africa",
    shortName: "SA",
    latitude: -30.5595,
    longitude: 22.9375,
    services: ["Trademark Filing", "Industrial Design", "Commercialization"],
    serviceDetails: [
      {
        title: "Utility Patent",
        description: "Services coming soon.",
      },
      {
        title: "Design Patent",
        description: "Services coming soon.",
      },
    ],
    reference: "south-africa-ip-filing",
    flag: "🇿🇦",
    timeline: "6-18 months",
    ipOffice: "Companies and Intellectual Property Commission",
  },
];
