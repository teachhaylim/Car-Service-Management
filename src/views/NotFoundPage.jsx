import { styled } from '@material-ui/system'
import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import img from "assets/404.png";

const StyledContainer = styled("div")(({ theme }) => {
    return {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "-webkit-radial-gradient(#212121, #000000)",
    }
});

const StyledTitle = styled("div")(({ theme }) => {
    return {
        fontSize: "4rem",
        fontWeight: "bold",
        background: `-webkit-linear-gradient(60deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
        WebkitBackgroundClip: "text",
        cursor: 'default',
        WebkitTextFillColor: "transparent",
        textAlign: "center",
        color: "white",
        textTransform: 'uppercase',
    }
});

const StyleSubtitle = styled("div")((theme) => {
    return {
        fontSize: "1.5rem",
        fontWeight: "semibold",
        cursor: 'default',
        textAlign: "center",
        color: "white",
    }
});

const StyledButton = styled(RouterLink)(({ theme }) => {
    return {
        margin: "30px 0",
        background: "none",
        color: 'white',
        fontSize: 25,
        padding: 12,
        borderRadius: 4,
        transition: "0.5s all",
        fontWeight: 700,
        border: `2px ${theme.palette.secondary.light} solid`,
        textTransform: 'uppercase',
        outline: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        letterSpacing: 2,
        "&:hover": {
            boxShadow: "0 5px 15px rgba(72, 72, 72, 0.5)",
            background: theme.palette.secondary.light,
            transform: "scale(1.08, 1.08)",
            color: 'black',
        },
        "&:active": {
            transition: "0.08s all",
            boxShadow: "none",
            transform: "scale(0.9, 0.9)",
            color: 'white',
        }
    }
});

const NotFound = () => {
    return (
        <StyledContainer>
            <img src={img} alt="" />

            <StyledTitle>
                oop! page not found
            </StyledTitle>

            <StyleSubtitle>
                You must have picked the wrong door because I haven't been able to lay my
                eyes on the page you've been searching for
            </StyleSubtitle>

            <StyledButton to="/login">Pick new door</StyledButton>
        </StyledContainer>
    )
}

export default NotFound
