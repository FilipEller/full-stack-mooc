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
      cy.contains('div', /username/i)
        .find('input')
        .type('miguel')
      cy.contains('div', /password/i)
        .find('input')
        .type('secret')
      cy.contains('button', /log in/i).click()

      cy.contains(/logged in/i)
    })

    it('fails with wrong credentials', function () {
      cy.contains('div', /username/i)
        .find('input')
        .type('miguel')
      cy.contains('div', /password/i)
        .find('input')
        .type('oops')
      cy.contains('button', /log in/i).click()

      cy.contains(/incorrect/i)
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'miguel',
        password: 'secret',
      }).then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it.only('A blog can be created', function () {
      cy.contains('button', /add a blog/i).click()
      cy.contains('div', /title/i)
        .find('input')
        .type('End-to-End testing with Cypress')
      cy.contains('div', /author/i)
        .find('input')
        .type('Steve Fuller')
      cy.contains('div', /url/i)
        .find('input')
        .type(
          'https://medium.com/better-practices/end-to-end-testing-with-cypress-bfcd59633f1a'
        )
      cy.contains('button', /submit/i).click()

      cy.contains(/End-to-End testing with Cypress/)
    })
  })
})
