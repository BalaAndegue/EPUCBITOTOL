'use client';

import { Book, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const bibles = [
    {
        version: 'Louis Segond 1910 (Français)',
        description: 'La version classique et la plus utilisée dans le monde francophone.',
        link: 'https://archive.org/compress/saintebibletradu00sego/formats=TEXT%20PDF&file=/saintebibletradu00sego.zip',
        color: 'bg-blue-100 text-blue-700'
    },
    {
        version: 'King James Version (English)',
        description: 'The standard English Bible translation.',
        link: 'https://www.gutenberg.org/ebooks/10.epub.images?session_id=9d1e56b093352778396561110034a74205566675',
        color: 'bg-indigo-100 text-indigo-700'
    },
    {
        version: 'Darby (Français)',
        description: 'Traduction littérale très appréciée pour l\'étude approfondie.',
        link: 'https://books.google.cm/books?id=0XgOAAAAIAAJ&printsec=frontcover&dq=bible+darby+pdf&hl=fr&sa=X&ved=2ahUKEwjH1-Pq5YKEAxXwQUEAHaipD_AQ6AF6BAgHEAI#v=onepage&q&f=false',
        color: 'bg-green-100 text-green-700'
    }
];

export default function Bibles() {
    return (
        <div className="pt-20 bg-[var(--color-background)] min-h-screen">
            <section className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'accueil
                    </Link>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl">
                            <Book className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text-primary)]">
                                Télécharger la Bible
                            </h1>
                            <p className="text-[var(--color-text-secondary)]">Accédez à la Parole de Dieu gratuitement.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    {bibles.map((bible) => (
                        <div key={bible.version} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 ${bible.color} rounded-full flex items-center justify-center`}>
                                    <Book className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{bible.version}</h3>
                                    <p className="text-gray-500 text-sm">{bible.description}</p>
                                </div>
                            </div>
                            <a
                                href={bible.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex items-center space-x-2"
                            >
                                <Download className="w-4 h-4" />
                                <span>Télécharger</span>
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
