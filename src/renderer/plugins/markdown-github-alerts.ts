import MarkdownItGithubAlerts from 'markdown-it-github-alerts'
import baseCss from 'markdown-it-github-alerts/styles/github-base.css'
import lightCss from 'markdown-it-github-alerts/styles/github-colors-light.css'
import darkCss from 'markdown-it-github-alerts/styles/github-colors-dark-class.css'

import type { Plugin } from '@fe/context'

export default {
  name: 'markdown-github-alerts',
  register: ctx => {
    ctx.markdown.markdown.use(md => {
      MarkdownItGithubAlerts(md)
      md.renderer.rules.alert_open = function (tokens, idx) {
        const { title, type, icon } = tokens[idx].meta
        return ctx.lib.vue.h('div', { class: `markdown-alert markdown-alert-${type}` }, [
          ctx.lib.vue.h('p', { class: 'markdown-alert-title' }, [
            ctx.lib.vue.h('span', { class: 'markdown-alert-icon', innerHTML: icon }),
            title
          ])
        ]) as any
      }
    })

    ctx.view.addStyles(baseCss as unknown as string)
    ctx.view.addStyles(lightCss as unknown as string)

    const darkVars = (darkCss as unknown as string).replace('.dark ', '')
    ctx.view.addStyles(`
      @media screen { html[app-theme=dark] ${darkVars} }
      @media (prefers-color-scheme: dark) { html[app-theme=system] ${darkVars} }
    `)
  }
} as Plugin
