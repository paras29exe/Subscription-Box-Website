export default function Account() {
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center dark:text-white text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Coming Soon 🚀</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        We're building something amazing for you!
      </p>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
        👨‍💻 Paras (the developer) is working hard on this section.
      </p>

      {/* Back to Home Button */}
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 rounded-lg text-white transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
}
