# What's Happening?

*What’s Happening?*

## The Problem

Ever been out on a Friday night, unable to find the most lit parties to attend? Or perhaps just trying to find something fun to do for the weekend? **What's Happening?** is designed to resolve problems like these by providing users with a platform to view the most hip *Happenings* in their vicinity.

## What it does

**What's Happening?** is a mobile and web solution for discovering the latest nearby *Happenings*. Never be feel left out again with **What's Happening?**!

## Features

- Users upload their *Happenings* to **What's Happening?**.
- Other users search for *Happenings* near them, sorted by proximity in both space and time!
- **What's Happening?** provides Google maps of the locations, allowing the user to easily go to a nearby *Happening* and have a great time!

## How it works

The back-end of **What's Happening?** is supported by the *Firebase* platform. Each *Happening* is given a unique hash, then stored under a single node in the *Firebase* system. Users hosting *Happenings* upload key information about the *Happening*, such as the name, a description, an address, and more.

The UI is created with HTML, and CSS, with functionality implemented with JavaScript. *Ionic* is used in conjunction with *Cordova* in order to port the project in order to permit mobile support.

## How to run

**What's Happening?** requires the installation of an up-to-date version of *Ionic* in order to be run. To install *Ionic* and *Cordova*, the user should execute the following:
```
npm install -g ionic cordova
```
To install a local clone of the project, the user should execute the following:
```
git clone https://github.com/AndreyBorisKhesin/Sorcerers.git
```
Once the repository is cloned, the user should navigate to the directory where the project is located, then, in command line, run the following:

```
ionic serve
```

Upon running this, **What's Happening?** will be opened in the default web browser.

Happy Happening!
