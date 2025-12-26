import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  const error = ref<string | null>(null)

  const copyToClipboard = async (text: string): Promise<boolean> => {
    error.value = null
    copied.value = false

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        copied.value = true
        // Reset after 2 seconds
        setTimeout(() => {
          copied.value = false
        }, 2000)
        return true
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 2000)
        return true
      }
    } catch (e) {
      error.value = 'Failed to copy to clipboard'
      console.error('Clipboard error:', e)
      return false
    }
  }

  const copyPromptWithSettings = async (
    prompt: string,
    undesired: string,
    model: string,
    guidance: number,
    steps: number
  ): Promise<boolean> => {
    const fullText = `[Prompt]
${prompt}

[Undesired Content]
${undesired}

[Settings]
Model: ${model}
Guidance: ${guidance}
Steps: ${steps}`

    return copyToClipboard(fullText)
  }

  return {
    copied,
    error,
    copyToClipboard,
    copyPromptWithSettings
  }
}
