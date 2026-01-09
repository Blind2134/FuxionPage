import React, { useState } from "react";
import { Lock, Unlock, Save, Loader2 } from "lucide-react";

// PEGA AQUÍ LA URL QUE COPIASTE DEL PASO 1
const API_URL =
  "https://script.google.com/macros/s/AKfycbxPpfDA0lJd6GGapvEk1Ok-W0t9eMp909EsJyapFGoIz-ihg945huKwYpuQLTnc8641/exec";

const AdminPanel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const updateStatus = async (isOpen: boolean) => {
    setLoading(true);
    try {
      // Enviamos los datos a Google Script usando fetch
      // Usamos 'no-cors' porque Google Scripts tiene peculiaridades con redirecciones
      await fetch(
        `${API_URL}?action=update&isOpen=${isOpen}&message=${encodeURIComponent(
          message
        )}`,
        {
          method: "POST",
          mode: "no-cors", // Importante para que no de error de seguridad
        }
      );

      alert(`✅ Éxito: Almacén ${isOpen ? "ABIERTO" : "CERRADO"}`);
      setMessage(""); // Limpiar mensaje opcionalmente
    } catch (error) {
      alert("❌ Error al actualizar");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Panel de Control Fuxion</h1>

      <div className="w-full max-w-md space-y-6">
        {/* Input para el mensaje */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Mensaje (Opcional)
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ej: Vuelvo en 20 min..."
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none text-white"
          />
        </div>

        {/* Botones Grandes */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => updateStatus(true)}
            disabled={loading}
            className="flex flex-col items-center justify-center gap-2 p-6 bg-green-600 hover:bg-green-700 rounded-2xl transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Unlock size={32} />
            )}
            <span className="font-bold text-lg">ABRIR</span>
          </button>

          <button
            onClick={() => updateStatus(false)}
            disabled={loading}
            className="flex flex-col items-center justify-center gap-2 p-6 bg-red-600 hover:bg-red-700 rounded-2xl transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Lock size={32} />
            )}
            <span className="font-bold text-lg">CERRAR</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Modo Administrador - Bryan Guispe
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
