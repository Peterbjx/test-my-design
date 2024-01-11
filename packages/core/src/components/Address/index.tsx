import useStyles from './style'
import Copy from './copy'

type TChain = 'AELF' | 'tDVV' | 'tDVW'

export interface IAddressProps {
  address: string
  addressClickCallback?: (
    originAddress?: string,
    finalAddress?: string,
    e?: React.MouseEvent<HTMLElement>
  ) => void
  chain?: TChain
  preLen?: number
  endLen?: number
  hasCopy?: boolean
  hasTooltip?: boolean
}

const addPrefixSuffix = (str: string, chain: TChain) => {
  if (!str) return str
  let resStr = str
  const prefix = 'ELF_'
  const suffix = `_${chain}`
  if (!str.startsWith(prefix)) {
    resStr = `${prefix}${resStr}`
  }
  if (!str.endsWith(suffix)) {
    resStr = `${resStr}${suffix}`
  }
  return resStr
}

const getOmittedStr = (str: string, preLen?: number, endLen?: number) => {
  if (!str || typeof str !== 'string') {
    return str
  }
  if (typeof preLen !== 'number' || typeof endLen !== 'number') {
    return str
  }
  if (str.length <= preLen + endLen) {
    return str
  }
  if (preLen === 0 || endLen === 0) {
    return str
  }

  return `${str.slice(0, preLen)}...${str.slice(-endLen)}`
}

function Address({
  address,
  chain = 'AELF',
  preLen = 0,
  endLen = 0,
  hasCopy = true,
  hasTooltip = false,
  addressClickCallback
}: IAddressProps) {
  const { styles: st } = useStyles()

  const addPrefixSuffixTxt = addPrefixSuffix(address, chain)
  const omittedStr = getOmittedStr(addPrefixSuffixTxt, preLen, endLen)

  const addressClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    addressClickCallback && addressClickCallback(address, addPrefixSuffixTxt, e)
  }

  return (
    <div className={st.addressWrap}>
      <span className={st.addressText} onClick={addressClickHandler}>
        {omittedStr}
      </span>
      {hasCopy && (
        <Copy className={st.copyBtn} value={addPrefixSuffix(address, chain)} />
      )}
    </div>
  )
}

export default Address