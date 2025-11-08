import { jsPDF } from 'jspdf'
import type { ShoppingItem } from '../types'
import { translate, translateItemName, translateItemUnit, type LanguageKey, type TranslationKey } from '../i18n'
import { ensureArabicPdfFont } from './pdfFonts'
import { prepareArabicPdfText } from './arabicText'

export type SelectedItem = ShoppingItem & {
  quantity: string
  note: string
}

const fileNameBase = 'lista-sou9a'

export const downloadCsv = (items: SelectedItem[], languageKey: LanguageKey) => {
  const header = [
    translate(languageKey, 'export.csv.product'),
    translate(languageKey, 'export.csv.quantity'),
    translate(languageKey, 'export.csv.unit'),
    translate(languageKey, 'export.csv.note'),
  ]
  const rows = items.map((item) => {
    const name = translateItemName(languageKey, item).replace(/"/g, '""')
    const unit = translateItemUnit(languageKey, item).replace(/"/g, '""')
    return [
      name,
      (item.quantity ?? '').replace(/"/g, '""'),
      unit,
      (item.note ?? '').replace(/"/g, '""'),
    ]
  })

  const csvBody = [header, ...rows]
    .map((row) => row.map((value) => `"${value}"`).join(','))
    .join('\r\n')

  const csvContent = `\uFEFF${csvBody}`

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${fileNameBase}-${languageKey}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const downloadPdf = async (items: SelectedItem[], languageKey: LanguageKey) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 14
  const languageName = translate(languageKey, `settings.language.${languageKey}` as TranslationKey)
  const languageLine = translate(languageKey, 'export.languageLine', { language: languageName })
  const isArabic = languageKey === 'derja'

  if (isArabic) {
    try {
      await ensureArabicPdfFont(doc)
    } catch (error) {
      console.error('Unable to load Arabic font for PDF', error)
      alert(translate(languageKey, 'export.pdfFontError'))
      return
    }
  } else {
    doc.setFont('helvetica', 'normal')
  }

  const formatText = (value: string) => (isArabic ? prepareArabicPdfText(value) : value)
  const align = isArabic ? 'right' : 'left'
  const startX = isArabic ? pageWidth - margin : margin

  let cursorY = 20

  doc.setFontSize(18)
  doc.text(formatText('Lista Sou9a'), startX, cursorY, { align })

  doc.setFontSize(12)
  cursorY += 10
  doc.text(formatText(languageLine), startX, cursorY, { align })

  cursorY += 10
  doc.setFontSize(14)

  items.forEach((item, index) => {
    if (cursorY > 270) {
      doc.addPage()
      cursorY = 20
    }

    const itemTitle = `${index + 1}. ${translateItemName(languageKey, item)}`
    doc.text(formatText(itemTitle), startX, cursorY, { align })
    cursorY += 6

    const unitLabel = translateItemUnit(languageKey, item)
    const quantityLine = translate(languageKey, 'export.quantityLine', {
      quantity: item.quantity || '-',
      unit: unitLabel ? ` ${unitLabel}` : '',
    })
    doc.setFontSize(11)
    doc.text(formatText(quantityLine), startX, cursorY, { align })
    cursorY += 6

    if (item.note) {
      const noteLine = translate(languageKey, 'export.noteLine', { note: item.note })
      const shapedNote = formatText(noteLine)
      const noteLines = doc.splitTextToSize(shapedNote, 180)
      noteLines.forEach((line: string) => {
        doc.text(line, startX, cursorY, { align })
        cursorY += 5
      })
    }

    doc.setFontSize(14)
    cursorY += 4
  })

  doc.save(`${fileNameBase}-${languageKey}.pdf`)
}

