import { LoaderCircle } from "lucide-react";

export default function Button({ text, onClick, disabled = false, loading }) {
  if (loading) return <LoaderCircle className="animate-spin mx-auto " size={32} />

  return <button
    type="submit"
    onClick={onClick}
    disabled={loading || disabled}
    className="w-full bg-gradient-to-br from-pink-700 via-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg 
               hover:bg-opacity-40 transition duration-300"
  >
    {text}
  </button>
}