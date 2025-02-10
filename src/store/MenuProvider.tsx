import React, { createContext, useContext, useState } from 'react';

interface MenuState {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: (delay?: number) => void;
}

const MenuContext = createContext<MenuState>({
  menuOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
    }
  };

  const closeMenu = (delay = 0) => {
    if (menuOpen) {
      setTimeout(() => setMenuOpen(false), delay);
    }
  };

  return (
    <MenuContext.Provider value={{ menuOpen, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuState => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }

  return context;
};
