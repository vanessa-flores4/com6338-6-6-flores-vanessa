# Hamburger Menu Assignment

(**NOTE:** View a rendered version of this file in VS Code with `ctrl-shift-v` or `cmd-shift-v`)

&nbsp;
## Instructions

For this assignment, you will need to implement a hamburger menu within the provided website. Your hamburger menu should only render on smaller screen sizes (those smaller than 800 pixels).

To hide or show the hamburger menu, you will need to toggle the `.show-menu` class on the `.hamburger-menu` element.

&nbsp;
### **Setup**

The provided `index.html` and `style.css` already contain all of the code needed to complete this assignment. Showing, hiding, and animating the menu as well as the media query code is already included. **Please do not modify either of these files. Add your code to `index.js` ONLY.**

That said, it will be helpful to study the contents of `index.html` and `style.css` to understand how the hamburger menu works.

&nbsp;
### **App Behavior**

The hamburger menu should display the following behavior:

1. When the `button.hamburger-btn` element is clicked on smaller screens, the hamburger menu should open/close. Again, toggling the `show-menu` class on the `.hamburger-menu` element should show/hide the menu.
1. Clicking outside of `.hamburger-menu` should close the menu if it is open.
1. Clicking inside of `.hamburger-menu` should NOT close the menu.
1. Pressing the Escape key when the menu is open should close the menu and focus `button.hamburger-btn`.
1. Under all circumstances, when the menu is open, `aria-expanded` should be set to `true` on `button.hamburger-btn`, and set to `false` when the menu is closed.

The included automated tests check for the behavior listed above.

&nbsp;
## Testing

Automated tests are included with this assignment. Click the "run tests" button in the bottom right of the screen to run the test suite. To close the tests, click "close tests". To receive full credit, all automated tests must pass.

&nbsp;
## Requirements for full credit

To receive full credit for this assignment, your program MUST:

  * Be implemented according to the above [instructions](#instructions)
  * Pass all automated tests.
  * Be deployed to GitHub Pages.

&nbsp;
## Submission

When submitting this assignment, please include **BOTH**:

  * A link to the assignment's GitHub repository.
  * A link to the assignment's deployed, live site on GitHub Pages.