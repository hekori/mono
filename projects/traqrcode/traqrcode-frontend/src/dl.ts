import fileDownload from 'js-file-download'

export const dl = async (
  data: Buffer,
  fileName: string,
  contentType = 'application/pdf'
) => {
  console.log('called fileDownload')
  console.log('data', data)
  const blob = new Blob([data], {
    type: contentType,
  })
  console.log('data', data)
  await fileDownload(blob, fileName)
}
