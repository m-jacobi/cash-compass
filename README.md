<p align="center">
  <img src="./docs/finanz-freund-logo.png" height="100" />
</p>

# Finanz Freund [![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat)](https://github.com/m-jacobi/finanz-freund/blob/develop/LICENSE.md)

Navigate your finances with ease using **Finanz Freund** - the smart and intuitive budget planner app!

## Feature

- [x] Payments can be created, edited and removed again
- [x] New categories can be added, edited and removed again
- [x] Filtering the payments
- [x] Filtering the categories

### Changelog

- [Finanz Freund Changelog](CHANGELOG.md)

## Coming Soon

- [ ] More testing
- [ ] Dashboard functionality
- [ ] Recurring payments
- [ ] Translation into the following languages
  - [ ] English
  - [ ] Spanish
  - [ ] French
- [ ] CSV import and export
- [ ] PDF import and export
- [ ] Local backup
- [ ] Windows Deployment
- [ ] Code Signing
  - [ ] macOS
  - [ ] Windows
  - [ ] Linux
- [ ] Tauri update function
... and more features :blush:

## Development instructions

You need to setup Rust and Tauri CLI by following the [tauri guide](https://tauri.app/v1/guides/getting-started/prerequisites/)

### Run Locally

```bash
# 1. clone the repo and navigate to the finanz-freund folder
git clone 
cd finanz-freund

# 2. install dependencies
yarn

# 3. run the app in the development mode
yarn tauri dev
```

### Build Locally

```bash
yarn tauri build
```
