import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plus, Check, Droplets, Sun, Thermometer, Sprout } from 'lucide-react';

interface PlantCardProps {
  plant: any;
  onAddPlant?: () => void;
  onAdd?: () => void;
  isAdded: boolean;
  showReminder?: boolean;
  showRemoveButton?: boolean;
  onRemove?: () => void;
  onRemovePlant?: () => void;
}

export function PlantCard({ 
  plant, 
  onAddPlant, 
  onAdd, 
  isAdded, 
  showReminder, 
  showRemoveButton,
  onRemove, 
  onRemovePlant 
}: PlantCardProps) {
  const handleAdd = onAddPlant || onAdd || (() => {});
  const handleRemove = onRemovePlant || onRemove || (() => {});
  const { t, language } = useLanguage();

  const imageUrl = plant.imgurl || plant.image || `https://source.unsplash.com/400x300/?plant,${plant.Type}`;

  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={imageUrl}
          alt={plant.Type}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-gray-800 mb-3 line-clamp-1">
          {plant.Type}
        </h3>

        <div className="space-y-2 text-sm mb-4">
          {plant['Water.ml_Notification/day'] && (
            <div className="flex items-center gap-2 text-gray-600">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>
                {t('الماء:', 'Water:')} {plant['Water.ml_Notification/day']} 
                {t(' مل/يوم', ' ml/day')}
              </span>
            </div>
          )}

          {plant.Growth_Season && (
            <div className="flex items-center gap-2 text-gray-600">
              <span>🌸</span>
              <span>{plant.Growth_Season}</span>
            </div>
          )}

          {plant.Temperature_C && (
            <div className="flex items-center gap-2 text-gray-600">
              <Thermometer className="w-4 h-4 text-red-500" />
              <span>{plant.Temperature_C}</span>
            </div>
          )}

          {plant.Pot_Size && (
            <div className="flex items-center gap-2 text-gray-600">
              <span>🪴</span>
              <span>{plant.Pot_Size}</span>
            </div>
          )}

          {plant.Light_Type && (
            <div className="flex items-center gap-2 text-gray-600">
              <Sun className="w-4 h-4 text-yellow-500" />
              <span>{plant.Light_Type}</span>
            </div>
          )}

          {plant.Soil_Type && (
            <div className="flex items-center gap-2 text-gray-600">
              <Sprout className="w-4 h-4 text-[#7BAE7F]" />
              <span>{plant.Soil_Type}</span>
            </div>
          )}

          {plant.Benefit && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                🍃 {plant.Benefit}
              </Badge>
            </div>
          )}
        </div>

        {showReminder && plant['Water.ml_Notification/day'] && (
          <div className="bg-blue-50 rounded-lg p-3 mb-3 text-sm text-blue-800">
            <p>
              {t(
                `💧 تذكير: اسقِ ${plant['Water.ml_Notification/day']} مل يومياً`,
                `💧 Reminder: Water ${plant['Water.ml_Notification/day']} ml daily`
              )}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {!showReminder && !showRemoveButton && (
            <Button
              onClick={handleAdd}
              disabled={isAdded}
              className={`flex-1 rounded-lg ${
                isAdded
                  ? 'bg-gray-200 text-gray-600'
                  : 'bg-[#7BAE7F] hover:bg-[#6a9d6e] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  {t('مُضاف', 'Added')}
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  {t('إضافة لنباتاتي', 'Add to My Plants')}
                </>
              )}
            </Button>
          )}

          {(showReminder || showRemoveButton) && (
            <Button
              onClick={handleRemove}
              variant="destructive"
              className="flex-1 rounded-lg"
            >
              {t('إزالة', 'Remove')}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
