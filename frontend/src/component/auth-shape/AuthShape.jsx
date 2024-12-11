import shape_1_left from '../../assets/left.png'
import shape_2_right from '../../assets/right.png'
import './AuthShape.css'

const AuthShape = () => {
  return (
    <div>
       <div className="shape">
                <div className="shape-inner">
                  <img src={shape_1_left} alt="shape" />
                  <img src={shape_2_right} alt="shape 2" />
                </div>
              </div>
    </div>
  )
}

export default AuthShape
