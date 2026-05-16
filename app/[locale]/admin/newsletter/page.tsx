'use client';

import { useState, useEffect } from 'react';
import { getSubscribersAdmin, deleteSubscriber } from '@/app/actions/newsletter';
import { Trash2, Mail, Send, BookOpen, Users, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [verse, setVerse] = useState<{ text: string; ref: string; date: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [subRes, verseRes] = await Promise.all([
      getSubscribersAdmin(),
      fetch('/api/newsletter').then(r => r.json()).catch(() => null),
    ]);
    if (subRes.success && subRes.data) setSubscribers(subRes.data);
    if (verseRes?.verse) setVerse({ ...verseRes.verse, date: verseRes.date });
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = (id: string) => {
    toast('Supprimer cet abonné ?', {
      action: { label: 'Supprimer', onClick: async () => {
        const res = await deleteSubscriber(id);
        if (res.success) { toast.success('Abonné supprimé'); loadData(); }
        else toast.error('Erreur lors de la suppression');
      }},
      cancel: { label: 'Annuler', onClick: () => {} },
    });
  };

  const handleSendVerse = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { Authorization: 'Bearer epuc-newsletter-2026' },
      });
      const data = await res.json();
      if (data.preview) {
        toast.info(`Mode aperçu : ${data.message}`);
      } else if (data.success) {
        toast.success(`Verset envoyé à ${data.sent}/${data.total} abonné(s) !`);
      } else {
        toast.error('Erreur lors de l\'envoi');
      }
    } catch {
      toast.error('Erreur réseau');
    }
    setSending(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Newsletter & Verset du Jour</h1>
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center">
            <Users className="w-4 h-4 mr-2" />
            {subscribers.length} Abonné(s)
          </div>
        </div>
      </div>

      {/* Verset du jour */}
      {verse && (
        <div className="bg-gradient-to-br from-[#070A14] to-[#0D1425] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-semibold text-sm">Verset du jour — {verse.date}</span>
          </div>
          <p className="text-white/85 italic text-base leading-relaxed mb-3">&ldquo;{verse.text}&rdquo;</p>
          <p className="text-amber-400 font-bold text-sm">— {verse.ref}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={handleSendVerse} disabled={sending || subscribers.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg,#C9973A,#E8B84B)', color: '#1C1917' }}>
              <Send className="w-4 h-4" />
              {sending ? 'Envoi en cours...' : `Envoyer à ${subscribers.length} abonné(s)`}
            </button>
            <button onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.80)' }}>
              <Eye className="w-4 h-4" />
              {showPreview ? 'Masquer' : 'Aperçu email'}
            </button>
          </div>

          {subscribers.length === 0 && (
            <p className="text-white/45 text-xs mt-3">Aucun abonné pour le moment. L&apos;envoi sera disponible une fois des abonnés inscrits.</p>
          )}

          {/* Note configuration SMTP */}
          {!showPreview && (
            <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <p className="text-white/55 text-xs">
                <strong className="text-amber-400/80">Configuration email :</strong> Pour activer l&apos;envoi réel, ajoutez dans votre <code className="bg-white/10 px-1 rounded">.env</code> :
                <code className="block mt-1 bg-white/10 px-2 py-1 rounded text-[11px] text-white/70">
                  SMTP_HOST=smtp.gmail.com<br />
                  SMTP_PORT=587<br />
                  SMTP_USER=votre@gmail.com<br />
                  SMTP_PASS=votre_mot_de_passe_app
                </code>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Aperçu email */}
      {showPreview && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Aperçu de l&apos;email newsletter</span>
          </div>
          <div className="p-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <div style={{ background: '#FDFAF4', padding: '24px', borderRadius: '12px', fontFamily: 'Georgia, serif' }}>
              <div style={{ background: 'linear-gradient(135deg,#070A14,#0D1425)', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '16px' }}>
                <p style={{ color: '#C9973A', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 6px' }}>ÉPUC Nkoabang</p>
                <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 4px' }}>Verset du Jour</h3>
                {verse && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>{verse.date}</p>}
              </div>
              {verse && (
                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #E7E0D4', textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#44403C', lineHeight: '1.7', margin: '0 0 12px' }}>&ldquo;{verse.text}&rdquo;</p>
                  <p style={{ color: '#C9973A', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>— {verse.ref}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Liste abonnés */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <h3 className="font-semibold text-gray-900 text-sm">Liste des abonnés</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-6 text-center text-gray-500 text-sm">Chargement...</div>
          ) : subscribers.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">Aucun abonné pour le moment.</div>
          ) : (
            subscribers.map((s) => (
              <div key={s.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{s.email}</p>
                    <p className="text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(s.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
