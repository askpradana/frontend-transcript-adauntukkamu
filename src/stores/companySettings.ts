import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CompanyInfo {
  name: string
  address: string
  phone: string
  email: string
  website: string
  logo?: string | null // Store logo as base64 string
}

/**
 * Store for managing company information used in PDF exports
 * Persists company details across sessions
 */
export const useCompanySettingsStore = defineStore('companySettings', () => {
  // Initialize from localStorage if available
  const storedInfo = localStorage.getItem('companyInfo')
  const initialInfo: CompanyInfo = storedInfo
    ? JSON.parse(storedInfo)
    : {
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        logo: null,
      }

  const companyInfo = ref<CompanyInfo>(initialInfo)

  /**
   * Updates company information and persists to localStorage
   * @param info Updated company information
   */
  function updateCompanyInfo(info: CompanyInfo) {
    companyInfo.value = info
    localStorage.setItem('companyInfo', JSON.stringify(info))
  }

  /**
   * Converts and stores logo file as base64 string
   * @param file Logo image file
   */
  async function setLogo(file: File | null) {
    if (!file) {
      companyInfo.value.logo = null
      localStorage.setItem('companyInfo', JSON.stringify(companyInfo.value))
      return
    }

    // Add file size and type validation
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      throw new Error('Logo file size must be less than 5MB')
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please use JPG, PNG, or GIF')
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        companyInfo.value.logo = reader.result as string
        localStorage.setItem('companyInfo', JSON.stringify(companyInfo.value))
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  return {
    companyInfo,
    updateCompanyInfo,
    setLogo,
  }
})
