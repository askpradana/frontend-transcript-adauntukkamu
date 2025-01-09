<script setup lang="ts">
import type { ResultTranscribeInterface } from '@/types/types'
import jsPDF from 'jspdf'

const props = defineProps<{
  modelValue: string
}>()

const transcription: ResultTranscribeInterface = JSON.parse(props.modelValue)

/**
 * Exports the transcription result to a PDF file
 * Includes both full transcription and detailed breakdown
 */
const exportToPDF = () => {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
  })

  // Add title with better spacing
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Transcription Result', 20, 20)

  // Add full transcription with improved wrapping
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const fullText = transcription.result.fullTranscription
  const pageWidth = doc.internal.pageSize.width
  const margin = 20
  const wrappedText = doc.splitTextToSize(fullText, pageWidth - margin * 2)

  // Calculate if we need a new page for detailed breakdown
  const textHeight = doc.getTextDimensions(wrappedText).h
  let yPosition = 30

  doc.text(wrappedText, margin, yPosition)
  yPosition = Math.min(yPosition + textHeight + 20, 270)

  // Add detailed breakdown with better page management
  doc.addPage()
  yPosition = 20
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Detailed Breakdown:', margin, yPosition)

  yPosition += 10
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')

  transcription.result.words.forEach(word => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage()
      yPosition = 20
    }

    const timeText = `${word.start.toFixed(1)}s - ${word.end.toFixed(1)}s:`
    const wordText = word.text

    // Add time stamp in bold
    doc.setFont('helvetica', 'bold')
    doc.text(timeText, margin, yPosition)

    // Add transcribed text in normal font
    doc.setFont('helvetica', 'normal')
    const textX = margin + doc.getTextWidth(timeText) + 2
    const wrappedWordText = doc.splitTextToSize(
      wordText,
      pageWidth - textX - margin,
    )
    doc.text(wrappedWordText, textX, yPosition)

    yPosition += 7 * wrappedWordText.length
  })

  doc.save('transcription.pdf')
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
        @click="exportToPDF"
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
