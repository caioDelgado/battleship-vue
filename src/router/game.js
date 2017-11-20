import Game from '@/views/Game'
import TheGame from '@/views/game/TheGame'
import InitGame from '@/views/game/InitGame'
import AwaitPlayers from '@/views/game/AwaitPlayers'

const children = [{
  name: 'initGame',
  path: 'initGame',
  component: InitGame
}, {
  name: 'theGame',
  path: 'theGame',
  component: TheGame
}, {
  name: 'awaitPlayers',
  path: 'awaitPlayers',
  component: AwaitPlayers
}]

export default [{
  children,
  name: 'game',
  path: '/',
  component: Game
}]
