import type { LanguageKey } from '../i18n'
import { translate } from '../i18n'

type ContactSectionProps = {
  language: LanguageKey
}

const ContactSection = ({ language }: ContactSectionProps) => {
  const email = translate(language, 'contact.emailValue')
  const phone = translate(language, 'contact.phoneValue')
  const phoneHref = phone.replace(/\s+/g, '')

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <header className="space-y-2">
        <h2 className="font-heading text-2xl sm:text-3xl">{translate(language, 'contact.title')}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{translate(language, 'contact.subtitle')}</p>
      </header>
      <div className="mt-4 space-y-4">
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200">
          <p className="font-medium">{translate(language, 'contact.emailLabel')}</p>
          <p className="mt-1 select-all font-heading text-base">{email}</p>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200">
          <p className="font-medium">{translate(language, 'contact.phoneLabel')}</p>
          <a
            href={`tel:${phoneHref}`}
            className="mt-1 inline-flex items-center gap-2 font-heading text-base text-primary hover:underline dark:text-primary/80"
          >
            <span aria-hidden="true">📞</span>
            <span>{phone}</span>
          </a>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{translate(language, 'contact.disclaimer')}</p>
      </div>
    </section>
  )
}

export default ContactSection

