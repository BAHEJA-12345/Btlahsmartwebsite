import { useLanguage } from './LanguageContext';
import { PlantCard } from './PlantCard';

interface MyPlantsProps {
  plants: any[];
  onRemovePlant: (id: number) => void;
}

export function MyPlants({ plants, onRemovePlant }: MyPlantsProps) {
  const { t, language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center text-[#7BAE7F] mb-8">
        {t('نباتاتي', 'My Plants')}
      </h1>

      {plants.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌿</div>
          <h3 className="text-gray-600 mb-2">
            {t('لم تضف أي نباتات بعد', 'No plants added yet')}
          </h3>
          <p className="text-gray-500">
            {t('ابدأ بإضافة نباتات من صفحة التوصيات الذكية', 'Start adding plants from Smart Recommendations page')}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-gray-600 text-center">
            {t(
              `لديك ${plants.length} نبات${plants.length > 1 ? 'ات' : ''}`,
              `You have ${plants.length} plant${plants.length !== 1 ? 's' : ''}`
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onAddPlant={() => {}}
                onRemovePlant={() => onRemovePlant(plant.id)}
                isAdded={true}
                showRemoveButton={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
