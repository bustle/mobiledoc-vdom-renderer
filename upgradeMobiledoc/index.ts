import Mobiledoc from 'mobiledoc-vdom-renderer/types/Mobiledoc/'
import Mobiledoc02 from 'mobiledoc-vdom-renderer/types/Mobiledoc/0.2'
import { semverMatchesMinor } from 'mobiledoc-vdom-renderer/utils'
import upgradeMobiledoc02 from './0.2-0.3'

export { Mobiledoc02, upgradeMobiledoc02 }

export default (mobiledoc: Mobiledoc | Mobiledoc02): Mobiledoc =>
  semverMatchesMinor('0.2')(mobiledoc.version)
    ? upgradeMobiledoc02(mobiledoc as Mobiledoc02)
    : (mobiledoc as Mobiledoc)
