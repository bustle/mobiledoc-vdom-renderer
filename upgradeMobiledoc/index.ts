import Mobiledoc from '../types/Mobiledoc/'
import Mobiledoc02 from '../types/Mobiledoc/0.2'
import { semverMatchesMinor } from '../utils'
import upgradeMobiledoc02 from './0.2-0.3'

export { Mobiledoc02, upgradeMobiledoc02 }

export default (mobiledoc: Mobiledoc | Mobiledoc02): Mobiledoc =>
  semverMatchesMinor('0.2')(mobiledoc.version)
    ? upgradeMobiledoc02(mobiledoc as Mobiledoc02)
    : (mobiledoc as Mobiledoc)
