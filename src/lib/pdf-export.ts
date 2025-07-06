import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { GeneratedDeck, deckGenerator } from './deck-generator'

export class PDFExporter {
  async exportDeckToPDF(deck: GeneratedDeck): Promise<Blob> {
    try {
      // Generate HTML content
      const htmlContent = deckGenerator.generateDeckHTML(deck)
      
      // Create a temporary container
      const container = document.createElement('div')
      container.innerHTML = htmlContent
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.top = '0'
      container.style.width = '1200px'
      document.body.appendChild(container)

      // Initialize PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1200, 675] // 16:9 aspect ratio
      })

      const slides = container.querySelectorAll('.slide')
      
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement
        
        // Capture slide as canvas
        const canvas = await html2canvas(slide, {
          width: 1200,
          height: 675,
          scale: 1,
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true
        })

        // Convert to image data
        const imgData = canvas.toDataURL('image/png')
        
        // Add page if not first slide
        if (i > 0) {
          pdf.addPage()
        }
        
        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, 0, 1200, 675)
      }

      // Clean up
      document.body.removeChild(container)

      // Return as blob
      const pdfBlob = new Blob([pdf.output('blob')], { type: 'application/pdf' })
      return pdfBlob

    } catch (error) {
      console.error('PDF export error:', error)
      throw new Error('Failed to export PDF. Please try again.')
    }
  }

  async downloadDeckAsPDF(deck: GeneratedDeck, filename?: string): Promise<void> {
    try {
      const pdfBlob = await this.exportDeckToPDF(deck)
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename || `${deck.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('PDF download error:', error)
      throw error
    }
  }

  generateDeckHTML(deck: GeneratedDeck): string {
    return deckGenerator.generateDeckHTML(deck)
  }

  async exportSlideToImage(slideHTML: string, width: number = 1200, height: number = 675): Promise<string> {
    try {
      // Create temporary container
      const container = document.createElement('div')
      container.innerHTML = slideHTML
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.top = '0'
      container.style.width = `${width}px`
      container.style.height = `${height}px`
      document.body.appendChild(container)

      // Capture as canvas
      const canvas = await html2canvas(container, {
        width,
        height,
        scale: 1,
        backgroundColor: '#ffffff',
        logging: false
      })

      // Clean up
      document.body.removeChild(container)

      // Return data URL
      return canvas.toDataURL('image/png')

    } catch (error) {
      console.error('Image export error:', error)
      throw new Error('Failed to export slide as image')
    }
  }
}

export const pdfExporter = new PDFExporter()
export default pdfExporter