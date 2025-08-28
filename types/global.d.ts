declare global {
  var gamingParadise: {
    isEnabled: boolean
    magicalLevel: number
    agents: string[]
    features: {
      battleArena: boolean
      debateMode: boolean
      magicSystem: boolean
    }
  }

  interface Window {
    gamingParadise: typeof gamingParadise
  }
}

export {}
