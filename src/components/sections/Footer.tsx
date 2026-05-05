'use client'

/**
 * Footer Section
 * Contact links and navigation
 */

export function Footer() {
  return (
    <footer className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-20 bg-slate-900 text-white dark:bg-slate-950">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
        <p className="text-lg text-slate-300 mb-12">
          I'm always interested in interesting problems and collaborations.
        </p>

        {/* Contact Links */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
          <a
            href="mailto:contact@example.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Email
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-400 hover:border-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-400 hover:border-white transition-colors"
          >
            GitHub
          </a>
        </div>

        <p className="text-slate-400">© 2024 Jonathan Thomas. All rights reserved.</p>
      </div>
    </footer>
  )
}
