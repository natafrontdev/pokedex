const styles = () => {
  return {
    spinner: {
      position: 'absolute',
      margin: 'auto',
      left: '0',
      top: '0',
      bottom: '0',
      right: '0',
      width: '15px',
      height: '15px',
      borderRadius: '100%',
      boxShadow: '15px 15px #4f4d49, -15px 15px #dfdfdf, -15px -15px #4f4d49, 15px -15px #dfdfdf',
      animation: 'spinnerKeyframes ease infinite 4s'
    },
    '@keyframes spinnerKeyframes': {
      '0%': {
        boxShadow: '15px 15px #4f4d49, -15px 15px #dfdfdf, -15px -15px #4f4d49, 15px -15px #dfdfdf'
      },
      '25%': {
        boxShadow: '-15px 15px #dfdfdf, -15px -15px #4f4d49, 15px -15px #dfdfdf, 15px 15px #4f4d49'
      },
      '50%': {
        boxShadow: '-15px -15px #4f4d49, 15px -15px #dfdfdf, 15px 15px #4f4d49, -15px 15px #dfdfdf'
      },
      '75%': {
        boxShadow: '15px -15px #dfdfdf, 15px 15px #4f4d49, -15px 15px #dfdfdf, -15px -15px #4f4d49'
      },
      '100%': {
        boxShadow: '15px 15px #4f4d49, -15px 15px #dfdfdf, -15px -15px #4f4d49, 15px -15px #dfdfdf'
      }
    }
  }
}

export default styles
