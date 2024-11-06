import React, { createContext, useContext, useState, useCallback } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ru',
  setLanguage: () => {}
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: string;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  initialLanguage = 'ru' 
}) => {
  const [language, setLanguageState] = useState(initialLanguage);

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    // Опционально: сохраняем выбор пользователя
    localStorage.setItem('preferred-language', lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}; 