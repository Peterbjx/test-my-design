import Modal from 'components/Modal'
import { memo } from 'react'
import useStyles from './style'

export interface ILoadingProps {
  open?: boolean
  content?: string | React.ReactNode
  width?: number | string
}
function Loading({ open, content = 'loading...', width = 240 }: ILoadingProps) {
  const { styles, prefixCls } = useStyles()
  return (
    <Modal
      open={open}
      width={width}
      closable={false}
      footer={null}
      className={prefixCls + '-loading'}
      centered={true}
    >
      <div className={styles.loadingWrap}>
        <div className={styles.loadingInner}>{content}</div>
      </div>
    </Modal>
  )
}

export default memo(Loading)
