import * as React from 'react'

const Scabby: React.FC<{ fill?: string; size?: number; className?: string }> =
  ({ fill = 'white', size = 30, className = '' }) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 75 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M22.5 5.75533C22.5 8.64139 22.978 10.4201 24.8146 12.0286C17.0278 13.4251 8.26845 20.3233 6.23628 26.3287C3.43769 24.556 0.00102105 26.4497 0.00102105 29.5643C-0.0722211 32.5186 3.80961 35.1502 6.90659 32.241C7.66054 33.3633 8.75698 34.324 10.0828 35.1004C10.0501 36.3948 10.0359 40.1286 10.4949 40.8244C11.0955 41.7353 17.626 41.6634 17.8972 40.8391C18.0478 40.3813 18.1411 38.4046 18.1985 37.3348C20.3149 37.4351 22.4859 37.2164 24.5212 36.6374C24.1629 37.5729 23.8737 39.15 24.1162 40.9728C17.2806 46.3001 13.4774 57.6571 20.3867 67.5411C16.0936 69.3152 11.926 71.8563 12.0838 75C18.2426 74.8499 40.5779 75 40.5779 75C41.944 75 43.2415 74.7915 44.4627 74.4009C100.37 65.9408 43.9134 15.3915 75 0C38.904 7.58914 88.4991 60.4197 51.2216 68.2004C60.5029 58.7345 57.3189 29.8224 42.0873 16.8315C46.0242 16.027 51.2216 19.9324 51.2216 15.1028C51.3388 8.04599 42.9718 4.47621 36.5 10.4291C28.5 6.33954 27.5 2.83423 22.5 5.75533Z"
          fill={fill}
        />
      </svg>
    )
  }

export default Scabby
