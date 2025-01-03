import { createI18n } from 'vue-i18n'
import axios from 'axios'

const messages = {
  en: {
    title: 'Tech Stack Generator',
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    start: 'Start',
    spinning: 'Spinning...',
    result: {
      title: 'Your Perfect Stack!',
      summary: '🎉 Congratulations! Here\'s your destiny stack:',
      frontend: 'Rock the frontend with',
      backend: 'Power your backend using',
      database: 'Store your data in',
      footer: 'Time to start coding! This stack is waiting for you! 🚀'
    },
    categories: {
      select: 'Select Categories',
      description: 'What components do you need?'
    }
  },
  zh: {
    title: '技术栈生成器',
    frontend: '前端',
    backend: '后端',
    database: '数据库',
    start: '开始选择',
    spinning: '选择中...',
    result: {
      title: '你的完美技术栈！',
      summary: '🎉 恭喜！这就是命中注定的技术组合：',
      frontend: '用强大的',
      backend: '采用炫酷的',
      database: '数据当然用',
      footer: '快来开始编码吧！这个技术栈已经等不及要与你合作了！🚀'
    },
    categories: {
      select: '选择组件',
      description: '你需要哪些组件？'
    }
  },
  ja: {
    title: '技術スタックジェネレーター',
    frontend: 'フロントエンド',
    backend: 'バックエンド',
    database: 'データベース',
    start: '開始',
    spinning: '選択中...',
    result: {
      title: 'パーフェクトな技術スタック！',
      summary: '🎉 おめでとう！運命の技術スタックの組み合わせ：',
      frontend: 'フロントエンドには素晴らしい',
      backend: 'バックエンドには強力な',
      database: 'データベースには信頼性の高い',
      footer: 'さあ、コーディングを始めましょう！この技術スタックがあなたを待っています！🚀'
    },
    categories: {
      select: 'カテゴリー選択',
      description: '必要なコンポーネントは？'
    }
  }
}

// 创建i18n实例
const i18n = createI18n({
  legacy: false,
  locale: 'zh', // 默认使用中文
  fallbackLocale: 'en',
  messages
})

// 异步检测并更新语言
export async function detectAndUpdateLocale(i18n: any) {
  try {
    const response = await axios.get('https://ipapi.co/json/')
    const countryCode = response.data.country_code.toLowerCase()
    
    let locale = 'zh' // 保持中文为默认值
    if (countryCode === 'jp') {
      locale = 'ja'
    } else if (!['cn', 'tw', 'hk'].includes(countryCode)) {
      locale = 'en'
    }

    if (locale !== i18n.global.locale.value) {
      i18n.global.locale.value = locale
    }
  } catch (error) {
    console.error('Failed to detect locale:', error)
  }
}

export { i18n }
