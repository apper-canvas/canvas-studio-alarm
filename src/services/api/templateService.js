import templateData from "@/services/mockData/templates.json"

class TemplateService {
  constructor() {
    this.templates = [...templateData]
  }

  async getAll() {
    await this.delay(350)
    return [...this.templates]
  }

  async getById(id) {
    await this.delay(200)
    const template = this.templates.find(t => t.Id === parseInt(id))
    if (!template) {
      throw new Error("Template not found")
    }
    return { ...template }
  }

  async getByCategory(category) {
    await this.delay(300)
    return this.templates.filter(t => t.category === category)
  }

  async create(templateData) {
    await this.delay(400)
    const newTemplate = {
      ...templateData,
      Id: Math.max(...this.templates.map(t => t.Id)) + 1,
      downloads: 0
    }
    this.templates.push(newTemplate)
    return { ...newTemplate }
  }

  async update(id, updates) {
    await this.delay(300)
    const index = this.templates.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Template not found")
    }
    this.templates[index] = { ...this.templates[index], ...updates }
    return { ...this.templates[index] }
  }

  async delete(id) {
    await this.delay(250)
    const index = this.templates.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Template not found")
    }
    this.templates.splice(index, 1)
    return true
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new TemplateService()