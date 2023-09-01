export default interface UploadImageServiceInterface {
  upload(image: Buffer): Promise<string>
}