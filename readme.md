# minesweeper in react

```sh
npm install
./bin/watch
```

## interacting with the game from js console

```javascript
g = games[0];
g.reveal([1, 2]);
g.mark([2, 3])
```


# To use local version of mines:

1. Clone Both Repositories Locally

2. Use npm link to Connect Your Local mines Fork
   In your mines fork directory, run:

``` 
cd mines
npm install  # Ensure dependencies are installed
npm link     # Creates a globally accessible link to this package
```

3. Link mines in minesweeper-react
   Now, go to your minesweeper-react clone and link your local mines fork:
``` 
cd ../minesweeper-react
npm link mines  # Links the local mines package to this project
```
4. Verify That Your Local Version Is Used
   Check node_modules/mines inside minesweeper-react:
```
ls -l node_modules | grep mines
```
5. Everytime to modify `mines` you might need to run `npm link` again in `minesweeper-react`.
