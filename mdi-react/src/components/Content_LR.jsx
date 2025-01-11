import PropTypes from 'prop-types';
import './Content_LR.scss'

function Content_LR({LeftComponent, RightComponent}) {

    return (
        <div className="lr-container">
            <div>
                <LeftComponent className="left-box" />
            </div>
            <div>
                <RightComponent className="right-box" />
            </div>
        </div>
    );
}


Content_LR.propTypes = {
    LeftComponent : PropTypes.Component,
    RightComponent : PropTypes.Component
}

export default Content_LR;