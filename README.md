<!-- V2 -->

# React TypeScript Chrome Extension

## Overview

This project demonstrates how to build a Chrome Extension using React and TypeScript. It includes examples of a Popup and a Content Script React app, both built and bundled with Vite and crxjs.

## Setup

### Clone repository
```sh
git clone git@github.com:yosevu/react-content-script.git
```

### Install dependencies
```sh
yarn
```

### Development

To start a development server with hot-reloading:

```sh
yarn dev
```

### Build for Production

To create a production-ready build of the extension:

```sh
yarn build
```

### Load the Extension

1. Navigate to [chrome://extensions/](chrome://extensions/)
2. **Enable** "Developer mode" using the toggle switch in the top right corner.
3. Click the **"Load unpacked"** button in the top left corner.
4. Select the `dist` directory inside the `react-content-script` directory.
5. Navigate to https://blank.org/ to see the Content Script React app in action.
6. Open the extensions menu and click on **"React TypeScript Chrome Extension"** to see the Popup React app.

## [Popup](https://developer.chrome.com/docs/extensions/mv3/user_interface/#popup)

The popup source code is at the root directory.

## [Content Script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

The content script source code is in the `content-script` directory.

<img width="895" alt="Screen Shot 2022-06-18 at 10 04 04 AM" src="https://user-images.githubusercontent.com/16216104/174416528-6e5ad272-5faa-41d4-a717-c210ed4924b0.png">

## Development Tips

- **Live Reloading**: Use `yarn dev` to see changes immediately during development.
- **Debugging**: Use Chrome DevTools to inspect and debug both the content script and popup.

## Background

This repository was originally part of [How to inject a React app into a Chrome Extension as a Content Script](https://medium.com/@yosevu/how-to-inject-a-react-app-into-a-chrome-extension-as-a-content-script-3a038f611067). 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


<!-- V1 -->

# NoNoise LinkedIn

## Remove Suggested & Sponsored Posts from LinkedIn

NoNoise LinkedIn is a browser extension that cleans up your LinkedIn feed by removing all suggested and sponsored posts, helping you stay focused on real content.

## Features

- Removes **Suggested Posts** from your LinkedIn feed.
- Removes **Sponsored Ads** from your LinkedIn feed.
- Lightweight and **privacy-friendly** – no tracking!

### Feature Demonstration
<p align="center">
  <img src="https://raw.githubusercontent.com/karan51ngh/no-noise-linkedin/main/assets/1.png" width="45%" />
  <img src="https://raw.githubusercontent.com/karan51ngh/no-noise-linkedin/main/assets/2.png" width="45%" />
</p>

## How to use it

Simply install the extension and forget it. Now, whenever you browse LinkedIn, your feed will automatically be free from **Suggested** and **Sponsored** posts.

## Installation

### Manual Installation (Chromium-based browsers, like Brave, Google Chrome, Microsoft Edge, Vivaldi etc.)

1. Download the latest release from the [GitHub Releases](https://github.com/karan51ngh/no-noise-linkedin/releases).
2. Extract the ZIP file.
3. Open `chrome://extensions/` in your browser.
4. Enable **Developer mode** (top-right corner).
5. Click **Load unpacked** and select the extracted folder.

### Chrome (via Chrome Web Store)

- Go to the [Chrome Web Store](https://chromewebstore.google.com/detail/hbcjelfhlljdepmifggbmhnklhmdmldn)
- Click **Add to Chrome**.
- Enjoy a clutter-free LinkedIn experience!

### Firefox (via Add-ons Store)

- Will start implementing this after the Chrome version stabilizes.
- **Coming Soon**.

## How It Works

NoNoise LinkedIn uses simple DOM manipulation to identify and remove unwanted content from your LinkedIn feed. The extension does **not** collect or store any user data.

## Upcoming Features

We're actively working on adding new functionalities to enhance your LinkedIn experience. Stay tuned for updates!

## License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](https://github.com/karan51ngh/no-noise-linkedin/blob/main/LICENSE) file for more details.

## Contributing

1. Fork the repository.
2. Clone your fork: `git clone https://github.com/your-username/no-noise-linkedin.git`
3. Create a new branch: `git checkout -b feature-name`
4. Commit your changes and push.
5. Open a pull request.

## Contact

Have questions or suggestions? Feel free to reach out!

- GitHub Issues: [Open an issue](https://github.com/karan51ngh/no-noise-linkedin/issues)
- Email: [karansingh9535@gmail.com](mailto\:karansingh9535@gmail.com)
- LinkedIn: [karan51ngh](https://www.linkedin.com/in/karan51ngh/)
- X / Twitter: [karan_51ngh](https://x.com/karan_51ngh)

## Thank You for Using NoNoise LinkedIn!

![NoNoise LinkedIn Logo](https://raw.githubusercontent.com/karan51ngh/no-noise-linkedin/main/assets/3.png)
