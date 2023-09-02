export interface UploadImageProps {
  image: Buffer
}

export default interface UploadImageServiceInterface {
  upload(input: UploadImageProps): Promise<string>
}