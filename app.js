// TruckerSocial Marketplace Master Catalogue & Filter Schema JS Engine

// 1. Data Schema definition for all 12 Categories
const CATEGORIES = [
  {
    id: "01",
    name: "Trucks",
    focus: "Powered commercial vehicles only. Body-type classifications based on cab/configuration.",
    subcategories: ["Day Cab", "Sleeper", "Box Truck", "Dually / Pickup", "Dump Truck", "Car Hauler Truck", "Other Trucks"],
    filters: [
      { name: "condition", label: "Condition", type: "D", options: ["New", "Used", "Rebuilt", "For Parts Only"], highlight: "green" },
      { name: "price", label: "Price Range", type: "R", options: ["Under $25K", "$25K–$50K", "$50K–$100K", "$100K–$150K", "$150K+"] },
      { name: "year", label: "Year", type: "R_SLIDER", min: 2010, max: 2026 },
      { name: "make", label: "Make", type: "D", options: ["Freightliner", "Kenworth", "Peterbilt", "International", "Volvo", "Mack", "Western Star", "Other"] },
      { name: "model", label: "Model", type: "T" },
      { name: "mileage", label: "Mileage Range", type: "R", options: ["Under 250K", "250K–500K", "500K–750K", "750K+"] },
      { name: "engineBrand", label: "Engine Brand", type: "D", options: ["Cummins", "Detroit", "PACCAR", "Volvo", "Maxxforce", "Other"] },
      { name: "transmission", label: "Transmission Type", type: "D", options: ["Manual", "Automatic", "Automated Manual (AMT)"] },
      { 
        name: "sleeperSize", 
        label: "Sleeper Size", 
        type: "D", 
        options: ["Day Cab", "48\"", "60\"", "72\"+"], 
        condition: (state) => state.subcategory === "Sleeper" 
      },
      { name: "axleConfig", label: "Axle Configuration", type: "D", options: ["6x4", "6x2", "4x2"] },
      { name: "gvwRating", label: "GVW Rating", type: "D", options: ["Class 6", "Class 7", "Class 8"] },
      { name: "color", label: "Color", type: "D", options: ["Black", "White", "Red", "Blue", "Silver", "Yellow", "Other"] },
      { name: "titleStatus", label: "Title Status", type: "D", options: ["Clean", "Salvage", "Rebuilt"] },
      { name: "location", label: "Location", type: "Z" },
      { name: "financing", label: "Financing Available", type: "B", highlight: "red" }
    ]
  },
  {
    id: "02",
    name: "Trailers",
    focus: "Non-powered trailer units only. Specialty covers curtainside, belly dump, walking floor, etc.",
    subcategories: ["Dry Van", "Refrigerated (Reefer)", "Flatbed", "Step Deck / Drop Deck", "Lowboy", "Tanker", "Hopper Bottom / Grain", "Auto Hauler / Car Carrier", "Conestoga / Rolling Tarp", "Livestock & Agricultural", "Dump Trailer", "Specialty Trailers"],
    filters: [
      { name: "condition", label: "Condition", type: "D", options: ["New", "Used", "Rebuilt", "For Parts Only"], highlight: "green" },
      { name: "price", label: "Price Range", type: "R", options: ["Under $10K", "$10K–$25K", "$25K–$50K", "$50K–$75K", "$75K+"] },
      { name: "year", label: "Year", type: "R_SLIDER", min: 2010, max: 2026 },
      { name: "make", label: "Make", type: "D", options: ["Wabash", "Great Dane", "Utility", "Hyundai Translead", "Stoughton", "Other"] },
      { name: "length", label: "Length", type: "D", options: ["28'", "48'", "53'", "Other"] },
      { name: "axles", label: "Axle Count", type: "D", options: ["Single", "Tandem", "Tridem"] },
      { 
        name: "liftGate", 
        label: "Lift Gate Included", 
        type: "B", 
        condition: (state) => ["Dry Van", "Refrigerated (Reefer)"].includes(state.subcategory)
      },
      { 
        name: "reeferBrand", 
        label: "Reefer Unit Brand", 
        type: "D", 
        options: ["Thermo King", "Carrier", "Other"],
        condition: (state) => state.subcategory === "Refrigerated (Reefer)"
      },
      { 
        name: "floorType", 
        label: "Floor Type", 
        type: "D", 
        options: ["Wood", "Aluminum", "Steel"],
        condition: (state) => ["Flatbed", "Step Deck / Drop Deck", "Lowboy"].includes(state.subcategory)
      },
      { name: "landingGear", label: "Landing Gear Working", type: "B" },
      { name: "location", label: "Location", type: "Z" },
      { name: "financing", label: "Financing Available", type: "B", highlight: "red" }
    ]
  },
  {
    id: "03",
    name: "Yard & Warehouse Equipment",
    focus: "Non-road equipment used in yards, warehouses, and loading operations. Does not include trucks or trailers.",
    subcategories: ["Forklifts", "Yard Tractors / Spotters", "Pallet Jacks & Dollies", "Loading Dock Equipment", "Conveyors & Material Handling", "Liftgates", "Ramps & Yard Ramps", "Refrigeration Units (Reefer)", "Auxiliary Power Units (APU)", "Heavy & Construction Equipment"],
    filters: [
      { name: "condition", label: "Condition", type: "D", options: ["New", "Used", "Rebuilt", "For Parts Only"], highlight: "green" },
      { name: "price", label: "Price Range", type: "R", options: ["Under $5K", "$5K–$15K", "$15K–$50K", "$50K+"] },
      { name: "eqType", label: "Equipment Type", type: "D", options: ["Forklift", "Yard Spotter", "Pallet Jack", "Dock Equipment", "APU", "Reefer Unit", "Conveyor", "Liftgate", "Ramp", "Heavy Equipment", "Other"] },
      { name: "year", label: "Year", type: "R_SLIDER", min: 2010, max: 2026 },
      { name: "brand", label: "Make / Brand", type: "T" },
      { 
        name: "fuelType", 
        label: "Fuel Type", 
        type: "D", 
        options: ["Electric", "Propane", "Diesel", "Gas"],
        condition: (state) => ["Forklifts", "Yard Tractors / Spotters"].includes(state.subcategory) || ["Forklift", "Yard Spotter"].includes(state.filters.eqType)
      },
      { 
        name: "liftCapacity", 
        label: "Lift Capacity", 
        type: "D", 
        options: ["Under 3K lbs", "3K–6K", "6K–10K", "10K+"],
        condition: (state) => state.subcategory === "Forklifts" || state.filters.eqType === "Forklift"
      },
      { 
        name: "apuBrand", 
        label: "APU Brand", 
        type: "D", 
        options: ["Carrier", "Thermo King", "Rigmaster", "Other"],
        condition: (state) => state.subcategory === "Auxiliary Power Units (APU)" || state.filters.eqType === "APU"
      },
      { name: "hours", label: "Hours of Use", type: "R_SLIDER", min: 0, max: 20000 },
      { name: "location", label: "Location", type: "Z" },
      { name: "financing", label: "Financing Available", type: "B", highlight: "red" }
    ]
  },
  {
    id: "04",
    name: "Parts",
    focus: "Physical replacement parts and components for trucks and trailers. Does not include tools, electronics, or supplies.",
    subcategories: ["Engine & Transmission Parts", "Brakes & Air Systems", "Tires & Wheels", "Fuel Tanks & DEF Equipment", "Suspension & Steering", "Electrical & Lighting", "Exterior Body & Accessories", "Cab & Interior Parts", "Trailer Parts", "Other Parts"],
    filters: [
      { name: "condition", label: "Condition", type: "D", options: ["New", "Used", "Rebuilt", "For Parts Only"], highlight: "green" },
      { name: "price", label: "Price Range", type: "R", options: ["Under $100", "$100–$500", "$500–$2K", "$2K–$5K", "$5K+"] },
      { name: "partCategory", label: "Part Category", type: "D", options: ["Engine & Transmission", "Brakes & Air", "Tires & Wheels", "Fuel & DEF", "Suspension", "Electrical", "Exterior", "Cab & Interior", "Trailer Parts", "Other"] },
      { name: "compatibility", label: "Compatible With", type: "D", options: ["Truck", "Trailer", "Both"] },
      { name: "makes", label: "Make Compatibility", type: "M", options: ["Freightliner", "Kenworth", "Peterbilt", "International", "Volvo", "Mack", "Western Star", "Universal/All", "Other"] },
      { name: "oem", label: "OEM or Aftermarket", type: "D", options: ["OEM", "Aftermarket", "Remanufactured"] },
      { name: "warranty", label: "Warranty Included", type: "B" },
      { name: "location", label: "Location", type: "Z" },
      { name: "financing", label: "Financing Available", type: "B", highlight: "red", labelNote: "(relevant for bulk/fleet parts orders)" }
    ]
  },
  {
    id: "05",
    name: "Electronics & Technology",
    focus: "In-cab and vehicle-mounted electronic devices and hardware only. Software and SaaS go under Tools & Supplies.",
    subcategories: ["ELD & GPS Devices", "Dash Cams & Safety Cameras", "CB Radios & Communication", "Inverters & Power Systems", "Truck Computers & Tablets", "Backup & Sensor Systems", "Fleet Telematics Hardware", "Other Electronics"],
    filters: [
      { name: "condition", label: "Condition", type: "D", options: ["New", "Used", "Rebuilt", "For Parts Only"], highlight: "green" },
      { name: "price", label: "Price Range", type: "R", options: ["Under $100", "$100–$500", "$500–$1K", "$1K+"] },
      { name: "deviceType", label: "Device Type", type: "D", options: ["ELD", "GPS", "Dash Cam", "CB Radio", "Inverter", "Tablet/Computer", "Telematics", "Backup/Sensor", "Other"] },
      { name: "brand", label: "Brand", type: "D", options: ["Garmin", "Rand McNally", "KeepTruckin", "Samsara", "Cobra", "Sony", "Other"] },
      { 
        name: "fmcsa", 
        label: "FMCSA Certified", 
        type: "B", 
        condition: (state) => state.subcategory === "ELD & GPS Devices" || state.filters.deviceType === "ELD"
      },
      { name: "subscription", label: "Subscription Required", type: "B" },
      { name: "warranty", label: "Warranty Included", type: "B" },
      { name: "location", label: "Location", type: "Z" },
      { name: "financing", label: "Financing Available", type: "B", highlight: "red", labelNote: "(telematics & fleet bundles)" }
    ]
  },
  {
    id: "06",
    name: "Services",
    focus: "B2B and professional services offered to carriers, owner-operators, and fleets.",
    subcategories: ["Dispatch Services", "Factoring Companies", "Insurance Agents & Brokers", "Legal Services", "Tax Services / CPA / Accounting", "DOT Compliance & Safety", "FMCSA Registration & Audit", "Permits & Authority Setup", "Fuel Card Programs", "Driver Recruiting Services", "Mobile & Roadside Repair", "Roadside Assistance Plans"],
    filters: [
      { name: "serviceType", label: "Service Type", type: "D", options: ["Dispatch", "Factoring", "Insurance", "Legal", "Tax/CPA", "DOT Compliance", "FMCSA", "Permits", "Fuel Cards", "Driver Recruiting", "Mobile Repair", "Roadside Assistance"] },
      { name: "serviceArea", label: "Service Area", type: "D", options: ["Nationwide", "Regional", "State-Specific"] },
      { 
        name: "states", 
        label: "States Served", 
        type: "M", 
        options: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NJ", "NM", "NY", "NC", "OH", "OK", "OR", "PA", "SC", "TN", "TX", "UT", "VA", "WA", "WI"],
        condition: (state) => ["Regional", "State-Specific"].includes(state.filters.serviceArea)
      },
      { name: "businessType", label: "Business Type", type: "D", options: ["Individual / Sole Proprietor", "Company"] },
      { name: "yearsInBusiness", label: "Years in Business", type: "D", options: ["Under 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"] },
      { 
        name: "acceptsNewAuth", 
        label: "Accepts New Authorities", 
        type: "B",
        condition: (state) => ["Factoring Companies", "Insurance Agents & Brokers"].includes(state.subcategory) || ["Factoring", "Insurance"].includes(state.filters.serviceType)
      },
      { name: "freeConsult", label: "Free Consultation", type: "B" },
      { name: "rating", label: "Minimum Star Rating", type: "D", options: ["2+ stars", "3+ stars", "4+ stars", "4.5+ stars"] }
    ]
  },
  {
    id: "07",
    name: "Freight & Loads",
    focus: "Load postings only. TruckerSocial is not a load board — these are community posted freight opportunities.",
    subcategories: ["Spot Loads", "Dedicated Lanes", "Contract Freight", "Team Freight", "LTL / Partial Loads", "Hazmat Freight"],
    filters: [
      { name: "loadType", label: "Load Type", type: "D", options: ["Spot", "Dedicated", "Contract", "Team", "LTL/Partial", "Hazmat"] },
      { name: "origin", label: "Origin State", type: "D", options: ["TX", "CA", "FL", "IL", "GA", "OH", "PA", "NY", "NC", "MI"] },
      { name: "destination", label: "Destination State", type: "D", options: ["TX", "CA", "FL", "IL", "GA", "OH", "PA", "NY", "NC", "MI"] },
      { name: "equipment", label: "Equipment Needed", type: "D", options: ["Dry Van", "Reefer", "Flatbed", "Step Deck", "Tanker", "Other"] },
      { name: "tripLength", label: "Miles (Trip Length)", type: "R", options: ["Under 100", "100–300", "300–500", "500–1000", "1000+"] },
      { name: "ratePerMile", label: "Rate Per Mile", type: "R", options: ["Under $1.50", "$1.50–$2.50", "$2.50–$3.50", "$3.50+"] },
      { name: "totalValue", label: "Total Load Value", type: "R", options: ["Under $500", "$500–$1K", "$1K–$2.5K", "$2.5K+"] },
      { name: "weight", label: "Weight", type: "R", options: ["Under 10K lbs", "10K–30K", "30K–45K", "45K+"] },
      { name: "hazmat", label: "Hazmat Load", type: "B" },
      { name: "teamRequired", label: "Team Required", type: "B" },
      { name: "postedWithin", label: "Posted Within", type: "D", options: ["Last 24 hours", "Last 3 days", "Last 7 days"] }
    ]
  },
  {
    id: "08",
    name: "Real Estate & Parking",
    focus: "Commercial real estate and parking relevant to trucking operations.",
    subcategories: ["Truck Parking for Rent", "Drop Yards & Terminals", "Warehouses for Lease or Sale", "Commercial Garages & Shops", "Land & Lot Sales", "Owner-Operator Housing"],
    filters: [
      { name: "listingType", label: "Listing Type", type: "D", options: ["Parking", "Drop Yard", "Warehouse", "Garage/Shop", "Land", "Housing"] },
      { name: "transactionType", label: "Transaction Type", type: "D", options: ["For Rent", "For Sale", "For Lease"] },
      { 
        name: "priceRate", 
        label: "Price / Rate", 
        type: "R", 
        options: ["Varies by Transaction Type"],
        dynamicOptions: (state) => {
          const trans = state.filters.transactionType || "For Rent";
          if (trans === "For Sale") return ["Under $100K", "$100K–$300K", "$300K–$1M", "$1M+"];
          if (trans === "For Lease") return ["Under $1K/mo", "$1K–$3K/mo", "$3K–$10K/mo", "$10K+/mo"];
          return ["Under $150/mo", "$150–$300/mo", "$300–$600/mo", "$600+/mo"]; // For Rent
        }
      },
      { name: "state", label: "State", type: "D", options: ["TX", "CA", "FL", "IL", "GA", "OH", "PA", "NY", "NC", "MI"] },
      { name: "locationRadius", label: "City / Zip Radius", type: "Z_RADIUS_ONLY", options: ["10 mi", "25 mi", "50 mi", "100 mi"] },
      { name: "sqFt", label: "Square Footage / Lot Size", type: "R", options: ["Under 1K sq ft", "1K–5K sq ft", "5K–20K sq ft", "20K+ sq ft"] },
      { name: "securityFeatures", label: "Security Features", type: "M", options: ["Fenced", "Gated", "Lit", "Security Cameras", "Guard"] },
      { 
        name: "spaces", 
        label: "Number of Spaces / Spots", 
        type: "R", 
        options: ["1-5 spots", "6-20 spots", "21-50 spots", "50+ spots"],
        condition: (state) => ["Truck Parking for Rent", "Drop Yards & Terminals"].includes(state.subcategory) || ["Parking", "Drop Yard"].includes(state.filters.listingType)
      },
      { 
        name: "utilities", 
        label: "Utilities Included", 
        type: "B",
        condition: (state) => ["Owner-Operator Housing", "Warehouses for Lease or Sale"].includes(state.subcategory) || ["Housing", "Warehouse"].includes(state.filters.listingType)
      },
      { name: "availableDate", label: "Available Date", type: "D", options: ["Immediately", "Within 30 days", "Within 60 days", "Future date"] },
      { 
        name: "financing", 
        label: "Financing Available", 
        type: "B", 
        highlight: "red",
        condition: (state) => state.filters.transactionType === "For Sale"
      }
    ]
  },
  {
    id: "09",
    name: "Tools & Supplies",
    focus: "Physical tools, supplies, and software/SaaS products. Software subcategories are clearly separated from physical goods.",
    subcategories: ["Load Securement & Straps", "Maintenance & Repair Tools", "Cleaning Supplies", "PPE & Safety Gear", "Freight Scales & Measuring", "TMS & Dispatch Software", "Fleet Management Software", "Other Tools & Supplies"],
    filters: [
      { 
        name: "condition", 
        label: "Condition", 
        type: "D", 
        options: ["New", "Used", "Rebuilt", "For Parts Only"], 
        highlight: "green",
        condition: (state) => state.filters.physOrDig !== "Software / SaaS"
      },
      { name: "price", label: "Price Range", type: "R", options: ["Under $50", "$50–$200", "$200–$500", "$500+"] },
      { name: "itemType", label: "Item Type", type: "D", options: ["Load Securement", "Maintenance Tools", "Cleaning", "PPE", "Scales", "TMS Software", "Fleet Software", "Other"] },
      { name: "physOrDig", label: "Physical or Digital", type: "D", options: ["Physical Product", "Software / SaaS"] },
      { name: "brand", label: "Brand", type: "T" },
      { 
        name: "subscription", 
        label: "Subscription Required", 
        type: "B",
        condition: (state) => state.filters.physOrDig === "Software / SaaS" || ["TMS & Dispatch Software", "Fleet Management Software"].includes(state.subcategory)
      },
      { 
        name: "fleetSize", 
        label: "Compatible Fleet Size", 
        type: "D", 
        options: ["Owner-Operator (1–2 trucks)", "Small Fleet (3–10)", "Mid-Size (11–50)", "Large (50+)"],
        condition: (state) => state.filters.physOrDig === "Software / SaaS" || ["TMS & Dispatch Software", "Fleet Management Software"].includes(state.subcategory)
      },
      { 
        name: "location", 
        type: "Z",
        condition: (state) => state.filters.physOrDig !== "Software / SaaS"
      },
      { name: "financing", label: "Financing Available", type: "B", highlight: "red" }
    ]
  },
  {
    id: "10",
    name: "Rental & Leasing",
    focus: "Short-term and long-term rental and leasing offers. Does not overlap with For Sale listings in other categories.",
    subcategories: ["Truck Rentals", "Trailer Rentals", "Equipment Rentals", "Lease-to-Own Programs", "Owner-Operator Lease Programs"],
    filters: [
      { name: "condition", label: "Condition", type: "D", options: ["New", "Used", "Rebuilt", "For Parts Only"], highlight: "green" },
      { name: "rentalType", label: "Rental Type", type: "D", options: ["Truck", "Trailer", "Equipment", "Lease-to-Own", "Owner-Op Lease"] },
      { 
        name: "rate", 
        label: "Lease Rate", 
        type: "R",
        options: ["Select Rate Period First"],
        dynamicOptions: (state) => {
          const period = state.filters.ratePeriod || "Monthly";
          if (period === "Daily") return ["Under $100/day", "$100–$250/day", "$250–$500/day", "$500+/day"];
          if (period === "Weekly") return ["Under $500/wk", "$500–$1.2K/wk", "$1.2K–$2.5K/wk", "$2.5K+/wk"];
          return ["Under $1.5K/mo", "$1.5K–$3K/mo", "$3K–$5K/mo", "$5K+/mo"]; // Monthly
        }
      },
      { name: "ratePeriod", label: "Rate Period", type: "D", options: ["Daily", "Weekly", "Monthly"] },
      { name: "year", label: "Year", type: "R_SLIDER", min: 2010, max: 2026 },
      { name: "make", label: "Make", type: "D", options: ["Freightliner", "Peterbilt", "Kenworth", "Utility", "Great Dane", "Other"] },
      { name: "mileage", label: "Mileage / Hours Range", type: "R", options: ["Under 100K", "100K–300K", "300K–600K", "600K+"] },
      { name: "leaseTerm", label: "Lease Term Length", type: "D", options: ["Month-to-month", "6 months", "12 months", "24 months", "36+ months"] },
      { 
        name: "purchaseOption", 
        label: "Purchase Option at End", 
        type: "B",
        condition: (state) => state.subcategory === "Lease-to-Own Programs" || state.filters.rentalType === "Lease-to-Own"
      },
      { name: "cdlRequired", label: "CDL Required", type: "B" },
      { name: "location", label: "Location", type: "Z" },
      { name: "financing", label: "Financing Available", type: "B", highlight: "red", labelNote: "(lease-to-own packages)" }
    ]
  },
  {
    id: "11",
    name: "Business for Sale & Partnerships",
    focus: "Business transactions, equity deals, and strategic partnerships in the trucking and logistics space.",
    subcategories: ["Turnkey Trucking Companies", "Single Truck Authority for Sale", "Route Contracts", "Brokerage Firms", "Partnership Opportunities", "Mergers & Acquisitions"],
    filters: [
      { name: "bizListingType", label: "Listing Type", type: "D", options: ["Turnkey Company", "Single Authority", "Route Contract", "Brokerage", "Partnership", "M&A"] },
      { name: "askingPrice", label: "Asking Price", type: "R", options: ["Under $50K", "$50K–$150K", "$150K–$500K", "$500K+"] },
      { name: "revenue", label: "Annual Revenue", type: "R", options: ["Under $100K", "$100K–$500K", "$500K–$2M", "$2M+"] },
      { name: "truckCount", label: "Number of Trucks", type: "R", options: ["1", "2–5", "6–20", "20+"] },
      { name: "authAge", label: "Authority Age", type: "D", options: ["Under 1 year", "1–2 years", "2–5 years", "5+ years"] },
      { name: "safetyRating", label: "Safety Rating", type: "D", options: ["Satisfactory", "Conditional", "Unsatisfactory", "Not Yet Rated"] },
      { name: "region", label: "Region of Operation", type: "M", options: ["Northeast", "Southeast", "Midwest", "Southwest", "West", "Nationwide"] },
      { name: "employees", label: "Employees Included", type: "B" },
      { name: "reasonSelling", label: "Reason for Selling", type: "D", options: ["Retirement", "Expanding", "Relocation", "Health", "Other"] },
      { name: "financing", label: "Financing / Seller Carry Available", type: "B", highlight: "red" }
    ]
  },
  {
    id: "12",
    name: "Miscellaneous",
    focus: "Catch-all for listings that do not fit any other category. Kept deliberately narrow to minimize misuse.",
    subcategories: ["Trucking Apparel & Merchandise", "Books, Training & Study Materials", "Collectibles & Novelty Items", "Other / Uncategorized"],
    filters: [
      { name: "condition", label: "Condition", type: "D", options: ["New", "Used", "Rebuilt", "For Parts Only"], highlight: "green" },
      { name: "price", label: "Price Range", type: "R", options: ["Under $25", "$25–$100", "$100–$500", "$500+"] },
      { name: "miscItemType", label: "Item Type", type: "D", options: ["Apparel", "Training Material", "Collectible", "Other"] },
      { 
        name: "format", 
        label: "Format", 
        type: "D", 
        options: ["Physical", "Digital"],
        condition: (state) => state.subcategory === "Books, Training & Study Materials" || state.filters.miscItemType === "Training Material"
      },
      { 
        name: "location", 
        type: "Z",
        condition: (state) => state.filters.miscItemType !== "Software" && state.subcategory !== "Books, Training & Study Materials"
      }
    ]
  }
];

// 2. Mock Database of Listings (to test the filtering algorithm)
const MOCK_LISTINGS = [
  // Trucks
  {
    id: "lst-001",
    categoryId: "01",
    subcategory: "Sleeper",
    title: "2018 Freightliner Cascadia Sleeper",
    description: "Detroit DD15 engine, DT12 automated manual transmission. Clean title, regular fleet maintenance done. Super clean cab.",
    price: 45000,
    priceRange: "$25K–$50K",
    year: 2018,
    make: "Freightliner",
    model: "Cascadia",
    mileage: "500K–750K",
    engineBrand: "Detroit",
    transmission: "Automated Manual (AMT)",
    sleeperSize: "72\"+",
    axleConfig: "6x4",
    gvwRating: "Class 8",
    color: "White",
    titleStatus: "Clean",
    location: { state: "TX", zip: "75201", radius: "50" },
    financing: "yes",
    condition: "Used"
  },
  {
    id: "lst-002",
    categoryId: "01",
    subcategory: "Day Cab",
    title: "2021 Peterbilt 389 Day Cab",
    description: "Cummins X15 565HP engine, 18-speed manual transmission. Custom chrome styling, ready for heavy haul.",
    price: 135000,
    priceRange: "$100K–$150K",
    year: 2021,
    make: "Peterbilt",
    model: "389",
    mileage: "Under 250K",
    engineBrand: "Cummins",
    transmission: "Manual",
    sleeperSize: "Day Cab",
    axleConfig: "6x4",
    gvwRating: "Class 8",
    color: "Black",
    titleStatus: "Clean",
    location: { state: "CA", zip: "90210", radius: "100" },
    financing: "yes",
    condition: "Used"
  },
  {
    id: "lst-003",
    categoryId: "01",
    subcategory: "Dump Truck",
    title: "2015 Kenworth T880 Tri-Axle Dump",
    description: "PACCAR MX-13 engine, Allison Automatic. 16ft steel dump bed, heavy duty specs.",
    price: 89000,
    priceRange: "$50K–$100K",
    year: 2015,
    make: "Kenworth",
    model: "T880",
    mileage: "250K–500K",
    engineBrand: "PACCAR",
    transmission: "Automatic",
    sleeperSize: "Day Cab",
    axleConfig: "6x4",
    gvwRating: "Class 8",
    color: "Red",
    titleStatus: "Clean",
    location: { state: "OH", zip: "43215", radius: "250" },
    financing: "no",
    condition: "Used"
  },

  // Trailers
  {
    id: "lst-004",
    categoryId: "02",
    subcategory: "Refrigerated (Reefer)",
    title: "2020 Great Dane 53' Utility Reefer",
    description: "Thermo King Precedent S-600 unit, low hours. Aluminum duct floor, tandem slider axle.",
    price: 49000,
    priceRange: "$25K–$50K",
    year: 2020,
    make: "Great Dane",
    length: "53'",
    axles: "Tandem",
    liftGate: "no",
    reeferBrand: "Thermo King",
    floorType: "Aluminum",
    landingGear: "yes",
    location: { state: "FL", zip: "33101", radius: "100" },
    financing: "yes",
    condition: "Used"
  },
  {
    id: "lst-005",
    categoryId: "02",
    subcategory: "Flatbed",
    title: "Brand New 2026 Utility Combo Flatbed",
    description: "53ft spread axle flatbed, wood floor with aluminum nailer. Tool boxes included.",
    price: 78000,
    priceRange: "$75K+",
    year: 2026,
    make: "Utility",
    length: "53'",
    axles: "Tandem",
    liftGate: "no",
    reeferBrand: "Other",
    floorType: "Wood",
    landingGear: "yes",
    location: { state: "GA", zip: "30301", radius: "25" },
    financing: "yes",
    condition: "New"
  },

  // Yard & Warehouse Equipment
  {
    id: "lst-006",
    categoryId: "03",
    subcategory: "Forklifts",
    title: "Toyota 5,000 lbs Pneumatic Forklift",
    description: "Model 8FGU25, LP Gas fuel type. 3-stage mast, side shifter, great tires, work lights.",
    price: 16500,
    priceRange: "$15K–$50K",
    eqType: "Forklift",
    year: 2017,
    brand: "Toyota",
    fuelType: "Propane",
    liftCapacity: "3K–6K",
    hours: 3200,
    location: { state: "IL", zip: "60601", radius: "50" },
    financing: "no",
    condition: "Used"
  },
  {
    id: "lst-007",
    categoryId: "03",
    subcategory: "Auxiliary Power Units (APU)",
    title: "Thermo King TriPac Evolution APU",
    description: "Used APU in great running condition. Low hours, cold AC, powerful generator.",
    price: 4500,
    priceRange: "Under $5K",
    eqType: "APU",
    year: 2018,
    brand: "Thermo King",
    apuBrand: "Thermo King",
    hours: 1200,
    location: { state: "PA", zip: "19103", radius: "100" },
    financing: "no",
    condition: "Used"
  },

  // Parts
  {
    id: "lst-008",
    categoryId: "04",
    subcategory: "Engine & Transmission Parts",
    title: "Remanufactured Cummins X15 Cylinder Head",
    description: "Fully loaded cylinder head, valves ground, pressure checked. Comes with warranty.",
    price: 2450,
    priceRange: "$2K–$5K",
    partCategory: "Engine & Transmission",
    compatibility: "Truck",
    makes: ["Universal/All", "Kenworth", "Peterbilt"],
    oem: "Remanufactured",
    warranty: "yes",
    location: { state: "NC", zip: "27201", radius: "250" },
    financing: "yes",
    condition: "Rebuilt"
  },

  // Electronics & Technology
  {
    id: "lst-009",
    categoryId: "05",
    subcategory: "ELD & GPS Devices",
    title: "Garmin dēzl OTR700 GPS Navigator",
    description: "High resolution 7\" screen, custom routing based on truck size/weight. Like new in box.",
    price: 299,
    priceRange: "$100–$500",
    deviceType: "GPS",
    brand: "Garmin",
    subscription: "no",
    warranty: "no",
    location: { state: "MI", zip: "48201", radius: "25" },
    financing: "no",
    condition: "Used"
  },

  // Services
  {
    id: "lst-010",
    categoryId: "06",
    subcategory: "Dispatch Services",
    title: "Premium 5% Dispatch Service - No Contracts",
    description: "We negotiate top rates, handle setup packets, and process factoring invoices. Dedicated dispatcher.",
    price: 0,
    serviceType: "Dispatch",
    serviceArea: "Nationwide",
    businessType: "Company",
    yearsInBusiness: "5–10 years",
    freeConsult: "yes",
    rating: "4.5+ stars"
  },

  // Freight & Loads
  {
    id: "lst-011",
    categoryId: "07",
    subcategory: "Spot Loads",
    title: "Hazmat Flatbed Load: Houston to Chicago",
    description: "32,000 lbs industrial equipment. Tarp required. Pays well, quick pay option.",
    price: 3200,
    loadType: "Spot",
    origin: "TX",
    destination: "IL",
    equipment: "Flatbed",
    tripLength: "1000+",
    ratePerMile: "$2.50–$3.50",
    totalValue: "$2.50–$3.50",
    weight: "30K–45K",
    hazmat: "yes",
    teamRequired: "no",
    postedWithin: "Last 24 hours"
  },

  // Real Estate & Parking
  {
    id: "lst-012",
    categoryId: "08",
    subcategory: "Truck Parking for Rent",
    title: "Secure Truck Parking in Dallas - Fenced/Gated",
    description: "24/7 access, guard on duty, bright LED lighting. Monthly spaces available.",
    price: 150,
    priceRate: "Under $150/mo",
    listingType: "Parking",
    transactionType: "For Rent",
    state: "TX",
    locationRadius: "25 mi",
    sqFt: "Under 1K sq ft",
    securityFeatures: ["Fenced", "Gated", "Lit", "Guard"],
    spaces: "50+ spots",
    utilities: "no",
    availableDate: "Immediately",
    financing: "no"
  },

  // Tools & Supplies
  {
    id: "lst-013",
    categoryId: "09",
    subcategory: "Fleet Management Software",
    title: "SmartRoute Pro TMS Software License",
    description: "Complete fleet tracking, fuel tax IFTA reports, accounting sync. Digital SaaS product.",
    price: 120,
    priceRange: "$50–$200",
    itemType: "TMS Software",
    physOrDig: "Software / SaaS",
    brand: "SmartRoute",
    subscription: "yes",
    fleetSize: "Small Fleet (3–10)",
    financing: "no"
  },

  // Rental & Leasing
  {
    id: "lst-014",
    categoryId: "10",
    subcategory: "Lease-to-Own Programs",
    title: "2019 Volvo VNL760 Lease-to-Own",
    description: "No credit check, low down payment. $750/week, 36-month term with buyout option at end.",
    price: 750,
    rentalType: "Lease-to-Own",
    rate: "$500–$1.2K/wk",
    ratePeriod: "Weekly",
    year: 2019,
    make: "Other",
    mileage: "300K–600K",
    leaseTerm: "36+ months",
    purchaseOption: "yes",
    cdlRequired: "yes",
    location: { state: "TX", zip: "75201", radius: "100" },
    financing: "yes",
    condition: "Used"
  },

  // Business for Sale
  {
    id: "lst-015",
    categoryId: "11",
    subcategory: "Turnkey Trucking Companies",
    title: "Active 5-Truck Carrier Business for Sale",
    description: "Includes clean MC/DOT authority, 5 operating sleepers, and hired CDL drivers. Profitable route contracts.",
    price: 380000,
    bizListingType: "Turnkey Company",
    askingPrice: "$150K–$500K",
    revenue: "$500K–$2M",
    truckCount: "2–5",
    authAge: "5+ years",
    safetyRating: "Satisfactory",
    region: ["Northeast", "Midwest"],
    employees: "yes",
    reasonSelling: "Retirement",
    financing: "yes"
  },

  // Miscellaneous
  {
    id: "lst-016",
    categoryId: "12",
    subcategory: "Trucking Apparel & Merchandise",
    title: "TruckerSocial Premium Pullover Hoodie",
    description: "Super soft heavy cotton blend. Embossed red truck design. Available in sizes M-XXL.",
    price: 45,
    priceRange: "$25–$100",
    miscItemType: "Apparel",
    location: { state: "TX", zip: "75201", radius: "25" },
    condition: "New"
  }
];

// 3. State Management
let appState = {
  currentCategory: "01",
  currentSubcategory: "",
  currentMode: "browse", // 'browse' or 'create'
  filters: {},           // search filters key-value map
  form: {},              // create listing form key-value map
  isSubmitted: false,
  listingView: "grid"    // 'grid' or 'list'
};

// 4. Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderCategoriesGrid();
  setMode("browse");
  selectCategory("01");
  bindStaticEvents();
});

// 5. Render parent category grid
function renderCategoriesGrid() {
  const grid = document.getElementById("categories-grid");
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map(cat => {
    return `
      <div class="category-card" id="cat-card-${cat.id}" onclick="selectCategory('${cat.id}')">
        <div class="category-num">${cat.id}</div>
        <div class="category-name">${cat.name}</div>
        <div class="category-meta">
          <span class="meta-badge">${cat.subcategories.length} Subs</span>
          <span class="meta-badge">${cat.filters.length} Fields</span>
        </div>
      </div>
    `;
  }).join("");
}

// 6. Bind UI control toggles and profile actions
function bindStaticEvents() {
  // Mode switch buttons
  document.getElementById("mode-browse").addEventListener("click", () => setMode("browse"));
  document.getElementById("mode-create").addEventListener("click", () => setMode("create"));
  
  // Create listing form reset
  window.resetForm = function() {
    appState.form = {};
    appState.isSubmitted = false;
    renderFieldsPanel();
    updateLivePreview();
  };

  // Create listing submission handler
  window.submitListing = function(e) {
    if (e) e.preventDefault();
    
    // Validate required fields (Title, Price, Subcategory)
    const titleVal = document.getElementById("form-input-title")?.value;
    const priceVal = document.getElementById("form-input-price")?.value;
    const subVal = document.getElementById("form-input-subcategory")?.value;

    if (!titleVal || !priceVal || !subVal) {
      alert("Please enter a Title, Price, and Subcategory for your listing!");
      return;
    }

    appState.isSubmitted = true;
    renderFieldsPanel();
  };
}

// 6b. Filter Drawer Toggle
window.toggleFilterDrawer = function() {
  const shell = document.getElementById("filter-drawer-shell");
  if (!shell) return;
  const isOpen = shell.classList.contains("open");
  shell.classList.toggle("open");
  const hint = document.getElementById("drawer-toggle-hint");
  if (hint) hint.textContent = isOpen ? "Click to expand" : "Click to collapse";
};

// 6c. Update drawer active-filter badge
function updateDrawerBadge() {
  const badge = document.getElementById("drawer-active-badge");
  if (!badge) return;
  const filterCount = Object.keys(appState.filters).filter(k => k !== "subcategory").length
    + (appState.currentSubcategory ? 1 : 0);
  if (filterCount > 0) {
    badge.textContent = filterCount + " active";
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }
}

// 6d. Listing view toggle (grid / list)
window.setListingView = function(view) {
  appState.listingView = view;
  document.getElementById("view-grid-btn")?.classList.toggle("active", view === "grid");
  document.getElementById("view-list-btn")?.classList.toggle("active", view === "list");
  renderMarketplaceCards();
};

// 7. Toggle Mode (Browse vs Create)
function setMode(mode) {
  appState.currentMode = mode;
  appState.isSubmitted = false;

  const browseBtn = document.getElementById("mode-browse");
  const createBtn = document.getElementById("mode-create");
  const browseArea = document.getElementById("browse-area");
  const createArea = document.getElementById("create-mode-area");
  const drawerShell = document.getElementById("filter-drawer-shell");

  if (mode === "browse") {
    browseBtn.classList.add("active");
    createBtn.classList.remove("active");
    if (browseArea) browseArea.style.display = "flex";
    if (createArea) createArea.style.display = "none";
    if (drawerShell) drawerShell.style.display = "block";
  } else {
    createBtn.classList.add("active");
    browseBtn.classList.remove("active");
    if (browseArea) browseArea.style.display = "none";
    if (createArea) createArea.style.display = "block";
    if (drawerShell) drawerShell.style.display = "none";
  }

  renderFieldsPanel();
  updateLivePreview();
}

// 8. Select Parent Category
window.selectCategory = function(catId) {
  appState.currentCategory = catId;
  appState.currentSubcategory = "";
  appState.filters = {};
  appState.form = {};
  appState.isSubmitted = false;

  // Update visual selection in grid
  CATEGORIES.forEach(cat => {
    const card = document.getElementById(`cat-card-${cat.id}`);
    if (card) {
      if (cat.id === catId) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    }
  });

  renderFieldsPanel();
  updateLivePreview();
};

// 9. Select Subcategory
window.selectSubcategory = function(subName) {
  appState.currentSubcategory = subName;
  
  // Set in states
  if (appState.currentMode === "browse") {
    appState.filters.subcategory = subName;
  } else {
    appState.form.subcategory = subName;
  }

  // Re-evaluate conditional fields visibility
  evaluateConditionalFields();
  updateLivePreview();
  
  if (appState.currentMode === "browse") {
    applyFilters();
  }
};

// 10. Generate and render fields container (Filters or Listing creation)
function renderFieldsPanel() {
  // In create mode, render into the create-specific panel
  const panelId = appState.currentMode === "browse" ? "config-panel-container" : "config-panel-create-container";
  const configPanel = document.getElementById(panelId);
  if (!configPanel) return;

  const cat = CATEGORIES.find(c => c.id === appState.currentCategory);
  if (!cat) return;

  // If creation mode and successfully submitted, show success message
  if (appState.currentMode === "create" && appState.isSubmitted) {
    configPanel.innerHTML = `
      <div class="success-screen">
        <div class="success-icon">
          <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <div class="success-title">Listing Posted Successfully!</div>
        <div class="success-msg">Your listing for <strong>${appState.form.title || "Item"}</strong> is now active in the TruckerSocial Marketplace database.</div>
        <button class="btn btn-primary" onclick="resetForm()">Post Another Listing</button>
      </div>
    `;
    return;
  }

  const isBrowse = appState.currentMode === "browse";
  const title = isBrowse ? `Search & Filter: ${cat.name}` : `Create Listing: ${cat.name}`;
  const description = cat.focus;

  // Start building form
  let html = `
    <div class="config-header">
      <div class="config-title">${title}</div>
      <div class="config-desc">${description}</div>
    </div>
    <form id="marketplace-form" onsubmit="submitListing(event)">
      <div class="form-grid">
  `;

  // For CREATE mode, add base listing fields (Title, Description, Price, Image)
  if (!isBrowse) {
    html += `
      <div class="form-group form-group-full">
        <label for="form-input-title">Listing Title <span class="label-note">(Required)</span></label>
        <input type="text" id="form-input-title" class="form-control" placeholder="e.g. 2018 Freightliner Cascadia - Low Mileage" oninput="handleFormBaseChange('title', this.value)" required>
      </div>
      <div class="form-group">
        <label for="form-input-price">Price ($) <span class="label-note">(Required)</span></label>
        <input type="number" id="form-input-price" class="form-control" placeholder="e.g. 45000" oninput="handleFormBaseChange('price', this.value)" required>
      </div>
    `;
  }

  // Add Subcategory Selector
  html += `
    <div class="form-group">
      <label for="form-input-subcategory">Subcategory <span class="label-note">(Required)</span></label>
      <select id="form-input-subcategory" class="form-control" onchange="selectSubcategory(this.value)" required>
        <option value="">-- Select Subcategory --</option>
        ${cat.subcategories.map(sub => `<option value="${sub}" ${appState.currentSubcategory === sub ? 'selected' : ''}>${sub}</option>`).join("")}
      </select>
    </div>
  `;

  // For CREATE mode, add Description
  if (!isBrowse) {
    html += `
      <div class="form-group form-group-full">
        <label for="form-input-description">Item Description</label>
        <textarea id="form-input-description" class="form-control" placeholder="Describe your item or service..." oninput="handleFormBaseChange('description', this.value)"></textarea>
      </div>
    `;
  }

  // Render schema fields
  cat.filters.forEach(field => {
    // Condition check to see if field should start hidden
    const isHidden = field.condition ? !field.condition(appState) : false;
    const hideClass = isHidden ? "hidden" : "";
    const highlightClass = field.highlight === "green" ? "condition-highlight" : (field.highlight === "red" ? "financing-highlight" : "");
    const badgeLabel = field.highlight === "green" ? '<span class="condition-badge">GLOBAL CONDITION</span>' : (field.highlight === "red" ? '<span class="financing-badge">FINANCING FIELD</span>' : '');

    html += `
      <div class="form-group ${hideClass} ${highlightClass}" id="fg-${field.name}" data-fieldname="${field.name}">
        <label>
          ${field.label || capitalizeFirst(field.name)}
          ${badgeLabel}
        </label>
    `;

    // Dropdown input type (D)
    if (field.type === "D") {
      let options = field.options || [];
      // Handle dynamic options (like Real Estate Price Rate varying by Transaction Type)
      if (field.dynamicOptions) {
        options = field.dynamicOptions(appState);
      }
      
      html += `
        <select class="form-control field-input" id="inp-${field.name}" onchange="handleFieldChange('${field.name}', this.value)">
          <option value="">-- All / Any --</option>
          ${options.map(opt => `<option value="${opt}">${opt}</option>`).join("")}
        </select>
      `;
    }
    // Yes / No button toggles (B)
    else if (field.type === "B") {
      html += `
        <div class="yesno-group">
          <button type="button" class="yesno-btn" data-fieldname="${field.name}" data-val="yes" onclick="setYesNoField('${field.name}', 'yes')">Yes</button>
          <button type="button" class="yesno-btn" data-fieldname="${field.name}" data-val="no" onclick="setYesNoField('${field.name}', 'no')">No</button>
        </div>
      `;
    }
    // Text inputs (T)
    else if (field.type === "T") {
      html += `
        <input type="text" class="form-control field-input" id="inp-${field.name}" placeholder="Type details..." oninput="handleFieldChange('${field.name}', this.value)">
      `;
    }
    // Multi-Select dropdown (M)
    else if (field.type === "M") {
      html += `
        <div class="multiselect-container" id="multi-${field.name}">
          <div class="multiselect-trigger" onclick="toggleMultiSelect('${field.name}')">Select options</div>
          <div class="multiselect-dropdown">
            ${field.options.map(opt => `
              <div class="multiselect-option" onclick="toggleMultiOption(event, '${field.name}', '${opt}')">
                <input type="checkbox" id="chk-${field.name}-${opt}" value="${opt}">
                <span>${opt}</span>
              </div>
            `).join("")}
          </div>
          <div class="selected-tags" id="tags-${field.name}"></div>
        </div>
      `;
    }
    // Range Slider + Brackets snap selection (R)
    else if (field.type === "R") {
      let options = field.options || [];
      if (field.dynamicOptions) {
        options = field.dynamicOptions(appState);
      }

      html += `
        <div class="bracket-range-container">
          <div class="range-brackets-grid" id="bg-${field.name}">
            ${options.map(opt => `
              <div class="bracket-pill" onclick="selectBracketPill('${field.name}', '${opt}')" data-val="${opt}">${opt}</div>
            `).join("")}
          </div>
        </div>
      `;
    }
    // Numerical range slider (R_SLIDER)
    else if (field.type === "R_SLIDER") {
      const minVal = field.min || 2010;
      const maxVal = field.max || 2026;
      html += `
        <div class="slider-control-group">
          <input type="range" class="range-slider" min="${minVal}" max="${maxVal}" value="${maxVal}" id="inp-${field.name}" oninput="handleSliderChange('${field.name}', this.value)">
          <div class="slider-val" id="val-${field.name}">${maxVal}</div>
        </div>
      `;
    }
    // Location Radius fields (Z / Z_RADIUS_ONLY)
    else if (field.type === "Z" || field.type === "Z_RADIUS_ONLY") {
      html += `
        <div class="location-combo">
          <select class="form-control" id="inp-loc-state-${field.name}" onchange="handleLocationChange('${field.name}')">
            <option value="">State (Any)</option>
            <option value="TX">TX (Texas)</option>
            <option value="CA">CA (California)</option>
            <option value="FL">FL (Florida)</option>
            <option value="IL">IL (Illinois)</option>
            <option value="GA">GA (Georgia)</option>
            <option value="OH">OH (Ohio)</option>
          </select>
          <select class="form-control" id="inp-loc-radius-${field.name}" onchange="handleLocationChange('${field.name}')">
            <option value="">Radius</option>
            <option value="25">25 mi</option>
            <option value="50">50 mi</option>
            <option value="100">100 mi</option>
            <option value="250">250 mi</option>
          </select>
        </div>
      `;
    }

    html += `</div>`; // end form-group
  });

  // Action Buttons
  if (isBrowse) {
    html += `
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="resetSearchFilters()">Clear Filters</button>
      </div>
    `;
  } else {
    html += `
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="resetForm()">Clear Form</button>
        <button type="submit" class="btn btn-primary">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          Publish Listing
        </button>
      </div>
    `;
  }

  html += `
      </div>
    </form>
  `;

  configPanel.innerHTML = html;
}

// 11. Handle base listing field changes (Title, Price, Description in Form)
window.handleFormBaseChange = function(field, val) {
  appState.form[field] = val;
  updateLivePreview();
};

// 12. Evaluate conditional field display based on current subcategory or filter selections
function evaluateConditionalFields() {
  const cat = CATEGORIES.find(c => c.id === appState.currentCategory);
  if (!cat) return;

  cat.filters.forEach(field => {
    const group = document.getElementById(`fg-${field.name}`);
    if (!group) return;

    const shouldShow = field.condition ? field.condition(appState) : true;
    if (shouldShow) {
      group.classList.remove("hidden");
    } else {
      group.classList.add("hidden");
      // Clean value from state if field becomes hidden
      if (appState.currentMode === "browse") {
        delete appState.filters[field.name];
      } else {
        delete appState.form[field.name];
      }
    }
  });

  // Handle dynamic options updates (like Price Rate or Rates depending on ratePeriod or transactionType)
  updateDynamicFieldOptions();
}

// 13. Update dynamic field options (such as Rates based on Period selection)
function updateDynamicFieldOptions() {
  const cat = CATEGORIES.find(c => c.id === appState.currentCategory);
  if (!cat) return;

  cat.filters.forEach(field => {
    if (field.dynamicOptions) {
      const parentName = field.name;
      
      // Update brackets grid (if type R)
      if (field.type === "R") {
        const grid = document.getElementById(`bg-${parentName}`);
        if (grid) {
          const options = field.dynamicOptions(appState);
          grid.innerHTML = options.map(opt => `
            <div class="bracket-pill" onclick="selectBracketPill('${parentName}', '${opt}')" data-val="${opt}">${opt}</div>
          `).join("");
        }
      }
      // Update dropdown selections (if type D)
      else if (field.type === "D") {
        const select = document.getElementById(`inp-${parentName}`);
        if (select) {
          const options = field.dynamicOptions(appState);
          const currentVal = select.value;
          select.innerHTML = `
            <option value="">-- All / Any --</option>
            ${options.map(opt => `<option value="${opt}">${opt}</option>`).join("")}
          `;
          select.value = options.includes(currentVal) ? currentVal : "";
        }
      }
    }
  });
}

// 14. Handle standard input field changes (Dropdowns and Text Inputs)
window.handleFieldChange = function(name, val) {
  const isBrowse = appState.currentMode === "browse";
  if (isBrowse) {
    if (val === "") {
      delete appState.filters[name];
    } else {
      appState.filters[name] = val;
    }
    applyFilters();
  } else {
    appState.form[name] = val;
    updateLivePreview();
  }

  // Trigger conditional re-eval in case dropdown alters another field's visibility
  evaluateConditionalFields();
};

// 15. Handle yes/no button clicks
window.setYesNoField = function(name, val) {
  const container = document.getElementById(`fg-${name}`);
  if (!container) return;

  const buttons = container.querySelectorAll(".yesno-btn");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-val") === val) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const isBrowse = appState.currentMode === "browse";
  if (isBrowse) {
    appState.filters[name] = val;
    applyFilters();
  } else {
    appState.form[name] = val;
    updateLivePreview();
  }
};

// 16. Handle numeric slider changes
window.handleSliderChange = function(name, val) {
  const valLabel = document.getElementById(`val-${name}`);
  if (valLabel) valLabel.textContent = val;

  const isBrowse = appState.currentMode === "browse";
  if (isBrowse) {
    appState.filters[name] = parseInt(val);
    applyFilters();
  } else {
    appState.form[name] = parseInt(val);
    updateLivePreview();
  }
};

// 17. Handle bracket pill selection clicks
window.selectBracketPill = function(name, val) {
  const grid = document.getElementById(`bg-${name}`);
  if (!grid) return;

  const pills = grid.querySelectorAll(".bracket-pill");
  let clickedVal = val;
  
  pills.forEach(pill => {
    if (pill.getAttribute("data-val") === val) {
      if (pill.classList.contains("active")) {
        // Toggle off
        pill.classList.remove("active");
        clickedVal = "";
      } else {
        pill.classList.add("active");
      }
    } else {
      pill.classList.remove("active");
    }
  });

  const isBrowse = appState.currentMode === "browse";
  if (isBrowse) {
    if (clickedVal === "") {
      delete appState.filters[name];
    } else {
      appState.filters[name] = clickedVal;
    }
    applyFilters();
  } else {
    appState.form[name] = clickedVal;
    updateLivePreview();
  }
};

// 18. Handle location combo select events
window.handleLocationChange = function(name) {
  const stateEl = document.getElementById(`inp-loc-state-${name}`);
  const radiusEl = document.getElementById(`inp-loc-radius-${name}`);
  if (!stateEl || !radiusEl) return;

  const stateVal = stateEl.value;
  const radiusVal = radiusEl.value;

  const locObj = {
    state: stateVal,
    radius: radiusVal
  };

  const isBrowse = appState.currentMode === "browse";
  if (isBrowse) {
    if (!stateVal && !radiusVal) {
      delete appState.filters[name];
    } else {
      appState.filters[name] = locObj;
    }
    applyFilters();
  } else {
    appState.form[name] = locObj;
    updateLivePreview();
  }
};

// 19. Custom Multi-Select Dropdown Toggle
window.toggleMultiSelect = function(name) {
  const container = document.getElementById(`multi-${name}`);
  if (!container) return;
  
  // Close any other open multiselects first
  document.querySelectorAll(".multiselect-container").forEach(el => {
    if (el !== container) el.classList.remove("open");
  });

  container.classList.toggle("open");
};

// Handle clicks outside multiselect dropdown to close it
document.addEventListener("click", (e) => {
  if (!e.target.closest(".multiselect-container")) {
    document.querySelectorAll(".multiselect-container").forEach(el => el.classList.remove("open"));
  }
});

// Toggle individual multi-select option
window.toggleMultiOption = function(event, name, optionVal) {
  event.stopPropagation();
  
  const checkbox = document.getElementById(`chk-${name}-${optionVal}`);
  if (!checkbox) return;

  checkbox.checked = !checkbox.checked;

  const isBrowse = appState.currentMode === "browse";
  const list = isBrowse ? appState.filters : appState.form;
  
  if (!list[name]) list[name] = [];

  if (checkbox.checked) {
    if (!list[name].includes(optionVal)) list[name].push(optionVal);
  } else {
    list[name] = list[name].filter(v => v !== optionVal);
  }

  if (list[name].length === 0) {
    delete list[name];
  }

  // Update selected tags display
  renderMultiSelectTags(name);
  
  if (isBrowse) {
    applyFilters();
  } else {
    updateLivePreview();
  }
};

function renderMultiSelectTags(name) {
  const container = document.getElementById(`tags-${name}`);
  if (!container) return;

  const isBrowse = appState.currentMode === "browse";
  const list = isBrowse ? appState.filters : appState.form;
  const values = list[name] || [];

  container.innerHTML = values.map(val => `
    <span class="tag">
      ${val}
      <span class="tag-remove" onclick="removeMultiTag(event, '${name}', '${val}')">&times;</span>
    </span>
  `).join("");
}

window.removeMultiTag = function(event, name, tagVal) {
  event.stopPropagation();
  
  const checkbox = document.getElementById(`chk-${name}-${tagVal}`);
  if (checkbox) checkbox.checked = false;

  const isBrowse = appState.currentMode === "browse";
  const list = isBrowse ? appState.filters : appState.form;

  if (list[name]) {
    list[name] = list[name].filter(v => v !== tagVal);
    if (list[name].length === 0) {
      delete list[name];
    }
  }

  renderMultiSelectTags(name);

  if (isBrowse) {
    applyFilters();
  } else {
    updateLivePreview();
  }
};

// 20. Clear browse filters
window.resetSearchFilters = function() {
  appState.filters = {};
  appState.currentSubcategory = "";

  // Reset select elements in view
  const subSelect = document.getElementById("form-input-subcategory");
  if (subSelect) subSelect.value = "";

  updateDrawerBadge();
  renderFieldsPanel();
  renderMarketplaceCards();
};

// 21. Live Preview updating binder (for Listing Card)
function updateLivePreview() {
  const isBrowse = appState.currentMode === "browse";

  if (isBrowse) {
    // In browse mode: render cards in main area
    renderMarketplaceCards();
    updateDrawerBadge();
    return;
  }

  // Create mode: use the sticky preview panel
  const sidePanel = document.getElementById("preview-sticky-panel-container");
  if (!sidePanel) return;

  // Listing Creation Preview Pane
  const cat = CATEGORIES.find(c => c.id === appState.currentCategory);
    const title = appState.form.title || "New Marketplace Listing";
    const priceText = appState.form.price ? `$${parseFloat(appState.form.price).toLocaleString()}` : "Contact Seller";
    const subText = appState.form.subcategory || "Select Subcategory";
    const descText = appState.form.description || "Enter a details description of your product or B2B commercial listing on this card.";
    const condText = appState.form.condition || "Used";
    
    // Check if category is physical goods to show green condition badge
    const isPhysicalGoods = ["01", "02", "03", "04", "05", "09", "10", "12"].includes(appState.currentCategory);

    // Build specs list from standard inputs
    const specFields = cat.filters.filter(f => !["condition", "price", "location", "financing"].includes(f.name));
    let specsHtml = "";
    
    specFields.forEach(f => {
      const val = appState.form[f.name];
      if (val && (!f.condition || f.condition(appState))) {
        specsHtml += `
          <div class="card-spec-item">
            <span class="card-spec-label">${f.label || f.name}</span>
            <span class="card-spec-val">${Array.isArray(val) ? val.join(", ") : val}</span>
          </div>
        `;
      }
    });

    if (!specsHtml) {
      specsHtml = `
        <div class="card-spec-item" style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 10px 0;">
          <span class="card-spec-val" style="font-size: 11px; font-weight: normal;">Specs fill out as you type</span>
        </div>
      `;
    }

    sidePanel.innerHTML = `
      <div class="preview-card-wrap">
        <div class="preview-title">
          <span>Live Card Preview</span>
          <span class="preview-mode-tag" style="background-color: var(--accent-red-glow); color: var(--accent-red); border-color: var(--accent-red);">Draft Mode</span>
        </div>
        <div class="live-card">
          <div class="card-img-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
            <div style="font-size: 11px;">Listing Image Upload</div>
            <div class="card-badges">
              ${appState.form.financing === 'yes' ? '<span class="card-badge-left">FINANCING</span>' : '<span></span>'}
              ${isPhysicalGoods ? `<span class="card-badge-right">${condText}</span>` : ''}
            </div>
          </div>
          <div class="card-body">
            <div class="card-cat-sub">${cat.name} &bull; ${subText}</div>
            <div class="card-title">${title}</div>
            <p class="card-desc">${descText}</p>
            <div class="card-specs-grid">
              ${specsHtml}
            </div>
            <div class="card-price-row">
              <div class="card-price">${priceText}</div>
              <div class="card-loc">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span>${appState.form.location?.state || "TX"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}


// 21b. Render marketplace cards grid (Browse Mode)
const SAMPLE_MP_LISTINGS = [
  {
    id: "mp-s01", categoryId: "01", cat: "Trucks", subcategory: "Sleeper",
    title: "2018 Freightliner Cascadia Sleeper",
    desc: "Detroit DD15 engine, DT12 AMT. Clean title, fleet-maintained. Super clean cab, 72\" sleeper.",
    price: 45000, condition: "Used", financing: true,
    specs: [{l:"Make",v:"Freightliner"},{l:"Year",v:"2018"},{l:"Engine",v:"Detroit DD15"},{l:"Mileage",v:"500K–750K"}],
    location: "Dallas, TX"
  },
  {
    id: "mp-s02", categoryId: "01", cat: "Trucks", subcategory: "Day Cab",
    title: "2021 Peterbilt 389 Day Cab – Heavy Haul",
    desc: "Cummins X15 565HP, 18-speed manual. Custom chrome, ready for heavy haul work.",
    price: 135000, condition: "Used", financing: true,
    specs: [{l:"Make",v:"Peterbilt"},{l:"Year",v:"2021"},{l:"Engine",v:"Cummins X15"},{l:"Miles",v:"Under 250K"}],
    location: "Los Angeles, CA"
  },
  {
    id: "mp-s03", categoryId: "01", cat: "Trucks", subcategory: "Dump Truck",
    title: "2015 Kenworth T880 Tri-Axle Dump Truck",
    desc: "PACCAR MX-13 engine, Allison Automatic. 16ft steel dump bed, heavy duty construction spec.",
    price: 89000, condition: "Used", financing: false,
    specs: [{l:"Make",v:"Kenworth"},{l:"Year",v:"2015"},{l:"Engine",v:"PACCAR MX-13"},{l:"Axles",v:"Tri-Axle"}],
    location: "Columbus, OH"
  },
  {
    id: "mp-s04", categoryId: "02", cat: "Trailers", subcategory: "Refrigerated (Reefer)",
    title: "2020 Great Dane 53' Reefer Trailer",
    desc: "Thermo King Precedent S-600 unit, low hours. Aluminum duct floor, tandem slider axle.",
    price: 49000, condition: "Used", financing: true,
    specs: [{l:"Make",v:"Great Dane"},{l:"Length",v:"53'"},{l:"Reefer",v:"Thermo King"},{l:"Axles",v:"Tandem"}],
    location: "Miami, FL"
  },
  {
    id: "mp-s05", categoryId: "02", cat: "Trailers", subcategory: "Flatbed",
    title: "2026 Utility Combo 53ft Spread-Axle Flatbed",
    desc: "Brand new 2026 flatbed, wood floor with aluminum nailer, spread axle, tool boxes included.",
    price: 78000, condition: "New", financing: true,
    specs: [{l:"Make",v:"Utility"},{l:"Year",v:"2026"},{l:"Length",v:"53'"},{l:"Floor",v:"Wood"}],
    location: "Atlanta, GA"
  },
  {
    id: "mp-s06", categoryId: "10", cat: "Rental & Leasing", subcategory: "Lease-to-Own",
    title: "2019 Volvo VNL760 Lease-to-Own Program",
    desc: "No credit check, low down payment. $750/week, 36-month term with buyout option.",
    price: 750, condition: "Used", financing: true,
    specs: [{l:"Make",v:"Volvo"},{l:"Year",v:"2019"},{l:"Rate",v:"$750/wk"},{l:"Term",v:"36 months"}],
    location: "Dallas, TX",
    priceLabel: "/week"
  },
  {
    id: "mp-s07", categoryId: "06", cat: "Services", subcategory: "Dispatch",
    title: "Premium 5% Dispatch Service – No Contracts",
    desc: "We negotiate top rates, handle setup packets, and process factoring invoices. Dedicated dispatcher.",
    price: 0, condition: null, financing: false,
    specs: [{l:"Type",v:"Dispatch"},{l:"Coverage",v:"Nationwide"},{l:"Rate",v:"5%"},{l:"Contract",v:"None"}],
    location: "Nationwide"
  },
  {
    id: "mp-s08", categoryId: "04", cat: "Parts", subcategory: "Engine & Transmission",
    title: "Remanufactured Cummins X15 Cylinder Head",
    desc: "Fully loaded cylinder head, valves ground, pressure checked. 12-month warranty included.",
    price: 2450, condition: "Rebuilt", financing: false,
    specs: [{l:"Condition",v:"Rebuilt"},{l:"OEM",v:"Remanufactured"},{l:"Warranty",v:"12 mo"},{l:"Fits",v:"Kenworth/Pete"}],
    location: "Charlotte, NC"
  },
  {
    id: "mp-s09", categoryId: "08", cat: "Real Estate", subcategory: "Truck Parking",
    title: "Secure Truck Parking in Dallas – Fenced & Gated",
    desc: "24/7 access, guard on duty, bright LED lighting. Monthly and daily spaces available.",
    price: 150, condition: null, financing: false,
    specs: [{l:"Type",v:"Parking"},{l:"Security",v:"Fenced/Gated"},{l:"Spots",v:"50+"},{l:"Access",v:"24/7"}],
    location: "Dallas, TX",
    priceLabel: "/month"
  },
  {
    id: "mp-s10", categoryId: "05", cat: "Electronics", subcategory: "GPS Devices",
    title: "Garmin dēzl OTR700 Truck GPS Navigator",
    desc: "7\" high-res screen, custom routing by truck size & weight. Like new in original box.",
    price: 299, condition: "Used", financing: false,
    specs: [{l:"Brand",v:"Garmin"},{l:"Screen",v:"7\""},{l:"Type",v:"GPS"},{l:"Sub Required",v:"No"}],
    location: "Detroit, MI"
  },
  {
    id: "mp-s11", categoryId: "11", cat: "Business for Sale", subcategory: "Turnkey Company",
    title: "Active 5-Truck Carrier Business for Sale",
    desc: "Includes clean MC/DOT authority, 5 operating sleepers & CDL drivers. Profitable route contracts.",
    price: 380000, condition: null, financing: true,
    specs: [{l:"Trucks",v:"5"},{l:"Auth Age",v:"5+ years"},{l:"Safety",v:"Satisfactory"},{l:"Revenue",v:"$500K–$2M"}],
    location: "Northeast US"
  },
  {
    id: "mp-s12", categoryId: "03", cat: "Yard Equipment", subcategory: "Forklifts",
    title: "Toyota 5,000 lbs Pneumatic Forklift",
    desc: "Model 8FGU25, LP Gas. 3-stage mast, side shifter, great tires and work lights. Low hours.",
    price: 16500, condition: "Used", financing: false,
    specs: [{l:"Brand",v:"Toyota"},{l:"Capacity",v:"5,000 lbs"},{l:"Fuel",v:"Propane"},{l:"Hours",v:"3,200"}],
    location: "Chicago, IL"
  }
];

function renderMarketplaceCards() {
  const container = document.getElementById("marketplace-cards-container");
  const countLabel = document.getElementById("browse-count-label");
  if (!container) return;

  // Filter sample listings by current category and any active filters
  let listings = SAMPLE_MP_LISTINGS.filter(item => {
    if (item.categoryId !== appState.currentCategory) return false;
    if (appState.currentSubcategory && item.subcategory !== appState.currentSubcategory) return false;
    // Condition filter
    if (appState.filters.condition && item.condition !== appState.filters.condition) return false;
    // Financing filter
    if (appState.filters.financing === "yes" && !item.financing) return false;
    if (appState.filters.financing === "no" && item.financing) return false;
    return true;
  });

  // Also include from MOCK_LISTINGS (original data) for matching category
  const mockMatches = MOCK_LISTINGS.filter(item => {
    if (item.categoryId !== appState.currentCategory) return false;
    if (appState.currentSubcategory && item.subcategory !== appState.currentSubcategory) return false;
    return true;
  }).map(item => ({
    id: item.id,
    categoryId: item.categoryId,
    cat: CATEGORIES.find(c => c.id === item.categoryId)?.name || "",
    subcategory: item.subcategory,
    title: item.title,
    desc: item.description,
    price: item.price,
    condition: item.condition || null,
    financing: item.financing === "yes",
    specs: [],
    location: item.location ? (item.location.state || "") : ""
  }));

  // Merge, deduplicating by id
  const allIds = new Set(listings.map(l => l.id));
  mockMatches.forEach(m => { if (!allIds.has(m.id)) listings.push(m); });

  if (countLabel) {
    const cat = CATEGORIES.find(c => c.id === appState.currentCategory);
    const hasFilters = Object.keys(appState.filters).length > 0 || appState.currentSubcategory;
    countLabel.textContent = listings.length > 0
      ? `${listings.length} listing${listings.length !== 1 ? "s" : ""} in ${cat?.name || ""}`
      : hasFilters ? "No Matches" : `${cat?.name || ""} Listings`;
  }

  const isGrid = appState.listingView !== "list";
  const wrapClass = isGrid ? "mp-cards-grid" : "mp-cards-list";

  if (listings.length === 0) {
    container.innerHTML = `
      <div class="mp-no-results">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <p>No listings match your current filters. Try selecting a different category or clearing filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `<div class="${wrapClass}">${listings.map(item => renderMpCard(item)).join("")}</div>`;
}

function renderMpCard(item) {
  const priceText = item.price > 0
    ? `$${item.price.toLocaleString()}${item.priceLabel || ""}`
    : "Contact Seller";
  const priceClass = item.price > 0 ? "mp-card-price" : "mp-card-price contact";

  const condClass = item.condition
    ? (item.condition === "New" ? "" : item.condition === "Rebuilt" ? " rebuilt" : " used")
    : "";

  const specsHtml = item.specs && item.specs.length > 0
    ? `<div class="mp-card-specs">
        ${item.specs.slice(0, 4).map(s => `
          <div class="mp-spec-item">
            <span class="mp-spec-label">${s.l}</span>
            <span class="mp-spec-val">${s.v}</span>
          </div>
        `).join("")}
      </div>`
    : "";

  const locationStr = typeof item.location === "object"
    ? (item.location.state || "")
    : (item.location || "");

  return `
    <div class="mp-card" id="mp-card-${item.id}">
      <div class="mp-card-img">
        <div class="mp-card-img-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125a1.125 1.125 0 001.125-1.125V9.75M8.25 18.75a1.5 1.5 0 01-3 0m0 0V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v11.25" />
          </svg>
          <span>${item.cat}</span>
        </div>
        <div class="mp-card-badges">
          ${item.financing ? '<span class="mp-badge-financing">Financing</span>' : '<span></span>'}
          ${item.condition ? `<span class="mp-badge-condition${condClass}">${item.condition}</span>` : '<span></span>'}
        </div>
      </div>
      <div class="mp-card-body">
        <div class="mp-card-cat">${item.cat} &bull; ${item.subcategory}</div>
        <div class="mp-card-title">${item.title}</div>
        <p class="mp-card-desc">${item.desc}</p>
        ${specsHtml}
        <div class="mp-card-footer">
          <div class="${priceClass}">${priceText}</div>
          <div class="mp-card-meta">
            ${locationStr ? `<div class="mp-card-loc">
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>${locationStr}</span>
            </div>` : ""}
            <div class="mp-card-fav" title="Save listing">
              <svg viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 22. Filter execution engine – redirect to card renderer in browse mode
function applyFilters() {
  if (appState.currentMode === "browse") {
    renderMarketplaceCards();
    updateDrawerBadge();
    return;
  }
}

// Helper utility: capitalize first letter of strings
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
}



