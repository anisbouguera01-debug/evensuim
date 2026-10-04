import React, { useState } from 'react';
import { PageId } from '../types';
import { SALONS_DATA } from '../data/mockData';
import { Calendar, MapPin, ArrowUpRight, Search, Layers, Filter } from 'lucide-react';

interface SalonsOverviewPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const SalonsOverviewPage: React.FC<SalonsOverviewPageProps> = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tous');

  const filters = ['Tous', 'Agroalimentaire & Gourmandise', 'Industrie & Technologie', 'Santé & Médical'];

  const filteredSalons = SALONS_DATA.filter((salon) => {
    const matchesSearch = salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          salon.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'Agroalimentaire & Gourmandise') return matchesSearch && salon.id === 'chocorium';
    if (selectedFilter === 'Industrie & Technologie') return matchesSearch && salon.id === 'milktec';
    if (selectedFilter === 'Santé & Médical') return matchesSearch && salon.id === 'clinica';
    return matchesSearch;
  });

  return (
    <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 text-slate-900 min-h-screen font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-200/80 border border-sky-300 text-sky-900 text-xs font-mono uppercase tracking-widest mb-3 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-sky-700" />
            Catalogue des Salons
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            NOS ÉVÉNEMENTS INTERNATIONAUX
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Découvrez la plate-forme de salons professionnels organisés par EVENSIUM au Palais des Expositions SAFEX d'Alger.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-white/80 p-4 rounded-2xl border border-sky-200 shadow-sm backdrop-blur-sm">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un salon, secteur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-sky-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === f
                    ? 'bg-sky-600 text-white font-bold shadow-sm'
                    : 'bg-white border border-sky-200 text-slate-700 hover:text-slate-950 hover:bg-sky-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Salons List */}
        <div className="space-y-8">
          {filteredSalons.map((salon) => (
            <div 
              key={salon.id}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-sky-200/90 hover:border-sky-400 shadow-md hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 h-64 rounded-2xl overflow-hidden relative shadow-sm">
                <img src={salon.heroImage} alt={salon.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span 
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold text-slate-950 shadow-md uppercase"
                  style={{ backgroundColor: salon.accentColor }}
                >
                  {salon.edition}
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    {salon.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {salon.venue}
                  </span>
                </div>

                <h2 className="font-serif text-3xl font-black text-slate-900" style={{ color: salon.id === 'chocorium' ? '#B45309' : salon.id === 'milktec' ? '#0369A1' : '#7E22CE' }}>
                  {salon.name}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {salon.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {salon.worlds.map((w, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[11px] text-slate-700 font-medium">
                      {w.name}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => setCurrentPage(salon.id as PageId)}
                    className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02]"
                    style={{ backgroundColor: salon.accentColor, color: '#0f172a' }}
                  >
                    <span>Explorer le Salon</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="px-6 py-3 rounded-xl bg-white border border-sky-300 text-slate-800 font-bold text-xs hover:bg-sky-100 transition-all cursor-pointer shadow-sm"
                  >
                    Réserver un Stand
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
