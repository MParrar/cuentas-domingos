import Spinner from 'react-bootstrap/Spinner'

export const Loading = () => {
    return (
        <div className='text-center'>
            <Spinner
                style={{
                    position: 'absolute',
                    top: '45%',
                    left: "405",
                    margin: '-25px 0 0 -25px',
                    height: '100px', width: '100px'
                }}
                animation="border" variant="success" />
        </div>

    )
}
