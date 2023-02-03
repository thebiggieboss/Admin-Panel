const ImageUrl = process.env.IMAGE_URL
const GetImageUrl = (key) => {
  return `${ImageUrl}?key=${key}`
}

export {
  ImageUrl,
  GetImageUrl
}
