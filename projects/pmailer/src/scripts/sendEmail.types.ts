export interface SendMailArgs {
  sender: string
  receiver: string
  subject: string
  body: string
  dkimDomainName?: string
  dkimPrivateKey?: string
}
