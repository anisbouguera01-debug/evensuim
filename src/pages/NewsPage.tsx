import React, { useState } from 'react';
import { PageId } from '../types';
import { NEWS_ARTICLES, FAQ_ITEMS } from '../data/mockData';
import { Calendar, ChevronDown, ChevronUp, FileText, Download, Tag } from 'lucide-react';

interface NewsPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ setCurrentPage }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 text-slate-900 min-h-screen font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-200/80 border border-sky-300 text-sky-900 text-xs font-mono uppercase tracking-widest shadow-sm font-bold">
            <FileText className="w-3.5 h-3.5 text-sky-700" />
            Actualités & Communiqués
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            PRESSE & ESPACE D'INFORMATION
          </h1>
          <p className="text-slate-600 text-sm">
            Retrouvez tous nos communiqués officiels, revues de presse et foire aux questions.
          </p>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ARTICLES.map((art) => (
            <div key={art.id} className="p-6 rounded-3xl bg-white/90 border border-sky-200 space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="h-48 rounded-2xl overflow-hidden">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-sky-100 text-sky-800 border border-sky-200 font-bold">
                {art.category}
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">{art.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{art.content}</p>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Par {art.author} • {art.date}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="pt-12 border-t border-sky-200 max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 uppercase">
              FOIRE AUX QUESTIONS (FAQ)
            </h2>
            <p className="text-slate-600 text-xs mt-1">Questions fréquentes des exposants et visiteurs</p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-white/90 border border-sky-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-serif font-bold text-sm text-slate-900 flex justify-between items-center cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-sky-700" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 border-t border-sky-100 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
