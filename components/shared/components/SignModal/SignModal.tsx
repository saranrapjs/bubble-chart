import { css, styled } from 'pretty-lights'
import * as React from 'react'
import { Button } from 'react-bootstrap'
import HandHoldingSign from '../../icons/HandHoldingSign'
import MinimalArrow from '../../icons/MinimalArrow'
import { blue, green, white } from '../../tokens/colors'
import { bangersFont, latoFont } from '../../tokens/fonts'
import { pxToRem } from '../../tokens/spacing'

const signClass = css`
  max-width: 824px;
  min-width: 400px;
  margin: ${pxToRem(20)} ${pxToRem(20)} 0;
  display: flex;
  flex-direction: column;
  box-shadow: black 1px 1px 10px;
  background-color: ${white};
  height: min-content;
`

const pageTitleClass = css`
  font-family: ${bangersFont};
  background-color: ${blue};
  color: ${white};
  padding: ${pxToRem(18)};
  position: relative;
`

const stepClass = css`
  font-family: ${latoFont};
  font-size: ${pxToRem(12)};
  line-height: 80%;
  margin: 0;
`

const mainContentClass = css`
  padding: ${pxToRem(18)};
  flex-grow: 1;
`

const SignHolder = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  transition: transform 400ms ease;
  transform: ${(props) =>
    props.collapsed ? 'translate(calc(50vw - 50px), 0)' : 'translate(0,0)'};
  margin-bottom: ${pxToRem(20)};
  width: 100%;
`

const handHoldClass = css`
  margin-left: calc(50vw - 20px);
`

const signTitle = css`
  width: 100%;
  padding: 0;
  margin: 0;
  letter-spacing: 1px;
`
const armClass = css`
  background-color: ${green};
  height: 24px;
  margin-bottom: 12px;
  flex-grow: 1;
  display: flex;
  align-items: center;

  button {
    margin: 0 0 1px;
    padding-left: 4px 0;
  }
`

const containerClass = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #30303090;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  backdrop-filter: blur(2px);
`

const SignModal: React.FC<{ onDismiss: () => void }> = ({
  children,
  onDismiss,
}) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false)

  return (
    <div className={containerClass}>
      <div className={signClass}>
        <div className={pageTitleClass}>
          <p className={stepClass}>Step 1</p>
          <h2 className={signTitle}>Upload your worker list</h2>

          <Button
            size="sm"
            variant=""
            style={{ position: 'absolute', top: 0, right: 0 }}
            onClick={onDismiss}
          >
            <svg viewBox="0 0 10 10" height={14}>
              <path
                d="M 1,1 L 9,9 M 1,9 L 9,1"
                fill="transparent"
                stroke={white}
              />
            </svg>
          </Button>
        </div>
        <div className={mainContentClass}>{children}</div>
      </div>
      <SignHolder collapsed={collapsed}>
        <HandHoldingSign stickLength={50} className={handHoldClass} />
        <div className={armClass}>
          <MinimalArrow
            height={12}
            direction={collapsed ? 'left' : 'right'}
            onClick={() => {
              setCollapsed((currentCollapsed) => !currentCollapsed)
            }}
          />
        </div>
      </SignHolder>
    </div>
  )
}

export default SignModal
