import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Plants = () => {
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const csvUrl =
    "https://raw.githubusercontent.com/BAHEJA-12345/Btlahsmartwebsite/main/btlah.csv";

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setPlants(results.data);
        setLoading(false);
      },
      error: () => setLoading(false),
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading plants...
      </div>
    );
  }

  return (
    <div className="bg-[#F9F7F3] min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-[#7BAE7F] mb-8">
        🌿 Plant Collection (Btlah)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plants.slice(0, 1000).map((plant, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 border border-[#E5E5E5]"
          >
            <h2 className="font-bold text-lg text-[#7BAE7F] mb-2">
              {plant.Type || "—"}
            </h2>
            <p>🌸 <strong>Season:</strong> {plant.Growth_Season}</p>
            <p>🌡️ <strong>Temp:</strong> {plant.Temperature_C}</p>
            <p>💧 <strong>Water/day:</strong> {plant["Water.ml_Notif/day"]}</p>
            <p>🪴 <strong>Pot:</strong> {plant.Pot_Size}</p>
            <p>☀️ <strong>Light:</strong> {plant.Light_Type}</p>
            <p>🌱 <strong>Soil:</strong> {plant.Soil_Type}</p>
            <p>🍃 <strong>Benefit:</strong> {plant.Benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plants;
