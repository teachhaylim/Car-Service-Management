import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';

const AuthButton = styled(Typography)(({ theme, color }) => {
    return {
        color: color ?? "black",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: "medium",
        "&:hover": {
            textDecoration: "underline"
        }
    }
});

AuthButton.propTypes = {
    color: PropTypes.string.isRequired,
}

export default AuthButton;