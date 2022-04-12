import * as React from 'react'
import { blue, green, red } from '../tokens/colors'

const HandHoldingSign: React.FC<{
  stickLength?: number
  className?: string
  stickOnly?: boolean
  width?: number
}> = ({ stickLength = 400, className = '', stickOnly = false, width = 30 }) => {
  const rotationPoint = {
    x: 175,
    y: 62.5,
  }

  const holdingSign = true
  return (
    <svg
      width={width}
      viewBox={`0 ${-stickLength} 80 ${stickLength + 150}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        //   fill="#C4C4C4"
        fill="#810505"
        height={stickLength + 150}
        width={14.2}
        transform={`translate(33 -${stickLength})`}
      ></rect>

      <g
        style={{ transition: 'transform 400ms ease' }}
        clipPath="url(#clip0_220_16)"
        transform={!holdingSign ? 'rotate(90) translate(0 40)' : ''}
        transform-origin={`${rotationPoint.x} ${rotationPoint.y}`}
        opacity={stickOnly ? 0 : 1}
      >
        <path
          d="M36.0388 0.788363C31.3491 1.90978 28.3452 5.14778 26.2303 9.15073C21.0042 8.23725 11.9619 7.33863 9.33351 7.42033C6.23768 7.51687 2.12269 7.85107 1.44069 14.03C0.99624 18.0552 2.5748 21.3601 7.87755 21.8131C9.85459 21.9839 11.9006 22.1102 13.9006 22.1993L13.188 24.4421C11.3412 24.3976 9.66302 24.3678 8.39097 24.353C3.01925 24.2936 -0.0152681 27.0711 5.77721e-05 32.5743C0.0153836 37.3941 4.31429 39.6741 7.4331 39.8449C9.08063 39.934 13.7397 39.6741 18.3068 39.2508L18.7819 40.2014L18.9888 40.4836C16.1075 40.9218 13.3412 41.3748 11.3948 41.7164C6.15339 42.6225 3.66294 46.0016 4.25299 50.0119C4.96564 54.8838 9.47911 56.2057 12.5749 56.1092C14.8891 56.0349 23.0578 54.7947 28.4985 53.6584L29.5713 55.1437C29.1805 55.2031 28.7744 55.2625 28.3606 55.3294C28.2916 55.3368 28.2226 55.3517 28.1537 55.3591C27.7935 55.4185 27.4257 55.4705 27.0502 55.5373C26.9659 55.5522 26.8816 55.567 26.7973 55.5745C26.3682 55.6413 25.9314 55.7156 25.4946 55.7898C25.4793 55.7898 25.464 55.7973 25.441 55.7973C24.9736 55.8715 24.5061 55.9532 24.0387 56.0349L23.7705 56.0795C23.4027 56.1389 23.0425 56.2057 22.6823 56.2651C22.5367 56.2874 22.3911 56.3171 22.2532 56.3394C21.9467 56.3914 21.6402 56.4508 21.3337 56.5028C21.1804 56.5325 21.0195 56.5622 20.8662 56.5845C20.5674 56.6365 20.2685 56.6959 19.9773 56.7479C19.8394 56.7776 19.6938 56.7999 19.5559 56.8296C19.1344 56.9113 18.7206 56.9929 18.3221 57.0746C13.5328 58.0401 11.7167 60.1567 12.3067 63.8403C13.142 69.0018 18.506 70.138 21.3413 69.8855C24.1843 69.633 33.7859 67.7021 36.9201 66.3802C37.1193 66.2911 37.3109 66.1945 37.4871 66.0905L38.5906 67.6204C52.6827 66.6698 62.8055 60.9662 62.8055 60.9662C71.0814 56.4434 72.4531 52.9752 73.8171 47.4795C75.365 41.2263 74.9665 33.8145 74.9205 32.6337C74.3995 20.1792 71.5259 12.1362 61.1273 5.46713C58.6215 3.86298 54.9509 1.04087 46.8282 0.149675C43.6634 -0.184523 39.1653 0.0457023 36.0388 0.788363Z"
          fill="#FFD600"
        />
        <rect
          fill="#FFD600"
          height={40}
          width={50}
          transform={`translate(70 15)`}
        ></rect>
        <path
          d="M47.255 16.0496L47.2877 74.8376L32.9345 74.9999L32.897 67.9545C34.5227 67.9545 33.2066 67.4064 34.4296 67.2118C35.6496 67.0177 36.3018 67.4443 37.0594 67.2118C38.0795 66.8987 39.3376 67.2746 39.8921 66.8399C44.9533 62.8613 42.8595 57.3896 42.8595 57.3896C42.084 55.283 40.4505 54.3514 40.4505 54.3514C39.4657 53.7595 38.3489 53.4477 37.2085 53.321C43.091 50.3437 42.1807 44.2699 42.1807 44.2699C41.4392 40.522 38.6614 38.9377 36.4591 38.2621C36.6592 38.1075 36.8593 37.9604 37.0594 37.7843C37.0594 37.7843 40.8232 35.3938 39.5128 25.0918C39.0682 21.6354 38.8563 21.2032 39.2552 19.0218C39.4304 17.3386 40.2256 14.0787 44.9834 15.1345C46.8483 15.5489 47.4957 16.1751 47.255 16.0496Z"
          fill="#810505"
          style={{ transition: 'opacity 400ms ease' }}
          opacity={+holdingSign}
        />
        <path
          d="M24.3299 21.501C24.3299 21.501 24.1996 15.2404 26.2226 9.17283L23.9697 8.79407C23.9697 8.79407 22.3682 13.1089 21.8318 19.4958C21.7475 20.5355 21.7092 21.4639 21.7092 22.3848L19.6938 22.2659L6.2377 21.5604C6.2377 21.5604 7.2492 21.7535 7.2492 23.2091C7.2492 23.8181 6.87372 24.2266 6.58253 24.4568C7.15725 24.3825 7.76262 24.3454 8.39864 24.3528L21.7628 24.6647C21.7781 25.0286 21.8011 25.3925 21.8241 25.7787C22.1536 31.0665 23.4257 36.1463 26.4985 38.0772C16.3987 39.2506 7.44844 39.8447 7.44844 39.8447C9.19559 40.5354 8.45995 42.6149 8.45995 42.6149C15.2493 40.8028 31.7399 39.8447 31.7399 39.8447C38.6902 39.2432 39.6404 43.7957 39.6404 43.7957C40.9355 49.2914 34.7591 51.8164 34.7591 51.8164C33.9469 52.2843 26.5675 53.7176 21.326 54.6979L16.0692 55.6634L14.5903 55.9308C14.7512 55.9085 15.3796 55.8788 15.6171 56.8814C15.7321 57.3641 15.6248 57.7132 15.5175 57.9285C16.3068 57.5869 17.234 57.3047 18.3221 57.0819C20.8049 56.5769 28.284 55.396 28.8663 55.2847L30.7438 55.0321C36.9584 54.2301 38.4603 55.3069 38.4603 55.3069C41.9163 57.067 40.9278 61.3299 40.9278 61.3299C40.1922 65.422 35.5101 66.7216 35.5101 66.7216C33.7323 67.2563 24.2686 69.4695 24.2686 69.4695L38.6059 67.6277C39.6251 67.3083 40.0006 66.8776 40.5523 66.4394C45.5869 62.429 43.4566 56.9705 43.4566 56.9705C42.6673 54.8688 41.0274 53.9479 41.0274 53.9479C40.0389 53.3612 38.9201 53.0567 37.7783 52.9378C43.6405 49.9226 42.6903 43.8551 42.6903 43.8551C41.924 40.1121 39.1347 38.5451 36.9277 37.8841C37.127 37.7281 37.3262 37.5796 37.5255 37.4014C37.5255 37.4014 41.2726 34.9877 39.8933 24.6944C39.4259 21.2411 39.4795 20.7509 39.8626 18.5675C39.8626 18.5675 41.196 13.8887 45.2037 15.374C45.2037 15.374 46.5524 15.7157 48.652 17.3198C48.652 17.3198 50.3455 18.5898 50.3072 16.5846C50.2919 15.983 49.8628 14.8987 49.0045 13.9407C49.0045 13.9407 48.1386 12.9233 45.97 12.3588C45.97 12.3588 40.3684 10.1977 37.5868 15.6488C36.1308 18.5007 36.422 20.4019 36.8664 23.2908C36.8664 23.2908 37.763 32.485 35.2802 35.4482C35.2802 35.4482 32.8357 38.1737 28.92 36.5102C28.8663 36.5028 23.5406 33.6732 24.3299 21.501Z"
          fill="#FCA32A"
        />
        {/* <rect
          fill={green}
          height={64}
          width={100}
          transform={`translate(80 4)`}
        /> */}
      </g>
    </svg>
  )
}

export default HandHoldingSign
