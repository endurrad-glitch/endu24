export default function Caschi() {
  const products = [
    { name: "Shoei NXR2", slug: "casco-shoei-nxr2", price: 465 },
    { name: "AGV K6", slug: "casco-agv-k6", price: 399 },
    { name: "Arai Tour X5", slug: "casco-arai-tour-x5", price: 599 }
  ];

  return (
    <div className="bg-white text-[#2b2b2b] min-h-screen p-8">
      
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Caschi Moto
      </h1>

      <div className="space-y-4">
        {products.map((p, i) => (
          <a
            key={i}
            href={`/prodotto/${p.slug}`}
            className="block bg-gray-100 p-5 rounded-xl hover:bg-[#2b2b2b] hover:text-white transition-all duration-200"
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

    </div>
  );
}