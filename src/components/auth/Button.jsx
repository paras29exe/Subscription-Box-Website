export default function Button({text, onClick, disabled = false}) {
    return <button 
    type="submit" 
    onClick={onClick}
    disabled={disabled}
    className="w-full bg-gradient-to-br from-pink-700 via-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg 
               hover:bg-opacity-40 transition duration-300"
  >
    {text}
  </button>
}