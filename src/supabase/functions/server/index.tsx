import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-2d926fd1/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize plants data from CSV (one-time setup)
app.post("/make-server-2d926fd1/plants/init", async (c) => {
  try {
    const body = await c.req.json();
    const { csvUrl } = body;
    
    // Fetch CSV from GitHub
    const url = csvUrl || 'https://raw.githubusercontent.com/BAHEJA-12345/btlah-smart-garden/main/(2)%20بتله.csv';
    const response = await fetch(url);
    const text = await response.text();
    
    // Parse CSV
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const plants = lines.slice(1).map((line, index) => {
      const values = parseCSVLine(line);
      const plant: any = { id: index };
      
      headers.forEach((header, i) => {
        plant[header] = values[i] || '';
      });
      
      return plant;
    }).filter(p => p.Type);
    
    // Store all plants in KV store
    for (let i = 0; i < plants.length; i++) {
      await kv.set(`plant_${i}`, plants[i]);
    }
    
    // Store count
    await kv.set('plants_count', plants.length);
    
    console.log(`Initialized ${plants.length} plants in KV store`);
    
    return c.json({ 
      success: true, 
      count: plants.length,
      message: `Successfully initialized ${plants.length} plants`
    });
  } catch (err) {
    console.error('Error initializing plants:', err);
    return c.json({ error: `Failed to initialize plants: ${err.message}` }, 500);
  }
});

// Helper function to parse CSV line
function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Get all plants from KV store
app.get("/make-server-2d926fd1/plants", async (c) => {
  try {
    const count = await kv.get('plants_count') || 0;
    
    if (count === 0) {
      return c.json({ 
        plants: [],
        message: 'No plants found. Please initialize the database first by calling /plants/init'
      });
    }
    
    const plants = await kv.getByPrefix('plant_');
    
    return c.json({ plants });
  } catch (err) {
    console.error('Server error fetching plants:', err);
    return c.json({ error: `Failed to fetch plants: ${err.message}` }, 500);
  }
});

// Get plants with filters
app.post("/make-server-2d926fd1/plants/filter", async (c) => {
  try {
    const body = await c.req.json();
    const { potSize, soilType, lightType, temperature, season } = body;

    // Get all plants from KV store
    const count = await kv.get('plants_count') || 0;
    
    if (count === 0) {
      return c.json({ 
        plants: [],
        message: 'No plants found. Please initialize the database first.'
      });
    }
    
    let plants = await kv.getByPrefix('plant_');
    
    // Apply filters
    if (potSize && potSize !== 'all') {
      plants = plants.filter((p: any) => 
        p.Pot_Size?.toLowerCase().includes(potSize.toLowerCase())
      );
    }
    
    if (soilType && soilType !== 'all') {
      plants = plants.filter((p: any) => 
        p.Soil_Type?.toLowerCase().includes(soilType.toLowerCase())
      );
    }
    
    if (lightType && lightType !== 'all') {
      plants = plants.filter((p: any) => 
        p.Light_Type?.toLowerCase().includes(lightType.toLowerCase())
      );
    }
    
    if (season && season !== 'all') {
      plants = plants.filter((p: any) => 
        p.Growth_Season?.toLowerCase().includes(season.toLowerCase())
      );
    }
    
    if (temperature && temperature !== 'all') {
      const [min, max] = temperature.split('-').map(Number);
      plants = plants.filter((p: any) => {
        const temp = p.Temperature_C;
        if (!temp) return false;
        const numbers = temp.match(/\d+/g);
        if (!numbers) return false;
        const plantTemp = parseInt(numbers[0]);
        return plantTemp >= min && plantTemp <= max;
      });
    }

    return c.json({ plants });
  } catch (err) {
    console.error('Server error filtering plants:', err);
    return c.json({ error: `Failed to filter plants: ${err.message}` }, 500);
  }
});

Deno.serve(app.fetch);