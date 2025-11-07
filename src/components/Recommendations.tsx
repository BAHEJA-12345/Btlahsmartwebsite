import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { PlantCard } from './PlantCard';
import { FilterBar } from './FilterBar';
import { Loader2 } from 'lucide-react';

interface RecommendationsProps {
  onAddPlant: (plant: any) => void;
  myPlants: any[];
}

export function Recommendations({ onAddPlant, myPlants }: RecommendationsProps) {
  const { t } = useLanguage();
  const [plants, setPlants] = useState<any[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    potSize: 'all',
    soilType: 'all',
    lightType: 'all',
    temperature: 'all',
    season: 'all',
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, plants]);

  const fetchPlants = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/BAHEJA-12345/btlah-smart-garden/main/(2)%20بتله.csv');
      const text = await response.text();
      const parsed = parseCSV(text);
      setPlants(parsed);
      setFilteredPlants(parsed);
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map((line, index) => {
      const values = parseCSVLine(line);
      const plant: any = { uniqueId: index };
      
      headers.forEach((header, i) => {
        plant[header] = values[i] || '';
      });
      
      return plant;
    }).filter(p => p.Type); // Filter out empty rows
  };

  const parseCSVLine = (line: string) => {
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
  };

  const applyFilters = () => {
    let filtered = [...plants];

    if (filters.potSize && filters.potSize !== 'all') {
      filtered = filtered.filter(p => 
        p.Pot_Size?.toLowerCase().includes(filters.potSize.toLowerCase())
      );
    }

    if (filters.soilType && filters.soilType !== 'all') {
      filtered = filtered.filter(p => 
        p.Soil_Type?.toLowerCase().includes(filters.soilType.toLowerCase())
      );
    }

    if (filters.lightType && filters.lightType !== 'all') {
      filtered = filtered.filter(p => 
        p.Light_Type?.toLowerCase().includes(filters.lightType.toLowerCase())
      );
    }

    if (filters.temperature && filters.temperature !== 'all') {
      filtered = filtered.filter(p => {
        const temp = p.Temperature_C;
        if (!temp) return false;
        
        // Extract numbers from temperature range
        const numbers = temp.match(/\d+/g);
        if (!numbers) return false;
        
        const plantTemp = parseInt(numbers[0]);
        const [min, max] = filters.temperature.split('-').map(Number);
        
        return plantTemp >= min && plantTemp <= max;
      });
    }

    if (filters.season && filters.season !== 'all') {
      filtered = filtered.filter(p => 
        p.Growth_Season?.toLowerCase().includes(filters.season.toLowerCase())
      );
    }

    setFilteredPlants(filtered);
  };

  const isPlantAdded = (plant: any) => {
    return myPlants.some(p => p.uniqueId === plant.uniqueId);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#7BAE7F] mx-auto mb-4" />
        <p className="text-gray-600">{t('جاري تحميل النباتات...', 'Loading plants...')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-gray-800 mb-2">
          {t('التوصيات الذكية', 'Smart Recommendations')}
        </h2>
        <p className="text-gray-600">
          {t('ابحث عن النباتات المثالية لبيئتك', 'Find the perfect plants for your environment')}
        </p>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      <div className="mb-4 text-gray-600 text-center">
        {t(`عرض ${filteredPlants.length} نبات`, `Showing ${filteredPlants.length} plants`)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlants.map((plant) => (
          <PlantCard
            key={plant.uniqueId}
            plant={plant}
            onAdd={() => onAddPlant(plant)}
            isAdded={isPlantAdded(plant)}
          />
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {t('لم يتم العثور على نباتات. جرب تغيير الفلاتر.', 'No plants found. Try changing the filters.')}
          </p>
        </div>
      )}
    </div>
  );
}
