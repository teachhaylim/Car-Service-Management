import { createTheme, colors } from '@mui/material';

const theme = createTheme(
    {
        palette: {
            mode: 'light',
            background: {
                default: '#F4F6F8',
                paper: colors.common.white,
                white: "#FFFFFF",
            },
            primary: {
                main: "#651fff",
                light: "#a255ff",
                dark: "#0100ca",
                contrastText: '#ffffff',
            },
            secondary: {
                main: "#512da8",
                light: "#8559da",
                dark: "#140078",
                contrastText: "#000000",
            },
            text: {
                primary: '#000000',
                secondary: '#000000',
            },
            isDark: false,
        },
        borderRadius: 6,
    }
);

export default theme;
