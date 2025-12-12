import "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        ggtest: Palette['primary'];
    }
    interface PaletteOptions {
        ggtest?: PaletteOptions['primary'];
    }
}