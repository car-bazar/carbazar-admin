const AnimatedIcon = () => {
	return (
		<svg viewBox='0 0 180 160' style={{ width: '100%', height: '100%' }}>
			<style>
				{`
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          
          .path-0 {
            stroke-dasharray: 239.7;
            stroke-dashoffset: 239.7;
            animation: draw 1.6s ease-in-out 0.2s infinite alternate;
            
          }

          .path-1 {
            stroke-dasharray: 239.7;
            stroke-dashoffset: 239.7;
            animation: draw 1.6s ease-in-out 0.4s infinite alternate;
            
          }

          .path-2 {
            stroke-dasharray: 404.0;
            stroke-dashoffset: 404.0;
            animation: draw 1.6s ease-in-out 0.6s infinite alternate;
            
          }
        `}
			</style>
			<path
				className='path-0'
				d='M81.1905 116.818C81.1905 95.7309 64.1347 78.6364 43.0952 78.6364C22.0558 78.6364 5 95.7309 5 116.818C5 137.905 22.0558 155 43.0952 155C64.1347 155 81.1905 137.905 81.1905 116.818Z'
				fill='none'
				stroke='#1BE8BC'
				strokeWidth='10'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				className='path-1'
				d='M175 116.818C175 95.7309 157.944 78.6364 136.905 78.6364C115.865 78.6364 98.8096 95.7309 98.8096 116.818C98.8096 137.905 115.865 155 136.905 155C157.944 155 175 137.905 175 116.818Z'
				fill='none'
				stroke='#1BE8BC'
				strokeWidth='10'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				className='path-2'
				d='M147.063 5H32.9365C17.5076 5 5 17.536 5 33C5 48.464 17.5076 61 32.9365 61H147.063C162.492 61 175 48.464 175 33C175 17.536 162.492 5 147.063 5Z'
				fill='none'
				stroke='#1BE8BC'
				strokeWidth='10'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default AnimatedIcon
