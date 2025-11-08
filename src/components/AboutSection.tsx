import type { LanguageKey } from '../i18n'
import { translate } from '../i18n'

type AboutSectionProps = {
  language: LanguageKey
}

const AboutSection = ({ language }: AboutSectionProps) => {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <header className="space-y-2">
        <h2 className="font-heading text-2xl sm:text-3xl">{translate(language, 'about.title')}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{translate(language, 'about.subtitle')}</p>
      </header>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {translate(language, 'about.body')
          .split('\n')
          .map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
      </div>
    </section>
  )
}

export default AboutSection

