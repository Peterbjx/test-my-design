import {
  Upload as AntdUpload,
  UploadProps as AntdUploadProps,
  Image
} from 'antd'
import useStyles from './style'
import { ReactElement, ReactNode } from 'react'
import UploadIcon from 'assets/upload-icon.svg?react'
import ClearIcon from 'assets/clear-icon.svg?react'
import FileIcon from 'assets/file.svg?react'
import { useTheme } from 'antd-style'
import { UploadFile } from 'antd/es/upload'

export interface IUploadProps
  extends Omit<AntdUploadProps, 'listType' | 'itemRender'> {
  tips?: string | ReactNode
  showUploadButton?: boolean
}

function UploadItemRender({
  file,
  actions
}: {
  originNode: ReactElement
  file: UploadFile
  fileList: object[]
  actions: { download: () => void; preview: () => void; remove: () => void }
}) {
  const { styles, cx } = useStyles()
  const token = useTheme()
  return file.url || file.thumbUrl ? (
    file.status === 'done' && (
      <div className={cx(styles.previewContainer)}>
        <Image
          height={202}
          src={file?.response?.url || file.url || file.thumbUrl}
        />
        <div className="file-info">
          <div className={cx('fileName')}>{file.name}</div>
          <div
            className="clear-container"
            onClick={() => {
              actions.remove()
            }}
          >
            <ClearIcon
              color={token.colorPrimary}
              data-hovercolor={token.colorPrimaryHover}
              data-activecolor={token.colorPrimaryActive}
              width={16}
              height={16}
            />
            <span className="clear-text">Delete</span>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className={cx(styles.FilePreviewContainer)}>
      <div className="file-icon-container">
        <FileIcon width={56} height={56} />
        <div className="file-tips">Ready for review</div>
      </div>
      <div className="file-info">
        <div className={cx('fileName')}>{file.name}</div>
        <div
          className="clear-container"
          onClick={() => {
            actions.remove()
          }}
        >
          <ClearIcon
            color={token.colorPrimary}
            data-hovercolor={token.colorPrimaryHover}
            data-activecolor={token.colorPrimaryActive}
            width={16}
            height={16}
          />
          <span className="clear-text">Remove</span>
        </div>
      </div>
    </div>
  )
}

function Upload(props: IUploadProps) {
  const { styles, cx, prefixCls } = useStyles()
  const token = useTheme()
  const { tips, showUploadButton = true } = props
  return (
    <div
      className={
        (cx(prefixCls + '-upload-container'), styles.AelfdUploadContainer)
      }
    >
      <AntdUpload
        {...props}
        listType="picture-card"
        itemRender={(originNode, file, fileList, actions) => {
          return (
            <UploadItemRender
              originNode={originNode}
              file={file}
              fileList={fileList}
              actions={actions}
            />
          )
        }}
      >
        {showUploadButton && (
          <div
            className={cx(prefixCls + '-upload-button', styles.uploadButton)}
          >
            <UploadIcon
              color={token.colorPrimary}
              data-hovercolor={token.colorPrimaryHover}
              data-activecolor={token.colorPrimaryActive}
              width={40}
              height={40}
            />
            <div className={styles.message}>
              <div className={styles.uploadText}>Upload</div>
              {tips || (
                <>
                  <div className={styles.messageTitle}>
                    {`Formats supported JPG, JPEG, PNG. Max size 100MB.`}
                    {`Recommend ratio 16:9.`}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </AntdUpload>
    </div>
  )
}

Upload.LIST_IGNORE = AntdUpload.LIST_IGNORE

export default Upload
