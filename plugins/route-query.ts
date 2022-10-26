import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export type NormalizedQuery = Record<string, string[] | string | null>

export type PushQuery = (
  query: Record<string, string | number | boolean | null | undefined>
) => void
export type ReplaceQuery = (
  query: Record<string, string | number | boolean | null | undefined>
) => void
export type NormalizeQuery = (
  query: Record<string, string | (string | null)[]>
) => NormalizedQuery

declare module 'vue/types/vue' {
  interface Vue {
    $pushQuery: PushQuery
    $replaceQuery: ReplaceQuery
    $normalizeQuery: NormalizeQuery
  }
}

declare module '@nuxt/types' {
  interface Context {
    $pushQuery: PushQuery
    $replaceQuery: ReplaceQuery
    $normalizeQuery: NormalizeQuery
  }
}

export default (ctx: Context, inject: Inject) => {
  function pushQuery(
    query: Record<string, string | number | boolean | null | undefined>
  ) {
    ctx.app.router?.push({
      query: Object.entries({ ...ctx.query, ...query })
        .filter(([_, value]) => value != null)
        .reduce(
          (carry, [key, value]) => Object.assign(carry, { [key]: value }),
          {}
        ),
    })
  }

  function replaceQuery(
    query: Record<string, string | number | boolean | null | undefined>
  ) {
    ctx.app.router?.replace({
      query: Object.entries({ ...ctx.query, ...query })
        .filter(([_, value]) => value)
        .reduce(
          (carry, [key, value]) => Object.assign(carry, { [key]: value }),
          {}
        ),
    })
  }

  function normalizeQuery(
    query: Record<string, string | (string | null)[]>
  ): NormalizedQuery {
    return Object.fromEntries(
      Object.entries(query).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.filter((v) => v)]
        }
        if (value === '' || value === null || typeof value === 'undefined') {
          return [key, null]
        }
        if (typeof value === 'string') {
          value = value.split(',')
        }
        value = value.filter((v) => v) as string[]
        if (value.length === 1) {
          return [key, value[0]]
        }
        return [key, value]
      })
    ) as any
  }

  ctx.$pushQuery = pushQuery
  inject('pushQuery', pushQuery)

  ctx.$replaceQuery = replaceQuery
  inject('replaceQuery', replaceQuery)

  ctx.$normalizeQuery = normalizeQuery
  inject('normalizeQuery', normalizeQuery)
}
