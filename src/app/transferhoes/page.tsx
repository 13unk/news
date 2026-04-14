"use client";

import React, { useRef, useState } from 'react';
import { Header } from './components/Header';
import { Mic, Trophy, Shield, ArrowRightLeft, ChevronLeft, ChevronRight, Swords, Check, ArrowDown, Calendar, Activity, Map as MapIcon } from 'lucide-react';

export default function TransferHoesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 300 : scrollLeft + 300;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#efefef] min-h-screen font-sans text-[#333]">
      <Header />

      <main className="max-w-[1200px] mx-auto mt-8 px-4 pb-20">
        
        {/* FICHA DE PERFIL */}
        <section className="bg-white border border-gray-300 shadow-sm flex flex-col md:flex-row mb-6 overflow-hidden min-h-[420px]">
          <div className="p-6 bg-white flex-shrink-0 border-r border-gray-100 flex flex-col items-center justify-center">
            <div className="relative p-1 rounded-sm bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] mb-4">
               <img src="https://i.postimg.cc/wBtZ1K7Q/nicki-nicole.png" alt="Nicki Nicole" className="w-[200px] h-[260px] object-cover border border-white" />
            </div>
            <div className="flex items-center gap-2 text-[#081430] font-bold text-[12px] bg-gray-100 px-6 py-2 rounded-full border border-gray-200 uppercase mb-2">
              <Mic size={16} />
              <span>Cantante</span>
            </div>
            <span className="text-[13px] font-black text-gray-500 uppercase tracking-widest">25 años</span>
          </div>

          <div className="flex-grow p-8 flex flex-col">
            <div className="mb-6">
              <h1 className="text-5xl font-black uppercase tracking-tighter text-[#081430] leading-none">Nicki Nicole</h1>
              <p className="text-blue-800 font-bold text-[13px] mt-2 uppercase tracking-widest italic">Rosario, Argentina</p>
            </div>

            <div className="flex flex-grow gap-8">
              <div className="flex-grow flex flex-col gap-6">
                <div className="relative flex items-center group bg-gray-50 rounded-xl p-4 border border-gray-200 h-[110px] w-full max-w-[450px]">
                  <button onClick={() => scroll('left')} className="absolute -left-3 z-10 bg-white p-1 rounded-full shadow-md border border-gray-200 hover:bg-gray-50"><ChevronLeft size={20} /></button>
                  <div ref={scrollRef} className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-2 w-full justify-around" style={{ scrollbarWidth: 'none' }}>
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="flex-shrink-0 flex items-center justify-center">
                        <Trophy size={60} className={i % 3 === 0 ? "text-yellow-600 drop-shadow-sm" : i % 3 === 1 ? "text-gray-400 drop-shadow-sm" : "text-blue-700 drop-shadow-sm"} />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => scroll('right')} className="absolute -right-3 z-10 bg-white p-1 rounded-full shadow-md border border-gray-200 hover:bg-gray-50"><ChevronRight size={20} /></button>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] w-full max-w-[380px] border-t border-gray-100 pt-4">
                  <div className="flex justify-between border-b border-gray-50 pb-1"><span className="text-gray-400 italic">Nacimiento:</span><span className="font-bold text-[#081430]">25/08/2000</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-1"><span className="text-gray-400 italic">Altura:</span><span className="font-bold text-[#081430]">1,45 m</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-1"><span className="text-gray-400 italic">Nacionalidad:</span><span className="font-bold text-[#081430]">🇦🇷 Argentina</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-1"><span className="text-gray-400 italic">Body Count:</span><span className="font-bold text-[#081430]">4</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-1"><span className="text-gray-400 italic">Género:</span><span className="font-bold text-[#081430] uppercase text-[11px]">Gold Digger</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-1"><span className="text-gray-400 italic">Pies:</span><span className="font-bold text-[#081430]">36</span></div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between min-w-[220px]">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center mb-1 shadow-sm">
                      <Shield size={30} className="text-gray-400" />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase italic">Agente libre</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-green-500 bg-green-50 flex items-center justify-center mb-1 shadow-sm">
                      <Check size={30} className="text-green-600 stroke-[3px]" />
                    </div>
                    <span className="text-[10px] font-black text-green-600 uppercase italic">Hetero</span>
                  </div>
                </div>

                <div className="bg-[#f8f8f8] w-full p-5 border-2 border-gray-300 rounded-md shadow-md text-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase block mb-1 tracking-[0.2em]">Valor de mercado</span>
                    <div className="flex items-center justify-center gap-2 text-[#081430]">
                      <span className="text-5xl font-black italic">450</span>
                      <span className="text-3xl font-black uppercase italic">M€</span>
                      <ArrowDown size={32} className="text-red-600 stroke-[4px] animate-bounce" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-[65%] flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DATOS DE RENDIMIENTO */}
              <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
                <div className="bg-[#081430] text-white px-4 py-2 font-bold text-[11px] uppercase tracking-wider flex items-center gap-2">
                  <Activity size={14} /> Datos de rendimiento
                </div>
                <div className="p-6 flex justify-around items-center">
                  {[{ label: 'Orgasmos', val: 88, col: 'text-blue-600' }, { label: 'Abortos', val: 0, col: 'text-red-600' }, { label: 'Líos', val: 14, col: 'text-yellow-600' }].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * stat.val) / 100} className={stat.col} />
                        </svg>
                        <span className="absolute text-[12px] font-black">{stat.val}%</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase mt-2 text-gray-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MAPA DE CALOR: CAMA HORIZONTAL ALMOHADA DERECHA */}
              <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
                <div className="bg-[#081430] text-white px-4 py-2 font-bold text-[11px] uppercase tracking-wider flex items-center gap-2">
                  <MapIcon size={14} /> Posiciones en la cama
                </div>
                <div className="p-4 flex justify-center bg-[#0a192f] h-[180px] items-center">
                  <div className="relative w-[240px] h-[120px] bg-[#112240] rounded-md border-2 border-blue-400/40 overflow-hidden shadow-2xl">
                    {/* Almohada a la derecha */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 h-[80%] w-[15%] border-2 border-white/20 rounded-sm bg-white/5 flex items-center justify-center">
                        <div className="h-[70%] w-[1px] bg-white/10 [writing-mode:vertical-lr] text-[6px] text-white/20 text-center uppercase tracking-[0.2em]">Almohada</div>
                    </div>
                    {/* Línea de sábana */}
                    <div className="absolute right-[25%] top-0 bottom-0 w-[2px] bg-white/10"></div>
                    
                    {/* Zonas de Calor Intensificadas */}
                    <div className="absolute top-[20%] left-[15%] w-14 h-14 bg-red-600 rounded-full blur-[18px] opacity-90 mix-blend-screen shadow-[0_0_30px_red]"></div>
                    <div className="absolute bottom-[20%] left-[35%] w-16 h-16 bg-orange-500 rounded-full blur-[22px] opacity-85 mix-blend-screen animate-pulse"></div>
                    <div className="absolute top-[40%] left-[60%] w-12 h-12 bg-yellow-400 rounded-full blur-[15px] opacity-70 mix-blend-screen"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* HISTORIAL COMPLETO DE TRANSACCIONES */}
            <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-[#081430] text-white px-4 py-3 font-bold text-[13px] uppercase tracking-wider flex items-center gap-2">
                <ArrowRightLeft size={16} /> Historial completo de transacciones
              </div>
              <table className="w-full text-left">
                <thead className="bg-[#f2f2f2] border-b border-gray-300 text-[11px] text-gray-500 uppercase font-black">
                  <tr>
                    <th className="p-4">Temporada</th>
                    <th className="p-4">Viene de</th>
                    <th className="p-4">Se une a</th>
                    <th className="p-4 text-right">Valor</th>
                    <th className="p-4 text-right">Motivo</th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  <tr className="border-b border-gray-100 bg-blue-50/30 italic font-bold">
                    <td className="p-4">24/25</td>
                    <td className="p-4 text-blue-800 uppercase underline">Lamine Yamal</td>
                    <td className="p-4 text-red-600 uppercase italic font-black">Agente Libre</td>
                    <td className="p-4 text-right text-red-500 font-black italic">450 M€</td>
                    <td className="p-4 text-right text-gray-400 uppercase">Fin contrato</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-bold">24/25</td>
                    <td className="p-4 text-red-600 uppercase">Agente Libre</td>
                    <td className="p-4 text-blue-800 underline uppercase">Lamine Yamal</td>
                    <td className="p-4 text-right text-green-600 font-black italic">480 M€</td>
                    <td className="p-4 text-right text-blue-500 uppercase italic">Rumor</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-bold">23/24</td>
                    <td className="p-4 font-black text-blue-800 uppercase">Peso Pluma</td>
                    <td className="p-4 font-black text-red-600 uppercase italic">Agente Libre</td>
                    <td className="p-4 text-right font-bold italic">510 M€</td>
                    <td className="p-4 text-right text-red-600 font-black uppercase">Cuernos</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-bold">23/24</td>
                    <td className="p-4 font-black text-blue-800 uppercase underline">Trueno</td>
                    <td className="p-4 font-black text-blue-800 uppercase">Peso Pluma</td>
                    <td className="p-4 text-right font-bold italic">530 M€</td>
                    <td className="p-4 text-right text-gray-400 italic">Traspaso</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 text-gray-500">
                    <td className="p-4 font-bold">21/22</td>
                    <td className="p-4 font-black text-blue-800 uppercase">Khea</td>
                    <td className="p-4 font-black text-blue-800 uppercase underline">Trueno</td>
                    <td className="p-4 text-right font-bold italic">550 M€</td>
                    <td className="p-4 text-right italic font-medium">Intercambio</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:w-[35%] flex flex-col gap-6">
            <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-[#081430] text-white px-4 py-3 font-bold text-[13px] uppercase flex items-center gap-2">
                <Calendar size={18} /> Próximo encuentro
              </div>
              <div className="p-6 text-center">
                <span className="text-[14px] font-black italic text-pink-500 mb-2 block tracking-tight">Baños de la Bresh</span>
                <div className="flex justify-between items-center text-center px-2">
                  <div className="flex flex-col items-center gap-1">
                    <img src="https://i.postimg.cc/wBtZ1K7Q/nicki-nicole.png" className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm" alt="Nicki" />
                    <span className="text-[10px] font-black uppercase">Nicki</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[16px] font-black">23:30</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Vie. 06/02</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <span className="text-gray-400 font-black text-sm">???</span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-gray-400 italic">TBD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 shadow-sm overflow-hidden p-6 text-center">
               <h3 className="text-[#081430] font-black uppercase text-sm mb-4 flex items-center justify-center gap-2">
                 <Swords size={18} /> Duelo de hoes
               </h3>
               <div className="flex justify-between items-center mb-6 px-4">
                  <div className="flex flex-col items-center gap-1">
                    <img src="https://i.postimg.cc/wBtZ1K7Q/nicki-nicole.png" className="w-14 h-14 rounded-full border-4 border-blue-600 object-cover" alt="Nicki" />
                    <span className="text-[10px] font-black italic uppercase">Nicki</span>
                  </div>
                  <span className="text-xl font-black italic text-gray-200 uppercase">VS</span>
                  <div className="flex flex-col items-center gap-1">
                    <img src="https://i.postimg.cc/q736B000/aitana.jpg" className="w-14 h-14 rounded-full border-4 border-gray-200 grayscale object-cover" alt="Aitana" />
                    <span className="text-[10px] font-black italic text-gray-400 uppercase">Aitana</span>
                  </div>
               </div>
               <button onClick={() => setRevealed(!revealed)} className="w-full bg-[#081430] text-white py-3 rounded font-black uppercase text-[11px] tracking-widest hover:bg-blue-900 transition-colors">
                {revealed ? "Cerrar Marcador" : "Comparar Body Count"}
               </button>
               {revealed && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded animate-bounce">
                  <span className="text-[13px] font-black text-green-700 uppercase italic">Nicki: 4 — Aitana: 2</span>
                </div>
               )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}