describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Miguel de Cervantes',
      username: 'miguel',
      password: 'secret',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('form', /log in/i).contains('button', /log in/i)
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('div', /username/i).find('input').type('miguel')
      cy.contains('div', /password/i).find('input').type('secret')
      cy.contains('button', /log in/i).click()

      cy.contains(/logged in/i)
    })

    it('fails with wrong credentials', function () {
      cy.contains('div', /username/i).find('input').type('miguel')
      cy.contains('div', /password/i).find('input').type('oops')
      cy.contains('button', /log in/i).click()

      cy.contains(/incorrect/i)
    })
  })
})
