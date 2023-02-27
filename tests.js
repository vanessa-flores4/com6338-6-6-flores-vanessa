const head = document.querySelector('head')
const body = document.querySelector('body')

// mocha CSS link
const mochaCSSPath = "https://cdnjs.cloudflare.com/ajax/libs/mocha/8.3.2/mocha.min.css"
const mochaCSSLinkEl = document.createElement('link')
mochaCSSLinkEl.rel = 'stylesheet'
mochaCSSLinkEl.href = mochaCSSPath
head.prepend(mochaCSSLinkEl)

// custom styles for mocha runner
const mochaStyleEl = document.createElement('style')
mochaStyleEl.innerHTML =
  `#mocha {
    font-family: sans-serif;
    position: fixed;
    overflow-y: auto;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 48px 0 96px;
    background: white;
    color: black;
    display: none;
    margin: 0;
  }
  #mocha * {
    letter-spacing: normal;
    text-align: left;
  }
  #mocha .replay {
    pointer-events: none;
  }
  #mocha-test-btn {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 1001;
    background-color: #007147;
    border: #009960 2px solid;
    color: white;
    font-size: initial;
    border-radius: 4px;
    padding: 12px 24px;
    transition: 200ms;
    cursor: pointer;
  }
  #mocha-test-btn:hover:not(:disabled) {
    background-color: #009960;
  }
  #mocha-test-btn:disabled {
    background-color: grey;
    border-color: grey;
    cursor: initial;
    opacity: 0.7;
  }`
head.appendChild(mochaStyleEl)

// mocha div
const mochaDiv = document.createElement('div')
mochaDiv.id = 'mocha'
body.appendChild(mochaDiv)

// run tests button
const testBtn = document.createElement('button')
testBtn.textContent = "Loading Tests"
testBtn.id = 'mocha-test-btn'
testBtn.disabled = true
body.appendChild(testBtn)

const scriptPaths = [
  "https://cdnjs.cloudflare.com/ajax/libs/mocha/8.3.2/mocha.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/chai/4.3.4/chai.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/sinon.js/10.0.1/sinon.min.js",
  // "jsdom.js" // npx browserify _jsdom.js --standalone JSDOM -o jsdom.js
]
const scriptTags = scriptPaths.map(path => {
  const scriptTag = document.createElement('script')
  scriptTag.type = 'text/javascript'
  scriptTag.src = path
  return scriptTag
})

let loaded = 0
if (localStorage.getItem('test-run')) {
  // lazy load test dependencies
  scriptTags.forEach(tag => {
    body.appendChild(tag)
    tag.onload = function () {
      if (loaded !== scriptTags.length - 1) {
        loaded++
        return
      }
      testBtn.textContent = 'Run Tests'
      testBtn.disabled = false
      testBtn.onclick = __handleClick
      runTests()
    }
  })
} else {
  testBtn.textContent = 'Run Tests'
  testBtn.disabled = false
  testBtn.onclick = __handleClick
}

function __handleClick() {
  if (!localStorage.getItem('test-run') && this.textContent === 'Run Tests') {
    localStorage.setItem('test-run', true)
  } else {
    localStorage.removeItem('test-run')
  }
  window.location.reload()
}

function runTests() {
  testBtn.textContent = 'Running Tests'
  testBtn.disabled = true
  mochaDiv.style.display = 'block'
  body.style.overflow = 'hidden'

  mocha.setup("bdd");
  const expect = chai.expect;

  describe("Hamburger Menu", function() {
    const hamburgerBtn = document.querySelector('.hamburger-btn')
    const hamburgerMenu = document.querySelector('.hamburger-menu')
    const openMenu = () => {
      hamburgerMenu.classList.add('show-menu')
      hamburgerBtn.setAttribute('aria-expanded', true)
    }
    const closeMenu = () => {
      document.activeElement.blur()
      hamburgerMenu.classList.remove('show-menu')
      hamburgerBtn.setAttribute('aria-expanded', false)
    }
    const pressEscape = () => document.dispatchEvent(new KeyboardEvent('keyup', {
      key: "Escape",
      keyCode: 27,
      which: 27,
      code: "Escape",
     }))
    before(() => {
      document.querySelector('style').textContent += `
        .hamburger-btn {
          display: block;
        }
        .hamburger-menu li {
          visibility: hidden;
        }
        .hamburger-menu.show-menu li {
          visibility: visible;
        }
      `
    })
    after(() => {
      testBtn.textContent = 'Close Tests'
      testBtn.disabled = false
    })
    afterEach(closeMenu)
    const menuIsOpen = () => hamburgerMenu.classList.contains('show-menu')
    it('Should not have menu open when page loads', () => {
      expect(menuIsOpen()).to.be.false
    })
    it('Should open menu when clicking the hamburger button', () => {
      hamburgerBtn.click()
      expect(menuIsOpen()).to.be.true
    })
    it('Should set aria-expanded="true" to hamburger button when menu is opened', () => {
      hamburgerBtn.click()
      expect(hamburgerBtn.getAttribute('aria-expanded')).to.eq('true')
    })
    it('Should close menu when clicking the hamburger button', () => {
      openMenu()
      hamburgerBtn.click()
      expect(menuIsOpen()).to.be.false
    })
    it('Should set aria-expanded="false" to hamburger button when menu is closed', () => {
      openMenu()
      hamburgerBtn.click()
      expect(hamburgerBtn.getAttribute('aria-expanded')).to.eq('false')
    })
    it('Should NOT open menu when clicking things other than the hamburger button', () => {
      document.querySelector('header').click()
      expect(menuIsOpen()).to.be.false
      document.querySelector('.banner').click()
      expect(menuIsOpen()).to.be.false
      document.querySelector('footer').click()
      expect(menuIsOpen()).to.be.false
      document.querySelector('section button').click()
      expect(menuIsOpen()).to.be.false
    })
    it('Should close menu when clicking outside of the menu', () => {
      openMenu()
      document.querySelector('.banner').click()
      expect(menuIsOpen()).to.be.false
      openMenu()
      document.querySelector('footer').click()
      expect(menuIsOpen()).to.be.false
      openMenu()
      document.querySelector('section').click()
      expect(menuIsOpen()).to.be.false
    })
    it('Should NOT close menu when clicking inside of the menu', () => {
      openMenu()
      document.querySelector('.hamburger-menu').click()
      document.querySelector('.hamburger-menu li').click()
      document.querySelector('.hamburger-menu li:nth-of-type(3) a').click()
      expect(menuIsOpen()).to.be.true
    })
    it('Should close menu when pressing escape and menu items are NOT focused', () => {
      openMenu()
      pressEscape()
      expect(menuIsOpen()).to.be.false
    })
    it('Should close menu and focus hamburger button when pressing escape and menu items are focused', () => {
      openMenu()
      document.querySelector('.hamburger-menu a').focus()
      pressEscape()
      expect(document.activeElement).to.eq(hamburgerBtn)
      expect(menuIsOpen()).to.be.false
    })
    it('Should NOT open menu when pressing escape', () => {
      pressEscape()
      expect(menuIsOpen()).to.be.false
    })
  });

  mocha.run();
}