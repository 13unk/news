import React from 'react';
import { 
  Search, 
  Home, 
  Flag, 
  Trophy, 
  Shirt, 
  User as WomanIcon, 
  ChevronDown 
} from 'lucide-react';

export const Header = () => {
  const categorias = [
    "DESTACADO", 
    "FICHAJES Y RUMORES", 
    "VALORES DE MERCADO", 
    "COMPETICIONES", 
    "ESTADÍSTICAS", 
    "COMUNIDAD"
  ];

  return (
    <header className="w-full shadow-md z-50">
      {/* 1. LÍNEA SUPERIOR (AZUL OSCURO) */}
      <nav className="bg-[#081430] h-[70px] flex items-center border-b border-[#1a3151]">
        <div className="max-w-[1200px] w-full mx-auto px-4 flex items-center justify-between gap-6">
          <div className="flex items-center cursor-pointer">
            <div className="h-12 w-auto flex items-center">
              <img 
                src="https://i.postimg.cc/Dzwcp1rw/logo.png" 
                alt="Logo Principal" 
                className="h-full object-contain"
              />
            </div>
          </div>

          <div className="flex-grow max-w-[500px] relative">
            <input 
              type="text" 
              placeholder="Buscar perfiles, relaciones..." 
              className="w-full bg-white h-10 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-[#1a3151] text-white hover:bg-blue-800 transition-colors border-l border-gray-200">
              <Search size={18} strokeWidth={3} />
            </button>
          </div>

          <div className="flex items-center border-l border-white/10 pl-6">
            <a href="https://unkedition.com" target="_blank" rel="noopener noreferrer" className="h-9 w-auto">
              <img src="https://i.postimg.cc/RCYTfhSN/logo-unk.png" alt="Logo UNK" className="h-full object-contain hover:opacity-80 transition-opacity" />
            </a>
          </div>
        </div>
      </nav>

      {/* 2. LÍNEA MEDIA (AZUL MENOS OSCURO) */}
      <nav className="bg-[#1a3151] w-full border-b border-[#081430]/30">
        <div className="max-w-[1200px] mx-auto flex overflow-x-auto">
          {categorias.map((item, index) => (
            <a
              key={index}
              href="#"
              className="px-6 py-4 text-[12px] font-extrabold text-white hover:bg-[#233d63] transition-colors whitespace-nowrap border-r border-[#081430]/30 last:border-r-0"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* 3. LÍNEA INFERIOR (BLANCA - SELECTORES) */}
      <nav className="bg-white w-full border-b border-gray-300 shadow-sm">
        <div className="max-w-[1200px] mx-auto flex items-center text-[11px] font-bold text-[#081430]">
          
          {/* Home Icon */}
          <a href="#" className="p-4 border-r border-gray-200 hover:bg-gray-50 transition-colors text-blue-900">
            <Home size={18} fill="currentColor" />
          </a>

          {/* País */}
          <button className="flex items-center gap-2 px-5 py-4 border-r border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-tight italic">
            <Flag size={16} />
            <span>Elegir país</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {/* Competición */}
          <button className="flex items-center gap-2 px-5 py-4 border-r border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-tight italic">
            <Trophy size={16} />
            <span>Competición</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {/* Equipo */}
          <button className="flex items-center gap-2 px-5 py-4 border-r border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-tight italic">
            <Shirt size={16} />
            <span>Equipo</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {/* Perfil Mujer */}
          <button className="flex items-center gap-2 px-5 py-4 border-r border-gray-200 hover:bg-gray-50 transition-colors uppercase tracking-tight italic">
            <WomanIcon size={16} />
            <span>Elegir Perfil</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

        </div>
      </nav>
    </header>
  );
};