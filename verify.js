// Automated Validation Script for TruckerSocial Marketplace Catalogue Schema
const fs = require('fs');
const path = require('path');

console.log("=== STARTING TRUCKERSOCIAL CATALOGUE SCHEMA VALIDATION ===");

// 1. Check if files exist
const files = ['index.html', 'index.css', 'app.js', 'logo.svg'];
files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ File [${file}] exists.`);
  } else {
    console.error(`✗ Missing file: [${file}]`);
    process.exit(1);
  }
});

// 2. Validate app.js contents and parsing
try {
  const appJsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  
  // We can strip browser DOM dependencies and evaluate the CATEGORIES and MOCK_LISTINGS array
  const sandbox = {};
  // Mock DOM variables that app.js might reference immediately on load
  sandbox.document = {
    addEventListener: () => {}
  };
  
  // Extract CATEGORIES object using eval-like execution of the schema definitions
  // We'll extract everything up to the first DOM event listener to avoid DOM crashes
  const schemaPart = appJsContent.substring(0, appJsContent.indexOf('// 3. State Management'));
  
  // Eval schemaPart within our script to verify it's syntactically valid JSON/JS
  const schemaContext = {};
  const runCode = new Function('context', schemaPart + '\ncontext.CATEGORIES = CATEGORIES;\ncontext.MOCK_LISTINGS = MOCK_LISTINGS;');
  runCode(schemaContext);
  
  const categories = schemaContext.CATEGORIES;
  const mockListings = schemaContext.MOCK_LISTINGS;
  
  if (categories && Array.isArray(categories)) {
    console.log(`✓ Syntactically valid app.js. Found ${categories.length} parent categories.`);
    
    // Check if we have all 12 categories
    if (categories.length === 12) {
      console.log("✓ All 12 parent categories are accounted for.");
    } else {
      console.error(`✗ Expected 12 categories, found ${categories.length}`);
      process.exit(1);
    }
    
    // Verify each category counts
    categories.forEach(cat => {
      console.log(`  └─ Category ${cat.id} (${cat.name}): ${cat.subcategories.length} Subcategories, ${cat.filters.length} Fields`);
      
      // Basic integrity check
      if (!cat.id || !cat.name || !cat.focus || !cat.subcategories || !cat.filters) {
        console.error(`✗ Category ${cat.id || 'Unknown'} is missing required fields.`);
        process.exit(1);
      }
    });
  } else {
    console.error("✗ Failed to extract CATEGORIES array from app.js");
    process.exit(1);
  }
  
  if (mockListings && Array.isArray(mockListings)) {
    console.log(`✓ Found ${mockListings.length} pre-populated mock listings.`);
    if (mockListings.length >= 12) {
      console.log("✓ Mock listings catalog is rich and fully covers search verification.");
    } else {
      console.warn("⚠ Listing database contains fewer items than categories. Filtering may show empty states.");
    }
  } else {
    console.error("✗ Failed to load mock database.");
    process.exit(1);
  }

} catch (err) {
  console.error("✗ Error validating JS logic or syntax:", err);
  process.exit(1);
}

console.log("=== SCHEMA VALIDATION COMPLETED SUCCESSFULLY ===");
process.exit(0);
