import "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        ggtest: Palette['primary'];
        background: Palette['background'];
    }
    interface PaletteOptions {
        ggtest?: PaletteOptions['primary'];
        background?: PaletteOptions['background'];
    }
}