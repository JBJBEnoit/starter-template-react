# Frontend Project Starter Template

A starter template for building, testing, and deploying web projects using Vite, Cypress, GitHub Actions, and GitHub Pages.

This repository provides a working development environment and automated deployment pipeline so you can focus on building your project instead of configuring everything from scratch.

There are two versions of this template:

- **Vanilla JavaScript:** HTML, CSS, and JavaScript without a UI framework.
- **React:** React components and JSX, powered by Vite.

The development workflow and deployment process are largely the same in both versions.

---

## 1. Getting Started

### Prerequisites

Install the following software:

- [Node.js](https://nodejs.org/) — includes npm, which installs dependencies and runs project scripts.
- [Git](https://git-scm.com/) — for version control.
- [Visual Studio Code](https://code.visualstudio.com/) — recommended code editor.
- A [GitHub](https://github.com/) account — for hosting your repository and deploying your website.

### Create your project

1. Create your own repository from the starter template, or clone the repository if instructed to do so.
2. Open the project folder in VS Code.
3. Open a terminal in VS Code.
4. Install the project's dependencies:

   ```bash
   npm ci
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed in the terminal, usually `http://localhost:5173`.

The development server updates the browser as you work, making it easy to experiment with your code.

### Rename and customize your project

Before you begin, update the following:

- **Project name:** Change the `name` field in `package.json` to identify your project.
- **Page title:** Update the `<title>` element in `index.html`.
- **Page content:** Replace the example content with your own.
- **Styles and assets:** Replace the starter styles, images, and other example resources as needed.
- **README:** Replace this document with project-specific information when appropriate.

For the React template, modify the React components and application entry point rather than treating `index.html` as the main place to build the interface.

### Configure GitHub Pages

If you're deploying to a repository-based GitHub Pages URL, such as:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

update the `base` option in `vite.config.js`:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/YOUR-REPOSITORY/',
})
```

Replace `YOUR-REPOSITORY` with your actual repository name, including the leading and trailing slashes.

If the site is published at the root of a domain, use `base: '/'` instead.

**Important:** The Vite base path must match the URL where your website will be hosted. An incorrect path can prevent JavaScript, CSS, and other assets from loading after deployment.

Reference: [Vite — Deploying a Static Site](https://vite.dev/guide/static-deploy.html)

---

## 2. Understanding the Project

### Vite

Vite is the development server and build tool.

During development, it serves your application locally. When you're ready to publish, it processes your source files and produces an optimized production version.

The resulting files are placed in the `dist/` directory.

You generally don't need to edit the generated `dist/` files. Edit the source files and let Vite regenerate the production output.

Reference: [Vite Documentation](https://vite.dev/guide/)

### npm and package.json

The `package.json` file describes your project, its dependencies, and the commands available to you.

For example:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test:e2e": "cypress run"
  }
}
```

These scripts can be run using `npm run`, as in `npm run build`.

The `package-lock.json` file records the dependency versions used to install the project consistently. Commit this file to Git.

Use `npm ci` to install the locked dependencies in a clean environment, such as GitHub Actions.

Reference: [npm Documentation](https://docs.npmjs.com/)

### Cypress

Cypress is an end-to-end testing tool. It opens a browser and tests your application as a user would interact with it.

For example, a test might check that:

- The homepage loads.
- A heading appears.
- A navigation link opens the correct page.
- A form validates its inputs.
- A button performs the expected action.

Tests are stored in the `cypress/e2e/` directory.

Reference: [Cypress Documentation](https://docs.cypress.io/)

### GitHub Actions

GitHub Actions automates tasks when code is pushed or a pull request is opened.

The workflow in `.github/workflows/` defines the steps to run. In this template, those steps include installing dependencies, building the project, running Cypress tests, and deploying the production output when appropriate.

Reference: [GitHub Actions Documentation](https://docs.github.com/en/actions)

### GitHub Pages

GitHub Pages hosts the generated static website.

The deployment workflow publishes the contents of `dist/`, not the entire development repository. This keeps development tools, source files that aren't part of the build, and test files out of the published website.

Reference: [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

## 3. Everyday Development

### Run the development server

```bash
npm run dev
```

Keep the terminal running while you work. Stop the server with `Ctrl+C`.

### Install a dependency

For example, to add a library to your project:

```bash
npm install PACKAGE-NAME
```

To install a tool used only during development or testing:

```bash
npm install -D PACKAGE-NAME
```

Replace `PACKAGE-NAME` with the package you want to install.

### Build the production version

```bash
npm run build
```

Vite generates the production files in `dist/`. If the build fails, address the errors before continuing.

### Preview the production version

```bash
npm run preview
```

Open the local URL printed in the terminal.

This is useful for checking the production build before deployment. The preview server is for local verification, not production hosting.

### Run the automated tests

```bash
npm run test:e2e
```

Cypress runs the tests in the terminal and reports whether they pass or fail.

For interactive test development, launch Cypress using:

```bash
npx cypress open
```

---

## 4. Writing Cypress Tests

Tests help catch regressions when you change your application.

Create test files inside `cypress/e2e/`. For example, `homepage.cy.js`:

```js
describe('Homepage', () => {
  it('loads and displays the main heading', () => {
    cy.visit('/')

    cy.get('h1').should('be.visible')
  })
})
```

This test visits the homepage and checks that an `h1` element is visible.

### A few useful Cypress commands

| Command | Purpose |
|---|---|
| `cy.visit('/')` | Visit the application homepage |
| `cy.get('h1')` | Find elements using a CSS selector |
| `.should('be.visible')` | Assert that an element is visible |
| `.should('contain', 'Welcome')` | Check that an element contains text |
| `.click()` | Click an element |
| `.type('Hello')` | Enter text into an input |

For example:

```js
it('allows the user to enter a name', () => {
  cy.visit('/')

  cy.get('[data-cy="name-input"]')
    .type('Alex')
    .should('have.value', 'Alex')
})
```

This assumes the input has the attribute `data-cy="name-input"`.

### Use reliable selectors

Where practical, give important interactive elements dedicated test attributes:

```html
<button data-cy="save-button">Save</button>
```

Then select the button in Cypress:

```js
cy.get('[data-cy="save-button"]').click()
```

This is generally more robust than selecting an element by a CSS class used for styling.

### What should you test?

Start with a few meaningful user journeys:

1. The homepage loads successfully.
2. Important navigation works.
3. Forms accept valid input and handle invalid input.
4. Interactive controls behave correctly.
5. Key application features continue working after changes.

Avoid writing tests just to increase the number of tests. Focus on behavior that matters to users.

Further reading:

- [Cypress — Writing Your First Test](https://docs.cypress.io/app/get-started/your-first-test)
- [Cypress — Best Practices](https://docs.cypress.io/app/core-concepts/best-practices)
- [Cypress — Selectors](https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements)

---

## 5. GitHub Actions and Deployment

The provided workflow automates the steps required to validate and publish your project.

The general process is:

1. GitHub checks out your repository.
2. Node.js is configured and dependencies are installed.
3. Vite builds the application.
4. Cypress tests the production build.
5. The build output is uploaded as a GitHub Pages artifact.
6. The deployment job publishes the artifact when the configured branch and event conditions allow it.

The deployment job depends on the successful completion of the build-and-test job. A failed test should prevent deployment.

### Configure GitHub Pages

In your repository:

1. Open **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.

The workflow also needs the appropriate permissions to upload and deploy Pages artifacts.

### Understand the workflow triggers

The template is configured to run checks for pull requests targeting the deployment branch and for pushes to that branch. It can also support manual runs if `workflow_dispatch` is configured.

A successful workflow does not automatically make a pull request merge-only-after-passing. If that is required, configure a repository ruleset or branch protection rule to require the relevant status check.

### Troubleshooting

**The build succeeds locally but fails in Actions.**

Check the Node.js version, dependency lockfile, and build errors. Reproduce the clean install using `npm ci`.

**The website deploys but assets are missing.**

Check the `base` setting in `vite.config.js` and confirm it matches the deployment URL.

**Cypress cannot connect to the application.**

Check that the preview server starts successfully, that the configured URL and port match, and that Cypress waits for the server before running tests.

**The website doesn't update after a successful workflow.**

Check the deployment job, Pages environment, and repository Pages settings. Confirm that the workflow deployed the expected commit and artifact.

---

## 6. Building a Similar Template from Scratch

Once you're comfortable using the template, you can build your own.

### Step 1: Create the application

Start with Vite:

```bash
npm create vite@latest
```

Choose Vanilla, React, or Vue, then install the dependencies:

```bash
cd YOUR-PROJECT
npm install
npm run dev
```

Confirm that the starter application works.

### Step 2: Add Cypress

Install Cypress as a development dependency:

```bash
npm install -D cypress
npx cypress open
```

Complete the initial setup and create a simple homepage test.

Add the `test:e2e` script to `package.json`:

```json
"test:e2e": "cypress run"
```

Verify that the test passes locally.

### Step 3: Test the production build

Build the application:

```bash
npm run build
```

Then start the preview server:

```bash
npm run preview
```

Run Cypress against the preview server. This checks the production output rather than relying only on the development server.

### Step 4: Create the GitHub Actions workflow

Create a workflow file under:

```text
.github/workflows/ci.yml
```

The workflow should:

- Check out the repository.
- Set up Node.js.
- Install dependencies with `npm ci`.
- Build the application.
- Start the Vite preview server.
- Wait for the server to respond.
- Run Cypress tests.
- Upload the production output for deployment when the event and branch permit it.

Use the official documentation for current action versions and configuration:

- [GitHub Actions — Building and Testing Node.js](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs)
- [Cypress — GitHub Actions](https://docs.cypress.io/app/continuous-integration/github-actions)
- [GitHub Pages — Deploying with a Custom GitHub Actions Workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

### Step 5: Configure deployment

Configure GitHub Pages to use GitHub Actions. The workflow should upload the generated `dist/` directory using the Pages artifact action and deploy it only after the build-and-test job succeeds.

Keep the deployment permissions and environment configuration from the official GitHub Pages example.

### Step 6: Test the complete workflow

Push your changes and verify that:

- The workflow runs successfully.
- Cypress tests execute against the production build.
- The artifact contains the expected website files.
- The deployment job runs only for the intended branch and event.
- The live website loads and behaves correctly.

### Step 7: Make it reusable

Once the pipeline works, document the configuration that developers using the template need to customize:

- Project name and page title.
- Vite base path.
- Deployment branch.
- Cypress tests and selectors.
- Any framework-specific configuration.

Keep the starter project small and understandable. A template is most useful when developers can trace how the pieces work together rather than treating the automation as a black box.

---

## 7. Before Submitting Your Project

- [ ] The application runs locally.
- [ ] Dependencies install using `npm ci`.
- [ ] The production build succeeds.
- [ ] Cypress tests pass.
- [ ] The Vite base path is correct.
- [ ] GitHub Actions passes on a pull request.
- [ ] The deployment succeeds from the intended branch.
- [ ] The live website works as expected.

**Remember:** CI/CD is intended to make your development process repeatable. Run the application locally, test important behavior, and understand what your automated workflow does before relying on it.