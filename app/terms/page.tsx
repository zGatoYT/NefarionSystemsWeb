"use client";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">Términos de Servicio</h1>
      <p className="text-slate-300 mt-4">
        Describe condiciones de uso, responsabilidades y limitaciones. Incluye que el bot se provee "tal cual"
        y que los administradores controlan permisos y datos.
      </p>

      <section className="mt-6 bg-card/60 p-6 rounded-lg">
        <h2 className="font-semibold">Uso aceptable</h2>
        <p className="text-slate-300 mt-2">No se permite uso ilegal, abuso de comandos o explotación del bot.</p>
      </section>
    </div>
  );
}