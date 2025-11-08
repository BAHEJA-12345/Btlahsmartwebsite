import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { PlantCard } from './PlantCard';
import { FilterBar } from './FilterBar';
import { Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface RecommendationsProps {
  onAddPlant: (plant: any) => void;
  myPlants: any[];
}

export function Recommendations({ onAddPlant, myPlants }: RecommendationsProps) {
  const { t } = useLanguage();
  const [filteredPlants, setFilteredPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [needsInit, setNeedsInit] = useState(false);
  const [filters, setFilters] = useState({
    potSize: 'all',
    soilType: 'all',
    lightType: 'all',
    temperature: 'all',
    season: 'all',
  });

  useEffect(() => {
    fetchPlants();
  }, [filters]);

  useEffect(() => {
    // Initialize data on first load
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d926fd1`;
      
      // Check if we have plants first
      const checkResponse = await fetch(`${baseUrl}/plants`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      const checkData = await checkResponse.json();
      
      // If no plants, initialize from CSV
      if (!checkData.plants || checkData.plants.length === 0) {
        console.log('Initializing plants database from CSV...');
        const initResponse = await fetch(`${baseUrl}/plants/init`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({}),
        });
        
        const initData = await initResponse.json();
        console.log('Initialization result:', initData);
        
        // Fetch plants after initialization
        fetchPlants();
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  const fetchPlants = async () => {
    if (!loading && filteredPlants.length === 0) {
      setLoading(true);
    }
    
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d926fd1`;
      
      // Use filter endpoint
      const response = await fetch(`${baseUrl}/plants/filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('Error from server:', data.error);
        setFilteredPlants([]);
      } else if (data.message && data.plants.length === 0) {
        console.log(data.message);
        setNeedsInit(true);
        setFilteredPlants([]);
      } else {
        // Add uniqueId to each plant based on its id or index
        const plantsWithId = (data.plants || []).map((plant: any, index: number) => ({
          ...plant,
          uniqueId: plant.id ?? index,
        }));
        setFilteredPlants(plantsWithId);
        setNeedsInit(false);
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
      setFilteredPlants([]);
    } finally {
      setLoading(false);
    }
  };

  const isPlantAdded = (plant: any) => {
    return myPlants.some(p => p.uniqueId === plant.uniqueId);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#7BAE7F] mx-auto mb-4" />
        <p className="text-gray-600">
          {t('جاري تحميل النباتات...', 'Loading plants...')}
        </p>
        {needsInit && (
          <p className="text-gray-500 text-sm mt-2">
            {t('جاري تهيئة قاعدة البيانات للمرة الأولى...', 'Initializing database for the first time...')}
          </p>
        )}
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
