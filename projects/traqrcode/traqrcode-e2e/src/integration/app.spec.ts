import { getCreateQRCodeButton } from '../support/app.po'

describe('traqrcode', () => {
  beforeEach(() => cy.visit('/'))

  it('should display the frontpage', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword')

    // Function helper example, see `../support/app.po.ts` file
    getCreateQRCodeButton().contains('Create QR Code')
  })
})
