import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import UaParser from 'ua-parser-js'

export const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'

export class UA {
  private _ua: string
  private _parsed: UaParser

  constructor(ua: string) {
    this._ua = ua
    this._parsed = new UaParser(ua)
  }

  reset(ua: string) {
    this._ua = ua
    this._parsed = new UaParser(ua)
  }

  original(): string {
    return this._ua
  }

  deviceType(): UaParser.IDevice {
    return this._parsed.getDevice()
  }

  os(): UaParser.IOS {
    return this._parsed.getOS()
  }

  browser(): UaParser.IBrowser {
    return this._parsed.getBrowser()
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $ua: UA
  }
}

declare module '@nuxt/types' {
  interface Context {
    $ua: UA
  }
}

export default ({ app, req }: Context, inject: Inject) => {
  let userAgent = DEFAULT_USER_AGENT
  if (typeof req !== 'undefined') {
    userAgent = req.headers!['user-agent'] as string
  } else if (typeof navigator !== 'undefined') {
    userAgent = navigator.userAgent
  }

  const ua = new UA(userAgent)
  app.ua = ua
  inject('ua', ua)
}
