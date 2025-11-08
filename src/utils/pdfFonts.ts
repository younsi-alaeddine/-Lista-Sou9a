import type { jsPDF } from 'jspdf'

const AMIRI_FONT_VFS_NAME = 'Amiri-Regular.ttf'
const AMIRI_FONT_FAMILY = 'Amiri'
const AMIRI_FONT_URL = 'https://cdn.jsdelivr.net/npm/@fontsource/amiri/files/amiri-arabic-400-normal.ttf'

let cachedFontBase64: string | null = null

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const chunkSize = 0x8000

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const subArray = bytes.subarray(i, i + chunkSize)
    binary += String.fromCharCode(...subArray)
  }

  return btoa(binary)
}

const loadArabicFont = async () => {
  if (cachedFontBase64) {
    return cachedFontBase64
  }

  const response = await fetch(AMIRI_FONT_URL)
  if (!response.ok) {
    throw new Error('ARABIC_PDF_FONT_FETCH_FAILED')
  }

  const buffer = await response.arrayBuffer()
  cachedFontBase64 = arrayBufferToBase64(buffer)
  return cachedFontBase64
}

export const ensureArabicPdfFont = async (doc: jsPDF) => {
  const base64 = await loadArabicFont()
  doc.addFileToVFS(AMIRI_FONT_VFS_NAME, base64)
  doc.addFont(AMIRI_FONT_VFS_NAME, AMIRI_FONT_FAMILY, 'normal')
  doc.setFont(AMIRI_FONT_FAMILY, 'normal')
}


