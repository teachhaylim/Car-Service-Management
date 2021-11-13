import { styled } from '@mui/system'
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";

const StyledContainer = styled("div")(({ theme }) => {
    return {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
});

const StyledTitle = styled("div")(({ theme }) => {
    return {
        margin: "10px 0",
        fontSize: "5rem",
        fontWeight: "bold",
        background: `-webkit-linear-gradient(60deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    }
});

const StyleSubtitle = styled("div")((theme) => {
    return {
        fontSize: "1.5rem",
        fontWeight: "semibold",
    }
});

const StyledButton = styled(RouterLink)(({ theme }) => {
    return {
        margin: "30px 0",
        background: "none",
        color: '#383736',
        fontSize: 25,
        padding: 12,
        borderRadius: 4,
        transition: "0.5s all",
        fontWeight: 700,
        border: "2px #383736 solid",
        textTransform: 'uppercase',
        outline: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        letterSpacing: 2,
        "&:hover": {
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            background: theme.palette.secondary.light,
            border: `1px solid ${theme.palette.secondary.light}`,
            color: "white",
            transform: "scale(1.05, 1.05)",
        },
        "&:active": {
            transition: "0.08s all",
            boxShadow: "none",
            transform: "scale(0.9, 0.9)",
        }
    }
});

const UnauthorizedPage = () => {
    const { t } = useTranslation();

    return (
        <StyledContainer>
            <StyledTitle>
                401 {t("unauthorized")}
            </StyledTitle>

            <StyleSubtitle>
                {t("unauthorizedMessage")}
            </StyleSubtitle>

            <StyleSubtitle>
                {t("unauthorizedSubMessage")}
            </StyleSubtitle>

            <StyledButton to="/login">{t("returnToLogin")}</StyledButton>
        </StyledContainer>
    )
}

export default UnauthorizedPage
