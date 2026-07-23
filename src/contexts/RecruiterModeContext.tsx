import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RecruiterModeContextType {
  recruiterMode: boolean;
  toggleRecruiterMode: () => void;
}

const RecruiterModeContext = createContext<RecruiterModeContextType>({
  recruiterMode: false,
  toggleRecruiterMode: () => {},
});

export function RecruiterModeProvider({ children }: { children: ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState(() => {
    try { return localStorage.getItem('recruiter-mode') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    localStorage.setItem('recruiter-mode', String(recruiterMode));
    if (recruiterMode) {
      document.body.classList.add('recruiter-mode');
    } else {
      document.body.classList.remove('recruiter-mode');
    }
  }, [recruiterMode]);

  const toggleRecruiterMode = () => setRecruiterMode(prev => !prev);

  return (
    <RecruiterModeContext.Provider value={{ recruiterMode, toggleRecruiterMode }}>
      {children}
    </RecruiterModeContext.Provider>
  );
}

export const useRecruiterMode = () => useContext(RecruiterModeContext);
