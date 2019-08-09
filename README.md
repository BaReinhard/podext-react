# PoD Gear Extension

## Requirements

There is only one requirement to use this template. 

* Node.JS LTS or greater. 

You may also find that using `yarn` is easier than `npm`, so we do recommend installing that as well by running: 
```
npm i -g yarn
``` 
in an elevated command line interface.

If you opt to use `npm`, simply replace all mentions of `yarn` below with `npm run`, such as `npm run start` or `npm run build`. 

## First time Usage

### [Developer Rig](https://dev.twitch.tv/docs/extensions/rig/) Usage

If you are using the developer rig and have used this as your basis for your extension, please ignore the below steps- the developer rig has taken care of it for you! 

### Please note that HTTPS only works with the Developer Rig version 1.1.4 and above. 

If you are using a version below that, please either upgrade or disable HTTP. To do so:

1. Go into `/webpack.config.js`
2. Update `config.devServer.https = true` to `config.devServer.https = false`
3. On the [Twitch Developer Console](https://dev.twitch.tv/console), make sure to update the Asset Hosting path for your extension to use http instead. 
4. Refresh your manifest in the Developer Rig and recreate your views. 

### Local Development

If you're wanting to develop this locally, use the below instructions. 
To use this, simply clone the repository into the folder of your choice. 

For example, to clone this into a `<repo name here>` folder, simply run the following in a commandline interface: 
```
git clone <repo name to be fixed later>
```

Next, do the following: 

1. Change directories into the cloned folder.
2. Run `yarn install` to install all prerequisite packages needed to run the template. 
3. Run `yarn start` to run the sample. If everything works, you should be be able to go to the developer rig, create a panel view, and see `Hello world!`

## Building Production Files

To build your finalized React JS files, simply run `yarn build` to build the various webpacked files. These files will use code splitting to only load in the libraries needed for that view, while still allowing you to reuse components. 

### Webpack Config

The Webpack config is stored under `/webpack.config.js`. Adjusting the config will allow you to disable building code for unneeded extension views. To do so, simply turn the `build` attribute on the path to `false`. 

Additionally, feel free to modify the code as needed to add either additional plugins (via modifying the plugins variable at the top) or simply adjusting/tuning the output from Webpack. 


## File Structure

The file structure in the template is laid out with the following: 

### dist

`/dist` holds the final JS files after building. You can simply zip up the contents of the folder to upload to Twitch to move to Hosted Test. 

### public

`/public` houses the static HTML files used for your code's entrypoint. If you need to add new entrypoints (for something custom), simply add it to the webpack config and add a new copy of the file here. 

### src

This folder houses all source code and relevant files (such as images). Each React class/component is given a folder to house all associated files (such as associated CSS).

Below this folder, the structure is much simpler.

This would be: 

```
components\
-\App\
--\App.js
--\App.test.js
--\App.css
-\Authentication\
--\Authentication.js
...
-\static\
--\images
---\sample_image.jpeg
```

Each component is under the `components` folder.



# Running in Rig
0. Run `npm start` in your console
1. Start the Twitch Developer Rig
2. Select Create your first Project
3. Select New Extension in the first drop down.
4. Enter whatever project name you would like.
5. Select Panel type
6. Select Next
7. Under `Select the local folder where your extensions files will be located during development.` Select the path of the this repo.
8. Under `Add Code to you Project` Select `None - I'll use my own code`
9. Select Next, then Select Get Started.
10. To the test views, select extension views in the left pane
11. Then Select `Create New View`
12. Choose the view type you would like to see, give it a view label, and choose the viewer type, then click save.

# Rig Download
- https://dev.twitch.tv/docs/extensions/rig

# DOCUMENTATION on the JS Helper for Twitch:
- https://dev.twitch.tv/docs/extensions/reference/#helper-actions