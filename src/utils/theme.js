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
                main: "#3D087B",
                light: "#ff616f",
                dark: "#c4001d",
                contrastText: '#ffffff',
            },
            secondary: {
                main: "#ff3d00",
                light: "#ff7539",
                dark: "#c30000",
            },
            text: {
                primary: '#263238',
                primary_light: "#4f5b62",
                primary_dark: "#000a12",
                secondary: '#757575',
                secondary_light: "#a4a4a4",
                secondary_dark: "#494949",
            },
            isDark: false,
        },
        borderRadius: 6,
    }
);

export default theme;
