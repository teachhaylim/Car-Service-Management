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
                light: "#7c4dff",
                dark: "#6200ea",
                contrastText: '#ffffff',
            },
            secondary: {
                main: "#512da8",
                light: "#5e35b1",
                dark: "#4527a0",
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
