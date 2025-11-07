import { useLanguage } from './LanguageContext';
import { PlantCard } from './PlantCard';
import { Sprout } from 'lucide-react';

interface MyPlantsProps {
  plants: any[];
  onRemovePlant: (id: number) => void;
}

export function MyPlants({ plants, onRemovePlant }: MyPlantsProps) {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-gray-800 mb-2">
          {t('نباتاتي', 'My Plants')}
        </h2>
        <p className="text-gray-600">
          {t('اعتنِ بنباتاتك مع تذكيرات الري اليومية', 'Care for your plants with daily watering reminders')}
        </p>
      </div>

      {plants.length === 0 ? (
        <div className="text-center py-16">
          <Sprout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-600 mb-2">
            {t('لم تضف أي نباتات بعد', 'No plants added yet')}
          </h3>
          <p className="text-gray-500">
            {t('ابدأ بإضافة نباتات من صفحة التوصيات الذكية', 'Start by adding plants from the Smart Recommendations page')}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600 text-center">
            {t(`لديك ${plants.length} نبات`, `You have ${plants.length} plants`)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onAdd={() => {}}
                isAdded={true}
                showReminder={true}
                onRemove={() => onRemovePlant(plant.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
