import { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: language === 'ar' 
        ? 'مرحباً! أنا مساعد بتله الذكي 🌿 يمكنني مساعدتك في أي أسئلة تتعلق بالنباتات ورعايتها.'
        : 'Hello! I\'m Btlah\'s AI Assistant 🌿 I can help you with any questions about plants and their care.',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // Arabic responses
    if (language === 'ar') {
      if (msg.includes('ظل') || msg.includes('shade')) {
        return 'نباتات الظل الجزئي المناسبة تشمل: الفل، نبات العنكبوت، والبوتس. هذه النباتات تنمو جيداً في الإضاءة غير المباشرة وسهلة العناية. يمكنك استخدام فلتر "نوع الضوء" في صفحة التوصيات الذكية لعرض جميع النباتات المناسبة للظل الجزئي.';
      }
      if (msg.includes('رمل') || msg.includes('sandy')) {
        return 'التربة الرملية مناسبة لنباتات مثل الصبار والعصاريات والخزامى. هذه النباتات تفضل التربة جيدة التصريف. استخدم فلتر "نوع التربة" واختر "رملية" لعرض جميع الخيارات المناسبة.';
      }
      if (msg.includes('ماء') || msg.includes('water')) {
        return 'كمية الماء تختلف حسب نوع النبات. في صفحة "نباتاتي"، كل نبات يعرض التذكير اليومي بكمية الماء المطلوبة بالملليلتر. بشكل عام، من الأفضل أن تسقي النباتات عندما تشعر أن التربة جافة عند لمسها.';
      }
      if (msg.includes('ريحان') || msg.includes('basil')) {
        return 'الريحان نبات عطري رائع! يحتاج إلى شمس كاملة (6-8 ساعات يومياً)، ويُسقى عندما تجف التربة السطحية. في الصيف، قد يحتاج إلى 200-300 مل من الماء يومياً. يمكنك إضافة الريحان إلى "نباتاتي" للحصول على تذكيرات دقيقة.';
      }
      if (msg.includes('مبتدئ') || msg.includes('beginner')) {
        return 'للمبتدئين، أنصح بالنباتات سهلة العناية مثل: البوتس، نبات العنكبوت، الصبار، والسانسيفيريا. هذه النباتات تتحمل بعض الإهمال وتنمو جيداً في ظروف متنوعة. استخدم صفحة التوصيات الذكية لاستكشاف المزيد!';
      }
      return 'شكراً على سؤالك! أنا هنا لمساعدتك. يمكنك سؤالي عن: أنواع النباتات المناسبة لظروف معينة، كمية الماء المطلوبة، نصائح العناية، أو أي موضوع متعلق بالنباتات. جرب استخدام صفحة التوصيات الذكية للبحث عن نباتات محددة!';
    }

    // English responses
    if (msg.includes('shade') || msg.includes('shadow')) {
      return 'Great plants for partial shade include: Jasmine, Spider Plant, and Pothos. These plants thrive in indirect light and are easy to care for. You can use the "Light Type" filter on the Smart Recommendations page to see all plants suitable for partial shade.';
    }
    if (msg.includes('sandy') || msg.includes('sand')) {
      return 'Sandy soil is perfect for plants like cacti, succulents, and lavender. These plants prefer well-drained soil. Use the "Soil Type" filter and select "Sandy" to see all suitable options.';
    }
    if (msg.includes('water')) {
      return 'Water requirements vary by plant type. On the "My Plants" page, each plant displays a daily reminder with the exact amount of water needed in milliliters. Generally, it\'s best to water plants when the soil feels dry to the touch.';
    }
    if (msg.includes('basil')) {
      return 'Basil is a wonderful aromatic herb! It needs full sun (6-8 hours daily) and should be watered when the topsoil dries. In summer, it may need 200-300 ml of water daily. You can add basil to "My Plants" for accurate reminders.';
    }
    if (msg.includes('beginner')) {
      return 'For beginners, I recommend easy-care plants like: Pothos, Spider Plant, Cacti, and Snake Plant. These plants tolerate some neglect and grow well in various conditions. Use the Smart Recommendations page to explore more!';
    }

    return language === 'ar'
      ? 'شكراً على سؤالك! أنا هنا لمساعدتك. يمكنك سؤالي عن: أنواع النباتات المناسبة لظروف معينة، كمية الماء المطلوبة، نصائح العناية، أو أي موضوع متعلق بالنباتات.'
      : 'Thanks for your question! I\'m here to help. You can ask me about: plant types suitable for specific conditions, water requirements, care tips, or any plant-related topic.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: getResponse(input),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const exampleQuestions = language === 'ar'
    ? [
        'أفضل النباتات للظل الجزئي؟',
        'نباتات تنمو في التربة الرملية؟',
        'كم يحتاج الريحان من الماء يومياً؟',
        'نباتات سهلة للمبتدئين؟',
      ]
    : [
        'Best plants for partial shade?',
        'Plants that grow in sandy soil?',
        'How much water does basil need daily?',
        'Easy plants for beginners?',
      ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bot className="w-8 h-8 text-[#7BAE7F]" />
          <h2 className="text-gray-800">
            {t('المساعد الذكي', 'AI Assistant')}
          </h2>
        </div>
        <p className="text-gray-600">
          {t('اسأل أي شيء عن النباتات ورعايتها', 'Ask anything about plants and their care')}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Chat Messages */}
        <Card className="rounded-2xl shadow-sm mb-4 p-6 min-h-[500px] max-h-[600px] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#7BAE7F]/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-[#7BAE7F]" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-[#7BAE7F] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Example Questions */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {t('أسئلة مقترحة:', 'Suggested questions:')}
          </p>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="text-sm px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('اكتب سؤالك هنا...', 'Type your question here...')}
            className="flex-1 rounded-xl"
          />
          <Button
            onClick={handleSend}
            className="bg-[#7BAE7F] hover:bg-[#6a9d6e] text-white rounded-xl px-6"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
