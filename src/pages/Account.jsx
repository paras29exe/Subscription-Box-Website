import { Loader2 } from "lucide-react";

export default function Account() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white text-center">
      <h1 className="text-4xl font-bold">Coming Soon 🚀</h1>
      <p className="text-lg text-gray-400 mt-2">
        We’re building something amazing for you!
      </p>
      <p className="mt-4 text-sm text-gray-500 italic">
        👨‍💻 Paras (the developer) is working hard on this section.
      </p>

    

      {/* Back to Home Button */}
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition"
      >
        Back to Home
      </a>
    </div>
  );
}
