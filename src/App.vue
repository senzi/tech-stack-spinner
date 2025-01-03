<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface TechStack {
  name: string
  icon: string
}

const frontendTechs: TechStack[] = [
  { name: 'Vue 3', icon: 'logos:vue' },
  { name: 'React', icon: 'logos:react' },
  { name: 'Angular', icon: 'logos:angular-icon' },
  { name: 'Svelte', icon: 'logos:svelte-icon' },
  { name: 'Solid', icon: 'logos:solidjs-icon' }
]

const backendTechs: TechStack[] = [
  { name: 'Express', icon: 'logos:express' },
  { name: 'Django', icon: 'logos:django-icon' },
  { name: 'Spring Boot', icon: 'logos:spring-icon' },
  { name: 'FastAPI', icon: 'logos:fastapi-icon' },
  { name: 'Nest.js', icon: 'logos:nestjs' }
]

const databaseTechs: TechStack[] = [
  { name: 'MySQL', icon: 'logos:mysql' },
  { name: 'PostgreSQL', icon: 'logos:postgresql' },
  { name: 'MongoDB', icon: 'logos:mongodb-icon' },
  { name: 'Redis', icon: 'logos:redis' },
  { name: 'SQLite', icon: 'logos:sqlite' }
]

const selectedCategories = ref({
  frontend: true,
  backend: true,
  database: true
})

const spinning = ref(false)
const showResult = ref(false)
const selectedTechs = ref<Record<string, TechStack | null>>({
  frontend: null,
  backend: null,
  database: null
})

const visibleCategories = computed(() => {
  return Object.entries(selectedCategories.value)
    .filter(([_, value]) => value)
    .map(([key]) => key)
})

const spinTechs = async () => {
  if (spinning.value) return
  spinning.value = true
  showResult.value = false
  
  for (const category of visibleCategories.value) {
    const techs = category === 'frontend' ? frontendTechs :
                 category === 'backend' ? backendTechs :
                 databaseTechs
    
    // 随机切换动画
    for (let i = 0; i < 10; i++) {
      selectedTechs.value[category] = techs[Math.floor(Math.random() * techs.length)]
      await new Promise(r => setTimeout(r, 100))
    }
  }
  
  spinning.value = false
  showResult.value = true
}
</script>

<template>
  <div class="container">
    <h1>{{ t('title') }}</h1>
    
    <!-- 类别选择区域 -->
    <div class="category-selector">
      <h2>{{ t('categories.select') }}</h2>
      <p class="description">{{ t('categories.description') }}</p>
      <div class="category-buttons">
        <button 
          v-for="(value, category) in selectedCategories" 
          :key="category"
          :class="['category-btn', { active: value }]"
          @click="selectedCategories[category] = !selectedCategories[category]"
        >
          <Icon 
            :icon="category === 'frontend' ? 'material-symbols:code-blocks-outline' : 
                  category === 'backend' ? 'material-symbols:dns-outline' : 
                  'material-symbols:database'" 
            class="category-icon" 
          />
          {{ t(category) }}
        </button>
      </div>
    </div>

    <!-- 技术展示区域 -->
    <div class="tech-display" v-if="visibleCategories.length">
      <div v-for="category in visibleCategories" :key="category" class="tech-card">
        <template v-if="selectedTechs[category]">
          <div class="icon-wrapper">
            <Icon :icon="selectedTechs[category]?.icon || ''" />
          </div>
          <div class="tech-name">{{ selectedTechs[category]?.name }}</div>
        </template>
        <div v-else class="placeholder">
          {{ t(category) }}
        </div>
      </div>
    </div>

    <button 
      @click="spinTechs" 
      :disabled="spinning || !visibleCategories.length"
      class="spin-button"
    >
      {{ spinning ? t('spinning') : t('start') }}
    </button>

    <!-- 结果展示区域 -->
    <div v-if="showResult" class="result-card">
      <h2>{{ t('result.title') }}</h2>
      <p class="result-summary">{{ t('result.summary') }}</p>
      <div class="result-stack">
        <template v-if="selectedTechs.frontend && selectedCategories.frontend">
          <div class="result-item">
            <div class="tech-description">{{ t('result.frontend') }}</div>
            <div class="tech-badge">
              <Icon :icon="selectedTechs.frontend.icon" class="result-icon" />
              <span class="tech-name">{{ selectedTechs.frontend.name }}</span>
            </div>
          </div>
        </template>
        <template v-if="selectedTechs.backend && selectedCategories.backend">
          <div class="result-item">
            <div class="tech-description">{{ t('result.backend') }}</div>
            <div class="tech-badge">
              <Icon :icon="selectedTechs.backend.icon" class="result-icon" />
              <span class="tech-name">{{ selectedTechs.backend.name }}</span>
            </div>
          </div>
        </template>
        <template v-if="selectedTechs.database && selectedCategories.database">
          <div class="result-item">
            <div class="tech-description">{{ t('result.database') }}</div>
            <div class="tech-badge">
              <Icon :icon="selectedTechs.database.icon" class="result-icon" />
              <span class="tech-name">{{ selectedTechs.database.name }}</span>
            </div>
          </div>
        </template>
      </div>
      <p class="result-footer">{{ t('result.footer') }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.category-selector {
  margin: 2rem 0;
}

.description {
  color: #666;
  margin-bottom: 1rem;
}

.category-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 120px;
}

.category-btn .category-icon {
  font-size: 1.5rem;
  opacity: 0.7;
}

.category-btn.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.category-btn.active .category-icon {
  opacity: 1;
}

.tech-display {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
}

.tech-card {
  width: 200px;
  height: 200px;
  border: 2px solid #ddd;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  transition: all 0.3s;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.icon-wrapper :deep(svg) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tech-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.placeholder {
  color: #666;
  font-size: 1.2rem;
}

.spin-button {
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background: #42b883;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 150px;
}

.spin-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.spin-button:not(:disabled):hover {
  background: #3aa876;
}

.result-card {
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 12px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%);
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.result-summary {
  color: #666;
  font-size: 1.1rem;
  margin: 1rem 0 2rem;
}

.result-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.result-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tech-badge {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  background: white;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.tech-badge:hover {
  transform: translateY(-2px);
}

.result-icon {
  width: 32px;
  height: 32px;
}

.tech-name {
  font-weight: bold;
  color: #42b883;
  font-size: 1.2rem;
}

.tech-description {
  color: #666;
}

.result-footer {
  margin-top: 2rem;
  color: #42b883;
  font-weight: 500;
  font-size: 1.1rem;
}
</style>
