import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Sprout, Languages } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: any) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('الرئيسية', 'Home') },
    { id: 'recommendations', label: t('التوصيات الذكية', 'Smart Recommendations') },
    { id: 'myplants', label: t('نباتاتي', 'My Plants') },
    { id: 'benefits', label: t('الفوائد', 'Benefits') },
    { id: 'faq', label: t('الأسئلة الشائعة', 'FAQ') },
    { id: 'about', label: t('من نحن', 'About') },
    { id: 'ai', label: t('المساعد الذكي', 'AI Assistant') },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Sprout className="w-8 h-8 text-[#7BAE7F]" />
            <div>
              <h1 className="text-[#7BAE7F]">Btlah 🌿</h1>
              <p className="text-xs text-gray-600">{t('بتله', 'بتله')}</p>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-2 flex-wrap">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                  currentPage === item.id
                    ? 'bg-[#7BAE7F] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Language Toggle */}
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Languages className="w-4 h-4" />
              {language === 'ar' ? 'EN' : 'عربي'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
