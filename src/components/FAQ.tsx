import { useLanguage } from './LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    {
      questionAr: 'كيف توصي بتله بالنباتات؟',
      questionEn: 'How does Btlah recommend plants?',
      answerAr: 'بتله تستخدم نظام تصفية ذكي يأخذ في الاعتبار عدة عوامل: حجم الأصيص المتوفر لديك، نوع التربة، مستوى الإضاءة في منزلك، درجة الحرارة، والموسم. بناءً على اختياراتك، نعرض لك النباتات الأكثر ملاءمة لظروفك.',
      answerEn: 'Btlah uses a smart filtering system that considers multiple factors: your available pot size, soil type, lighting level in your home, temperature, and season. Based on your selections, we show you the most suitable plants for your conditions.',
    },
    {
      questionAr: 'ما الذي يجعل بتله مختلفة؟',
      questionEn: 'What makes Btlah different?',
      answerAr: 'بتله ليست متجراً - إنها منصة تعليمية وإرشادية. نركز على مساعدتك لفهم احتياجات النباتات ورعايتها بشكل صحيح. نوفر تذكيرات يومية دقيقة للري، مساعد ذكي للإجابة على أسئلتك، وقاعدة بيانات واسعة من أكثر من 1000 نبات.',
      answerEn: 'Btlah is not a store - it\'s an educational and guidance platform. We focus on helping you understand and properly care for plant needs. We provide accurate daily watering reminders, an AI assistant to answer your questions, and an extensive database of over 1000 plants.',
    },
    {
      questionAr: 'هل يمكنني تتبع عدة نباتات؟',
      questionEn: 'Can I track multiple plants?',
      answerAr: 'نعم بالتأكيد! يمكنك إضافة أي عدد تريده من النباتات إلى صفحة "نباتاتي". كل نبات سيحصل على تذكيرات ري مخصصة بناءً على احتياجاته الفردية. يمكنك إدارة جميع نباتاتك في مكان واحد.',
      answerEn: 'Yes absolutely! You can add as many plants as you want to your "My Plants" page. Each plant will get personalized watering reminders based on its individual needs. You can manage all your plants in one place.',
    },
    {
      questionAr: 'هل المساعد الذكي مجاني؟',
      questionEn: 'Is the AI Assistant free?',
      answerAr: 'نعم، المساعد الذكي في بتله متاح مجاناً لجميع المستخدمين. يمكنك طرح أي أسئلة تتعلق بالنباتات باللغة العربية أو الإنجليزية، وسيساعدك المساعد في العثور على المعلومات التي تحتاجها.',
      answerEn: 'Yes, the AI Assistant in Btlah is available free for all users. You can ask any plant-related questions in Arabic or English, and the assistant will help you find the information you need.',
    },
    {
      questionAr: 'ماذا لو كنت مبتدئاً؟',
      questionEn: 'What if I\'m a beginner?',
      answerAr: 'بتله مصممة خصيصاً للمبتدئين! يمكنك استخدام الفلاتر لإيجاد النباتات سهلة العناية، والحصول على إرشادات واضحة حول كمية الماء وظروف النمو المطلوبة. المساعد الذكي متاح أيضاً للإجابة على أي أسئلة قد تكون لديك.',
      answerEn: 'Btlah is designed specifically for beginners! You can use filters to find easy-care plants, and get clear guidance on watering amounts and required growing conditions. The AI assistant is also available to answer any questions you may have.',
    },
    {
      questionAr: 'كيف أعرف كمية الماء المناسبة؟',
      questionEn: 'How do I know the right amount of water?',
      answerAr: 'كل نبات في بتله يأتي مع معلومات دقيقة عن كمية الماء المطلوبة يومياً بالملليلتر. عندما تضيف نباتاً إلى "نباتاتي"، ستحصل على تذكيرات يومية تخبرك بالضبط كم مل من الماء يحتاج النبات.',
      answerEn: 'Each plant in Btlah comes with accurate information about daily water requirements in milliliters. When you add a plant to "My Plants", you\'ll get daily reminders telling you exactly how many ml of water the plant needs.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-gray-800 mb-2">
          {t('الأسئلة الشائعة', 'Frequently Asked Questions')}
        </h2>
        <p className="text-gray-600">
          {t('إجابات على الأسئلة الأكثر شيوعاً حول بتله', 'Answers to the most common questions about Btlah')}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-2xl px-6 shadow-sm border-none"
            >
              <AccordionTrigger className="text-gray-800 hover:no-underline">
                {t(faq.questionAr, faq.questionEn)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t(faq.answerAr, faq.answerEn)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
