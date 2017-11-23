import Game from '@/views/Game'
import TheGame from '@/views/game/TheGame'
import InitGame from '@/views/game/InitGame'
import AwaitPlayers from '@/views/game/AwaitPlayers'
import Login from '@/views/game/Login'

const children = [{
  name: 'login',
  path: '/login',
  component: Login
}, {
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
  component: Game,
  redirect: 'login'
}]
