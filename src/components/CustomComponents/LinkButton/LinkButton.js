import { Typography } from '@mui/material';
import { styled } from '@mui/styles';
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
    color: PropTypes.string,
}

export default AuthButton;