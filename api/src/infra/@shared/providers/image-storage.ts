export interface ImageProps {
  name: string
  file: Buffer
}

export default interface StorageProviderInterface {
  uploadImage(image: ImageProps): Promise<string>
}
