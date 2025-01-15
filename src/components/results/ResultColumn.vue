<script setup lang="ts">
import type { ResultTranscribeInterface } from '@/types/types'
import jsPDF from 'jspdf'
import { useCompanySettingsStore } from '@/stores/companySettings'

const props = defineProps<{
  modelValue: string
}>()

const transcription: ResultTranscribeInterface = JSON.parse(props.modelValue)
const companySettingsStore = useCompanySettingsStore()

/**
 * Exports the transcription result to a PDF file
 * Includes both full transcription and detailed breakdown
 */
const exportToPDF = async () => {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
  })

  // Enhanced styling with more professional colors and fonts
  const styles = {
    header: {
      fontSize: 24,
      fontStyle: 'bold',
      textColor: [44, 62, 80], // Dark blue-gray
    },
    subheader: {
      fontSize: 18,
      fontStyle: 'bold',
      textColor: [52, 73, 94], // Lighter blue-gray
    },
    normal: {
      fontSize: 12,
      fontStyle: 'normal',
      textColor: [52, 73, 94],
    },
    small: {
      fontSize: 10,
      fontStyle: 'normal',
      textColor: [127, 140, 141], // Subtle gray
    },
  }

  // Helper function to apply text styles
  const applyStyle = (style: keyof typeof styles) => {
    doc.setFontSize(styles[style].fontSize)
    doc.setFont('helvetica', styles[style].fontStyle)
    doc.setTextColor(
      styles[style].textColor[0],
      styles[style].textColor[1],
      styles[style].textColor[2],
    )
  }

  // Helper function to add footer to each page
  const addFooter = (pageNumber: number) => {
    const totalPages = doc.getNumberOfPages()
    const companySettings = companySettingsStore.companyInfo
    applyStyle('small')

    // Add page numbers with decorative elements
    const pageText = `Page ${pageNumber} of ${totalPages}`
    doc.text(
      pageText,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' },
    )

    // Add decorative line above footer
    doc.setDrawColor(0, 100, 0) // Dark green
    doc.setLineWidth(0.1)
    doc.line(
      40,
      doc.internal.pageSize.height - 15,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 15,
    )

    // Add smaller company logo in footer if provided
    if (companySettings.logo) {
      try {
        const logoData = companySettings.logo
        if (logoData && logoData.startsWith('data:image')) {
          const [header, base64Data] = logoData.split(',')
          const format = header.split('/')[1].split(';')[0].toUpperCase()

          doc.addImage(
            base64Data,
            format,
            15,
            doc.internal.pageSize.height - 22,
            12,
            12,
            undefined,
            'FAST',
          )
        }
      } catch (error) {
        console.error('Error adding footer logo:', error)
      }
    }

    // Add website if provided
    if (companySettings.website) {
      const websiteUrl = companySettings.website.startsWith('http')
        ? companySettings.website
        : `https://${companySettings.website}`

      doc.setTextColor(0, 0, 238) // Link blue color
      doc.textWithLink(
        companySettings.website,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10,
        {
          align: 'right',
          url: websiteUrl,
        },
      )
    }
  }

  // Enhanced header with letterhead style
  let startY = 20
  const pageWidth = doc.internal.pageSize.width
  const margin = 20

  const companySettings = companySettingsStore.companyInfo
  if (
    companySettings.logo ||
    Object.values(companySettings).some(val => val && val !== '')
  ) {
    // Logo on the left if available
    if (companySettings.logo) {
      try {
        const logoData = companySettings.logo
        if (logoData && logoData.startsWith('data:image')) {
          // Extract format and data correctly
          const [header, base64Data] = logoData.split(',')
          const format = header.split('/')[1].split(';')[0].toUpperCase()

          // Add error handling for image loading
          doc.addImage(
            base64Data, // Use only the base64 data part
            format,
            margin,
            15,
            40,
            40,
            undefined,
            'FAST', // Use FAST compression
          )
        }
      } catch (error) {
        console.error('Error adding header logo:', error)
        // Continue PDF generation even if logo fails
      }
    }

    // Right-aligned company information
    const rightCol = pageWidth - margin
    let headerY = 25

    applyStyle('normal')
    doc.setTextColor(50, 50, 50) // Dark gray for company info

    // Right-aligned text block with improved spacing
    const alignRight = (text: string) => {
      doc.text(text, rightCol, headerY, { align: 'right' })
      headerY += 7
    }

    // Company name in larger, bold font
    if (companySettings.name) {
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      alignRight(companySettings.name)
      headerY += 2 // Extra spacing after company name
    }

    // Reset to normal style for contact details
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')

    if (companySettings.address) {
      alignRight(companySettings.address)
    }

    // Format contact information more elegantly
    if (companySettings.phone && companySettings.email) {
      alignRight(`${companySettings.phone} | ${companySettings.email}`)
    } else {
      if (companySettings.phone) alignRight(companySettings.phone)
      if (companySettings.email) alignRight(companySettings.email)
    }

    if (companySettings.website) {
      doc.setTextColor(0, 102, 204) // Professional blue for website
      alignRight(companySettings.website)
    }

    // Add a more subtle separator line
    doc.setDrawColor(220, 220, 220) // Light gray
    doc.setLineWidth(0.5)
    doc.line(margin, 65, pageWidth - margin, 65)

    startY = 85 // Adjusted content start position
  } else {
    startY = 30
  }

  // Main content with updated timestamp format
  applyStyle('header')
  doc.setFontSize(22)
  doc.text('Transcription Result', margin, startY)

  // Updated timestamp format
  applyStyle('normal')
  doc.setTextColor(130, 130, 130) // Light gray for timestamp
  const date = new Date()
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
  doc.text(formattedDate, pageWidth - margin, startY, { align: 'right' })

  // Full transcription with better paragraph formatting
  applyStyle('normal')
  const fullText = transcription.result.fullTranscription
  const wrappedText = doc.splitTextToSize(fullText, pageWidth - margin * 2)

  doc.text(wrappedText, margin, startY + 15)

  // Add footer to first page
  addFooter(1)

  // Detailed breakdown section with improved formatting
  doc.addPage()
  let yPosition = 20

  applyStyle('subheader')
  doc.text('Detailed Breakdown', margin, yPosition)
  yPosition += 15

  let currentPage = 2
  transcription.result.words.forEach(word => {
    if (yPosition > 250) {
      addFooter(currentPage)
      doc.addPage()
      currentPage++
      yPosition = 20
    }

    const timeText = `${word.start.toFixed(2)}s - ${word.end.toFixed(2)}s:`

    // Timestamp in professional blue
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(52, 73, 94)
    doc.text(timeText, margin, yPosition)

    // Word text with improved spacing
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(75, 85, 99)
    const textX = margin + doc.getTextWidth(timeText) + 4
    const wrappedWordText = doc.splitTextToSize(
      word.text,
      pageWidth - textX - margin,
    )
    doc.text(wrappedWordText, textX, yPosition)

    yPosition += 8 * wrappedWordText.length + 2
  })

  // Add footer to last page
  addFooter(currentPage)

  // Generate PDF with formatted name
  const fileName = `Transcription_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

// Export PDF directly since company settings are managed elsewhere
const handleExportClick = () => {
  exportToPDF()
}
</script>

<template>
  <div class="my-6 p-4 bg-green-50 rounded-lg border border-green-200">
    <div class="flex justify-between items-center mb-3">
      <h2
        class="text-base md:text-lg text-primarydarker font-semibold text-green-800"
      >
        Transcription Result:
      </h2>
      <button
        @click="handleExportClick"
        class="bg-primary hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-lg text-sm flex items-center gap-2 shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586L7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
            clip-rule="evenodd"
          />
        </svg>
        Export as PDF
      </button>
    </div>

    <p
      class="text-sm md:text-base text-justify whitespace-pre-line break-words leading-relaxed"
    >
      {{ transcription.result.fullTranscription }}
    </p>
    <h2
      class="text-base md:text-lg text-primarydarker font-semibold text-green-800 my-3"
    >
      Transcription details per second:
    </h2>
    <div v-for="word in transcription.result.words" :key="word.id">
      <ul class="my-3 ml-4">
        <li class="text-sm text-primary font-semibold list-disc">
          {{ word.start }}s - {{ word.end }}s
        </li>
        <p class="text-sm md:text-base break-words leading-relaxed">
          {{ word.text }}
        </p>
      </ul>
    </div>
  </div>
</template>
