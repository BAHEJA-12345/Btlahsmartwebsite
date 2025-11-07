import { useLanguage } from './LanguageContext';
import { Wind, Heart, Brain, Smile, Home, Sun } from 'lucide-react';

export function Benefits() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Wind,
      titleAr: 'تنقية الهواء',
      titleEn: 'Air Purification',
      descAr: 'النباتات تمتص السموم وتنتج الأكسجين، مما يحسن جودة الهواء في منزلك',
      descEn: 'Plants absorb toxins and produce oxygen, improving air quality in your home',
    },
    {
      icon: Heart,
      titleAr: 'تقليل التوتر',
      titleEn: 'Stress Reduction',
      descAr: 'التفاعل مع النباتات يقلل من مستويات التوتر ويعزز الشعور بالهدوء',
      descEn: 'Interacting with plants reduces stress levels and promotes calmness',
    },
    {
      icon: Brain,
      titleAr: 'تحسين التركيز',
      titleEn: 'Improved Focus',
      descAr: 'وجود النباتات في مساحة العمل يزيد من الإنتاجية والتركيز',
      descEn: 'Having plants in your workspace increases productivity and concentration',
    },
    {
      icon: Smile,
      titleAr: 'تحسين المزاج',
      titleEn: 'Mood Enhancement',
      descAr: 'رعاية النباتات ورؤية النمو تعزز المشاعر الإيجابية والسعادة',
      descEn: 'Caring for plants and watching them grow boosts positive feelings and happiness',
    },
    {
      icon: Home,
      titleAr: 'جمال المنزل',
      titleEn: 'Home Beautification',
      descAr: 'النباتات تضيف جمالاً طبيعياً وحياة إلى أي مساحة داخلية',
      descEn: 'Plants add natural beauty and life to any indoor space',
    },
    {
      icon: Sun,
      titleAr: 'اتصال بالطبيعة',
      titleEn: 'Nature Connection',
      descAr: 'وجود النباتات يعزز الشعور بالاتصال بالطبيعة حتى في المدينة',
      descEn: 'Having plants promotes a sense of connection to nature even in the city',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-gray-800 mb-2">
          {t('فوائد النباتات', 'Benefits of Plants')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t(
            'اكتشف كيف يمكن للنباتات أن تحسن صحتك وحياتك اليومية',
            'Discover how plants can improve your health and daily life'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-[#7BAE7F]/10 rounded-full flex items-center justify-center mb-4">
              <benefit.icon className="w-7 h-7 text-[#7BAE7F]" />
            </div>
            <h3 className="text-gray-800 mb-3">
              {t(benefit.titleAr, benefit.titleEn)}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t(benefit.descAr, benefit.descEn)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-sm">
        <h3 className="text-gray-800 mb-4 text-center">
          {t('لماذا تختار بتله؟', 'Why Choose Btlah?')}
        </h3>
        <div className="space-y-3 text-gray-600">
          <p>
            🌿 {t(
              'نساعدك على اختيار النباتات المناسبة لبيئتك ومستوى خبرتك',
              'We help you choose the right plants for your environment and experience level'
            )}
          </p>
          <p>
            💧 {t(
              'نوفر تذكيرات دقيقة للري بناءً على احتياجات كل نبات',
              'We provide accurate watering reminders based on each plant\'s needs'
            )}
          </p>
          <p>
            🤖 {t(
              'مساعد ذكي متاح دائماً للإجابة على أسئلتك',
              'AI assistant always available to answer your questions'
            )}
          </p>
          <p>
            📚 {t(
              'قاعدة بيانات واسعة تضم أكثر من 1000 نبات',
              'Extensive database with over 1000 plants'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
