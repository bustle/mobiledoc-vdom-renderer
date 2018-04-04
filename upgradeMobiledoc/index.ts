import Mobiledoc from '../types/Mobiledoc'
import { semverMatchesMinor } from '../utils'
import Mobiledoc02x from '../types/Mobiledoc02x'
import upgradeMobiledoc02x from './0.2.x-0.3.x'

export { Mobiledoc02x, upgradeMobiledoc02x }

export default (mobiledoc: Mobiledoc | Mobiledoc02x): Mobiledoc =>
  semverMatchesMinor('0.2')(mobiledoc.version)
    ? upgradeMobiledoc02x(mobiledoc as Mobiledoc02x)
    : (mobiledoc as Mobiledoc)
