export interface AuthUser {
  id: string
  name: string
  email: string
  picture: string
  provider: 'google' | 'email'
}

export interface GoogleCredentialResponse {
  credential: string
  select_by?: string
}

export interface GoogleAccountsId {
  initialize: (config: {
    client_id: string
    callback: (response: GoogleCredentialResponse) => void
    auto_select?: boolean
    cancel_on_tap_outside?: boolean
  }) => void
  renderButton: (
    parent: HTMLElement,
    options: {
      theme?: 'outline' | 'filled_blue' | 'filled_black'
      size?: 'large' | 'medium' | 'small'
      text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
      shape?: 'rectangular' | 'pill' | 'circle' | 'square'
      width?: number | string
      logo_alignment?: 'left' | 'center'
    },
  ) => void
  prompt: () => void
  disableAutoSelect: () => void
  revoke: (hint: string, callback?: () => void) => void
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId
      }
    }
  }
}
