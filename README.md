# Time Bubbles

Simple shooter game that rewards 'action' through delayed gratification and penalizes procrastination.

![time-bubbles-grid](assets/time-bubbles-grid.PNG)

## The Challenge

Build a game that allows players to eliminate enemy threats in two distinct ways.
| Plasma Cannon | Time Bubble Bomb |
| ------------ | ------------- |
| eliminates single enemy | eliminates multiple enemies |
| destroys at current level | transports to next level |

So, even though the **Plasma Cannon** is less effecient at eliminating threats, those threats will not come back to bite you later. The **Time Bubble Bomb** should be used as a last resort. The essential message of this game challenge is save the future by thwarting the elure of procratination.

```
"You cannot escape the responsility of tomorrow by evading it today." ~ Lincoln
```

### CHALLENGE ACCEPTED!

![time-bubble-gameplay](assets/time-bubble-gameplay.gif)
https://time-bomber.herokuapp.com/

### Technology & Tools

![Javascript](https://img.shields.io/badge/Code-Javascript-informational?style=flat&logo=Javascript&logoColor=white&color=7c11f7) ![Node](https://img.shields.io/badge/Code-Node-informational?style=flat&logo=Node.js&logoColor=white&color=7c11f7) ![ExpressJS](https://img.shields.io/badge/Code-ExpressJS-informational?style=flat&logo=Express&logoColor=white&color=7c11f7) ![ejs](https://img.shields.io/badge/Code-ejs-informational?style=flat&logo=embedded-javascript&logoColor=white&color=7c11f7) ![Bash](https://img.shields.io/badge/Shell-Bash-informational?style=flat&logo=GNU-Bash&logoColor=white&color=7c11f7) ![VSCode](https://img.shields.io/badge/Editor-VSCode-informational?style=flat&logo=visual-studio-code&logoColor=white&color=7c11f7)

### Future Plan (bonus lives)

- create save-points in game to be used by players after all lives are used, based on the last successful level reached
- these save points are only created when a _Time Bubble Bomb_ is detonated and an enemy is teleported to a future level
- if the player uses a save-point to come back into the game, the player's ship will be teleported back in time to the original level where that save-point was created
