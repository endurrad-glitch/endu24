export default function CaschiOffroad() {

  const products = [
    { name: "Airoh Aviator", slug: "casco-airoh-aviator", price: 399 },
    { name: "Fox V3", slug: "casco-fox-v3", price: 450 }
  ];

  return (
    <main className="bg-white text-[#2b2b2b] min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-6">
        Caschi Offroad
      </h1>

      <div className="space-y-4">
        {products.map((p, i) => (
          <a
            key={i}
            href={`/prodotto/${p.slug}`}
            className="block bg-gray-100 p-5 rounded-xl hover:bg-[#2b2b2b] hover:text-white transition"
          >
            <div className="flex justify-between">
              <span>{p.name}</span>
              <span className="text-orange-500 font-bold">
                da €{p.price}
              </span>
            </div>
          </a>
        ))}
      </div>

    </main>
  );
}