# installation

    npm install -g gulp-cli
    npm install -g bower
    npm install
    bower install


# build and run dev server (results in ./dev directory)

    gulp serve

# build dist (results in ./dist directory)

    gulp build
	
# Sublime notes

In case you've got time to time mysterious gulp file access errors, the cause may be in Sublime's write file locks.
You can fix it by setting next value in the Sublime configuration:

{
  "atomic_save": true,
  ...
}

Sublime can use the .editorconfig configuration, just need to install https://github.com/sindresorhus/editorconfig-sublime plugin
