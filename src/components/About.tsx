import { useLanguage } from './LanguageContext';
import { Sprout, Sparkles, Heart, Users } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-gray-800 mb-2">
          {t('من نحن', 'About Us')}
        </h2>
        <p className="text-gray-600">
          {t('تعرف على بتله ورسالتنا', 'Learn about Btlah and our mission')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Mission Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#7BAE7F]/10 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#7BAE7F]" />
            </div>
            <h3 className="text-gray-800">
              {t('رسالتنا', 'Our Mission')}
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {t(
              'في بتله (بتله)، نؤمن أن الجميع يستحق متعة رعاية النباتات. رسالتنا هي ربط الطبيعة بالذكاء - جعل رعاية النباتات سهلة وذكية وممتعة. نسعى لجعل عالم النباتات متاحاً للجميع، من المبتدئين إلى الخبراء، من خلال توفير المعرفة والأدوات الصحيحة.',
              'At Btlah (بتله), we believe everyone deserves the joy of nurturing plants. Our mission is to connect nature with intelligence — making plant care easy, smart, and enjoyable. We strive to make the world of plants accessible to everyone, from beginners to experts, by providing the right knowledge and tools.'
            )}
          </p>
        </div>

        {/* Intelligence Meets Nature */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#7BAE7F]/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#7BAE7F]" />
            </div>
            <h3 className="text-gray-800">
              {t('الذكاء يلتقي بالطبيعة', 'Intelligence Meets Nature')}
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {t(
              'نجمع بين المعرفة النباتية وتكنولوجيا الذكاء الاصطناعي لإرشاد المستخدمين نحو النباتات المثالية لبيئتهم. من خلال نظام التصفية الذكي الخاص بنا، نحلل عوامل متعددة مثل حجم الأصيص، نوع التربة، مستوى الإضاءة، ودرجة الحرارة لنوصي بالنباتات التي ستزدهر في مساحتك.',
              'We combine botanical knowledge with AI technology to guide users toward ideal plants for their environment. Through our smart filtering system, we analyze multiple factors like pot size, soil type, light level, and temperature to recommend plants that will thrive in your space.'
            )}
          </p>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#7BAE7F]/10 rounded-full flex items-center justify-center">
              <Sprout className="w-6 h-6 text-[#7BAE7F]" />
            </div>
            <h3 className="text-gray-800">
              {t('ما نقدمه', 'What We Offer')}
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="text-2xl">🌿</div>
              <div>
                <h4 className="text-gray-800 mb-1">
                  {t('قاعدة بيانات واسعة', 'Extensive Database')}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t(
                    'أكثر من 1000 نبات مع معلومات مفصلة عن احتياجات كل نبات',
                    'Over 1000 plants with detailed information about each plant\'s needs'
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-2xl">💧</div>
              <div>
                <h4 className="text-gray-800 mb-1">
                  {t('تذكيرات ذكية', 'Smart Reminders')}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t(
                    'تذكيرات يومية دقيقة للري بناءً على احتياجات كل نبات بالملليلتر',
                    'Accurate daily watering reminders based on each plant\'s needs in milliliters'
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-2xl">🤖</div>
              <div>
                <h4 className="text-gray-800 mb-1">
                  {t('مساعد ذكي', 'AI Assistant')}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t(
                    'مساعد متاح على مدار الساعة للإجابة على جميع أسئلتك المتعلقة بالنباتات',
                    '24/7 available assistant to answer all your plant-related questions'
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-2xl">🌍</div>
              <div>
                <h4 className="text-gray-800 mb-1">
                  {t('دعم ثنائي اللغة', 'Bilingual Support')}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t(
                    'واجهة كاملة باللغتين العربية والإنجليزية لخدمة جمهور أوسع',
                    'Complete interface in both Arabic and English to serve a wider audience'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* For Everyone */}
        <div className="bg-[#7BAE7F]/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#7BAE7F]/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-[#7BAE7F]" />
            </div>
            <h3 className="text-gray-800">
              {t('للجميع', 'For Everyone')}
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {t(
              'سواء كنت مبتدئاً تريد أن تبدأ رحلتك مع النباتات، أو خبيراً تبحث عن أنواع جديدة لإضافتها لمجموعتك، بتله هنا لمساعدتك. نوفر معلومات واضحة وإرشادات عملية تجعل رعاية النباتات تجربة ممتعة ومجزية.',
              'Whether you\'re a beginner wanting to start your plant journey, or an expert looking for new varieties to add to your collection, Btlah is here to help you. We provide clear information and practical guidance that make plant care an enjoyable and rewarding experience.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
