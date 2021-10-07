import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      // @ts-expect-error
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    this.client.on('open', () => console.log('Connected to database'))
    this.client.on('topologyClosed', () => {
      console.error('Disconnected from database!')
      this.client = null
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) await this.connect(this.uri)
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({},collectionWithoutId, { id: _id })
  }

}
