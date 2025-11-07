import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Sprout, Droplets, Sun, Sparkles } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sprout className="w-16 h-16 text-[#7BAE7F]" />
          <h1 className="text-[#7BAE7F]">Btlah 🌿</h1>
        </div>
        
        <h2 className="text-gray-800 mb-4">
          {t('رعاية ذكية لنباتاتك المفضلة', 'Smart Care for Your Plants')}
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {t(
            'بتله هي منصة ذكية تساعدك على اكتشاف ورعاية أكثر من 1000 نبات فريد من خلال التصفية الذكية، والتذكيرات اليومية، والمساعدة الودية. ليست متجرًا - إنها نظام تفاعلي ذكي مصمم لتعليم وتبسيط رعاية النباتات للجميع.',
            'Btlah is an AI-powered platform that helps you discover and care for over 1000 unique plants through smart filtering, daily reminders, and friendly assistance. It\'s not a shop — it\'s a smart interactive system designed to teach, guide, and simplify plant care for everyone.'
          )}
        </p>

        <Button
          onClick={() => onNavigate('recommendations')}
          className="bg-[#7BAE7F] hover:bg-[#6a9d6e] text-white px-8 py-6 rounded-full"
          size="lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {t('استكشف التوصيات الذكية', 'Explore Smart Recommendations')}
        </Button>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-[#7BAE7F]/10 rounded-full flex items-center justify-center mb-4">
            <Sprout className="w-6 h-6 text-[#7BAE7F]" />
          </div>
          <h3 className="text-gray-800 mb-2">
            {t('أكثر من 1000 نبات', '1000+ Plants')}
          </h3>
          <p className="text-gray-600 text-sm">
            {t(
              'اكتشف مجموعة واسعة من النباتات المناسبة لبيئتك واحتياجاتك',
              'Discover a wide variety of plants suitable for your environment and needs'
            )}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-[#7BAE7F]/10 rounded-full flex items-center justify-center mb-4">
            <Droplets className="w-6 h-6 text-[#7BAE7F]" />
          </div>
          <h3 className="text-gray-800 mb-2">
            {t('تذكيرات الري الذكية', 'Smart Watering Reminders')}
          </h3>
          <p className="text-gray-600 text-sm">
            {t(
              'احصل على تذكيرات يومية مخصصة لري نباتاتك بالكمية المناسبة',
              'Get personalized daily reminders to water your plants with the right amount'
            )}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-[#7BAE7F]/10 rounded-full flex items-center justify-center mb-4">
            <Sun className="w-6 h-6 text-[#7BAE7F]" />
          </div>
          <h3 className="text-gray-800 mb-2">
            {t('توصيات ذكية', 'Smart Recommendations')}
          </h3>
          <p className="text-gray-600 text-sm">
            {t(
              'فلتر حسب حجم الأصيص، نوع التربة، الإضاءة، درجة الحرارة والمزيد',
              'Filter by pot size, soil type, light, temperature and more'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
