declare global {
    interface Window {
      __INITIAL_LANGUAGE__: string;
      __INIT_TRANSLATIONS__: Record<string, any>;
    }
  }
  
  export {}; 