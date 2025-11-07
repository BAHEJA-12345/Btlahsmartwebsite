import { useLanguage } from './LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface FilterBarProps {
  filters: any;
  setFilters: (filters: any) => void;
}

export function FilterBar({ filters, setFilters }: FilterBarProps) {
  const { t } = useLanguage();

  const updateFilter = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      potSize: 'all',
      soilType: 'all',
      lightType: 'all',
      temperature: 'all',
      season: 'all',
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== 'all' && v !== '');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-800">
          {t('تصفية حسب', 'Filter By')}
        </h3>
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-gray-600"
          >
            <X className="w-4 h-4 mr-1" />
            {t('مسح الفلاتر', 'Clear Filters')}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Pot Size */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            {t('حجم الأصيص 🪴', 'Pot Size 🪴')}
          </label>
          <Select value={filters.potSize} onValueChange={(v) => updateFilter('potSize', v)}>
            <SelectTrigger>
              <SelectValue placeholder={t('اختر الحجم', 'Select Size')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
              <SelectItem value="ground">{t('أرضي', 'Ground')}</SelectItem>
              <SelectItem value="small">{t('صغير', 'Small')}</SelectItem>
              <SelectItem value="medium">{t('متوسط', 'Medium')}</SelectItem>
              <SelectItem value="large">{t('كبير', 'Large')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Soil Type */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            {t('نوع التربة 🌱', 'Soil Type 🌱')}
          </label>
          <Select value={filters.soilType} onValueChange={(v) => updateFilter('soilType', v)}>
            <SelectTrigger>
              <SelectValue placeholder={t('اختر التربة', 'Select Soil')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
              <SelectItem value="clay">{t('طينية', 'Clay')}</SelectItem>
              <SelectItem value="sandy">{t('رملية', 'Sandy')}</SelectItem>
              <SelectItem value="loamy">{t('طميية', 'Loamy')}</SelectItem>
              <SelectItem value="well-drained">{t('جيدة التصريف', 'Well-drained')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Light Type */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            {t('نوع الضوء ☀️', 'Light Type ☀️')}
          </label>
          <Select value={filters.lightType} onValueChange={(v) => updateFilter('lightType', v)}>
            <SelectTrigger>
              <SelectValue placeholder={t('اختر الضوء', 'Select Light')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
              <SelectItem value="full sun">{t('شمس كاملة', 'Full Sun')}</SelectItem>
              <SelectItem value="indirect">{t('ضوء غير مباشر', 'Indirect Light')}</SelectItem>
              <SelectItem value="partial">{t('ظل جزئي', 'Partial Shade')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Temperature */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            {t('درجة الحرارة 🌡️', 'Temperature 🌡️')}
          </label>
          <Select value={filters.temperature} onValueChange={(v) => updateFilter('temperature', v)}>
            <SelectTrigger>
              <SelectValue placeholder={t('اختر النطاق', 'Select Range')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
              <SelectItem value="10-20">10-20°C</SelectItem>
              <SelectItem value="20-30">20-30°C</SelectItem>
              <SelectItem value="30-40">30-40°C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Season */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            {t('موسم النمو 🌸', 'Growth Season 🌸')}
          </label>
          <Select value={filters.season} onValueChange={(v) => updateFilter('season', v)}>
            <SelectTrigger>
              <SelectValue placeholder={t('اختر الموسم', 'Select Season')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
              <SelectItem value="summer">{t('صيف', 'Summer')}</SelectItem>
              <SelectItem value="winter">{t('شتاء', 'Winter')}</SelectItem>
              <SelectItem value="spring">{t('ربيع', 'Spring')}</SelectItem>
              <SelectItem value="autumn">{t('خريف', 'Autumn')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
