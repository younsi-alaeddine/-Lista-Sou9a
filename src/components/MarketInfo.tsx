import type { LanguageKey } from '../i18n'
import { translate } from '../i18n'

type MarketInfoProps = {
  language: LanguageKey
}

const MarketInfo = ({ language }: MarketInfoProps) => {
  const schedule = [
    {
      key: 'monday',
      day: translate(language, 'market.day.monday'),
      morning: translate(language, 'market.morning.monday'),
      evening: translate(language, 'market.evening.monday'),
    },
    {
      key: 'tuesday',
      day: translate(language, 'market.day.tuesday'),
      morning: translate(language, 'market.morning.tuesday'),
      evening: translate(language, 'market.evening.tuesday'),
    },
    {
      key: 'wednesday',
      day: translate(language, 'market.day.wednesday'),
      morning: translate(language, 'market.morning.wednesday'),
      evening: translate(language, 'market.evening.wednesday'),
    },
    {
      key: 'thursday',
      day: translate(language, 'market.day.thursday'),
      morning: translate(language, 'market.morning.thursday'),
      evening: translate(language, 'market.evening.thursday'),
    },
    {
      key: 'friday',
      day: translate(language, 'market.day.friday'),
      morning: translate(language, 'market.morning.friday'),
      evening: translate(language, 'market.evening.friday'),
    },
    {
      key: 'saturday',
      day: translate(language, 'market.day.saturday'),
      morning: translate(language, 'market.morning.saturday'),
      evening: translate(language, 'market.evening.saturday'),
    },
    {
      key: 'sunday',
      day: translate(language, 'market.day.sunday'),
      morning: translate(language, 'market.morning.sunday'),
      evening: translate(language, 'market.evening.sunday'),
    },
  ]

  return (
    <section className="rounded-3xl border border-primary/30 bg-primary/5 p-6 shadow-sm dark:border-primary/40 dark:bg-primary/10">
      <header className="space-y-2">
        <h2 className="font-heading text-2xl sm:text-3xl text-primary-dark dark:text-primary/90">
          {translate(language, 'market.title')}
        </h2>
        <p className="text-sm text-primary-dark/80 dark:text-primary/80">
          {translate(language, 'market.subtitle')}
        </p>
      </header>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {schedule.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-primary/20 bg-white/80 p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-primary/40 dark:bg-neutral-950/70"
          >
            <h3 className="font-heading text-lg text-primary-dark dark:text-primary/80">{item.day}</h3>
            <dl className="mt-3 space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
              <div className="flex justify-between gap-3">
                <dt className="font-medium">{translate(language, 'market.period.morning')}</dt>
                <dd className="text-right">{item.morning}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="font-medium">{translate(language, 'market.period.evening')}</dt>
                <dd className="text-right">{item.evening}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MarketInfo

