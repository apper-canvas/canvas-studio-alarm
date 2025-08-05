import assetData from "@/services/mockData/assets.json"

class AssetService {
  constructor() {
    this.assets = [...assetData]
  }

  async getAll() {
    await this.delay(300)
    return [...this.assets]
  }

  async getById(id) {
    await this.delay(200)
    const asset = this.assets.find(a => a.Id === parseInt(id))
    if (!asset) {
      throw new Error("Asset not found")
    }
    return { ...asset }
  }

  async getByType(type) {
    await this.delay(250)
    return this.assets.filter(a => a.type === type)
  }

  async create(assetData) {
    await this.delay(400)
    const newAsset = {
      ...assetData,
      Id: Math.max(...this.assets.map(a => a.Id)) + 1
    }
    this.assets.push(newAsset)
    return { ...newAsset }
  }

  async update(id, updates) {
    await this.delay(300)
    const index = this.assets.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Asset not found")
    }
    this.assets[index] = { ...this.assets[index], ...updates }
    return { ...this.assets[index] }
  }

  async delete(id) {
    await this.delay(250)
    const index = this.assets.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Asset not found")
    }
    this.assets.splice(index, 1)
    return true
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new AssetService()