---
sidebar_position: 1
---

# Raspberry Pi Installation Guide

## Introduction

This guide will walk you through installing evonext-desktop on your Raspberry Pi. The application is compatible with Raspberry Pi 4 or newer models running Ubuntu or other Debian-based distributions.

:::tip Requirements
- Raspberry Pi 4 or newer with ARM64 architecture
- Ubuntu 20.04+ or similar Debian-based distribution
- At least 4GB of RAM recommended
- Stable internet connection
:::

## Installation Process

### Step 1: Update System & Install Dependencies

First, let's update your system and install all required dependencies:

```bash
sudo apt update
sudo apt install automake binutils build-essential cmake curl libtool make patch pkg-config libgtk-3-dev libglib2.0-dev libsoup-3.0-dev libjavascriptcoregtk-4.1-dev libwebkit2gtk-4.1-dev libssl-dev
```

These dependencies are needed for building the graphical components of the application.

### Step 2: Install Rust

Next, install the Rust programming language:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
. "$HOME/.cargo/env"
```

This command downloads and installs Rust, which is used for the backend components of evonext-desktop.

### Step 3: Install Node.js

Now we'll install Node.js, specifically the ARM64 version for Raspberry Pi:

```bash
cd /tmp
wget https://nodejs.org/dist/v24.11.1/node-v24.11.1-linux-arm64.tar.xz
tar xf node-v24.11.1-linux-arm64.tar.xz
export PATH=/tmp/node-v24.11.1-linux-arm64/bin:$PATH
```

:::note
This downloads Node.js for the ARM64 architecture. The version may need to be updated based on the latest releases.
:::

### Step 4: Install pnpm Package Manager

Next, install pnpm, a fast, disk space efficient package manager:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
source "$HOME/.bashrc"
```

### Step 5: Clone and Build evonext-desktop

Finally, let's clone the repository and build the application:

```bash
git clone https://github.com/sansbankdao/evonext-desktop
cd evonext-desktop/
pnpm install
pnpm tauri dev
```

This will download the source code, install all dependencies, and launch the application in development mode.

## Launching the Application

After installation, you can launch the application anytime by running:

```bash
cd evonext-desktop/
pnpm tauri dev
```

:::tip Performance Note
The first compilation may take considerable time on Raspberry Pi hardware. Subsequent runs will be faster.
:::

## Troubleshooting

If you encounter any issues during installation:

1. Check that all commands were executed without errors
2. Ensure your Raspberry Pi has enough available storage (at least 2GB recommended)
3. Make sure your internet connection is stable throughout the installation process

<details>
<summary>Having Issues with Memory?</summary>

If you're experiencing memory-related errors during compilation, try creating a swap file to increase available memory:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Remember to disable this after use with`sudo swapoff /swapfile` if needed.
</details>

## Next Steps

Now that you have evonext-desktop installed on your Raspberry Pi, you can explore its features and functionality. For more information on using the application, refer to the [User Guide](/guide/intro.md).
