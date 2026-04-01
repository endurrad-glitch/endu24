export default function Caschi() {
  return (
    <main className="bg-white text-[#2b2b2b] min-h-screen p-8">

      <h1 className="text-4xl font-bold mb-6">
        Caschi Moto
      </h1>

      <p className="text-gray-500 mb-10 max-w-xl">
        Confronta i prezzi dei migliori caschi moto: integrali, modulari, jet e offroad.
      </p>

      <div className="grid gap-4">

        <a href="/caschi/integrali" className="bg-gray-100 p-6 rounded-2xl hover:bg-[#2b2b2b] hover:text-white transition">
          Caschi Integrali
        </a>

        <a href="/caschi/modulari" className="bg-gray-100 p-6 rounded-2xl hover:bg-[#2b2b2b] hover:text-white transition">
          Caschi Modulari
        </a>

        <a href="/caschi/jet" className="bg-gray-100 p-6 rounded-2xl hover:bg-[#2b2b2b] hover:text-white transition">
          Caschi Jet
        </a>

        <a href="/caschi/offroad" className="bg-gray-100 p-6 rounded-2xl hover:bg-[#2b2b2b] hover:text-white transition">
          Caschi Offroad
        </a>

      </div>

    </main>
  );
}