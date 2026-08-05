"use client";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">Política de Privacidad</h1>
      <p className="text-slate-300 mt-4">
        Explica aquí qué datos recoge el bot (por ejemplo: IDs, logs de moderación),
        cómo se usan y cómo solicitar eliminación. Nunca recolectes tokens ni datos sensibles.
      </p>

      <section className="mt-6 bg-card/60 p-6 rounded-lg">
        <h2 className="font-semibold">Datos que recopilamos</h2>
        <ul className="list-disc pl-6 mt-2 text-slate-300">
          <li>IDs de servidor/usuario usados para funcionalidades del bot.</li>
          <li>Logs de moderación (si el servidor lo habilita).</li>
        </ul>
      </section>
    </div>
  );
}