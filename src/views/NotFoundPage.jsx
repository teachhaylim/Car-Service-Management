import { styled } from '@mui/system'
import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import img from "assets/404.png";
import { shallowEqual, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// const isDark = false;

const StyledContainer = styled("div")(({ theme }) => {
    return {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.isDark ? "-webkit-radial-gradient(#212121, #000000)" : "",
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
        // color: "white",
        textTransform: 'uppercase',
    }
});

const StyleSubtitle = styled("div")(({ theme }) => {
    return {
        fontSize: "1.5rem",
        fontWeight: "semibold",
        cursor: 'default',
        textAlign: "center",
        color: theme.palette.isDark ? "white" : "black",
    }
});

const StyledButton = styled(RouterLink)(({ theme }) => {
    return {
        margin: "30px 0",
        background: "none",
        color: theme.palette.isDark ? "white" : "black",
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
            color: theme.palette.isDark ? "black" : "white",
        },
        "&:active": {
            transition: "0.08s all",
            boxShadow: "none",
            transform: "scale(0.9, 0.9)",
            color: theme.palette.isDark ? "black" : "white",
        }
    }
});

const CheckRedirect = (token, isLogin) => {
    if (!token) return false;

    if (token && !isLogin) return false;

    return true;
}

const NotFound = () => {
    const token = useSelector(store => store.token, shallowEqual);
    const isLogin = useSelector(store => store.isLogin, shallowEqual);
    const { t } = useTranslation();

    return (
        <StyledContainer>
            <img src={img} alt="" />

            <StyledTitle>
                {t("notFoundMessage")}
            </StyledTitle>

            <StyleSubtitle>
                {t("notFoundSubMessage")}
            </StyleSubtitle>

            <StyledButton to={CheckRedirect(token, isLogin) ? "/" : "/login"}>{t("notFoundButton")}</StyledButton>
        </StyledContainer>
    )
}

export default NotFound
